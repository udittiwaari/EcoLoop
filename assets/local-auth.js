const authMessage = document.getElementById("authMessage");
const authForm = document.getElementById("authForm");
const signOutButton = document.getElementById("signOutButton");

authForm.onsubmit = null;
signOutButton.onclick = null;

function showAuthMessage(text, error = false) {
  authMessage.textContent = text;
  authMessage.classList.toggle("error", error);
}

function updateAuthUser(user) {
  window.dispatchEvent(new CustomEvent("ecoloop:auth-state", { detail: user }));
}

async function requestAuth(path, body, method = body ? "POST" : "GET") {
  let response;
  try {
    response = await window.ecoloopApiFetch(path, {
      method,
      headers: body === undefined ? {} : { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
  } catch {
    throw new Error("Cannot reach your PC's account service. Start EcoLoop with `npm start` from the project folder, then open http://localhost:4173.");
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("The account API is not available here. To sign in using your PC as the backend, run `npm start` from the project folder and open http://localhost:4173. GitHub Pages cannot connect to your PC's local backend.");
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("The account API returned invalid JSON. Restart the backend with `npm start` in the backend folder and try again.");
  }
  if (!response.ok) throw new Error(result.error || "The account request could not be completed.");
  return result;
}

authForm.addEventListener("submit", async event => {
  event.preventDefault();
  const signup = authForm.dataset.mode === "signup";
  const body = {
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value
  };
  if (signup) body.name = document.getElementById("displayName").value.trim();

  const submit = document.getElementById("authSubmit");
  submit.disabled = true;
  showAuthMessage("");
  try {
    const result = await requestAuth(signup ? "/api/auth/register" : "/api/auth/login", body);
    updateAuthUser(result.user);
    showAuthMessage(signup ? "Your account is ready. You are signed in." : "Welcome back.");
    authForm.reset();
  } catch (error) {
    showAuthMessage(error.message, true);
  } finally {
    submit.disabled = false;
  }
});

signOutButton.addEventListener("click", async () => {
  try {
    await requestAuth("/api/auth/logout", undefined, "POST");
    updateAuthUser(null);
    showAuthMessage("");
    document.getElementById("accountDialog").close();
  } catch (error) {
    showAuthMessage(error.message, true);
  }
});

requestAuth("/api/auth/session")
  .then(result => updateAuthUser(result.user))
  .catch(error => showAuthMessage(error.message, true));
