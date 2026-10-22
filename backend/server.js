const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { promisify } = require("node:util");
const {
  randomBytes,
  randomUUID,
  scrypt: scryptCallback,
  timingSafeEqual,
  createHash
} = require("node:crypto");

const scrypt = promisify(scryptCallback);
const port = Number(process.env.PORT || 4173);
const siteRoot = path.resolve(__dirname, "..");
const dataDir = process.env.DATA_DIR || path.join(__dirname, "data");
const storePath = path.join(dataDir, "accounts.json");
const materialsPath = path.join(dataDir, "materials.json");
const dealersPath = path.join(dataDir, "dealers.json");
const videosPath = path.join(dataDir, "videos.json");
const sessionDurationMs = 30 * 24 * 60 * 60 * 1000;
const maxAccounts = 50;
const cookieName = "ecoloop_session";
const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS || "").split(",").map(origin => origin.trim()).filter(Boolean)
);
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpe": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

const ADMIN_NAME = "Udit narayan tiwari";
const ADMIN_EMAIL = "udit3539@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "12345678");

let accountStore = { users: [], sessions: [] };
let materialsStore = [];
let dealersStore = [];
let videosStore = [];
let mutationQueue = Promise.resolve();

function sendJson(response, status, body, headers = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers
  });
  response.end(JSON.stringify(body));
}

function configureCors(request, response) {
  const origin = request.headers.origin;
  if (!origin) return true;

  if (allowedOrigins.size && !allowedOrigins.has(origin)) {
    sendJson(response, 403, { error: "This origin is not allowed to access the account service." });
    return false;
  }
  if (!allowedOrigins.has(origin)) return true;

  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.setHeader("Vary", "Origin");

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return false;
  }
  return true;
}

function getCookie(request, name) {
  const cookies = request.headers.cookie || "";
  for (const cookie of cookies.split(";")) {
    const separator = cookie.indexOf("=");
    if (separator < 0) continue;
    if (cookie.slice(0, separator).trim() === name) {
      return cookie.slice(separator + 1).trim();
    }
  }
  return null;
}

function getSessionToken(request) {
  const authorization = request.headers.authorization || "";
  const bearer = authorization.match(/^Bearer ([a-f0-9]{64})$/i);
  return bearer ? bearer[1] : getCookie(request, cookieName);
}

function isCrossOriginRequest(request) {
  if (!request.headers.origin) return false;
  try {
    return new URL(request.headers.origin).host !== request.headers.host;
  } catch {
    return false;
  }
}

function sessionCookie(token) {
  const crossSite = process.env.NODE_ENV === "production";
  return `${cookieName}=${token}; HttpOnly; SameSite=${crossSite ? "None" : "Lax"};${crossSite ? " Secure;" : ""} Path=/; Max-Age=${sessionDurationMs / 1000}`;
}

function clearSessionCookie() {
  const crossSite = process.env.NODE_ENV === "production";
  return `${cookieName}=; HttpOnly; SameSite=${crossSite ? "None" : "Lax"};${crossSite ? " Secure;" : ""} Path=/; Max-Age=0`;
}

function hashSessionToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

function publicAccount(account) {
  const isAdmin = account.email === ADMIN_EMAIL || account.role === "admin";
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    isAdmin,
    role: isAdmin ? "admin" : "member",
    createdAt: account.createdAt
  };
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 64 * 1024) {
      const error = new Error("Request body is too large.");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("Request body must be valid JSON.");
    error.status = 400;
    throw error;
  }
}

function validateAccountInput(body, signup) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Enter account details to continue." };
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (password.length < 8 || password.length > 128) {
    return { error: "Password must be between 8 and 128 characters." };
  }
  if (signup && (!name || name.length > 60)) {
    return { error: "Enter a name between 1 and 60 characters." };
  }
  return { email, password, name };
}

async function createPasswordHash(password, salt) {
  return (await scrypt(password, salt, 64)).toString("hex");
}

function constantTimeHashMatch(expected, actual) {
  const expectedBuffer = Buffer.from(expected, "hex");
  const actualBuffer = Buffer.from(actual, "hex");
  return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
}

function withStoreLock(operation) {
  const result = mutationQueue.then(operation);
  mutationQueue = result.then(() => undefined, () => undefined);
  return result;
}

async function saveStore(store) {
  const temporaryPath = `${storePath}.${process.pid}.${randomBytes(6).toString("hex")}.tmp`;
  try {
    await fs.promises.writeFile(temporaryPath, JSON.stringify(store, null, 2), { mode: 0o600 });
    await fs.promises.rename(temporaryPath, storePath);
  } catch (error) {
    await fs.promises.rm(temporaryPath, { force: true });
    throw error;
  }
}

async function saveMaterials(materials) {
  const temporaryPath = `${materialsPath}.${process.pid}.${randomBytes(6).toString("hex")}.tmp`;
  try {
    await fs.promises.writeFile(temporaryPath, JSON.stringify(materials, null, 2), { mode: 0o600 });
    await fs.promises.rename(temporaryPath, materialsPath);
  } catch (error) {
    await fs.promises.rm(temporaryPath, { force: true });
    throw error;
  }
}

async function saveDealers(dealers) {
  dealersStore = dealers;
  const temporaryPath = `${dealersPath}.${process.pid}.${randomBytes(6).toString("hex")}.tmp`;
  try {
    await fs.promises.writeFile(temporaryPath, JSON.stringify(dealers, null, 2), { mode: 0o600 });
    await fs.promises.rename(temporaryPath, dealersPath);
  } catch (error) {
    await fs.promises.rm(temporaryPath, { force: true });
    throw error;
  }
}

async function saveVideos(videos) {
  videosStore = videos;
  const temporaryPath = `${videosPath}.${process.pid}.${randomBytes(6).toString("hex")}.tmp`;
  try {
    await fs.promises.writeFile(temporaryPath, JSON.stringify(videos, null, 2), { mode: 0o600 });
    await fs.promises.rename(temporaryPath, videosPath);
  } catch (error) {
    await fs.promises.rm(temporaryPath, { force: true });
    throw error;
  }
}

function findSession(token) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const tokenHash = hashSessionToken(token);
  const session = accountStore.sessions.find(item => item.tokenHash === tokenHash);
  if (!session || session.expiresAt <= Date.now()) return null;
  const account = accountStore.users.find(item => item.id === session.userId);
  return account ? { account, session } : null;
}

function getAuthenticatedAdmin(request) {
  const token = getSessionToken(request);
  const current = findSession(token);
  if (!current) return null;
  const isAdmin = current.account.email === ADMIN_EMAIL || current.account.role === "admin";
  return isAdmin ? current.account : null;
}

async function ensureAdminAccount() {
  let admin = accountStore.users.find(u => u.email === ADMIN_EMAIL);
  const salt = randomBytes(16).toString("hex");
  const passwordHash = await createPasswordHash(ADMIN_PASSWORD, salt);

  if (!admin) {
    admin = {
      id: "admin-root-001",
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      role: "admin",
      salt,
      passwordHash,
      createdAt: new Date().toISOString()
    };
    accountStore.users.unshift(admin);
  } else {
    admin.name = ADMIN_NAME;
    admin.role = "admin";
    admin.salt = salt;
    admin.passwordHash = passwordHash;
  }

  accountStore.users = accountStore.users.filter(u => u.email !== "admin@ecoloop.bhopal");
  await saveStore(accountStore);
  console.log(`[Admin] Admin account ready: ${ADMIN_NAME} (${ADMIN_EMAIL})`);
}

async function handleAuth(request, response, pathname) {
  if (pathname === "/api/auth/session" && request.method === "GET") {
    const current = findSession(getSessionToken(request));
    return sendJson(response, 200, { user: current ? publicAccount(current.account) : null });
  }

  if (pathname === "/api/auth/register" && request.method === "POST") {
    const body = await readJsonBody(request);
    const input = validateAccountInput(body, true);
    if (input.error) return sendJson(response, 400, { error: input.error });

    if (input.email === ADMIN_EMAIL) {
      return sendJson(response, 400, { error: "This email address is reserved." });
    }

    const token = randomBytes(32).toString("hex");
    const tokenHash = hashSessionToken(token);
    const user = await withStoreLock(async () => {
      const now = Date.now();
      const next = {
        users: accountStore.users.slice(),
        sessions: accountStore.sessions.filter(session => session.expiresAt > now)
      };
      if (next.users.some(account => account.email === input.email)) {
        const error = new Error("An account with this email already exists. Sign in instead.");
        error.status = 409;
        throw error;
      }
      if (next.users.length >= maxAccounts) {
        const error = new Error("This local account store is full (maximum 50 accounts).");
        error.status = 409;
        throw error;
      }

      const salt = randomBytes(16).toString("hex");
      const account = {
        id: randomUUID(),
        name: input.name,
        email: input.email,
        role: "member",
        salt,
        passwordHash: await createPasswordHash(input.password, salt),
        createdAt: new Date(now).toISOString()
      };
      next.users.push(account);
      next.sessions.push({ tokenHash, userId: account.id, expiresAt: now + sessionDurationMs });
      await saveStore(next);
      accountStore = next;
      return account;
    });

    const responseBody = { user: publicAccount(user) };
    if (isCrossOriginRequest(request)) responseBody.token = token;
    return sendJson(response, 201, responseBody, { "Set-Cookie": sessionCookie(token) });
  }

  if (pathname === "/api/auth/login" && request.method === "POST") {
    const body = await readJsonBody(request);
    const input = validateAccountInput(body, false);
    if (input.error) return sendJson(response, 400, { error: input.error });

    const token = randomBytes(32).toString("hex");
    const tokenHash = hashSessionToken(token);
    const user = await withStoreLock(async () => {
      let account = accountStore.users.find(item => item.email === input.email);
      // If admin account doesn't exist yet, create it on-demand
      if (!account && input.email === ADMIN_EMAIL && input.password === ADMIN_PASSWORD) {
        await ensureAdminAccount();
        account = accountStore.users.find(item => item.email === ADMIN_EMAIL);
      }
      if (!account) {
        const error = new Error("Email or password is incorrect.");
        error.status = 401;
        throw error;
      }
      const suppliedHash = await createPasswordHash(input.password, account.salt);
      if (!constantTimeHashMatch(account.passwordHash, suppliedHash)) {
        const error = new Error("Email or password is incorrect.");
        error.status = 401;
        throw error;
      }

      const now = Date.now();
      const next = {
        users: accountStore.users.slice(),
        sessions: accountStore.sessions.filter(session => session.expiresAt > now)
      };
      next.sessions.push({ tokenHash, userId: account.id, expiresAt: now + sessionDurationMs });
      await saveStore(next);
      accountStore = next;
      return account;
    });

    const responseBody = { user: publicAccount(user) };
    if (isCrossOriginRequest(request)) responseBody.token = token;
    return sendJson(response, 200, responseBody, { "Set-Cookie": sessionCookie(token) });
  }

  if (pathname === "/api/auth/logout" && request.method === "POST") {
    const token = getSessionToken(request);
    if (token) {
      const tokenHash = hashSessionToken(token);
      await withStoreLock(async () => {
        const next = {
          users: accountStore.users.slice(),
          sessions: accountStore.sessions.filter(session => session.tokenHash !== tokenHash)
        };
        if (next.sessions.length !== accountStore.sessions.length) {
          await saveStore(next);
          accountStore = next;
        }
      });
    }
    return sendJson(response, 200, { ok: true }, { "Set-Cookie": clearSessionCookie() });
  }

  return false;
}

async function handleAdminAndData(request, response, pathname) {
  // 1. Public listings
  if (pathname === "/api/materials" && request.method === "GET") {
    return sendJson(response, 200, { materials: materialsStore });
  }

  if (pathname === "/api/dealers" && request.method === "GET") {
    return sendJson(response, 200, { dealers: dealersStore });
  }

  if (pathname === "/api/videos" && request.method === "GET") {
    return sendJson(response, 200, { videos: videosStore });
  }

  // 2. Admin routes check
  if (pathname.startsWith("/api/admin")) {
    const admin = getAuthenticatedAdmin(request);
    if (!admin) {
      return sendJson(response, 403, { error: "Admin authorization required. Please sign in with the admin account." });
    }

    // Stats
    if (pathname === "/api/admin/stats" && request.method === "GET") {
      return sendJson(response, 200, {
        totalUsers: accountStore.users.length,
        totalCustomMaterials: materialsStore.length,
        totalDealers: dealersStore.length,
        totalVideos: videosStore.length,
        activeSessions: accountStore.sessions.length,
        serverTime: new Date().toISOString()
      });
    }

    // Accounts listing
    if (pathname === "/api/admin/accounts" && request.method === "GET") {
      return sendJson(response, 200, {
        accounts: accountStore.users.map(publicAccount)
      });
    }

    // Delete single account
    const deleteAccountMatch = pathname.match(/^\/api\/admin\/accounts\/([a-zA-Z0-9_-]+)$/);
    if (deleteAccountMatch && request.method === "DELETE") {
      const targetId = deleteAccountMatch[1];
      const targetUser = accountStore.users.find(u => u.id === targetId);
      if (!targetUser) return sendJson(response, 404, { error: "User not found." });
      if (targetUser.email === ADMIN_EMAIL || targetUser.role === "admin") {
        return sendJson(response, 400, { error: "Cannot delete root admin account." });
      }

      await withStoreLock(async () => {
        const next = {
          users: accountStore.users.filter(u => u.id !== targetId),
          sessions: accountStore.sessions.filter(s => s.userId !== targetId)
        };
        await saveStore(next);
        accountStore = next;
      });
      return sendJson(response, 200, { ok: true, deletedId: targetId });
    }

    // Erase all non-admin accounts
    if (pathname === "/api/admin/accounts" && request.method === "DELETE") {
      await withStoreLock(async () => {
        const adminUsers = accountStore.users.filter(u => u.email === ADMIN_EMAIL || u.role === "admin");
        const adminUserIds = new Set(adminUsers.map(u => u.id));
        const next = {
          users: adminUsers,
          sessions: accountStore.sessions.filter(s => adminUserIds.has(s.userId))
        };
        await saveStore(next);
        accountStore = next;
      });
      return sendJson(response, 200, { ok: true, message: "All non-admin user accounts erased." });
    }

    // Add material
    if (pathname === "/api/admin/materials" && request.method === "POST") {
      const body = await readJsonBody(request);
      if (!body.name || !body.category) {
        return sendJson(response, 400, { error: "Material name and category are required." });
      }
      const newMaterial = {
        id: body.id || `mat-${Date.now()}-${randomBytes(3).toString("hex")}`,
        name: String(body.name).trim(),
        category: String(body.category).trim(),
        rate: Number(body.rate) || 0,
        unit: String(body.unit || "kg").trim(),
        action: String(body.action || "Recycle").trim(),
        hazard: Boolean(body.hazard),
        hazardNote: String(body.hazardNote || "").trim(),
        description: String(body.description || "").trim(),
        tips: String(body.tips || "").trim(),
        isCustom: true,
        addedAt: new Date().toISOString()
      };

      materialsStore.push(newMaterial);
      await saveMaterials(materialsStore);
      return sendJson(response, 201, { ok: true, material: newMaterial });
    }

    // Delete single material
    const deleteMatMatch = pathname.match(/^\/api\/admin\/materials\/([a-zA-Z0-9_-]+)$/);
    if (deleteMatMatch && request.method === "DELETE") {
      const matId = deleteMatMatch[1];
      materialsStore = materialsStore.filter(m => m.id !== matId);
      await saveMaterials(materialsStore);
      return sendJson(response, 200, { ok: true, deletedId: matId });
    }

    // Erase all custom materials
    if (pathname === "/api/admin/materials" && request.method === "DELETE") {
      materialsStore = [];
      await saveMaterials(materialsStore);
      return sendJson(response, 200, { ok: true, message: "All custom materials erased." });
    }

    // === DEALERS MANAGEMENT (ADD / DELETE) ===
    if (pathname === "/api/admin/dealers" && request.method === "POST") {
      const body = await readJsonBody(request);
      if (!body.name || !body.zone) {
        return sendJson(response, 400, { error: "Dealer name and zone/location are required." });
      }
      const newDealer = {
        id: body.id || `dealer-${Date.now()}-${randomBytes(3).toString("hex")}`,
        name: String(body.name).trim(),
        type: String(body.type || "General").trim(),
        rating: String(body.rating || "5.0 ★").trim(),
        zone: String(body.zone).trim(),
        services: String(body.services || "Paper, Plastic, Metal, E-waste").trim(),
        hours: String(body.hours || "9:00 AM - 7:00 PM").trim(),
        phone: String(body.phone || "").trim(),
        desc: String(body.desc || `Verified scrap collection hub in ${body.zone}`).trim(),
        accepts: Array.isArray(body.accepts) ? body.accepts : (body.services ? body.services.split(",").map(s => s.trim()) : ["Scrap", "Metals"]),
        badge: String(body.badge || "Verified Bhopal Dealer").trim(),
        mapUrl: String(body.mapUrl || `https://www.google.com/maps/search/${encodeURIComponent(body.name + ' Bhopal')}`).trim(),
        isCustom: true,
        addedAt: new Date().toISOString()
      };
      dealersStore.unshift(newDealer);
      await saveDealers(dealersStore);
      return sendJson(response, 201, { ok: true, dealer: newDealer });
    }

    const deleteDealerMatch = pathname.match(/^\/api\/admin\/dealers\/([a-zA-Z0-9_-]+)$/);
    if (deleteDealerMatch && request.method === "DELETE") {
      const dealerId = deleteDealerMatch[1];
      dealersStore = dealersStore.filter(d => d.id !== dealerId);
      await saveDealers(dealersStore);
      return sendJson(response, 200, { ok: true, deletedId: dealerId });
    }

    // === VIDEOS MANAGEMENT (ADD / DELETE) ===
    if (pathname === "/api/admin/videos" && request.method === "POST") {
      const body = await readJsonBody(request);
      if (!body.title || !body.url) {
        return sendJson(response, 400, { error: "Video tutorial title and URL are required." });
      }
      const newVideo = {
        id: body.id || `vid-${Date.now()}-${randomBytes(3).toString("hex")}`,
        title: String(body.title).trim(),
        category: String(body.category || "Mixed materials").trim(),
        url: String(body.url).trim(),
        channel: String(body.channel || "EcoLoop Community").trim(),
        description: String(body.description || "Recycling and reuse DIY tutorial.").trim(),
        isCustom: true,
        addedAt: new Date().toISOString()
      };
      videosStore.unshift(newVideo);
      await saveVideos(videosStore);
      return sendJson(response, 201, { ok: true, video: newVideo });
    }

    const deleteVideoMatch = pathname.match(/^\/api\/admin\/videos\/([a-zA-Z0-9_-]+)$/);
    if (deleteVideoMatch && request.method === "DELETE") {
      const vidId = deleteVideoMatch[1];
      videosStore = videosStore.filter(v => v.id !== vidId);
      await saveVideos(videosStore);
      return sendJson(response, 200, { ok: true, deletedId: vidId });
    }

    // Master Reset / Erase Everything
    if (pathname === "/api/admin/reset-all" && request.method === "POST") {
      await withStoreLock(async () => {
        const adminUsers = accountStore.users.filter(u => u.email === ADMIN_EMAIL || u.role === "admin");
        const adminUserIds = new Set(adminUsers.map(u => u.id));
        const next = {
          users: adminUsers,
          sessions: accountStore.sessions.filter(s => adminUserIds.has(s.userId))
        };
        await saveStore(next);
        accountStore = next;
      });
      materialsStore = [];
      await saveMaterials(materialsStore);
      return sendJson(response, 200, { ok: true, message: "All user data and materials successfully erased." });
    }
  }

  return false;
}

function serveStatic(request, response, pathname) {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    return response.end("Method not allowed");
  }

  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.resolve(siteRoot, `.${requestedPath}`);
  const relativePath = path.relative(siteRoot, filePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath) || relativePath.startsWith(`backend${path.sep}`)) {
    response.writeHead(403);
    return response.end("Forbidden");
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      return response.end(error.code === "ENOENT" ? "Not found" : "Server error");
    }
    const type = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": type, "X-Content-Type-Options": "nosniff" });
    response.end(request.method === "HEAD" ? undefined : content);
  });
}

async function start() {
  if (process.env.NODE_ENV === "production" && ADMIN_PASSWORD.length < 12) {
    throw new Error("Set ADMIN_PASSWORD to a secret of at least 12 characters before starting in production.");
  }
  await fs.promises.mkdir(dataDir, { recursive: true });

  // Load accounts
  try {
    accountStore = JSON.parse(await fs.promises.readFile(storePath, "utf8"));
    if (!Array.isArray(accountStore.users) || !Array.isArray(accountStore.sessions)) {
      throw new Error("Account store must contain users and sessions arrays.");
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    accountStore = { users: [], sessions: [] };
    await saveStore(accountStore);
  }

  // Ensure Admin
  await ensureAdminAccount();

  // Load custom materials
  try {
    materialsStore = JSON.parse(await fs.promises.readFile(materialsPath, "utf8"));
    if (!Array.isArray(materialsStore)) materialsStore = [];
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    materialsStore = [];
    await saveMaterials(materialsStore);
  }

  // Load dealers
  try {
    dealersStore = JSON.parse(await fs.promises.readFile(dealersPath, "utf8"));
    if (!Array.isArray(dealersStore)) dealersStore = [];
  } catch (error) {
    dealersStore = [];
  }

  // Load videos
  try {
    videosStore = JSON.parse(await fs.promises.readFile(videosPath, "utf8"));
    if (!Array.isArray(videosStore)) videosStore = [];
  } catch (error) {
    videosStore = [];
  }

  const server = http.createServer(async (request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    } catch {
      response.writeHead(400);
      return response.end("Invalid request path");
    }

    if (!configureCors(request, response)) return;

    try {
      if (pathname.startsWith("/api/")) {
        const handledAuth = await handleAuth(request, response, pathname);
        if (handledAuth !== false) return;

        const handledAdmin = await handleAdminAndData(request, response, pathname);
        if (handledAdmin !== false) return;

        if (pathname === "/api/health" && request.method === "GET") {
          return sendJson(response, 200, { ok: true, service: "ecoloop-api" });
        }
        if (pathname === "/api/info" && request.method === "GET") {
          return sendJson(response, 200, { name: "EcoLoop", message: "Smart waste, clear value." });
        }
        return sendJson(response, 404, { error: "API endpoint not found." });
      }
      serveStatic(request, response, pathname);
    } catch (error) {
      console.error("EcoLoop request failed:", error);
      if (!response.headersSent) {
        sendJson(response, error.status || 500, {
          error: error.status ? error.message : "The account service could not complete the request."
        });
      } else {
        response.destroy();
      }
    }
  });

  server.listen(port, () => {
    console.log(`EcoLoop is running at http://localhost:${port}`);
  });
}

start().catch(error => {
  console.error("Could not start EcoLoop:", error);
  process.exitCode = 1;
});
