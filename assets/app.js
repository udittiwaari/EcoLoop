/* ==========================================================================
   EcoLoop — Core Application Logic & AI Vision Hub
   Includes:
   - 40+ default circular materials (E-waste, Metals, Plastics, Paper, Other)
   - Dynamic AI material additions & local storage persistence
   - AI Vision Scanner (Camera + File upload + Drag & drop + Zero-shot AI)
   - Instant HTML5 Canvas visual feature analyzer fallback
   - Interactive AI catalog expander
   - Sample scrap rates & collection planner
   ========================================================================== */

const defaultMaterials = [
  // E-waste (EcoExtract-inspired recovery streams)
  ['Printed Circuit Boards (PCB)', 'E-waste', 350, 'kg', 'Store in dry anti-static containers; do not break or burn boards.', 'Upgrade memory or storage before retiring computers.', 'PCB Safe-Box', null],
  ['Gold-bearing CPU & Connectors', 'E-waste', 1800, 'kg', 'High-grade precious metal stream. Keep gold pins and ceramic CPUs safe.', 'Route only to certified hydrometallurgical e-waste hubs.', 'Gold Recovery Stream', null],
  ['Lithium-Ion Batteries (Li-ion)', 'E-waste', 120, 'kg', 'Tape terminals with electrical tape. Never puncture, crush or heat.', 'Charge between 20-80% to double device battery lifespan.', 'Lithium Cell Container', 'FIRE HAZARD: Damaged or swollen lithium cells must be stored in fire-safe sand buckets.'],
  ['Laptop & Ultrabook Scrap', 'E-waste', 200, 'pcs', 'Erase SSD/HDD securely before handover; harvest RAM and battery.', 'Refurbish with an SSD and lightweight OS.', 'Device Refurb Bay', null],
  ['Smartphone & Tablet Scrap', 'E-waste', 150, 'pcs', 'Factory reset device, remove SIM/SD cards, deposit at e-waste bins.', 'Use protective cases and replace screen protectors.', 'Mobile Recovery Bay', null],
  ['RAM & Memory Modules', 'E-waste', 950, 'kg', 'High precious-metal content on contacts; handle gently to preserve chips.', 'Repurpose older RAM in home servers.', 'Precious Component Bin', null],
  ['Hard Disk Drives (HDD)', 'E-waste', 120, 'pcs', 'Degauss or drill platter if privacy sensitive; aluminium and Nd magnets.', 'Use cloud or encrypted NAS storage.', 'Storage Media Bay', null],
  ['SMPS Power Supply & Adapters', 'E-waste', 70, 'kg', 'Contains heavy copper windings and transformers; sort with power units.', 'Unplug chargers when idle to prevent phantom draw.', 'Power Unit Crate', null],
  ['Lead-Acid & Inverter Batteries', 'E-waste', 95, 'kg', 'Exchange at authorised battery dealers under statutory buyback schemes.', 'Top up with distilled water regularly.', 'Battery Exchange Bay', 'ACID CORROSION: Contains sulfuric acid. Keep upright and never invert.'],
  ['Electric Motors & Alternators', 'E-waste', 85, 'kg', 'Valuable for heavy copper field coils and high-grade steel laminations.', 'Rewind burnt motor coils rather than scrapping.', 'Motor Scrap Bay', null],
  ['Keyboards, Mice & Peripherals', 'E-waste', 25, 'pcs', 'Disassemble ABS shells from internal membrane or switches.', 'Clean mechanical switches to restore function.', 'Peripheral Sorting Bin', null],
  ['Computer LCD / LED Monitors', 'E-waste', 110, 'pcs', 'Do not crack LCD panels; route via specialist display e-waste streams.', 'Adjust brightness to preserve backlight life.', 'Display Recovery Bay', null],
  ['Solar PV Panel Scrap', 'E-waste', 45, 'kg', 'Recycle glass, aluminium frame, and recover silicon wafer silver traces.', 'Regularly clean panels to prevent hotspot degradation.', 'Solar Reclaim Depot', null],
  ['Mixed Electronic Waste', 'E-waste', 25, 'kg', 'Separate batteries and mercury switches before shredding mixed lots.', 'Keep devices in service as long as feasible.', 'Manual Review Bay', null],
  ['Desktop Computer Towers', 'E-waste', 80, 'kg', 'Remove and securely erase storage drives; keep batteries separate.', 'Upgrade memory or storage before replacing a working computer.', 'Computer Refurbishment Bay', null],
  ['Printers & Scanners', 'E-waste', 18, 'kg', 'Keep cartridges separate and use an authorised e-waste collection point.', 'Replace ink or toner before discarding a working printer.', 'E-waste Collection Bay', null],
  ['Wi-Fi Routers & Modems', 'E-waste', 35, 'kg', 'Reset network settings and remove personal configuration before handover.', 'Reuse working routers as access points where supported.', 'Small Electronics Bay', null],
  ['Computer Cables & Power Cords', 'E-waste', 90, 'kg', 'Bundle cables and keep them separate from mixed electronic scrap.', 'Store and reuse compatible chargers and cables.', 'Cable Recovery Bay', null],
  ['UPS Units (Batteries Removed)', 'E-waste', 35, 'kg', 'Remove batteries only if safe and permitted; send batteries to an authorised collection point.', 'Replace a failed battery to extend the life of a working UPS.', 'E-waste Collection Bay', 'Do not open swollen, leaking, or damaged batteries.'],

  // Metal
  ['Copper Wires & Cable', 'Metal', 650, 'kg', 'Strip PVC insulation where permitted; clean bright copper brings top rate.', 'Maintain appliances and cords away from heat.', 'Copper Scrap Bay', null],
  ['Copper Scrap (Pipes & Sheets)', 'Metal', 600, 'kg', 'Clean solder remnants and keep free from lead contamination.', 'Fix plumbing joints rather than replacing copper pipes.', 'Copper Bin', null],
  ['Brass Fixtures & Valves', 'Metal', 450, 'kg', 'Keep yellow and red brass separate for best metal reclamation yield.', 'Refurbish classic hardware with polishing.', 'Brass Recovery Crate', null],
  ['Aluminium Beverage Cans', 'Metal', 135, 'kg', 'Rinse and crush aluminium cans; highly circular and 95% energy saving.', 'Pick aluminium over single-use plastic when available.', 'Aluminium Bins', null],
  ['Cast & Section Aluminium', 'Metal', 150, 'kg', 'Separate iron screws and attachments from aluminium window sections.', 'Maintain window tracks and hinges.', 'Aluminium Profile Bay', null],
  ['Iron Scrap & Rebar', 'Metal', 28, 'kg', 'Store protected from heavy rain to prevent excessive rust scaling.', 'Coat ferrous metal with anti-corrosive primer.', 'Ferrous Scrap Yard', null],
  ['Tin Cans & Food Containers', 'Metal', 20, 'kg', 'Rinse residue thoroughly; tin-plated steel can be re-smelted infinitely.', 'Buy larger cans for cooking staples.', 'Tinplate Bins', null],
  ['Stainless Steel Scrap', 'Metal', 48, 'kg', 'Non-magnetic stainless (grade 304/316) holds premier industrial value.', 'Choose stainless steel for kitchenware longevity.', 'Stainless Steel Bin', null],
  ['Bronze & Gunmetal Scrap', 'Metal', 480, 'kg', 'Store separately from brass; high copper-tin composition demands clean sorting.', 'Service pump impellers and marine bushings.', 'Bronze Scrap Bay', null],
  ['Steel Utensils & Kitchen Scrap', 'Metal', 35, 'kg', 'Separate stainless steel from aluminium and keep the metal dry.', 'Repair loose handles and reuse sturdy utensils.', 'Ferrous Metal Bay', null],
  ['Aluminium Window Frames', 'Metal', 145, 'kg', 'Remove glass, rubber seals, and steel fittings before weighing.', 'Repair frame hardware before replacing a usable window.', 'Aluminium Profile Bay', null],
  ['Copper Motor Windings', 'Metal', 620, 'kg', 'Keep clean copper windings separate from steel motor parts.', 'Repair or rewind working motors before recycling.', 'Copper Scrap Bay', null],
  ['Iron Household Scrap', 'Metal', 25, 'kg', 'Keep iron separate from stainless steel and aluminium.', 'Reuse serviceable racks, tools, and fixtures.', 'Ferrous Scrap Yard', null],
  ['Brass Taps & Plumbing Fittings', 'Metal', 420, 'kg', 'Remove attached plastic or rubber parts and keep brass separate.', 'Replace washers to repair a dripping tap.', 'Brass Recovery Crate', null],

  // Plastic
  ['PET Bottles (Clear & Blue)', 'Plastic', 28, 'kg', 'Empty, rinse, remove liquid and compress to save storage volume.', 'Carry a durable stainless steel refill bottle.', 'Plastics Stream', null],
  ['HDPE Containers & Jugs', 'Plastic', 24, 'kg', 'Rinse milk, detergent and shampoo bottles; caps can be recycled.', 'Choose concentrate pouches and bulk refills.', 'Rigid Plastics Bin', null],
  ['PP Buckets & Rigid Plastic', 'Plastic', 18, 'kg', 'Sort rigid polypropylenes (chairs, buckets, crates); clean loose dirt.', 'Invest in long-lasting durable products.', 'Polypropylene Bin', null],
  ['Hard Plastic Scrap', 'Plastic', 14, 'kg', 'Keep hard plastic dry and segregated from flexible films.', 'Repair handles and hinges before discarding.', 'Hard Plastic Bay', null],
  ['Soft Plastic & Film Packaging', 'Plastic', 16, 'pcs', 'Bundle clean plastic wrap and carry bags into specialist collection.', 'Refuse single-use shopping bags.', 'Soft Film Bale', null],
  ['PVC Pipes & Conduits', 'Plastic', 15, 'kg', 'Cut into manageable lengths; route to PVC pipe reclaimers.', 'Repurpose leftover conduit as garden stakes.', 'PVC Pipe Stream', null],
  ['Mixed Household Plastic', 'Plastic', 12, 'kg', 'Clean and segregate by resin identification code (1 to 7).', 'Avoid multi-layer composite packaging.', 'Mixed Plastic Bin', null],
  ['HDPE Milk & Detergent Bottles', 'Plastic', 25, 'kg', 'Rinse containers, dry them, and keep caps separate if the buyer requests it.', 'Choose refill packs or reuse durable containers where safe.', 'HDPE Rigid Plastics Bay', null],
  ['PET Water & Soft Drink Bottles', 'Plastic', 28, 'kg', 'Empty, rinse, and flatten bottles; keep them separate from other plastics.', 'Carry a refillable bottle to reduce single-use packaging.', 'PET Bottle Bale', null],
  ['Plastic Crates & Storage Bins', 'Plastic', 18, 'kg', 'Sort by plastic type and remove metal hinges or labels when practical.', 'Reuse sturdy crates for storage or transport.', 'Rigid Plastics Bay', null],
  ['PP Chairs, Buckets & Household Items', 'Plastic', 16, 'kg', 'Keep polypropylene items clean and separate from mixed plastic.', 'Repair cracks where safe and continue using durable items.', 'Polypropylene Bay', null],
  ['LDPE Stretch Wrap & Clean Film', 'Plastic', 10, 'kg', 'Bundle clean, dry film; exclude multilayer snack wrappers and dirty film.', 'Reuse shipping wrap for packing and storage.', 'Flexible Film Bale', null],
  ['HDPE Jerrycans & Large Containers', 'Plastic', 22, 'kg', 'Only submit empty, clean containers; never reuse chemical containers for food or water.', 'Choose returnable containers when available.', 'HDPE Rigid Plastics Bay', null],
  ['Plastic Woven Sacks (PP)', 'Plastic', 12, 'kg', 'Shake out residue, keep sacks dry, and bundle them together.', 'Reuse intact sacks for storage or transport.', 'Polypropylene Bale', null],

  // Paper
  ['Cardboard Packaging Boxes', 'Paper', 12, 'kg', 'Keep dry, remove packaging tape, and flatten boxes.', 'Choose refillable or bulk packs.', 'Cardboard Bay', null],
  ['Clean White Office Paper', 'Paper', 20, 'kg', 'Keep free from staples, oil and moisture for highest grade pulping.', 'Print double-sided and reuse single-sided sheets.', 'Office Paper Bin', null],
  ['Newspaper & Periodicals', 'Paper', 14, 'kg', 'Bundle clean, dry newspapers and newsprint separately.', 'Read digitally when practical.', 'Newsprint Bundle', null],
  ['Books & Bound Paper', 'Paper', 13, 'kg', 'Donate readable books to libraries or schools; recycle degraded copies.', 'Borrow, rent or share study material.', 'Book Donation/Pulp', null],
  ['Kraft Paper Packaging', 'Paper', 11, 'kg', 'Flatten and keep separate from waxed or plastic-coated paper.', 'Reuse bags for grocery and parcels.', 'Kraft Paper Stream', null],
  ['Corrugated Cardboard Cartons', 'Paper', 12, 'kg', 'Flatten clean cartons and keep them dry; remove plastic strapping and excess tape.', 'Reuse sturdy cartons for moving or shipping.', 'Corrugated Cardboard Bale', null],
  ['Mixed Newspaper & Magazines', 'Paper', 12, 'kg', 'Bundle dry paper and remove plastic covers or non-paper inserts.', 'Pass readable magazines along before recycling.', 'Newsprint Bundle', null],
  ['Paper Shopping & Grocery Bags', 'Paper', 8, 'kg', 'Keep bags dry and remove handles or laminated parts if required by the buyer.', 'Reuse clean bags for shopping and storage.', 'Mixed Paper Bale', null],
  ['Paper Egg Trays & Cartons', 'Paper', 6, 'kg', 'Keep dry and free from food, oil, and plastic liners.', 'Reuse clean trays for storage or gardening.', 'Moulded Pulp Stream', null],
  ['Paperboard Boxes & Cereal Cartons', 'Paper', 8, 'kg', 'Flatten clean boxes and separate any plastic windows or liners.', 'Reuse small boxes for organising household items.', 'Mixed Paper Bale', null],
  ['Shredded Office Paper', 'Paper', 7, 'kg', 'Keep shredded paper dry in a closed bag so it is easier for a recycler to handle.', 'Use secure digital documents when suitable.', 'Office Paper Stream', null],
  ['School Books & Notebooks', 'Paper', 10, 'kg', 'Donate usable books; remove plastic covers and separate non-paper bindings if requested.', 'Share or donate books before recycling them.', 'Book Reuse & Paper Bay', null],
  ['Paper Packaging Offcuts', 'Paper', 7, 'kg', 'Keep clean paper offcuts separate from laminated or wax-coated sheets.', 'Use clean offcuts for notes and packing.', 'Mixed Paper Bale', null],

  // Other
  ['Glass Bottles & Jars', 'Other', 2, 'pcs', 'Rinse glass bottles and jars; 100% recyclable without loss in quality.', 'Reuse clean glass jars for spices, nuts and pantry goods.', 'Glass Reclaim Bay', 'CUT INJURY RISK: Wrap cracked glass in newspaper before handling.'],
  ['Old Clothes & Clean Textiles', 'Other', 8, 'kg', 'Donate clean wearable clothing; send torn garments to shredding mills.', 'Mend hems, mend buttons and buy second-hand.', 'Textile Collection', null],
  ['Vehicle Tyres & Rubber Scrap', 'Other', 10, 'kg', 'Hand over to crumb rubber or pyrolysis reclaimers; avoid open burning.', 'Maintain proper tire alignment and tire inflation.', 'Rubber Recovery Stream', null],
  ['Used Beverage Cartons (Tetra Pak)', 'Other', 5, 'kg', 'Rinse, un-fold flaps and flatten; poly-aluminium and paperboard stream.', 'Choose unpackaged fresh juices when practical.', 'Aseptic Carton Bay', null],
  ['Compostable Organic Scraps', 'Other', 2, 'kg', 'Compost fruit rinds, coffee grounds and vegetable leaves in home bin.', 'Plan meals to minimize kitchen leftovers.', 'Organic Compost Bin', null]
].map(([name, category, rate, unit, recycle, prevent, stream, hazard]) => ({
  name, category, rate, unit, recycle, prevent, stream: stream || `${category} Stream`, hazard: hazard || null
}));

// Local storage key for AI-generated and custom added materials
const CUSTOM_MATERIALS_KEY = 'ecoloop_custom_materials_v1';

function getCustomMaterials() {
  try {
    const raw = localStorage.getItem(CUSTOM_MATERIALS_KEY);
    return Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function saveCustomMaterials(list) {
  try {
    localStorage.setItem(CUSTOM_MATERIALS_KEY, JSON.stringify(list));
  } catch (_) {}
}

let materials = [...defaultMaterials, ...getCustomMaterials()];

const $ = id => document.getElementById(id);
let category = 'All', supabase = null, user = null, isAdmin = false;
const config = window.ECOLOOP_SUPABASE || {};
const configured = Boolean(config.url && config.publishableKey);
const isLocalBackendHost = ['localhost', '127.0.0.1', '::1', '[::1]'].includes(window.location.hostname.toLowerCase());

async function readApiJson(response, operation) {
  const body = await response.text();
  if (!body.trim()) {
    throw new Error(`${operation} returned an empty response (HTTP ${response.status}).`);
  }
  try {
    return JSON.parse(body);
  } catch {
    throw new Error(`${operation} returned invalid JSON (HTTP ${response.status}).`);
  }
}

const normalized = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

function distance(a, b) {
  const p = [...Array(b.length + 1).keys()];
  for (let i = 1; i <= a.length; i++) {
    let last = i;
    p[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const old = p[j];
      p[j] = Math.min(p[j] + 1, p[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
      last = old;
    }
  }
  return p[b.length];
}

function findMaterial(value) {
  const q = normalized(value);
  if (!q) return null;
  let best = null, score = Infinity;
  materials.forEach(item => {
    const n = normalized(item.name);
    const next = n.includes(q) || q.includes(n) ? 0 : distance(q, n);
    if (next < score) {
      score = next;
      best = item;
    }
  });
  return score <= Math.max(3, Math.floor(q.length * 0.45)) ? best : null;
}

function updateMaterialCounts() {
  const total = materials.length;
  if ($('rateCount')) $('rateCount').textContent = total;
  if ($('liveMaterialCount')) $('liveMaterialCount').textContent = `${total}+`;
  if ($('heroMaterialCount')) $('heroMaterialCount').innerHTML = `<b>${total}+</b> sample materials`;
  if ($('impactMaterialCount')) $('impactMaterialCount').textContent = `${total}+`;
}

function renderRates() {
  const shown = materials.filter(item => category === 'All' || item.category === category);
  const grid = $('rateGrid');
  if (grid) {
    grid.innerHTML = shown.map(item => `
      <article class="rate-card" data-material-name="${escapeAttr(item.name)}">
        <span class="category">${escapeHtml(item.category)}</span>
        <h3>${escapeHtml(item.name)}</h3>
        <b>₹${item.rate}</b> <small>/${escapeHtml(item.unit)}</small>
      </article>
    `).join('');
  }
  updateMaterialCounts();
}

function showResult(value) {
  const match = findMaterial(value);
  const box = $('searchResult');
  if (!box) return;
  if (!value.trim()) {
    box.innerHTML = '<span class="result-icon">✦</span><div><b>Ready when you are</b><p>Search an item to see prevention, recycling guidance and an example rate.</p></div>';
    return;
  }
  if (!match) {
    box.innerHTML = `<span class="result-icon">?</span><div><b>We could not confidently match "${escapeHtml(value)}"</b><p>Try searching "PCB", "copper", "battery", "bottle", or use the <b>Add with AI</b> tab to register this item!</p></div>`;
    return;
  }
  box.innerHTML = `
    <span class="result-icon">✓</span>
    <div>
      <b>${escapeHtml(match.name)} · example value ₹${match.rate}/${escapeHtml(match.unit)}</b>
      <div class="result-detail">
        <span>PREVENT<b>${escapeHtml(match.prevent)}</b></span>
        <span>RECYCLE<b>${escapeHtml(match.recycle)}</b></span>
        <span>CATEGORY<b>${escapeHtml(match.category)}</b></span>
      </div>
    </div>
  `;
}

function showToast(text, isSuccess = true) {
  const toast = $('ecoloopToast');
  if (!toast) return;
  toast.textContent = text;
  toast.className = `ecoloop-toast show ${isSuccess ? 'success' : ''}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3600);
}

function addMaterialToList(newItem, showNotification = true) {
  if (!newItem || !newItem.name) return false;
  const existing = materials.find(m => normalized(m.name) === normalized(newItem.name));
  if (existing) {
    if (showNotification) showToast(`"${newItem.name}" is already in the website material list!`, true);
    return false;
  }
  materials.unshift(newItem);
  const customList = getCustomMaterials();
  customList.unshift(newItem);
  saveCustomMaterials(customList);
  renderRates();
  populatePlannerSelect();
  if (showNotification) showToast(`✓ Added "${newItem.name}" to website list & rates!`, true);
  return true;
}

function escapeHtml(s) {
  const el = document.createElement('div');
  el.textContent = s ?? '';
  return el.innerHTML;
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;');
}

/* ==========================================================================
   Section 01 Tab Navigation (AI Camera, Search, Add with AI)
   ========================================================================== */
function selectGuideTab(targetId) {
  const pills = document.querySelectorAll('.mode-pill');
  pills.forEach(p => {
    const isTarget = p.dataset.tab === targetId;
    p.classList.toggle('active', isTarget);
    p.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  const slideVisionBtn = $('cardSlideVisionBtn');
  const slideColBtn = $('cardSlideCollectionBtn');
  const slideBadge = $('cardSlideBadge');

  if (slideVisionBtn) slideVisionBtn.classList.toggle('active', targetId === 'visionHub');
  if (slideColBtn) slideColBtn.classList.toggle('active', targetId === 'collectionHub');
  if (slideBadge) {
    slideBadge.textContent = targetId === 'collectionHub' ? '2 / 2' : '1 / 2';
  }

  document.querySelectorAll('.hub-pane').forEach(pane => {
    pane.hidden = pane.id !== targetId;
  });

  // Stop camera if user switches away from vision hub
  if (targetId !== 'visionHub') {
    stopCamera();
  }
}

function cycleGuideSlide(dir) {
  const activePane = Array.from(document.querySelectorAll('.hub-pane')).find(p => !p.hidden)?.id;
  if (activePane === 'visionHub') {
    selectGuideTab('collectionHub');
  } else {
    selectGuideTab('visionHub');
  }
}

function toggleGuideSlide() {
  cycleGuideSlide(1);
}

window.selectGuideTab = selectGuideTab;
window.cycleGuideSlide = cycleGuideSlide;
window.toggleGuideSlide = toggleGuideSlide;

function initGuideTabs() {
  const pills = document.querySelectorAll('.mode-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      selectGuideTab(pill.dataset.tab);
    });
  });

  // Handle #planner or #guide anchors
  const handleHash = () => {
    const hash = window.location.hash;
    if (hash === '#planner') {
      selectGuideTab('collectionHub');
      $('guide')?.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === '#guide') {
      selectGuideTab('visionHub');
    }
  };
  window.addEventListener('hashchange', handleHash);
  if (window.location.hash === '#planner' || window.location.hash === '#guide') {
    setTimeout(handleHash, 200);
  }
}

/* ==========================================================================
   AI Vision: Demo Samples with Built-In High-Def Vector SVGs
   ========================================================================== */
const DEMO_SAMPLES = {
  pcb: {
    name: 'Printed Circuit Boards (PCB)',
    category: 'E-waste',
    rate: 350,
    unit: 'kg',
    stream: 'PCB Safe-Box',
    confidence: 98.4,
    prevent: 'Upgrade memory, SSD or power components to extend computer lifespan.',
    recycle: 'Store in dry anti-static boxes; route to authorized hydrometallurgical e-waste hubs.',
    hazard: null,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><rect width="400" height="300" fill="#0d3b26"/><g stroke="#1b6343" stroke-width="2"><path d="M0,50 H400 M0,100 H400 M0,150 H400 M0,200 H400 M0,250 H400"/><path d="M50,0 V300 M100,0 V300 M150,0 V300 M200,0 V300 M250,0 V300 M300,0 V300 M350,0 V300"/></g><g stroke="#d4af37" stroke-width="3" fill="none"><path d="M40,40 L120,40 L160,80 L220,80 L250,110 L320,110"/><path d="M60,180 L140,180 L180,140 L260,140 L300,180 L360,180"/><path d="M100,260 L180,260 L210,220 L310,220 L340,250"/></g><rect x="150" y="90" width="100" height="70" rx="4" fill="#15171c" stroke="#333"/><circle cx="165" cy="105" r="4" fill="#555"/><text x="200" y="132" fill="#888" font-size="11" font-family="monospace" text-anchor="middle">ARM_ECO_82</text><g fill="#d4af37"><rect x="142" y="98" width="8" height="3"/><rect x="142" y="108" width="8" height="3"/><rect x="142" y="118" width="8" height="3"/><rect x="142" y="128" width="8" height="3"/><rect x="142" y="138" width="8" height="3"/><rect x="250" y="98" width="8" height="3"/><rect x="250" y="108" width="8" height="3"/><rect x="250" y="118" width="8" height="3"/><rect x="250" y="128" width="8" height="3"/><rect x="250" y="138" width="8" height="3"/></g><g fill="#f4c430"><rect x="60" y="280" width="8" height="20"/><rect x="75" y="280" width="8" height="20"/><rect x="90" y="280" width="8" height="20"/><rect x="105" y="280" width="8" height="20"/><rect x="120" y="280" width="8" height="20"/><rect x="135" y="280" width="8" height="20"/><rect x="150" y="280" width="8" height="20"/></g><text x="200" y="35" fill="#5fe0a0" font-size="15" font-family="sans-serif" font-weight="bold" text-anchor="middle">FR-4 PRINTED CIRCUIT BOARD</text></svg>`
  },
  battery: {
    name: 'Lithium-Ion Batteries (Li-ion)',
    category: 'E-waste',
    rate: 120,
    unit: 'kg',
    stream: 'Lithium Cell Container',
    confidence: 97.9,
    prevent: 'Maintain device charge between 20% and 80% to avoid premature cell degradation.',
    recycle: 'CAUTION: Cover terminals with non-conductive electrical tape. Never puncture, crush, or discard in household waste.',
    hazard: 'FIRE & EXPLOSION RISK: Damaged or swollen lithium batteries must be kept in fireproof sand containers.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><rect width="400" height="300" fill="#141c2b"/><g transform="translate(60, 40)"><rect x="0" y="30" width="70" height="180" rx="10" fill="#2d68c4" stroke="#488bf5" stroke-width="2"/><rect x="20" y="15" width="30" height="15" rx="3" fill="#cfd6e0"/><text x="35" y="130" fill="#ffffff" font-size="13" font-family="monospace" text-anchor="middle" transform="rotate(-90 35 130)">INR18650 3.7V</text></g><g transform="translate(150, 40)"><rect x="0" y="30" width="70" height="180" rx="10" fill="#1fa372" stroke="#36db9f" stroke-width="2"/><rect x="20" y="15" width="30" height="15" rx="3" fill="#cfd6e0"/><text x="35" y="130" fill="#ffffff" font-size="13" font-family="monospace" text-anchor="middle" transform="rotate(-90 35 130)">LI-ION RECHARGEABLE</text></g><g transform="translate(245, 50)"><rect x="0" y="20" width="105" height="180" rx="6" fill="#444b57" stroke="#707c91" stroke-width="2"/><rect x="20" y="5" width="16" height="15" fill="#f4c430"/><rect x="65" y="5" width="16" height="15" fill="#a0a8b5"/><text x="28" y="0" fill="#f4a261" font-size="14" font-weight="bold">+</text><text x="73" y="0" fill="#9cb3d4" font-size="14" font-weight="bold">-</text><text x="52" y="100" fill="#fff" font-size="11" font-family="sans-serif" text-anchor="middle">Li-Polymer 3.85V</text><text x="52" y="120" fill="#ffcb69" font-size="10" font-family="sans-serif" text-anchor="middle">4500mAh 17.3Wh</text></g><text x="200" y="270" fill="#f28e2b" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">⚠ LITHIUM-ION BATTERY PACK (HANDLE WITH CARE)</text></svg>`
  },
  copper: {
    name: 'Copper Wires & Cable',
    category: 'Metal',
    rate: 650,
    unit: 'kg',
    stream: 'Copper Scrap Bay',
    confidence: 99.1,
    prevent: 'Protect wiring from sharp friction and heat to extend cable lifespan.',
    recycle: 'Strip PVC insulation when allowed; clean shiny copper brings the highest industrial recycling scrap rate.',
    hazard: null,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><rect width="400" height="300" fill="#17191e"/><path d="M40,240 C100,200 130,120 220,130" fill="none" stroke="#252c38" stroke-width="48" stroke-linecap="round"/><path d="M40,240 C100,200 130,120 220,130" fill="none" stroke="#12161f" stroke-width="40" stroke-linecap="round"/><path d="M220,130 C250,133 270,120 290,110" fill="none" stroke="#2762c2" stroke-width="18" stroke-linecap="round"/><path d="M220,130 C245,145 265,155 295,150" fill="none" stroke="#c93826" stroke-width="18" stroke-linecap="round"/><path d="M220,130 C235,115 255,95 285,90" fill="none" stroke="#d6a629" stroke-width="18" stroke-linecap="round"/><g stroke="#d86e3b" stroke-width="3" fill="none"><path d="M290,110 C320,105 340,90 375,85"/><path d="M290,110 C320,112 350,110 380,105"/><path d="M290,110 C315,118 340,125 370,120"/><path d="M295,150 C325,155 350,165 378,160"/><path d="M295,150 C320,145 345,140 375,145"/><path d="M285,90 C315,80 340,75 370,70"/></g><circle cx="330" cy="115" r="50" fill="none" stroke="#ff8f5a" stroke-width="1" opacity="0.4"/><text x="200" y="275" fill="#fca879" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">BARE BRIGHT COPPER STRANDED WIRE</text></svg>`
  },
  alucan: {
    name: 'Aluminium Beverage Cans',
    category: 'Metal',
    rate: 135,
    unit: 'kg',
    stream: 'Aluminium Bins',
    confidence: 96.7,
    prevent: 'Choose larger refillable bottles or tap water dispensers over single-use cans.',
    recycle: 'Empty, rinse, and crush. Aluminium can be melted and reformed infinitely using 95% less energy than virgin bauxite.',
    hazard: null,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><rect width="400" height="300" fill="#1a202c"/><g transform="translate(130, 35)"><rect x="20" y="30" width="100" height="180" rx="14" fill="#d1d9e6" stroke="#9bb1d0" stroke-width="2"/><rect x="25" y="45" width="90" height="150" fill="#c0262b"/><path d="M25,110 Q70,130 115,105 L115,140 Q60,115 25,145 Z" fill="#991c20"/><ellipse cx="70" cy="30" rx="42" ry="12" fill="#e8edf5" stroke="#7186a6" stroke-width="2"/><ellipse cx="70" cy="30" rx="28" ry="7" fill="#b0bed1"/><rect x="65" y="24" width="10" height="14" rx="3" fill="#667894"/><circle cx="70" cy="27" r="3" fill="#e8edf5"/><text x="70" y="100" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">SODA</text><text x="70" y="175" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">100% RECYCLABLE</text></g><text x="200" y="270" fill="#90cdf4" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">ALUMINIUM BEVERAGE CAN (UBC)</text></svg>`
  },
  bottle: {
    name: 'PET Bottles (Clear & Blue)',
    category: 'Plastic',
    rate: 28,
    unit: 'kg',
    stream: 'Plastics Stream',
    confidence: 97.2,
    prevent: 'Carry a durable stainless steel or glass flask to prevent single-use plastic waste.',
    recycle: 'Rinse out liquid residue, separate the HDPE cap, and crush flat to conserve collection storage.',
    hazard: null,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><rect width="400" height="300" fill="#162032"/><g transform="translate(145, 30)"><rect x="36" y="8" width="38" height="18" rx="4" fill="#2563eb" stroke="#1d4ed8"/><rect x="42" y="26" width="26" height="20" fill="#93c5fd" opacity="0.6"/><path d="M42,46 L15,85 L15,200 Q55,225 95,200 L95,85 L68,46 Z" fill="#60a5fa" opacity="0.45" stroke="#93c5fd" stroke-width="2"/><path d="M28,95 Q55,105 82,95" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.6"/><path d="M28,145 Q55,155 82,145" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.6"/><polygon points="55,115 45,135 65,135" fill="none" stroke="#ffffff" stroke-width="1.5"/><text x="55" y="132" fill="#ffffff" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">1</text><text x="55" y="175" fill="#bfdbfe" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">PETE</text></g><text x="200" y="270" fill="#60a5fa" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">POLYETHYLENE TEREPHTHALATE (PET #1)</text></svg>`
  }
};

function svgToDataUrl(svgString) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString.trim());
}

/* ==========================================================================
   AI Camera & Media Streaming
   ========================================================================== */
let cameraStream = null;
let currentFacingMode = 'environment';
let selectedScanUrl = '';
let selectedDemoKey = '';
let currentAiResult = null;
let isAnalysing = false;

async function startCamera() {
  stopCamera();
  const video = $('cameraVideo');
  const controlsBar = $('cameraControlsBar');
  const preview = $('scanPreview');
  const prompt = $('scannerPrompt');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showToast('Camera access is not supported by this browser. Please use file upload.', false);
    return;
  }

  try {
    const constraints = {
      video: {
        facingMode: { ideal: currentFacingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };
    cameraStream = await navigator.mediaDevices.getUserMedia(constraints).catch(() => {
      // Fallback to simple unconstrained video
      return navigator.mediaDevices.getUserMedia({ video: true });
    });

    if (video) {
      video.srcObject = cameraStream;
      video.style.display = 'block';
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');
      video.muted = true;
      try {
        await video.play();
      } catch (playErr) {
        console.warn('Video play error:', playErr);
      }
    }
    if (preview) preview.style.display = 'none';
    if (prompt) prompt.style.display = 'none';
    if (controlsBar) controlsBar.style.display = 'flex';
    if ($('openCameraBtn')) $('openCameraBtn').disabled = true;
    if ($('analyseImageBtn')) $('analyseImageBtn').disabled = true;
    showToast('📷 Camera connected! Frame your scrap item and click "⚡ Capture Photo".', true);
  } catch (err) {
    console.error('Camera error:', err);
    showToast('Could not access camera (' + (err.message || 'permission denied') + '). Please check camera permissions or upload an image file.', false);
    stopCamera();
  }
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
  const video = $('cameraVideo');
  if (video) {
    video.pause();
    video.srcObject = null;
    video.style.display = 'none';
  }
  const controlsBar = $('cameraControlsBar');
  if (controlsBar) controlsBar.style.display = 'none';
  if ($('openCameraBtn')) $('openCameraBtn').disabled = false;
  if ($('analyseImageBtn')) $('analyseImageBtn').disabled = false;
  const prompt = $('scannerPrompt');
  const preview = $('scanPreview');
  if (prompt && (!preview || preview.style.display === 'none')) {
    prompt.style.display = 'flex';
  }
}

function captureCameraFrame() {
  const video = $('cameraVideo');
  if (!video || !video.videoWidth) {
    showToast('Camera is still initializing, please wait…', false);
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

  stopCamera();
  setScanImage(dataUrl);
  analyseImage();
}

function switchCamera() {
  currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
  startCamera();
}

/* ==========================================================================
   Image Preview & Selection
   ========================================================================== */
function setScanImage(url, demoKey = '') {
  selectedScanUrl = url;
  selectedDemoKey = demoKey;
  const preview = $('scanPreview');
  const prompt = $('scannerPrompt');
  const clearBtn = $('clearScanBtn');
  const analyseBtn = $('analyseImageBtn');

  if (preview) {
    preview.src = url;
    preview.style.display = 'block';
  }
  if (prompt) prompt.style.display = 'none';
  if (clearBtn) clearBtn.style.display = 'inline-flex';
  if (analyseBtn) analyseBtn.disabled = false;

  updateProgress('Image loaded. Ready for AI analysis.', 100);
}

function clearScan() {
  stopCamera();
  selectedScanUrl = '';
  selectedDemoKey = '';
  currentAiResult = null;
  const preview = $('scanPreview');
  const prompt = $('scannerPrompt');
  const clearBtn = $('clearScanBtn');
  const analyseBtn = $('analyseImageBtn');
  const progressWrap = $('scannerProgressWrap');
  const laser = $('scanLaser');
  const resultCard = $('aiResultCard');

  if (preview) {
    preview.src = '';
    preview.style.display = 'none';
  }
  if (prompt) prompt.style.display = 'block';
  if (clearBtn) clearBtn.style.display = 'none';
  if (analyseBtn) analyseBtn.disabled = true;
  if (progressWrap) progressWrap.classList.remove('active');
  if (laser) laser.style.display = 'none';

  if (resultCard) {
    resultCard.innerHTML = `
      <div class="ai-result-empty">
        <span class="result-orb-icon">✦</span>
        <div>
          <b>Catalog matcher ready</b>
          <p>Upload or capture an item to check for a supported match in the EcoLoop catalog. Uncertain or unrelated images won’t be assigned a material.</p>
        </div>
      </div>
    `;
  }
}

function updateProgress(label, pct = NaN) {
  const wrap = $('scannerProgressWrap');
  const labelEl = $('scannerProgressLabel');
  const pctEl = $('scannerProgressPct');
  const fill = $('scannerProgressFill');

  if (!wrap) return;
  wrap.classList.add('active');
  if (labelEl && label) labelEl.textContent = label;
  if (Number.isFinite(pct)) {
    const clamped = Math.max(0, Math.min(100, Math.round(pct)));
    if (fill) fill.style.width = `${clamped}%`;
    if (pctEl) pctEl.textContent = `${clamped}%`;
  } else if (pctEl) {
    pctEl.textContent = '…';
  }
}

/* ==========================================================================
   AI Vision Classifier (Dual Engine: Fast Canvas Heuristic + CLIP Model)
   ========================================================================== */
let transformersPipeline = null;
let transformersLoadingPromise = null;

async function getTransformersModel() {
  if (transformersPipeline) return transformersPipeline;
  if (transformersLoadingPromise) return transformersLoadingPromise;

  transformersLoadingPromise = (async () => {
    updateProgress('Loading Transformers.js AI library…', 20);
    const library = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3');
    if (library.env) {
      library.env.allowLocalModels = false;
      library.env.useBrowserCache = true;
    }
    updateProgress('Downloading zero-shot vision weights…', 45);
    const pipeline = await library.pipeline('zero-shot-image-classification', 'Xenova/clip-vit-base-patch32', {
      progress_callback: p => {
        if (p && Number.isFinite(p.progress)) {
          updateProgress(`Loading ${p.file || 'model'}…`, Math.round(45 + p.progress * 0.45));
        }
      }
    });
    transformersPipeline = pipeline;
    updateProgress('AI Model cached & ready.', 95);
    return pipeline;
  })().catch(err => {
    transformersLoadingPromise = null;
    throw err;
  });

  return transformersLoadingPromise;
}

async function analyseImage() {
  if (isAnalysing) return;
  if (!selectedScanUrl) {
    showToast('Choose or capture an image first.', false);
    return;
  }

  isAnalysing = true;
  const analyseBtn = $('analyseImageBtn');
  const laser = $('scanLaser');
  if (analyseBtn) {
    analyseBtn.disabled = true;
    analyseBtn.textContent = 'Checking catalog…';
  }
  if (laser) laser.style.display = 'block';

  updateProgress('Activating neural visual parser…', 15);

  const preview = $('scanPreview');
  if (preview && preview.decode) {
    try { await preview.decode(); } catch (_) {}
  }

  // Only built-in sample buttons can bypass model inference; uploaded filenames are not evidence.
  const demo = DEMO_SAMPLES[selectedDemoKey];
  if (demo) {
    renderAiResult({
      name: demo.name,
      category: demo.category,
      rate: demo.rate,
      unit: demo.unit,
      stream: demo.stream,
      confidence: demo.confidence,
      prevent: demo.prevent,
      recycle: demo.recycle,
      hazard: demo.hazard
    });
    finalizeAnalysis();
    return;
  }

  const zeroShotPrompts = [
    'a photo of a green printed circuit board with electronic chips, connectors and microchips',
    'a photo of stripped bare copper electrical wire, cables or copper scrap',
    'a photo of a rechargeable lithium-ion battery pack, cell or battery',
    'a photo of an aluminium beverage drink can or crushed metal can',
    'a photo of a clear plastic beverage bottle or PET plastic bottle',
    'a photo of corrugated brown cardboard packaging boxes',
    'a photo of an electronic laptop, smartphone or computer e-waste',
    'a photo of clean white office paper or printed documents',
    'a photo of food, a meal, fruit or vegetables',
    'a photo of a person, animal or plant',
    'a photo of furniture, clothing or a household scene',
    'a photo of scenery, a building or a landscape'
  ];

  const promptKeyMap = {
    [zeroShotPrompts[0]]: 'pcb',
    [zeroShotPrompts[1]]: 'copper',
    [zeroShotPrompts[2]]: 'battery',
    [zeroShotPrompts[3]]: 'alucan',
    [zeroShotPrompts[4]]: 'bottle',
    [zeroShotPrompts[5]]: 'cardboard',
    [zeroShotPrompts[6]]: 'smartphone',
    [zeroShotPrompts[7]]: 'paper',
    [zeroShotPrompts[8]]: '',
    [zeroShotPrompts[9]]: '',
    [zeroShotPrompts[10]]: '',
    [zeroShotPrompts[11]]: ''
  };

  let predictions;
  try {
    updateProgress('Checking the image against catalog materials…', 25);
    const modelPromise = getTransformersModel().then(async pipe => {
      updateProgress('Evaluating categories against zero-shot embeddings…', 75);
      return pipe(selectedScanUrl, zeroShotPrompts);
    });

    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 60000));
    predictions = await Promise.race([modelPromise, timeoutPromise]);
    if (!predictions) {
      renderAiNoMatch(
        'Could not verify this image',
        'The catalog check took too long. Please try again when the AI model has finished loading.'
      );
      finalizeAnalysis('Catalog check timed out.');
      return;
    }
  } catch (err) {
    console.error('AI catalog check failed:', err);
    renderAiNoMatch(
      'Could not check this image right now',
      'The AI catalog check is unavailable. Check your connection and try again.'
    );
    finalizeAnalysis('Catalog check unavailable.');
    return;
  }

  const rankedPredictions = Array.isArray(predictions)
    ? [...predictions].sort((a, b) => Number(b.score) - Number(a.score))
    : [];
  const topPrediction = rankedPredictions[0];
  const resolvedKey = topPrediction ? promptKeyMap[topPrediction.label] : '';
  const resolvedConfidence = topPrediction ? Number(topPrediction.score) : 0;

  if (!resolvedKey || !Number.isFinite(resolvedConfidence) || resolvedConfidence < 0.3) {
    renderAiNoMatch(
      'No supported catalog match found',
      'This image may be unrelated to EcoLoop’s supported materials, or the item is not clear enough to identify. Try a closer, well-lit photo of one item at a time.'
    );
    finalizeAnalysis('No supported catalog match found.');
    return;
  }

  // Map resolved key to material data
  const materialMap = {
    pcb: {
      name: 'Printed Circuit Boards (PCB)',
      category: 'E-waste',
      rate: 350,
      unit: 'kg',
      stream: 'PCB Safe-Box',
      prevent: 'Upgrade memory, SSD or power components to extend computer lifespan.',
      recycle: 'Store in dry anti-static boxes; route to authorized hydrometallurgical e-waste hubs.',
      hazard: null
    },
    copper: {
      name: 'Copper Wires & Cable',
      category: 'Metal',
      rate: 650,
      unit: 'kg',
      stream: 'Copper Scrap Bay',
      prevent: 'Protect wiring from sharp friction and heat to extend cable lifespan.',
      recycle: 'Strip PVC insulation when allowed; clean shiny copper brings top scrap rate.',
      hazard: null
    },
    battery: {
      name: 'Lithium-Ion Batteries (Li-ion)',
      category: 'E-waste',
      rate: 120,
      unit: 'kg',
      stream: 'Lithium Cell Container',
      prevent: 'Maintain device charge between 20% and 80% to avoid premature cell degradation.',
      recycle: 'CAUTION: Cover terminals with non-conductive tape. Never puncture, crush or throw in trash.',
      hazard: 'FIRE & EXPLOSION RISK: Damaged or swollen lithium batteries must be kept in fireproof sand containers.'
    },
    alucan: {
      name: 'Aluminium Beverage Cans',
      category: 'Metal',
      rate: 135,
      unit: 'kg',
      stream: 'Aluminium Bins',
      prevent: 'Choose larger refillable containers or tap water dispensers over single-use cans.',
      recycle: 'Empty, rinse, and crush. Aluminium can be melted and reformed infinitely using 95% less energy than virgin ore.',
      hazard: null
    },
    bottle: {
      name: 'PET Bottles (Clear & Blue)',
      category: 'Plastic',
      rate: 28,
      unit: 'kg',
      stream: 'Plastics Stream',
      prevent: 'Carry a durable stainless steel or glass flask to prevent single-use plastic waste.',
      recycle: 'Rinse out liquid residue, separate the HDPE cap, and crush flat to conserve collection storage.',
      hazard: null
    },
    cardboard: {
      name: 'Cardboard Packaging Boxes',
      category: 'Paper',
      rate: 12,
      unit: 'kg',
      stream: 'Cardboard Bay',
      prevent: 'Consolidate deliveries and choose reusable transport cartons.',
      recycle: 'Remove packing tape, keep dry, and flatten boxes.',
      hazard: null
    },
    paper: {
      name: 'Clean White Office Paper',
      category: 'Paper',
      rate: 20,
      unit: 'kg',
      stream: 'Office Paper Bin',
      prevent: 'Review and sign documents digitally.',
      recycle: 'Keep clean, dry and remove binder clips and plastic spines.',
      hazard: null
    },
    smartphone: {
      name: 'Smartphone & Tablet Scrap',
      category: 'E-waste',
      rate: 150,
      unit: 'pcs',
      stream: 'Mobile Recovery Bay',
      prevent: 'Install heavy-duty cases and replace protective tempered screen glass.',
      recycle: 'Backup and factory erase personal data before handing to certified recyclers.',
      hazard: null
    }
  };

  const chosen = materialMap[resolvedKey];
  const catalogItem = materials.find(item => {
    const itemName = Array.isArray(item) ? item[0] : item.name;
    return normalized(itemName) === normalized(chosen?.name);
  });
  if (!chosen || !catalogItem) {
    renderAiNoMatch(
      'No supported catalog match found',
      'The image did not match a material currently available in the EcoLoop catalog.'
    );
    finalizeAnalysis('No supported catalog match found.');
    return;
  }
  if (Array.isArray(catalogItem)) {
    chosen.name = catalogItem[0];
    chosen.category = catalogItem[1];
    chosen.rate = catalogItem[2];
    chosen.unit = catalogItem[3];
    chosen.recycle = catalogItem[4];
    chosen.prevent = catalogItem[5];
    chosen.stream = catalogItem[6];
    chosen.hazard = catalogItem[7];
  } else {
    Object.assign(chosen, catalogItem);
  }
  chosen.confidence = Math.round(resolvedConfidence * 1000) / 10;
  renderAiResult(chosen);
  finalizeAnalysis();
}

function finalizeAnalysis(status = 'AI catalog check complete.') {
  isAnalysing = false;
  const analyseBtn = $('analyseImageBtn');
  const laser = $('scanLaser');
  if (analyseBtn) {
    analyseBtn.disabled = false;
    analyseBtn.textContent = '✦ Check Again';
  }
  if (laser) laser.style.display = 'none';
  updateProgress(status, 100);
}

function renderAiNoMatch(title, message) {
  currentAiResult = null;
  const card = $('aiResultCard');
  if (!card) return;

  card.innerHTML = `
    <div class="ai-result-unmatched" role="status">
      <span class="unmatched-icon" aria-hidden="true">?</span>
      <div>
        <b>${escapeHtml(title)}</b>
        <p>${escapeHtml(message)}</p>
        <button type="button" class="button button-quiet" id="aiScanNewBtn">Scan Another Item</button>
      </div>
    </div>
  `;
  const scanNewBtn = $('aiScanNewBtn');
  if (scanNewBtn) scanNewBtn.onclick = clearScan;
}

function renderAiResult(result) {
  currentAiResult = result;
  const card = $('aiResultCard');
  if (!card) return;

  const isAlreadyInList = materials.some(m => normalized(m.name) === normalized(result.name));

  card.innerHTML = `
    <div class="result-content-body">
      <div class="result-main-header">
        <div class="result-title-group">
          <div class="result-badge-row">
            <span class="result-category-badge">${escapeHtml(result.category)}</span>
            <span class="result-confidence-badge">${result.confidence}% Match</span>
          </div>
          <h4>${escapeHtml(result.name)}</h4>
        </div>
        <div class="result-tags-group">
          <span class="result-value-badge">
            <small>Est. Rate</small>
            <b>₹${result.rate}</b> / ${escapeHtml(result.unit)}
          </span>
          <span class="result-stream-badge">
            <i>📦</i> ${escapeHtml(result.stream || `${result.category} Stream`)}
          </span>
        </div>
      </div>

      <div class="confidence-meter">
        <div class="confidence-head">
          <span>AI Vision Confidence Score</span>
          <span>${result.confidence}%</span>
        </div>
        <div class="confidence-track">
          <div class="confidence-fill" style="width: ${result.confidence}%;"></div>
        </div>
      </div>

      ${result.hazard ? `
        <div class="hazard-alert">
          <span>⚠</span>
          <div><b>SAFETY WARNING:</b> ${escapeHtml(result.hazard)}</div>
        </div>
      ` : ''}

      <div class="result-insights-grid">
        <div class="insight-box">
          <span>PREVENT &amp; EXTEND LIFE</span>
          <p>${escapeHtml(result.prevent)}</p>
        </div>
        <div class="insight-box">
          <span>RECYCLE &amp; SORT</span>
          <p>${escapeHtml(result.recycle)}</p>
        </div>
      </div>

      <div class="result-cta-row">
        <button type="button" class="button button-primary result-add-list-btn" id="aiAddToListBtn" ${isAlreadyInList ? 'disabled' : ''}>
          ${isAlreadyInList ? '✓ In Website Catalog' : '✨ Add to Website Material List'}
        </button>
        <button type="button" class="button button-quiet" id="aiPlanBtn">
          📋 Add to Collection Plan
        </button>
        <button type="button" class="button button-quiet" id="aiScanNewBtn">
          🔄 Scan Another Item
        </button>
      </div>
    </div>
  `;

  // Attach button events
  const addBtn = $('aiAddToListBtn');
  if (addBtn && !isAlreadyInList) {
    addBtn.onclick = () => {
      const added = addMaterialToList({
        name: result.name,
        category: result.category,
        rate: result.rate,
        unit: result.unit,
        recycle: result.recycle,
        prevent: result.prevent,
        stream: result.stream,
        hazard: result.hazard
      });
      if (added) {
        addBtn.disabled = true;
        addBtn.textContent = '✓ Added to Website Catalog!';
      }
    };
  }

  const planBtn = $('aiPlanBtn');
  if (planBtn) {
    planBtn.onclick = () => {
      // Find matching index in materials
      let idx = materials.findIndex(m => normalized(m.name) === normalized(result.name));
      if (idx === -1) {
        addMaterialToList({
          name: result.name,
          category: result.category,
          rate: result.rate,
          unit: result.unit,
          recycle: result.recycle,
          prevent: result.prevent,
          stream: result.stream,
          hazard: result.hazard
        }, false);
        idx = 0;
      }
      const select = $('planMaterial');
      if (select) select.value = String(idx);
      selectGuideTab('collectionHub');
      $('guide')?.scrollIntoView({ behavior: 'smooth' });
      showToast(`Selected "${result.name}" in your Collection Planner!`, true);
    };
  }

  const scanNewBtn = $('aiScanNewBtn');
  if (scanNewBtn) {
    scanNewBtn.onclick = clearScan;
  }
}

/* ==========================================================================
   AI Material Generator (Catalog Expander by Text)
   ========================================================================== */
function deduceMaterialAttributes(rawInput) {
  const q = rawInput.trim();
  const n = normalized(q);

  let category = 'Other';
  let rate = 25;
  let unit = 'kg';
  let stream = 'General Recovery Bay';
  let prevent = 'Maintain and repair components to prevent premature disposal.';
  let recycle = 'Channel through authorized municipal or specialized recycling depots.';
  let hazard = null;

  // Deducing Category & Attributes
  if (n.includes('battery') || n.includes('cell') || n.includes('lipo') || n.includes('ups') || n.includes('inverter')) {
    category = 'E-waste';
    rate = 120;
    stream = 'Lithium Cell Container';
    prevent = 'Charge within recommended voltage thresholds and avoid deep discharge.';
    recycle = 'Tape terminals; deposit at designated battery stewardship drop-offs.';
    hazard = 'HAZARD: Lithium cells carry fire risk if crushed, punctured, or heated.';
  } else if (n.includes('board') || n.includes('pcb') || n.includes('cpu') || n.includes('chip') || n.includes('ram') || n.includes('gpu') || n.includes('transistor') || n.includes('resistor')) {
    category = 'E-waste';
    rate = 380;
    stream = 'PCB Safe-Box';
    prevent = 'Upgrade individual modular components rather than replacing whole systems.';
    recycle = 'Store in dry anti-static containers; recovery facilities extract gold, silver, copper and palladium.';
  } else if (n.includes('phone') || n.includes('laptop') || n.includes('tablet') || n.includes('computer') || n.includes('mouse') || n.includes('keyboard') || n.includes('screen') || n.includes('monitor') || n.includes('printer') || n.includes('drone')) {
    category = 'E-waste';
    rate = 140;
    unit = 'pcs';
    stream = 'E-Waste Recovery Bay';
    prevent = 'Protect with cases and run diagnostic maintenance regularly.';
    recycle = 'Wipe all user data and hand over to certified e-waste processors.';
  } else if (n.includes('copper') || n.includes('wire') || n.includes('cable') || n.includes('coil')) {
    category = 'Metal';
    rate = 620;
    stream = 'Copper Scrap Bay';
    prevent = 'Keep cables away from sharp pinch points and high heat.';
    recycle = 'Strip insulation when permitted; copper is infinitely recyclable with no loss in purity.';
  } else if (n.includes('brass') || n.includes('bronze') || n.includes('valve') || n.includes('fitting')) {
    category = 'Metal';
    rate = 460;
    stream = 'Brass Recovery Crate';
    prevent = 'Service washer seals and lubricate threads to prevent corrosion.';
    recycle = 'Keep free of iron attachments for maximum scrap buyback pricing.';
  } else if (n.includes('aluminium') || n.includes('aluminum') || n.includes('foil') || n.includes('can') || n.includes('section')) {
    category = 'Metal';
    rate = 140;
    stream = 'Aluminium Bins';
    prevent = 'Prefer reusable cookware and drink containers.';
    recycle = 'Rinse and compress; smelting recycled aluminium uses 95% less energy than raw bauxite extraction.';
  } else if (n.includes('iron') || n.includes('steel') || n.includes('rebar') || n.includes('nail') || n.includes('metal')) {
    category = 'Metal';
    rate = 35;
    stream = 'Ferrous Scrap Yard';
    prevent = 'Apply primer paints or anti-rust coatings to extend service life.';
    recycle = 'Store under shelter to avoid heavy rust scaling; route to scrap mills.';
  } else if (n.includes('bottle') || n.includes('plastic') || n.includes('poly') || n.includes('pvc') || n.includes('hdpe') || n.includes('pet') || n.includes('bucket')) {
    category = 'Plastic';
    rate = 22;
    stream = 'Plastics Stream';
    prevent = 'Choose bulk refills and eliminate single-use containers.';
    recycle = 'Empty, rinse, and separate caps from bottles before collection.';
  } else if (n.includes('paper') || n.includes('cardboard') || n.includes('box') || n.includes('carton') || n.includes('book') || n.includes('newspaper')) {
    category = 'Paper';
    rate = 15;
    stream = 'Paper & Cardboard Bay';
    prevent = 'Switch to digital formats and reuse boxes for home storage.';
    recycle = 'Keep free from food grease, liquids and tape; flatten to save space.';
  } else if (n.includes('glass') || n.includes('jar')) {
    category = 'Other';
    rate = 2;
    unit = 'pcs';
    stream = 'Glass Reclaim Bay';
    prevent = 'Wash and reuse glass jars for pantry storage.';
    recycle = 'Rinse residue; 100% recyclable repeatedly.';
  } else if (n.includes('cloth') || n.includes('textile') || n.includes('fabric') || n.includes('shirt') || n.includes('jeans')) {
    category = 'Other';
    rate = 8;
    stream = 'Textile Collection';
    prevent = 'Buy quality durable garments, mend seams, and swap clothing.';
    recycle = 'Donate wearable clothes; route worn fabrics to textile shredding facilities.';
  }

  return {
    name: q,
    category,
    rate,
    unit,
    stream,
    prevent,
    recycle,
    hazard
  };
}

function initAiGenerator() {
  const form = $('aiAddForm');
  const input = $('aiItemNameInput');
  const statusEl = $('aiAddStatus');
  if (!form || !input) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;

    const deduced = deduceMaterialAttributes(raw);
    const added = addMaterialToList(deduced);

    if (statusEl) {
      statusEl.hidden = false;
      if (added) {
        statusEl.innerHTML = `
          <strong>✓ Successfully Catalogued with AI!</strong><br>
          Added <b>${escapeHtml(deduced.name)}</b> under <b>${escapeHtml(deduced.category)}</b> at indicative rate <b>₹${deduced.rate}/${escapeHtml(deduced.unit)}</b>.<br>
          <small>Stream: ${escapeHtml(deduced.stream)} · View in Section 02 rates grid below or use in Collection Planner.</small>
        `;
      } else {
        statusEl.innerHTML = `
          <strong>Notice:</strong> <b>${escapeHtml(deduced.name)}</b> is already registered in the website material list.
        `;
      }
    }

    form.reset();
  });
}

/* ==========================================================================
   Setup Event Listeners for Section 01 AI Scanner
   ========================================================================== */
function initAiScannerEvents() {
  // File input change
  const fileInput = $('scanFileInput');
  if (fileInput) {
    fileInput.addEventListener('change', event => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        setScanImage(e.target.result);
        analyseImage();
      };
      reader.readAsDataURL(file);
    });
  }

  // Camera and file buttons
  const openCamBtn = $('openCameraBtn');
  if (openCamBtn) openCamBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startCamera();
  });

  const openFileBtn = $('openFileBtn');
  if (openFileBtn) openFileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput?.click();
  });

  const uploadOrb = $('uploadOrb');
  if (uploadOrb) uploadOrb.addEventListener('click', (e) => {
    e.stopPropagation();
    startCamera();
  });

  const captureBtn = $('captureCameraBtn');
  if (captureBtn) captureBtn.addEventListener('click', captureCameraFrame);

  const switchCamBtn = $('switchCameraBtn');
  if (switchCamBtn) switchCamBtn.addEventListener('click', switchCamera);

  const closeCamBtn = $('closeCameraBtn');
  if (closeCamBtn) closeCamBtn.addEventListener('click', stopCamera);

  // Clear button
  const clearBtn = $('clearScanBtn');
  if (clearBtn) clearBtn.addEventListener('click', clearScan);

  // Analyse button
  const analyseBtn = $('analyseImageBtn');
  if (analyseBtn) analyseBtn.addEventListener('click', analyseImage);

  // Drag & drop dropzone
  const dropzone = $('scannerDropzone');
  if (dropzone) {
    dropzone.addEventListener('click', e => {
      if (cameraStream) return;
      if (e.target.closest('.sample-pill') || e.target.closest('button') || e.target.closest('#uploadOrb')) return;
      fileInput?.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'dragend', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', e => {
      const file = e.dataTransfer?.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = evt => {
        setScanImage(evt.target.result);
        analyseImage();
      };
      reader.readAsDataURL(file);
    });
  }

  // Demo sample pills
  document.querySelectorAll('.sample-pill[data-demo]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const demoKey = btn.dataset.demo;
      const demo = DEMO_SAMPLES[demoKey];
      if (!demo) return;
      const dataUrl = svgToDataUrl(demo.svg);
      setScanImage(dataUrl, demoKey);
      analyseImage();
    });
  });
}

/* ==========================================================================
   Section 04 Collection Planner & Integration
   ========================================================================== */
const planStorageKey = 'ecoloop-collection-plan';
function getPlans() {
  try { return JSON.parse(localStorage.getItem(planStorageKey)) || []; }
  catch { return []; }
}
function savePlans(plans) {
  try { localStorage.setItem(planStorageKey, JSON.stringify(plans)); } catch (_) {}
}
function formatPlanDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

function renderPlans() {
  const plans = getPlans();
  const list = $('planList');
  if (!list) return;

  const totalWeight = plans.reduce((sum, plan) => sum + Number(plan.amount), 0);
  const totalValue = plans.reduce((sum, plan) => sum + (Number(plan.material.rate) * Number(plan.amount)), 0);

  if ($('planTotal')) $('planTotal').textContent = plans.length;
  if ($('savedPlanCount')) $('savedPlanCount').textContent = plans.length;
  if ($('weightTotal')) $('weightTotal').textContent = `${totalWeight.toFixed(totalWeight % 1 ? 1 : 0)} kg`;
  if ($('valueTotal')) $('valueTotal').textContent = `₹${Math.round(totalValue)}`;

  const dlBtn = $('downloadReceiptBtn');
  if (dlBtn) {
    dlBtn.style.display = plans.length ? 'inline-flex' : 'none';
    dlBtn.onclick = () => downloadManifestImage();
  }
  updateSlipData(plans);

  if (!plans.length) {
    list.innerHTML = '<p class="plan-empty">Your list is empty. Add a material above to start planning.</p>';
    return;
  }
  list.innerHTML = plans.map(plan => `
    <article class="plan-item">
      <div>
        <b>${escapeHtml(plan.material.name)} · ${plan.amount} ${escapeHtml(plan.material.unit)}</b>
        <span>${formatPlanDate(plan.date)}${plan.note ? ` · ${escapeHtml(plan.note)}` : ''}</span>
      </div>
      <button type="button" data-plan-delete="${plan.id}" aria-label="Remove ${escapeAttr(plan.material.name)}">×</button>
    </article>
  `).join('');

  document.querySelectorAll('[data-plan-delete]').forEach(button => {
    button.onclick = () => {
      savePlans(getPlans().filter(plan => plan.id !== button.dataset.planDelete));
      renderPlans();
    };
  });
}

// 1. Call this function with your array of selected materials to update the slip
function updateSlipData(plans = []) {
  const tbody = document.getElementById('slipTableBody');
  if (!tbody) return;
  let totalKg = 0;
  let totalValue = 0;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const refId = `#EK-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  
  const refEl = document.getElementById('slipRefId');
  const dateEl = document.getElementById('slipDate');
  if (refEl) refEl.textContent = refId;
  if (dateEl) dateEl.textContent = `Generated: ${dateStr}`;

  if (plans.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-cell">No materials added yet.</td></tr>`;
  } else {
    tbody.innerHTML = plans.map((item, index) => {
      const name = item.material ? item.material.name : (item.name || 'Material Item');
      const rate = item.material ? item.material.rate : (item.rate || 0);
      const unit = item.material ? item.material.unit : (item.unit || 'kg');
      const qty = Number(item.amount !== undefined ? item.amount : (item.qty || 0));
      const lineValue = Math.round(qty * rate);
      const pickupDate = item.date ? formatPlanDate(item.date) : dateStr;

      totalKg += qty;
      totalValue += lineValue;

      return `
        <tr>
          <td class="mono">${String(index + 1).padStart(2, '0')}</td>
          <td style="font-weight: 600;">${escapeHtml(name)}</td>
          <td class="mono">${pickupDate}</td>
          <td class="mono" style="text-align: right;">₹${rate}/${escapeHtml(unit)}</td>
          <td class="mono" style="text-align: right; font-weight: 600;">${qty} ${escapeHtml(unit)}</td>
          <td class="mono" style="text-align: right; font-weight: 700; color: #059669;">₹${lineValue}</td>
        </tr>
      `;
    }).join('');
  }

  // Update summary numbers
  const slipPlanCount = document.getElementById('slipPlanCount');
  const slipTotalWeightSub = document.getElementById('slipTotalWeightSub');
  const slipTotalPayout = document.getElementById('slipTotalPayout');
  const slipBottomWeight = document.getElementById('slipBottomWeight');
  const slipBottomValue = document.getElementById('slipBottomValue');

  const weightStr = `${totalKg.toFixed(totalKg % 1 ? 1 : 0)} kg`;
  if (slipPlanCount) slipPlanCount.textContent = `${plans.length} Material Plan(s)`;
  if (slipTotalWeightSub) slipTotalWeightSub.textContent = `${weightStr} ready to sort`;
  if (slipTotalPayout) slipTotalPayout.textContent = `₹${totalValue}`;
  if (slipBottomWeight) slipBottomWeight.textContent = weightStr;
  if (slipBottomValue) slipBottomValue.textContent = `₹${totalValue}`;
}

// 2. Converts #printableSlip into a PNG image and downloads it
async function downloadManifestImage() {
  const plans = getPlans();
  if (!plans || !plans.length) {
    showToast('Add at least one scrap material to your plan first.', false);
    return;
  }
  updateSlipData(plans);

  const element = document.getElementById('printableSlip');
  if (!element) return;

  showToast('Generating official EcoKart manifest slip…', true);

  if (typeof html2canvas === 'undefined') {
    showToast('Loading image generator library, please wait a moment…', false);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // 2x Retina resolution for crisp text
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false
    });

    const link = document.createElement('a');
    link.download = `EcoKart-Collection-Slip-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('🧾 EcoKart manifest slip downloaded successfully!', true);
  } catch (err) {
    console.error('html2canvas error:', err);
    showToast('Error rendering manifest slip image.', false);
  }
}

window.downloadManifestImage = downloadManifestImage;
window.updateSlipData = updateSlipData;

function populatePlannerSelect() {
  const select = $('planMaterial');
  if (!select) return;
  const currentVal = select.value;
  select.innerHTML = materials.map((material, index) => `
    <option value="${index}">${escapeHtml(material.name)} · ₹${material.rate}/${escapeHtml(material.unit)}</option>
  `).join('');
  if (currentVal && Number(currentVal) < materials.length) {
    select.value = currentVal;
  }
}

function startPlanner() {
  const select = $('planMaterial');
  if (!select) return;
  populatePlannerSelect();
  if ($('planDate')) $('planDate').value = new Date().toISOString().slice(0, 10);

  const form = $('plannerForm');
  if (form) {
    form.onsubmit = event => {
      event.preventDefault();
      const material = materials[Number(select.value)];
      const amount = Number($('planAmount').value);
      if (!material || !Number.isFinite(amount) || amount <= 0) return;
      const plans = getPlans();
      plans.unshift({
        id: String(Date.now()),
        material,
        amount,
        date: $('planDate').value,
        note: $('planNote').value.trim()
      });
      savePlans(plans);
      form.reset();
      $('planDate').value = new Date().toISOString().slice(0, 10);
      renderPlans();
      showToast(`Added ${material.name} to your collection plan!`, true);
    };
  }
  if ($('clearPlans')) {
    $('clearPlans').onclick = () => {
      savePlans([]);
      renderPlans();
    };
  }
  renderPlans();
}

/* ==========================================================================
   Search, Rates Filter & Core Page Integrations
   ========================================================================== */
function initSearchAndFilters() {
  const searchBtn = $('searchButton');
  const searchInput = $('materialSearch');
  if (searchBtn && searchInput) {
    searchBtn.onclick = () => showResult(searchInput.value);
    searchInput.addEventListener('input', e => showResult(e.target.value));
  }
  document.querySelectorAll('[data-search]').forEach(b => {
    b.onclick = () => {
      if (searchInput) {
        searchInput.value = b.dataset.search;
        showResult(b.dataset.search);
      }
    };
  });
  document.querySelectorAll('[data-category]').forEach(b => {
    b.onclick = () => {
      category = b.dataset.category;
      document.querySelectorAll('[data-category]').forEach(x => x.classList.toggle('active', x === b));
      renderRates();
    };
  });
}

function message(id, text, error = false) {
  const el = $(id);
  if (el) {
    el.textContent = text;
    el.classList.toggle('error', error);
  }
}

function platformFor(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com') return 'YouTube';
    if (host === 'instagram.com') return 'Instagram';
    if (host === 'facebook.com' || host === 'fb.watch' || host === 'm.facebook.com') return 'Facebook';
  } catch {}
  return null;
}

function youtubeThumbnail(url) {
  try {
    const u = new URL(url);
    let id = u.searchParams.get('v');
    if (u.hostname.includes('youtu.be')) id = u.pathname.split('/')[1];
    if (u.pathname.includes('/shorts/')) id = u.pathname.split('/shorts/')[1];
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}

function openModal(id) { $(id)?.showModal(); }
function closeModal(id) { $(id)?.close(); }

async function resolveRole() {
  if (user && supabase) {
    const { data } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
    if (data?.role === 'admin') isAdmin = true;
  } else if (user) {
    isAdmin = Boolean(user.isAdmin || user.role === 'admin' || user.email === 'udit3539@gmail.com');
  }
  const adminHeaderBtn = $('adminHeaderBtn');
  if (adminHeaderBtn) {
    adminHeaderBtn.style.display = isAdmin ? 'inline-flex' : 'none';
  }
  const openAdminFromAcc = $('openAdminFromAccount');
  if (openAdminFromAcc) {
    openAdminFromAcc.style.display = isAdmin ? 'block' : 'none';
  }
  loadVideos();
}

function setUser(next) {
  user = next;
  isAdmin = Boolean(user && (user.isAdmin || user.role === 'admin' || user.email === 'udit3539@gmail.com'));
  if ($('accountButton')) {
    if (user) {
      const displayName = user.name || user.email?.split('@')[0] || 'Member';
      $('accountButton').innerHTML = `Member (${escapeHtml(displayName.split(' ')[0])}) <span>→</span>`;
      $('accountButton').title = `Signed in as ${displayName}`;
    } else {
      $('accountButton').innerHTML = 'Member area <span>→</span>';
      $('accountButton').title = 'Member sign in';
    }
  }

  const adminHeaderBtn = $('adminHeaderBtn');
  if (adminHeaderBtn) {
    adminHeaderBtn.style.display = isAdmin ? 'inline-flex' : 'none';
  }

  const openAdminFromAcc = $('openAdminFromAccount');
  if (openAdminFromAcc) {
    openAdminFromAcc.style.display = isAdmin ? 'block' : 'none';
  }

  $('shareButton')?.removeAttribute('disabled');
  if (user) {
    if ($('memberName')) $('memberName').textContent = user.name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'member';
    if ($('authSignedOut')) $('authSignedOut').hidden = true;
    if ($('authSignedIn')) $('authSignedIn').hidden = false;
  } else {
    if ($('authSignedOut')) $('authSignedOut').hidden = false;
    if ($('authSignedIn')) $('authSignedIn').hidden = true;
  }
  resolveRole();
}

async function startBackend() {
  if (configured) {
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    supabase = createClient(config.url, config.publishableKey);
  }
}

function renderVideoCards(data, allowDelete = false) {
  const list = $('videoList');
  if (!list) return;
  if (!data?.length) {
    list.innerHTML = '<div class="empty-state"><span>▷</span><b>No tutorials found</b><p>Try again soon.</p></div>';
    return;
  }
  list.innerHTML = data.map(item => {
    const thumb = youtubeThumbnail(item.url);
    const owner = user?.id === item.owner_id;
    return `
      <article class="video-card">
        <div class="video-thumb" ${thumb ? `style="background-image:linear-gradient(#172b5e80,#172b5e80),url('${thumb}')"` : ''}>
          ${thumb ? '' : '▷'}
        </div>
        <div>
          <p>${escapeHtml(item.title)}</p>
          <small>${escapeHtml(item.category || item.channel || item.platform || 'YouTube')}</small>
          <div class="video-links">
            <a href="${escapeAttr(item.url)}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
            ${isAdmin ? `<button type="button" class="btn-danger" style="padding:2px 8px; font-size:10px; margin-left:8px;" data-admin-del-vid="${escapeAttr(item.id)}">Delete</button>` : (allowDelete && owner ? `<button data-delete="${item.id}">Delete</button>` : '')}
          </div>
        </div>
      </article>
    `;
  }).join('');

  list.querySelectorAll('[data-admin-del-vid]').forEach(btn => {
    btn.onclick = () => window.adminDeleteVideo(btn.dataset.adminDelVid);
  });

  list.querySelectorAll('[data-delete]').forEach(button => {
    button.onclick = async () => {
      if (!confirm('Delete this video link?')) return;
      if (supabase) {
        const { error } = await supabase.from('video_links').delete().eq('id', button.dataset.delete);
        if (error) alert('Could not delete this link.');
        else loadVideos();
      }
    };
  });
}

async function loadVideos() {
  try {
    const res = await window.ecoloopApiFetch('/api/videos');
    if (res.ok) {
      const data = await readApiJson(res, 'Video catalog request');
      if (Array.isArray(data?.videos) && data.videos.length) {
        videosList = data.videos;
        renderVideoCards(videosList, true);
        renderAdminVideos();
        if ($('adminVideoCount')) $('adminVideoCount').textContent = videosList.length;
        if ($('adminVidTableCount')) $('adminVidTableCount').textContent = videosList.length;
        return;
      }
    }
  } catch (_) {}

  if (supabase) {
    const { data } = await supabase.from('video_links').select('id,title,url,platform,owner_id,created_at').order('created_at', { ascending: false }).limit(30);
    if (data?.length) {
      videosList = data;
      renderVideoCards(videosList, true);
      renderAdminVideos();
      if ($('adminVideoCount')) $('adminVideoCount').textContent = videosList.length;
      if ($('adminVidTableCount')) $('adminVidTableCount').textContent = videosList.length;
      return;
    }
  }

  videosList = window.ECOLOOP_LIBRARY || [];
  renderVideoCards(videosList, true);
  renderAdminVideos();
  if ($('adminVideoCount')) $('adminVideoCount').textContent = videosList.length;
  if ($('adminVidTableCount')) $('adminVidTableCount').textContent = videosList.length;
}

function initDialogsAndAuth() {
  if ($('accountButton')) $('accountButton').onclick = () => openModal('accountDialog');
  if ($('adminHeaderBtn')) $('adminHeaderBtn').onclick = () => openAdminModal();
  if ($('adminButton')) $('adminButton').onclick = () => openAdminModal();
  if ($('openAdminFromAccount')) $('openAdminFromAccount').onclick = () => { closeModal('accountDialog'); openAdminModal(); };
  if ($('memberStart')) $('memberStart').onclick = () => openModal('accountDialog');
  $('shareButton')?.addEventListener('click', () => user ? openModal('shareDialog') : openModal('accountDialog'));
  if ($('openShareFromAccount')) $('openShareFromAccount').onclick = () => { closeModal('accountDialog'); openModal('shareDialog'); };
  document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => closeModal(b.dataset.close));
  if ($('refreshVideos')) $('refreshVideos').onclick = loadVideos;

  document.querySelectorAll('input[name="header-navigation"]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) location.hash = input.value;
    });
  });

  document.querySelectorAll('[data-mode]').forEach(b => {
    b.onclick = () => {
      const signup = b.dataset.mode === 'signup';
      document.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('active', x === b));
      if ($('nameField')) $('nameField').hidden = !signup;
      if ($('displayName')) $('displayName').required = signup;
      if ($('password')) $('password').autocomplete = signup ? 'new-password' : 'current-password';
      if ($('authSubmit')) $('authSubmit').innerHTML = signup ? 'Create account <span>→</span>' : 'Sign in <span>→</span>';
      if ($('authForm')) $('authForm').dataset.mode = b.dataset.mode;
      message('authMessage', '');
    };
  });

  const authForm = $('authForm');
  if (authForm) {
    authForm.onsubmit = async e => {
      e.preventDefault();
      const email = $('email').value.trim();
      const password = $('password').value;
      const signup = authForm.dataset.mode === 'signup';
      const name = $('displayName')?.value?.trim() || '';

      if (!isLocalBackendHost && !supabase) {
        message('authMessage', 'You are viewing the GitHub Pages demo. Sign-in and admin data are stored on your PC; run `npm start` and open http://localhost:4173 to use them.', true);
        return;
      }

      message('authMessage', 'Authenticating...');

      try {
        const endpoint = signup ? '/api/auth/register' : '/api/auth/login';
        const res = await window.ecoloopApiFetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signup ? { email, password, name } : { email, password })
        });
        const data = await readApiJson(res, 'Sign-in request');
        if (!res.ok) {
          message('authMessage', data.error || 'Authentication failed', true);
          return;
        }

        if (data.user) {
          setUser(data.user);
          message('authMessage', `Welcome, ${data.user.name || 'Member'}!`);
          showToast(`Signed in as ${data.user.name || data.user.email}`, true);
          setTimeout(() => {
            closeModal('accountDialog');
            if (data.user.isAdmin) {
              showToast('Admin Section unlocked! Click "⚙️ Admin Section" in header to manage/delete data.', true);
            }
          }, 600);
          return;
        }
      } catch (err) {
        if (supabase) {
          const action = signup
            ? supabase.auth.signUp({ email, password, options: { data: { display_name: name } } })
            : supabase.auth.signInWithPassword({ email, password });
          const { data, error } = await action;
          if (error) {
            message('authMessage', error.message, true);
            return;
          }
          if (signup && !data.session) message('authMessage', 'Check your email to confirm your account.');
          else {
            message('authMessage', 'Welcome to EcoLoop.');
            setUser(data.user);
          }
          return;
        }
        message('authMessage', err.message || 'Connection error. Please try again.', true);
      }
    };
  }

  if ($('signOutButton')) {
    $('signOutButton').onclick = async () => {
      try {
        await window.ecoloopApiFetch('/api/auth/logout', { method: 'POST' });
      } catch (_) {}
      await supabase?.auth.signOut();
      setUser(null);
      closeModal('accountDialog');
      showToast('Signed out successfully', true);
    };
  }

  const videoForm = $('videoForm');
  if (videoForm) {
    videoForm.onsubmit = async e => {
      e.preventDefault();
      if (!user || !supabase) {
        message('videoMessage', 'Please sign in before sharing a link.', true);
        return;
      }
      const url = $('videoUrl').value.trim();
      const platform = platformFor(url);
      if (!platform) {
        message('videoMessage', 'Use a public YouTube, Instagram or Facebook video link.', true);
        return;
      }
      const { error } = await supabase.from('video_links').insert({ title: $('videoTitle').value.trim(), url, platform, owner_id: user.id });
      if (error) {
        message('videoMessage', error.message, true);
        return;
      }
      videoForm.reset();
      message('videoMessage', 'Your video link is published.');
      loadVideos();
    };
  }
}

function startMotion() {
  const header = document.querySelector('.header');
  const setHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 10);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });
  const revealed = document.querySelectorAll('.reveal');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealed.forEach(element => element.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealed.forEach(element => observer.observe(element));
}

function startImpactCounters() {
  const total = materials.length;
  const counters = [
    ['.impact-grid article:nth-child(1) b', 95, '', '%'],
    ['.impact-grid article:nth-child(2) b', 17, '≈', ''],
    ['.impact-grid article:nth-child(3) b', total, '', '+']
  ];
  const animate = ([selector, count, prefix, suffix]) => {
    const element = document.querySelector(selector);
    if (!element) return;
    const start = performance.now(), duration = 950;
    const tick = now => {
      const value = Math.round(Math.min((now - start) / duration, 1) * count);
      element.textContent = `${prefix}${value}${suffix}`;
      if (value < count) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }
  const section = $('impact');
  if (!section) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(animate);
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });
  observer.observe(section);
}

function startMemberBrand() {
  const intro = document.querySelector('.member-panel>div:first-child');
  if (!intro || intro.querySelector('.member-brand')) return;
  intro.innerHTML = `<img class="member-brand" src="assets/ecoloop-mark.svg" alt="EcoLoop"> <div class="member-copy">${intro.innerHTML}</div>`;
}

/* ==========================================================================
   Bhopal Local Recycling Directory — Filter Logic
   ========================================================================== */
function initDealersDirectory() {
  const filterBtns = document.querySelectorAll('.dealer-filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyDealerFilter(btn.dataset.dealerFilter || 'All');
    });
  });
}

function applyDealerFilter(filterType = 'All') {
  document.querySelectorAll('.dealer-card').forEach(card => {
    card.classList.toggle('hidden-by-filter', filterType !== 'All' && card.dataset.type !== filterType);
  });
}

/* ==========================================================================
   Section 05: Bhopal Scrap Hub — Tabs, Calculator & Doorstep Pickup
   ========================================================================== */
const BHOPAL_SCRAP_ITEMS = [
  { id: 'paper', name: 'Newspaper & Paper Waste', rate: 14, unit: 'kg', icon: '📄', desc: 'Old newspapers, magazines, office paper' },
  { id: 'cardboard', name: 'Cardboard Boxes', rate: 12, unit: 'kg', icon: '📦', desc: 'Corrugated packing boxes, cartons' },
  { id: 'iron', name: 'Iron & Steel Scrap', rate: 28, unit: 'kg', icon: '⚙️', desc: 'Grills, machinery parts, steel scrap' },
  { id: 'copper', name: 'Copper Wire & Cables', rate: 420, unit: 'kg', icon: '🔌', desc: 'Stripped copper wire, motor windings' },
  { id: 'aluminium', name: 'Aluminium Cans & Utensils', rate: 105, unit: 'kg', icon: '🥫', desc: 'Beverage cans, kitchen items, window frames' },
  { id: 'plastic', name: 'PET Plastic Bottles', rate: 16, unit: 'kg', icon: '🍾', desc: 'Water bottles, oil jars, hard plastic containers' },
  { id: 'ewaste', name: 'E-Waste / IT Hardware', rate: 35, unit: 'kg', icon: '💻', desc: 'Laptops, keyboards, chargers, circuit boards' },
  { id: 'brass', name: 'Brass & Bronze Metal', rate: 310, unit: 'kg', icon: '🔔', desc: 'Pipes, valves, religious idols, fittings' }
];

const bhopalCalcQuantities = {};
BHOPAL_SCRAP_ITEMS.forEach(item => { bhopalCalcQuantities[item.id] = 0; });

function switchBhopalPane(paneId) {
  const panes = document.querySelectorAll('.bhopal-pane');
  const btns = document.querySelectorAll('.bhopal-subtab-btn');
  panes.forEach(p => {
    if (p.id === paneId) {
      p.style.display = 'block';
      p.classList.add('active');
    } else {
      p.style.display = 'none';
      p.classList.remove('active');
    }
  });

  btns.forEach(b => {
    const isTarget = b.dataset.bhopalPane === paneId;
    b.classList.toggle('active', isTarget);
    b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });
}

function initBhopalHub() {
  // 1. Subtab Switching
  const subtabBtns = document.querySelectorAll('.bhopal-subtab-btn');
  subtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const paneId = btn.dataset.bhopalPane;
      if (paneId) switchBhopalPane(paneId);
    });
  });

  // 2. Render Calculator
  renderBhopalCalculator();

  const resetBtn = $('bhopalCalcResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      BHOPAL_SCRAP_ITEMS.forEach(item => { bhopalCalcQuantities[item.id] = 0; });
      renderBhopalCalculator();
      showToast('Calculator quantities reset.', true);
    });
  }

  const proceedBtn = $('bhopalProceedPickupBtn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      switchBhopalPane('bhopalPanePickup');
      const pickupSection = $('bhopalDoorstepForm');
      if (pickupSection) pickupSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // 3. Doorstep Form Handling
  const form = $('bhopalDoorstepForm');
  if (form) {
    const dateInput = $('pickupDate');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split('T')[0];
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('pickupName')?.value.trim() || 'Valued Resident';
      const area = $('pickupArea')?.value || 'Bhopal';
      const date = $('pickupDate')?.value || 'tomorrow';
      const mode = form.elements['bhopalPaymentMode']?.value === 'cash' ? 'Cash on Spot' : 'Instant UPI';

      showToast(`🎉 Doorstep scrap pickup booked for ${name} in ${area} on ${date}!`, true);
      alert(`🎉 EcoLoop Doorstep Collection Scheduled!\n\nName: ${name}\nArea: ${area}\nDate: ${date}\nPayout: ${mode}\n\nOur verified collection partner in Bhopal will contact you on WhatsApp to confirm timing.`);
      form.reset();
    });
  }
}

function renderBhopalCalculator() {
  const grid = $('bhopalCalcGrid');
  if (!grid) return;

  grid.innerHTML = '';
  let countTypes = 0;
  let totalVal = 0;
  let totalWeight = 0;

  BHOPAL_SCRAP_ITEMS.forEach(item => {
    const qty = bhopalCalcQuantities[item.id] || 0;
    const itemTotal = qty * item.rate;
    if (qty > 0) {
      countTypes++;
      totalVal += itemTotal;
      totalWeight += qty;
    }

    const card = document.createElement('div');
    card.className = `calc-mat-card ${qty > 0 ? 'has-qty' : ''}`;
    card.innerHTML = `
      <div>
        <div class="calc-mat-head">
          <span class="calc-mat-icon">${item.icon}</span>
          <div class="calc-mat-meta">
            <h4>${item.name}</h4>
            <span class="calc-mat-rate-tag">₹${item.rate} / ${item.unit}</span>
          </div>
        </div>
        <p class="calc-mat-desc">${item.desc}</p>
      </div>

      <div class="calc-mat-actions">
        <div class="calc-stepper-wrap">
          <button type="button" class="calc-step-btn minus-btn" data-id="${item.id}">−</button>
          <input type="number" step="0.5" min="0" value="${qty}" class="calc-qty-input" data-id="${item.id}">
          <button type="button" class="calc-step-btn plus-btn" data-id="${item.id}">+</button>
          <span class="calc-unit-label">${item.unit}</span>
        </div>
        <div class="calc-mat-payout">
          <span class="calc-payout-label">Subtotal</span>
          <span class="calc-payout-val">₹${itemTotal.toFixed(0)}</span>
        </div>
      </div>
    `;

    const minusBtn = card.querySelector('.minus-btn');
    const plusBtn = card.querySelector('.plus-btn');
    const input = card.querySelector('.calc-qty-input');

    minusBtn.onclick = () => {
      const curr = bhopalCalcQuantities[item.id] || 0;
      bhopalCalcQuantities[item.id] = Math.max(0, curr - 1);
      renderBhopalCalculator();
    };

    plusBtn.onclick = () => {
      const curr = bhopalCalcQuantities[item.id] || 0;
      bhopalCalcQuantities[item.id] = curr + 1;
      renderBhopalCalculator();
    };

    input.onchange = (e) => {
      const val = parseFloat(e.target.value);
      bhopalCalcQuantities[item.id] = isNaN(val) || val < 0 ? 0 : val;
      renderBhopalCalculator();
    };

    grid.appendChild(card);
  });

  const badge = $('bhopalCalcCountBadge');
  const itemList = $('bhopalCalcItemList');
  const totalValEl = $('bhopalCalcTotalVal');
  const totalWeightEl = $('bhopalCalcTotalWeight');

  if (badge) badge.textContent = `${countTypes} categories`;
  if (totalValEl) totalValEl.textContent = `₹ ${totalVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (totalWeightEl) totalWeightEl.textContent = `${totalWeight.toFixed(1)} kg`;

  if (itemList) {
    if (countTypes === 0) {
      itemList.innerHTML = `<p class="summary-empty-msg">No scrap items selected yet. Use the (+/-) buttons to adjust weights.</p>`;
    } else {
      itemList.innerHTML = '';
      BHOPAL_SCRAP_ITEMS.forEach(item => {
        const q = bhopalCalcQuantities[item.id] || 0;
        if (q > 0) {
          const row = document.createElement('div');
          row.className = 'summary-item-row';
          row.innerHTML = `
            <span>${item.icon} ${item.name} (${q} kg)</span>
            <strong>₹${(q * item.rate).toFixed(0)}</strong>
          `;
          itemList.appendChild(row);
        }
      });
    }
  }

  const basketList = $('bhopalPickupBasketList');
  const basketPayout = $('bhopalBasketPayout');
  const basketWeight = $('bhopalBasketWeight');

  if (basketPayout) basketPayout.textContent = `₹ ${totalVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (basketWeight) basketWeight.textContent = `${totalWeight.toFixed(1)} kg`;

  if (basketList) {
    if (countTypes === 0) {
      basketList.innerHTML = `<p class="basket-empty-msg">No scrap in basket yet. Use the Calculator tab to add items.</p>`;
    } else {
      basketList.innerHTML = '';
      BHOPAL_SCRAP_ITEMS.forEach(item => {
        const q = bhopalCalcQuantities[item.id] || 0;
        if (q > 0) {
          const row = document.createElement('div');
          row.className = 'summary-item-row';
          row.innerHTML = `
            <span>${item.icon} ${item.name} (${q} kg)</span>
            <strong>₹${(q * item.rate).toFixed(0)}</strong>
          `;
          basketList.appendChild(row);
        }
      });
    }
  }
}

/* ==========================================================================
   Admin Control Center & Data Management
   ========================================================================== */
const ADMIN_DELETION_EMAIL = 'udit3539@gmail.com';

function confirmAdminDeletion(action) {
  const email = prompt(`To ${action}, type ${ADMIN_DELETION_EMAIL}:`);
  if (email === null) return false;
  if (email.trim().toLowerCase() !== ADMIN_DELETION_EMAIL) {
    showToast('Email did not match. No data was deleted.', false);
    return false;
  }
  return true;
}

async function loadAdminData() {
  try {
    const statsRes = await window.ecoloopApiFetch('/api/admin/stats');
    if (statsRes.ok) {
      const stats = await readApiJson(statsRes, 'Admin stats request');
      if ($('statTotalUsers')) $('statTotalUsers').textContent = stats.totalUsers || '0';
      if ($('adminUserCount')) $('adminUserCount').textContent = stats.totalUsers || '0';
    }
  } catch (_) {}

  if ($('statTotalMaterials')) $('statTotalMaterials').textContent = materials.length;
  if ($('adminMaterialCount')) $('adminMaterialCount').textContent = materials.length;
  if ($('statSavedPlans')) $('statSavedPlans').textContent = getPlans().length;
  if ($('adminDealerCount')) $('adminDealerCount').textContent = dealersList.length;
  if ($('adminDlrTableCount')) $('adminDlrTableCount').textContent = dealersList.length;
  if ($('adminVideoCount')) $('adminVideoCount').textContent = videosList.length;
  if ($('adminVidTableCount')) $('adminVidTableCount').textContent = videosList.length;

  try {
    const usersRes = await window.ecoloopApiFetch('/api/admin/accounts');
    if (usersRes.ok) {
      const { accounts } = await readApiJson(usersRes, 'Admin accounts request');
      renderAdminUsers(accounts || []);
    }
  } catch (_) {}

  renderAdminMaterials();
  renderAdminDealers();
  renderAdminVideos();
}

function openAdminModal() {
  if (!isAdmin) {
    showToast('Admin authorization required. Please sign in as Udit narayan tiwari.', false);
    openModal('accountDialog');
    return;
  }
  loadAdminData();
  openModal('adminDialog');
}
window.openAdminModal = openAdminModal;

function renderAdminUsers(accounts) {
  const tbody = $('adminUsersTableBody');
  if (!tbody) return;
  if (!accounts || accounts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#94a3b8; padding:20px;">No registered accounts found.</td></tr>';
    return;
  }
  tbody.innerHTML = accounts.map(acc => {
    const isRoot = acc.email === 'udit3539@gmail.com' || acc.role === 'admin';
    const dateStr = acc.createdAt ? new Date(acc.createdAt).toLocaleDateString() : 'N/A';
    return `
      <tr>
        <td style="font-family:monospace; font-size:11px; color:#64748b;">${escapeHtml(acc.id.substring(0, 8))}...</td>
        <td><b>${escapeHtml(acc.name || 'Anonymous')}</b></td>
        <td>${escapeHtml(acc.email)}</td>
        <td><span class="dealer-feat" style="font-size:10px;">${isRoot ? '👑 ROOT ADMIN' : 'MEMBER'}</span></td>
        <td style="font-size:12px; color:#64748b;">${dateStr}</td>
        <td>
          ${isRoot ? '<span style="color:#94a3b8; font-size:11px;">Protected</span>' : `<button type="button" class="btn-danger" data-admin-del-user="${escapeAttr(acc.id)}">Delete</button>`}
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-admin-del-user]').forEach(btn => {
    btn.onclick = async () => {
      const userId = btn.dataset.adminDelUser;
      if (!confirmAdminDeletion('delete this user')) return;
      try {
        const res = await window.ecoloopApiFetch(`/api/admin/accounts/${userId}`, {
          method: 'DELETE',
          headers: { 'X-Admin-Confirmation-Email': ADMIN_DELETION_EMAIL }
        });
        if (res.ok) {
          showToast('User deleted successfully', true);
          loadAdminData();
        } else {
          const err = await readApiJson(res, 'User deletion');
          alert(err.error || 'Could not delete user.');
        }
      } catch (e) {
        alert(`Could not delete user: ${e.message}`);
      }
    };
  });
}

function renderAdminMaterials() {
  const tbody = $('adminMaterialsTableBody');
  if (!tbody) return;
  tbody.innerHTML = materials.map(mat => {
    const isCustom = Boolean(mat.isCustom || mat.id?.startsWith('custom-') || mat.id?.startsWith('mat-'));
    return `
      <tr>
        <td><b>${escapeHtml(mat.name)}</b></td>
        <td><span class="dealer-feat" style="font-size:10px;">${escapeHtml(mat.category)}</span></td>
        <td style="font-weight:700; color:#0284c7;">₹${mat.rate || 0}</td>
        <td>/${escapeHtml(mat.unit || 'kg')}</td>
        <td><span style="font-size:11px; color:${isCustom ? '#059669' : '#64748b'}; font-weight:600;">${isCustom ? 'Custom' : 'Standard'}</span></td>
        <td>
          ${isCustom ? `<button type="button" class="btn-danger" data-admin-del-mat="${escapeAttr(mat.id)}">Delete</button>` : '<span style="color:#94a3b8; font-size:11px;">Built-in</span>'}
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-admin-del-mat]').forEach(btn => {
    btn.onclick = async () => {
      const matId = btn.dataset.adminDelMat;
      if (!confirmAdminDeletion('delete this custom material')) return;
      try {
        const res = await window.ecoloopApiFetch(`/api/admin/materials/${matId}`, {
          method: 'DELETE',
          headers: { 'X-Admin-Confirmation-Email': ADMIN_DELETION_EMAIL }
        });
        if (!res.ok) {
          const err = await readApiJson(res, 'Material deletion');
          alert(err.error || 'Could not delete material.');
          return;
        }
      } catch (e) {
        alert(`Could not delete material: ${e.message}`);
        return;
      }
      
      const custom = getCustomMaterials().filter(m => m.id !== matId);
      saveCustomMaterials(custom);
      materials = [...defaultMaterials, ...custom];
      renderRates();
      renderAdminMaterials();
      showToast('Material removed from catalog', true);
    };
  });
}

/* ==========================================================================
   BHOPAL DEALERS & VIDEO CRAFTS GLOBAL STATE
   ========================================================================== */
let dealersList = [];
const DEFAULT_DEALERS = [
  {
    id: "dealer-1",
    name: "The Kabadiwala",
    type: "Doorstep",
    rating: "3.7 ★",
    zone: "Narmadapuram Road, near Vidya Nagar, Bhopal",
    services: "Doorstep Pickup, E-Waste, Paper, Plastics",
    hours: "Closes 7:00 PM",
    phone: "+91 755 492 4444",
    desc: "Well-known organized doorstep scrap collection and recycling service operating across Bhopal via mobile app and website booking.",
    accepts: ["Paper & Books", "Cardboard", "Plastics", "Metals", "E-Waste", "Old Appliances"],
    badge: "⭐ Doorstep Collection & Instant UPI Payout",
    mapUrl: "https://www.google.com/maps/search/The+Kabadiwala+Vidya+Nagar+Narmadapuram+Road+Bhopal"
  },
  {
    id: "dealer-2",
    name: "BHOPAL SCRAP TRADERS",
    type: "Metal",
    rating: "5.0 ★",
    zone: "New Kabadkhana Road, Ibrahimganj, Bhopal",
    services: "Bulk Metal Scrap, Iron & Steel, Heavy Salvage",
    hours: "Closes 9:00 PM",
    phone: "+91 98260 12345",
    desc: "Wholesale industrial scrap yard dealing with commercial structural steel, copper windings, brass fittings, and machinery.",
    accepts: ["Heavy Melting Steel (HMS)", "Copper Cable Scrap", "Cast Iron Pipes", "Brass Lathe Turnings", "Aluminium Sections"],
    badge: "⚡ Industrial Scale · Certified Weighbridge On-Site",
    mapUrl: "https://www.google.com/maps/search/BHOPAL+SCRAP+TRADERS+New+Kabadkhana"
  },
  {
    id: "dealer-3",
    name: "Kabadiwala Bhopal",
    type: "General",
    rating: "4.4 ★",
    zone: "Anna Nagar, Govindpura, Bhopal",
    services: "Household Junk, Newspapers, Books, Tin Cans",
    hours: "8:00 AM - 8:00 PM",
    phone: "+91 94250 67890",
    desc: "Centrally located neighbourhood scrap dealer serving Govindpura and Anna Nagar with fair daily market rates.",
    accepts: ["Corrugated Cardboard", "Plastic Drums & Buckets", "Tins & Food Cans", "Old Textbooks", "Iron Scrap"],
    badge: "✅ Quick Counter Weighing · Daily Cash Payouts",
    mapUrl: "https://www.google.com/maps/search/Kabadiwala+Anna+Nagar+Govindpura+Bhopal"
  },
  {
    id: "dealer-4",
    name: "kabadawala (MP Nagar)",
    type: "General",
    rating: "5.0 ★",
    zone: "Zone-I, MP Nagar (Near Chetak Bridge), Bhopal",
    services: "Office Paper Waste, Furniture, E-Waste",
    hours: "Closes 8:00 PM",
    phone: "+91 755 255 1122",
    desc: "Specialised in corporate and commercial IT office cleanouts, shredding files and dismantling office partitions.",
    accepts: ["Shredded Office Paper", "Old Office Desks", "Printers & UPS Units", "Beverage Cans", "LAN Cables"],
    badge: "🏢 Corporate & Commercial Pickup Specialist",
    mapUrl: "https://www.google.com/maps/search/kabadawala+Zone+I+MP+Nagar+Bhopal"
  },
  {
    id: "dealer-5",
    name: "A. K. Enterprises",
    type: "Metal",
    rating: "4.8 ★",
    zone: "Kotra Road, Shastri Nagar, Bhopal",
    services: "Copper, Brass, Aluminium, Construction Scrap",
    hours: "24 Hours Open",
    phone: "+91 98930 44556",
    desc: "High-volume non-ferrous metal dealer paying top dollar for commercial copper wire, brass, radiator fins, and aluminium sheets.",
    accepts: ["Millberry Copper Wire", "Brass Honey / Utensils", "Aluminium Alloy Rims", "Stainless Steel 304", "Lead Battery Plates"],
    badge: "🏆 Top Bhopal Payout for Copper & Brass",
    mapUrl: "https://www.google.com/maps/search/A+K+Enterprises+Kotra+Road+Bhopal"
  },
  {
    id: "dealer-6",
    name: "E waste scrape collection services",
    type: "E-waste",
    rating: "5.0 ★",
    zone: "Sajida Nagar, Kohefiza, Bhopal",
    services: "Motherboards, Batteries, IT Hardware",
    hours: "Call for Schedule",
    phone: "+91 97550 88990",
    desc: "MPPCB Compliant e-waste recycler handling server racks, motherboards, mobile phones, lithium batteries, and telecom hardware.",
    accepts: ["Computer Motherboards", "Telecom Switchgear", "Laptop Batteries", "CRT/LED Monitors", "Hard Drives"],
    badge: "🛡️ MPPCB Compliant · Hazardous Waste Handler",
    mapUrl: "https://www.google.com/maps/search/E+waste+scrape+collection+Kohefiza+Bhopal"
  },
  {
    id: "dealer-7",
    name: "Kakda's RVSF",
    type: "Vehicle",
    rating: "4.9 ★",
    zone: "Ayodhya Bypass Road, Bhopal",
    services: "Govt. Vehicle Scrapping, COD Certificates",
    hours: "Closes 7:00 PM",
    phone: "+91 755 288 3344",
    desc: "Authorised Registered Vehicle Scrapping Facility (RVSF) issuing official scrapping certificates for deregistration and government scrap incentives.",
    accepts: ["Cars & SUVs", "Two-Wheelers", "Commercial Vehicles", "Automotive Metals", "Auto Plastics"],
    badge: "🏅 Govt. Authorised RVSF · Issues Scrapping Certificates",
    mapUrl: "https://www.google.com/maps/search/Kakda+RVSF+Ayodhya+Bypass+Bhopal"
  }
];

let videosList = [];

function renderLiveDealersGrid() {
  const grid = $('dealersGrid');
  if (!grid) return;
  const iconMap = {
    'Doorstep': { icon: '🚚', cls: 'doorstep' },
    'Metal': { icon: '⚙️', cls: 'metal' },
    'General': { icon: '📦', cls: 'general' },
    'E-waste': { icon: '🔋', cls: 'ewaste' },
    'Vehicle': { icon: '🚗', cls: 'vehicle' }
  };

  grid.innerHTML = dealersList.map(d => {
    const iconInfo = iconMap[d.type] || { icon: '♻️', cls: 'general' };
    const ratingNum = parseFloat(d.rating) || 5.0;
    const starPct = Math.min(100, Math.round((ratingNum / 5.0) * 100));
    const acceptsList = Array.isArray(d.accepts) ? d.accepts : (d.services ? d.services.split(',').map(s => s.trim()) : []);
    const acceptsHtml = acceptsList.map(a => `<li>${escapeHtml(a)}</li>`).join('');
    return `
      <article class="dealer-card ${d.badge ? 'dealer-card-featured' : ''}" data-type="${escapeAttr(d.type)}">
        <div class="dealer-card-header">
          <div class="dealer-icon-wrap ${iconInfo.cls}">${iconInfo.icon}</div>
          <div class="dealer-meta">
            <p class="dealer-type-badge">${escapeHtml(d.type)} Hub</p>
            <h3 class="dealer-name">${escapeHtml(d.name)}</h3>
            <div class="dealer-stars" aria-label="Rating ${ratingNum} out of 5">
              <span class="stars-filled" style="--star-pct: ${starPct}%">★★★★★</span>
              <span class="stars-empty">★★★★★</span>
              <b>${ratingNum.toFixed(1)}</b>
            </div>
          </div>
          <span class="dealer-status open">● Open</span>
        </div>
        <div class="dealer-hours"><span>🕖</span> ${escapeHtml(d.hours || 'Open Daily')}</div>
        <p class="dealer-location"><span>📍</span> ${escapeHtml(d.zone)}</p>
        <p class="dealer-desc">${escapeHtml(d.desc || d.services)}</p>
        <ul class="dealer-accepts">
          ${acceptsHtml}
        </ul>
        ${d.badge ? `<div class="dealer-features-row"><span class="dealer-feat">${escapeHtml(d.badge)}</span></div>` : ''}
        <div class="dealer-actions">
          <a class="dealer-btn dealer-btn-primary" href="${escapeAttr(d.mapUrl || 'https://maps.google.com')}" target="_blank" rel="noopener noreferrer">📍 View on Map</a>
          ${isAdmin ? `<button type="button" class="btn-danger" style="padding:7px 12px; font-size:11px;" onclick="window.adminDeleteDealer('${escapeAttr(d.id)}')">🗑️ Delete Dealer</button>` : ''}
        </div>
      </article>
    `;
  }).join('');

  const activeBtn = document.querySelector('.dealer-filter-btn.active');
  applyDealerFilter(activeBtn?.dataset.dealerFilter || 'All');
}

async function loadDealers() {
  try {
    const res = await window.ecoloopApiFetch('/api/dealers');
    if (res.ok) {
      const data = await readApiJson(res, 'Dealer directory request');
      if (Array.isArray(data?.dealers) && data.dealers.length) {
        dealersList = data.dealers;
        renderLiveDealersGrid();
        renderAdminDealers();
        if ($('adminDealerCount')) $('adminDealerCount').textContent = dealersList.length;
        if ($('adminDlrTableCount')) $('adminDlrTableCount').textContent = dealersList.length;
        return;
      }
    }
  } catch (_) {}

  dealersList = [...DEFAULT_DEALERS];
  renderLiveDealersGrid();
  renderAdminDealers();
  if ($('adminDealerCount')) $('adminDealerCount').textContent = dealersList.length;
  if ($('adminDlrTableCount')) $('adminDlrTableCount').textContent = dealersList.length;
}

function renderAdminDealers() {
  const tbody = $('adminDealersTableBody');
  if (!tbody) return;
  if (!dealersList || dealersList.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:20px;">No dealers found in directory.</td></tr>';
    return;
  }
  tbody.innerHTML = dealersList.map(d => `
    <tr>
      <td><b>${escapeHtml(d.name)}</b></td>
      <td><span class="dealer-feat" style="font-size:10px;">${escapeHtml(d.type)}</span></td>
      <td style="color:#d97706; font-weight:700;">${escapeHtml(d.rating)}</td>
      <td style="font-size:12px;">${escapeHtml(d.zone)}</td>
      <td>
        <button type="button" class="btn-danger" data-admin-del-dealer="${escapeAttr(d.id)}">Delete</button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-admin-del-dealer]').forEach(btn => {
    btn.onclick = () => window.adminDeleteDealer(btn.dataset.adminDelDealer);
  });
}

window.adminDeleteDealer = async function(dealerId) {
  if (!confirmAdminDeletion('delete this dealer from the Bhopal Hub directory')) return;
  try {
    const res = await window.ecoloopApiFetch(`/api/admin/dealers/${dealerId}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Confirmation-Email': ADMIN_DELETION_EMAIL }
    });
    if (!res.ok) {
      const err = await readApiJson(res, 'Dealer deletion');
      alert(err.error || 'Could not delete dealer.');
      return;
    }
  } catch (e) {
    alert(`Could not delete dealer: ${e.message}`);
    return;
  }
  dealersList = dealersList.filter(d => d.id !== dealerId);
  renderLiveDealersGrid();
  renderAdminDealers();
  if ($('adminDealerCount')) $('adminDealerCount').textContent = dealersList.length;
  if ($('adminDlrTableCount')) $('adminDlrTableCount').textContent = dealersList.length;
  showToast('Dealer removed from Bhopal Hub directory', true);
};

function renderAdminVideos() {
  const tbody = $('adminVideosTableBody');
  if (!tbody) return;
  if (!videosList || videosList.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:20px;">No video tutorials found.</td></tr>';
    return;
  }
  tbody.innerHTML = videosList.map(v => `
    <tr>
      <td><b>${escapeHtml(v.title)}</b></td>
      <td><span class="dealer-feat" style="font-size:10px;">${escapeHtml(v.category || 'Crafts')}</span></td>
      <td style="font-size:12px; color:#64748b;">${escapeHtml(v.channel || 'YouTube')}</td>
      <td><a href="${escapeAttr(v.url)}" target="_blank" rel="noopener noreferrer" style="color:#0284c7; font-weight:600; text-decoration:none; font-size:12px;">Watch ↗</a></td>
      <td>
        <button type="button" class="btn-danger" data-admin-del-video="${escapeAttr(v.id)}">Delete</button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-admin-del-video]').forEach(btn => {
    btn.onclick = () => window.adminDeleteVideo(btn.dataset.adminDelVideo);
  });
}

window.adminDeleteVideo = async function(videoId) {
  if (!confirmAdminDeletion('delete this video tutorial')) return;
  try {
    const res = await window.ecoloopApiFetch(`/api/admin/videos/${videoId}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Confirmation-Email': ADMIN_DELETION_EMAIL }
    });
    if (!res.ok) {
      const err = await readApiJson(res, 'Video deletion');
      alert(err.error || 'Could not delete video.');
      return;
    }
  } catch (e) {
    alert(`Could not delete video: ${e.message}`);
    return;
  }
  videosList = videosList.filter(v => v.id !== videoId);
  renderVideoCards(videosList, true);
  renderAdminVideos();
  if ($('adminVideoCount')) $('adminVideoCount').textContent = videosList.length;
  if ($('adminVidTableCount')) $('adminVidTableCount').textContent = videosList.length;
  showToast('Video tutorial deleted from library', true);
};

function initAdminPanel() {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.dataset.tab;
      document.querySelectorAll('.admin-pane').forEach(p => {
        p.style.display = p.id === targetId ? 'block' : 'none';
      });
    };
  });

  const delAllUsersBtn = $('adminDeleteAllUsersBtn');
  if (delAllUsersBtn) {
    delAllUsersBtn.onclick = async () => {
      if (!confirmAdminDeletion('delete all non-admin registered users')) return;
      try {
        const res = await window.ecoloopApiFetch('/api/admin/accounts', {
          method: 'DELETE',
          headers: { 'X-Admin-Confirmation-Email': ADMIN_DELETION_EMAIL }
        });
        if (res.ok) {
          showToast('All non-admin users erased', true);
          loadAdminData();
        } else {
          const err = await readApiJson(res, 'Bulk account deletion');
          alert(err.error || 'Could not erase accounts.');
        }
      } catch (e) {
        alert(`Could not erase accounts: ${e.message}`);
      }
    };
  }

  const delAllMatBtn = $('adminDeleteAllMaterialsBtn');
  if (delAllMatBtn) {
    delAllMatBtn.onclick = async () => {
      if (!confirmAdminDeletion('erase all custom materials from the website')) return;
      try {
        const res = await window.ecoloopApiFetch('/api/admin/materials', {
          method: 'DELETE',
          headers: { 'X-Admin-Confirmation-Email': ADMIN_DELETION_EMAIL }
        });
        if (!res.ok) {
          const err = await readApiJson(res, 'Bulk material deletion');
          alert(err.error || 'Could not erase custom materials.');
          return;
        }
      } catch (e) {
        alert(`Could not erase custom materials: ${e.message}`);
        return;
      }
      saveCustomMaterials([]);
      materials = [...defaultMaterials];
      renderRates();
      renderAdminMaterials();
      showToast('All custom materials erased', true);
    };
  }

  const addMatForm = $('adminAddMaterialForm');
  if (addMatForm) {
    addMatForm.onsubmit = async (e) => {
      e.preventDefault();
      const name = $('admMatName').value.trim();
      const category = $('admMatCategory').value;
      const rate = parseFloat($('admMatRate').value) || 0;
      const unit = $('admMatUnit').value.trim() || 'kg';

      const newMat = {
        id: `mat-${Date.now()}`,
        name,
        category,
        rate,
        unit,
        action: 'Recycle',
        hazard: false,
        hazardNote: '',
        description: `Standard recyclable ${category.toLowerCase()} waste in Bhopal.`,
        tips: `Segregate cleanly to preserve scrap value.`,
        isCustom: true
      };

      try {
        await window.ecoloopApiFetch('/api/admin/materials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMat)
        });
      } catch (_) {}

      addMaterialToList(newMat, true);
      addMatForm.reset();
      loadAdminData();
      showToast(`Added ${name} to live website catalog!`, true);
    };
  }

  // Admin Add Video Form
  const addVidForm = $('adminAddVideoForm');
  if (addVidForm) {
    addVidForm.onsubmit = async (e) => {
      e.preventDefault();
      const title = $('admVidTitle').value.trim();
      const category = $('admVidCategory').value;
      const url = $('admVidUrl').value.trim();
      const channel = $('admVidChannel').value.trim() || 'EcoLoop Creator';
      const description = $('admVidDesc').value.trim();

      const newVid = {
        id: `vid-${Date.now()}`,
        title,
        category,
        url,
        channel,
        description: description || 'Eco-friendly recycling and upcycling tutorial.',
        isCustom: true
      };

      try {
        await window.ecoloopApiFetch('/api/admin/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newVid)
        });
      } catch (_) {}

      videosList.unshift(newVid);
      renderVideoCards(videosList, true);
      renderAdminVideos();
      if ($('adminVideoCount')) $('adminVideoCount').textContent = videosList.length;
      if ($('adminVidTableCount')) $('adminVidTableCount').textContent = videosList.length;
      addVidForm.reset();
      showToast(`Added video "${title}" to library!`, true);
    };
  }

  // Admin Add Dealer Form
  const addDlrForm = $('adminAddDealerForm');
  if (addDlrForm) {
    addDlrForm.onsubmit = async (e) => {
      e.preventDefault();
      const name = $('admDlrName').value.trim();
      const type = $('admDlrType').value;
      const zone = $('admDlrZone').value.trim();
      const rating = $('admDlrRating').value.trim() || '5.0 ★';
      const services = $('admDlrServices').value.trim();
      const hours = $('admDlrHours').value.trim() || '9:00 AM - 8:00 PM';
      const phone = $('admDlrPhone').value.trim();

      const newDlr = {
        id: `dealer-${Date.now()}`,
        name,
        type,
        zone,
        rating,
        services,
        hours,
        phone,
        desc: `Verified ${type.toLowerCase()} scrap recycling hub in ${zone}`,
        accepts: services.split(',').map(s => s.trim()),
        badge: 'Verified Bhopal Dealer',
        mapUrl: `https://www.google.com/maps/search/${encodeURIComponent(name + ' Bhopal')}`,
        isCustom: true
      };

      try {
        await window.ecoloopApiFetch('/api/admin/dealers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newDlr)
        });
      } catch (_) {}

      dealersList.unshift(newDlr);
      renderLiveDealersGrid();
      renderAdminDealers();
      if ($('adminDealerCount')) $('adminDealerCount').textContent = dealersList.length;
      if ($('adminDlrTableCount')) $('adminDlrTableCount').textContent = dealersList.length;
      addDlrForm.reset();
      showToast(`Added ${name} to Bhopal Hub directory!`, true);
    };
  }

  const wipePlansBtn = $('adminWipePlansBtn');
  if (wipePlansBtn) {
    wipePlansBtn.onclick = () => {
      if (!confirmAdminDeletion('clear all saved collection plans')) return;
      savePlans([]);
      renderPlanList();
      showToast('All saved collection plans wiped.', true);
      loadAdminData();
    };
  }

  const masterResetBtn = $('adminMasterResetBtn');
  if (masterResetBtn) {
    masterResetBtn.onclick = async () => {
      if (!confirmAdminDeletion('erase all non-admin accounts, custom materials, dealers, videos, saved plans, and cache')) return;
      try {
        const res = await window.ecoloopApiFetch('/api/admin/reset-all', {
          method: 'POST',
          headers: { 'X-Admin-Confirmation-Email': ADMIN_DELETION_EMAIL }
        });
        if (!res.ok) {
          const err = await readApiJson(res, 'Website data reset');
          alert(err.error || 'Could not reset website data.');
          return;
        }
      } catch (e) {
        alert(`Could not reset website data: ${e.message}`);
        return;
      }

      localStorage.removeItem(CUSTOM_MATERIALS_KEY);
      localStorage.removeItem(planStorageKey);
      localStorage.removeItem('ecoloop-stats-v1');
      alert('✅ All website data erased successfully. Reloading...');
      location.reload();
    };
  }
}

async function checkAuthSession() {
  try {
    const res = await window.ecoloopApiFetch('/api/auth/session');
    if (res.ok) {
      const data = await readApiJson(res, 'Session check');
      if (data?.user) {
        setUser(data.user);
      }
    }
  } catch (_) {}
}

// Global initialization sequence
renderRates();
startPlanner();
initGuideTabs();
initAiScannerEvents();
initAiGenerator();
initSearchAndFilters();
initDialogsAndAuth();
initDealersDirectory();
initBhopalHub();
initAdminPanel();
startMotion();
startImpactCounters();
startMemberBrand();
loadDealers();
loadVideos();
checkAuthSession();
startBackend().catch(() => message('authMessage', 'Could not initialize the video service.', true));
window.addEventListener('ecoloop:auth-state', event => setUser(event.detail));
