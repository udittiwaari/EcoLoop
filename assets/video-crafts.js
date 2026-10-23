/* ==========================================================================
   EcoLoop — Section 05: Upcycling Video Academy & Step-by-Step Craft Guides
   Slotted by Section 02 Material Categories (Plastics, Cardboard, Metals, E-Waste, Other)
   ========================================================================== */

(function () {
  const CATEGORIES = [
    {
      id: 'slot-plastic',
      slotKey: 'Plastic',
      emoji: '🧴',
      title: 'Plastics & Bottles',
      sectionSlot: 'Section 02: Plastic',
      description: 'Upcycle PET bottles, milk jugs, and caps into self-watering planters, organizers, and cases.',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      headerBg: 'bg-emerald-600'
    },
    {
      id: 'slot-paper',
      slotKey: 'Paper',
      emoji: '📦',
      title: 'Cardboard & Paper Waste',
      sectionSlot: 'Section 02: Paper',
      description: 'Transform delivery cartons, newspapers, and shoe boxes into geometric boxes, vases, and drawer caddies.',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
      headerBg: 'bg-amber-600'
    },
    {
      id: 'slot-metal',
      slotKey: 'Metal',
      emoji: '🥫',
      title: 'Metal & Tin Can Projects',
      sectionSlot: 'Section 02: Metal',
      description: 'Repurpose food cans, beverage cans, and wire scraps into rustic ambient lanterns, caddies, and windchimes.',
      badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
      headerBg: 'bg-sky-600'
    },
    {
      id: 'slot-ewaste',
      slotKey: 'E-waste',
      emoji: '🔋',
      title: 'E-Waste & Electronics',
      sectionSlot: 'Section 02: E-waste',
      description: 'Strip discarded USB cords, appliance wire, and obsolete CDs into copper bonsai trees and stained-glass coasters.',
      badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
      headerBg: 'bg-purple-600'
    },
    {
      id: 'slot-other',
      slotKey: 'Other',
      emoji: '🌿',
      title: 'Glass, Fabric & Egg Trays',
      sectionSlot: 'Section 02: Other',
      description: 'Creative zero-waste home decor from empty glass jars, egg cartons, and fabric scraps.',
      badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
      headerBg: 'bg-teal-600'
    }
  ];

  const INITIAL_TUTORIALS = [
    {
      id: 'plastic-planter',
      categoryId: 'slot-plastic',
      slotLabel: '🧴 Section 02: Plastic Bottle',
      title: 'Self-Watering Planter from Plastic Bottles',
      time: '12 Mins',
      difficulty: 'Beginner',
      channel: 'EcoCrafts Global',
      videoId: '4cwHLgAfkuk',
      url: 'https://youtu.be/4cwHLgAfkuk',
      format: 'Full HD Guide',
      duration: '4:28',
      description: 'Transform an empty 1-litre beverage bottle into a self-wicking indoor herb planter that keeps soil moist.',
      itemsNeeded: ['🧴 1x Plastic Bottle (PET)', '✂️ Utility Scissors', '🧵 15cm Cotton Twine / Wick', '🌱 Potting Soil & Seedlings'],
      ecoTip: 'Diverts petroleum plastic from landfill while cultivating a zero-cost living green herb garden at home.',
      steps: [
        { num: 1, title: 'Clean & Cut', text: 'Wash and remove the label from the plastic bottle, then cut it horizontally into two equal halves with scissors.' },
        { num: 2, title: 'Prepare the Cap', text: 'Puncture a 4mm hole through the center of the bottle cap and thread the 15cm cotton wick halfway through.' },
        { num: 3, title: 'Assemble Reservoir', text: 'Pour 5cm of water into the lower base, then invert the upper cone-shaped half upside-down inside the base.' },
        { num: 4, title: 'Add Soil & Plant', text: 'Fill the upper inverted cone with soil ensuring the wick touches the roots, then plant your herb or flower.' }
      ]
    },
    {
      id: 'plastic-organizer',
      categoryId: 'slot-plastic',
      slotLabel: '🧴 Section 02: Plastic Bottle',
      title: 'Desk Organizer & Pen Stand from Bottles',
      time: '10 Mins',
      difficulty: 'Beginner',
      channel: 'Creative Waste Lab',
      videoId: '8hakWLRCJds',
      url: 'https://youtu.be/8hakWLRCJds',
      format: 'Full HD Guide',
      duration: '5:10',
      description: 'Upcycle plastic bottle bases into smooth, pastel-painted desk holders for markers, pens, and art supplies.',
      itemsNeeded: ['🧴 2x Plastic Soda Bottles', '✂️ Craft Scissors', '🎨 Pastel Acrylic Paint', '📏 Measuring Tape'],
      ecoTip: 'Repurposes rigid plastic bases that take over 450 years to decompose in open dumps into durable desk storage.',
      steps: [
        { num: 1, title: 'Measure & Cut', text: 'Measure 10cm from the bottle base and cut cleanly around the circumference with sharp scissors.' },
        { num: 2, title: 'Smooth the Rim', text: 'Buff the cut edge with fine sandpaper or wrap with colorful masking tape for a smooth, safe rim.' },
        { num: 3, title: 'Paint & Decorate', text: 'Paint the exterior with two coats of pastel acrylic paint or decorate with geometric recycled paper strips.' },
        { num: 4, title: 'Setup on Workstation', text: 'Place on your study desk for pens, rulers, and scissors, or punch two holes to hang on your wall.' }
      ]
    },
    {
      id: 'plastic-zipper-case',
      categoryId: 'slot-plastic',
      slotLabel: '🧴 Section 02: Plastic Bottle',
      title: 'Plastic Bottle Clamshell Zipper Case',
      time: '15 Mins',
      difficulty: 'Intermediate',
      channel: 'Upcycle Studio',
      videoId: '4cwHLgAfkuk',
      url: 'https://youtu.be/4cwHLgAfkuk',
      format: 'Quick Guide',
      duration: '3:45',
      description: 'Join two plastic bottle bottoms with a zipper to create a waterproof travel capsule for cables and earphones.',
      itemsNeeded: ['🧴 2x Matching Beverage Bottles', '🤐 1x 20cm Zipper', '🔥 Craft Hot Glue', '✂️ Utility Knife'],
      ecoTip: 'Keeps 2 bottles out of incineration and replaces cheap plastic pencil cases that break easily.',
      steps: [
        { num: 1, title: 'Cut Bottle Bottoms', text: 'Cut off the bottom 8cm of two matching plastic bottles to create two interlocking cup halves.' },
        { num: 2, title: 'Glue First Zipper Edge', text: 'Unzip the zipper and apply a thin bead of craft glue along the inside rim of the first bottle half.' },
        { num: 3, title: 'Attach Opposite Side', text: 'Glue the opposite side of the zipper tape to the second bottle half, aligning the zipper pull neatly.' },
        { num: 4, title: 'Cure & Zip Closed', text: 'Allow the adhesive to cure for 10 minutes, then zip closed to store charging cables or travel stationery.' }
      ]
    },
    {
      id: 'cardboard-gift-box',
      categoryId: 'slot-paper',
      slotLabel: '📦 Section 02: Cardboard',
      title: 'Modern Geometric Cardboard Gift Box',
      time: '15 Mins',
      difficulty: 'Beginner',
      channel: 'BoxCrafts Lab',
      videoId: 'SUs2YLGKH8I',
      url: 'https://youtu.be/SUs2YLGKH8I',
      format: 'Full HD Guide',
      duration: '6:12',
      description: 'Turn plain shipping box cardboard into clean, scored gift packaging with interlocking fold-over tabs.',
      itemsNeeded: ['📦 Clean Corrugated Box', '📏 Metal Ruler & Pencil', '🧴 PVA Craft Glue', '🎀 Fabric Scrap Ribbon'],
      ecoTip: 'Reuses cardboard cartons directly without industrial repulping, saving energy and water.',
      steps: [
        { num: 1, title: 'Measure Template', text: 'Flatten an old delivery box and draw a cross-shaped box template with equal side tabs using a ruler.' },
        { num: 2, title: 'Score Fold Lines', text: 'Score along fold lines with a blunt butter knife so the thick cardboard folds crisply without tearing.' },
        { num: 3, title: 'Fold & Glue Tabs', text: 'Fold the four side flaps upward and apply a thin layer of PVA glue along the connecting side tabs.' },
        { num: 4, title: 'Clamp & Finish', text: 'Hold with clothes pegs for 5 minutes to dry, then tie with a fabric scrap ribbon for gift packaging.' }
      ]
    },
    {
      id: 'cardboard-vase',
      categoryId: 'slot-paper',
      slotLabel: '📦 Section 02: Cardboard',
      title: 'Sculptural Ribbed Cardboard Table Vase',
      time: '20 Mins',
      difficulty: 'Intermediate',
      channel: 'Design Waste Studio',
      videoId: 'N17dJOl978U',
      url: 'https://youtu.be/N17dJOl978U',
      format: 'Full HD Guide',
      duration: '8:05',
      description: 'Create an architectural designer vase from concentric cardboard ribs centered around an empty glass jar.',
      itemsNeeded: ['📦 Thick Cardboard Carton', '🫙 1x Clean Empty Glass Jar', '✂️ Heavy Craft Shears', '🧴 Wood Glue'],
      ecoTip: 'Converts packaging scrap into Scandinavian-style home decor that retail stores sell for over ₹800.',
      steps: [
        { num: 1, title: 'Setup Glass Core', text: 'Place an empty glass food jar in the center to serve as the watertight structural core of the vase.' },
        { num: 2, title: 'Trace & Cut Ribs', text: 'Trace and cut 12 identical curved rib silhouettes from scrap corrugated cardboard packaging.' },
        { num: 3, title: 'Radial Assembly', text: 'Glue the cardboard ribs radially around the glass jar at equal spacing using craft wood glue.' },
        { num: 4, title: 'Drying & Styling', text: 'Let dry, then display dry pampas grass or fill the inner glass jar with water for fresh flowers.' }
      ]
    },
    {
      id: 'shoebox-organizer',
      categoryId: 'slot-paper',
      slotLabel: '📦 Section 02: Cardboard',
      title: 'Shoe Box Multi-Compartment Drawer Caddy',
      time: '12 Mins',
      difficulty: 'Beginner',
      channel: 'Organize Smart',
      videoId: '8yZnpUdQt-M',
      url: 'https://youtu.be/8yZnpUdQt-M',
      format: 'Full HD Guide',
      duration: '5:40',
      description: 'Build an interlocking grid divider inside an empty shoe box to store cables, socks, and office supplies.',
      itemsNeeded: ['📦 1x Empty Shoe Box', '📄 Cardstock or Cereal Box', '✂️ Scissors', '📰 Newspaper Wrapping'],
      ecoTip: 'Gives rigid shoe boxes a second life as permanent modular drawer dividers.',
      steps: [
        { num: 1, title: 'Measure Dividers', text: 'Measure the internal height of the shoe box and cut 4 cardboard divider strips to match.' },
        { num: 2, title: 'Cut Interlock Slots', text: 'Cut half-depth matching notches in the strips and interlock them into an egg-crate grid layout.' },
        { num: 3, title: 'Wrap & Reinforce', text: 'Wrap the outer box and rim edges with recycled newspaper or leftover wrapping paper.' },
        { num: 4, title: 'Insert Grid & Label', text: 'Slide the divider grid into the box to organize charging cords, stationery, or accessories.' }
      ]
    },
    {
      id: 'tin-can-lantern',
      categoryId: 'slot-metal',
      slotLabel: '🥫 Section 02: Metal Cans',
      title: 'Rustic Tin Can Ambient Candle Lantern',
      time: '15 Mins',
      difficulty: 'Beginner',
      channel: 'Homestead Crafts',
      videoId: 'OPcZnU1mIiM',
      url: 'https://youtu.be/OPcZnU1mIiM',
      format: 'Full HD Guide',
      duration: '4:15',
      description: 'Punch decorative starburst holes into a food tin to create a magical shadow lantern for evening patios.',
      itemsNeeded: ['🥫 1x Clean Food Tin Can', '🔨 Hammer & Small Nail', '❄️ Water (Frozen Solid)', '🕯️ LED Tealight'],
      ecoTip: 'Tin cans are 100% recyclable metal; upcycling keeps them functioning locally before entering the smelter.',
      steps: [
        { num: 1, title: 'Freeze Tin with Water', text: 'Fill the tin can with water and freeze solid overnight so the metal will not dent while punching.' },
        { num: 2, title: 'Hammer Pattern Holes', text: 'Hammer a pattern of small holes through the metal using a nail into your chosen geometric design.' },
        { num: 3, title: 'Thaw & Paint', text: 'Melt the ice under warm water, dry the tin completely, and spray with matte black or copper paint.' },
        { num: 4, title: 'Light & Enjoy', text: 'Drop in an LED tealight candle to cast warm, patterned shadow silhouettes across your room.' }
      ]
    },
    {
      id: 'metal-can-caddy',
      categoryId: 'slot-metal',
      slotLabel: '🥫 Section 02: Metal Cans',
      title: 'Three-Tier Jute Wrapped Metal Can Caddy',
      time: '15 Mins',
      difficulty: 'Beginner',
      channel: 'Rustic DIY Lab',
      videoId: '8hakWLRCJds',
      url: 'https://youtu.be/8hakWLRCJds',
      format: 'Full HD Guide',
      duration: '5:02',
      description: 'Cluster three recycled food cans wrapped in natural jute rope for a farmhouse-style desk or kitchen caddy.',
      itemsNeeded: ['🥫 3x Assorted Food Cans', '🧵 Natural Jute Twine / Rope', '🧴 Craft Glue', '🗜️ Pliers'],
      ecoTip: 'Eliminates the need for store-bought plastic desk organizers and keeps heavy steel cans out of garbage.',
      steps: [
        { num: 1, title: 'Flatten Sharp Edges', text: 'Press down any sharp inner rim edges with pliers, then wash and dry the three tin cans thoroughly.' },
        { num: 2, title: 'Wind Jute Twine', text: 'Wind natural jute twine tightly from base to rim around each can, securing with craft glue dots.' },
        { num: 3, title: 'Join Cans Together', text: 'Glue the three wrapped cans together side-by-side in a triangle formation to form a stable caddy.' },
        { num: 4, title: 'Fill with Essentials', text: 'Fill with paintbrushes, cooking spatulas, or desk stationery for a rustic zero-cost organizer.' }
      ]
    },
    {
      id: 'copper-wire-bonsai',
      categoryId: 'slot-ewaste',
      slotLabel: '🔋 Section 02: E-Waste Cables',
      title: 'Recycled Cable Copper Wire Bonsai Tree',
      time: '25 Mins',
      difficulty: 'Intermediate',
      channel: 'WireArt Master',
      videoId: 'OPcZnU1mIiM',
      url: 'https://youtu.be/OPcZnU1mIiM',
      format: 'Full HD Guide',
      duration: '9:30',
      description: 'Strip broken USB charging cords and appliance cables to twist bare copper into an intricate bonsai sculpture.',
      itemsNeeded: ['🔋 2m Decommissioned Cable', '✂️ Wire Strippers / Shears', '🪨 Small River Stone', '🗜️ Pliers'],
      ecoTip: 'Copper is Bhopal’s highest-value non-ferrous scrap (₹620/kg); this project turns ₹10 of wire into fine art.',
      steps: [
        { num: 1, title: 'Strip Cable Jacket', text: 'Strip the outer PVC jacket from scrap electrical or appliance cords to extract shiny copper strands.' },
        { num: 2, title: 'Bundle Wire Strands', text: 'Cut 20 strands of wire into 22cm lengths and bundle them together tightly at the center midpoint.' },
        { num: 3, title: 'Twist Trunk & Roots', text: 'Twist the lower half firmly to form the tree trunk, anchoring root ends around a small stone.' },
        { num: 4, title: 'Branch Out Foliage', text: 'Separate the upper strands into graceful branches, twisting fine tips to form dense bonsai foliage.' }
      ]
    },
    {
      id: 'cd-mosaic-coaster',
      categoryId: 'slot-ewaste',
      slotLabel: '🔋 Section 02: E-Waste CDs',
      title: 'Shimmering CD / DVD Mosaic Coasters',
      time: '18 Mins',
      difficulty: 'Beginner',
      channel: 'Mosaic Upcycle Lab',
      videoId: '8hakWLRCJds',
      url: 'https://youtu.be/8hakWLRCJds',
      format: 'Full HD Guide',
      duration: '4:50',
      description: 'Cut obsolete optical discs into reflective triangular tiles and glue them in a kaleidoscope stained-glass mosaic.',
      itemsNeeded: ['🔋 2x Scratched CDs or DVDs', '✂️ Heavy Kitchen Shears', '📦 Cardboard Base', '🧴 Clear Glue'],
      ecoTip: 'Polycarbonate optical discs are rarely accepted in standard curbside bins; upcycling prevents microplastic pollution.',
      steps: [
        { num: 1, title: 'Soak & Cut Discs', text: 'Soak old CDs in warm water for 5 minutes, then cut into small triangular mosaic shards with shears.' },
        { num: 2, title: 'Arrange Mosaic Pattern', text: 'Arrange the iridescent pieces shiny-side-up over a circular scrap cardboard coaster base.' },
        { num: 3, title: 'Adhere with Clear Glue', text: 'Adhere each shard with clear craft glue, leaving 1mm gap lines between them like stained glass.' },
        { num: 4, title: 'Grout & Wipe Clean', text: 'Seal gaps with a thin layer of white craft paint or resin, then wipe surfaces clean with a damp cloth.' }
      ]
    },
    {
      id: 'glass-bottle-lamp',
      categoryId: 'slot-other',
      slotLabel: '🌿 Section 02: Glass Bottles',
      title: 'Warm Glass Bottle Fairy Light Table Lamp',
      time: '8 Mins',
      difficulty: 'Beginner',
      channel: 'Green Living Hacks',
      videoId: 'jWkt1eAGIR8',
      url: 'https://youtu.be/jWkt1eAGIR8',
      format: 'Quick Guide',
      duration: '3:20',
      description: 'Convert empty glass olive oil or wine bottles into warm, glare-free ambient lanterns using micro-LED cork lights.',
      itemsNeeded: ['🌿 1x Clean Empty Glass Bottle', '💡 1x Cork-Style LED String Light', '🧼 Warm Soapy Water'],
      ecoTip: 'Glass is 100% infinitely recyclable; reusing intact bottles saves 100% of the remelting energy.',
      steps: [
        { num: 1, title: 'Soak Off Label', text: 'Soak the glass bottle in warm soapy water for 10 minutes to peel off paper labels effortlessly.' },
        { num: 2, title: 'Rinse & Air Dry', text: 'Rinse the bottle and let the interior air-dry completely until free of any moisture droplets.' },
        { num: 3, title: 'Insert Micro-LEDs', text: 'Feed the copper micro-LED wire through the bottle neck until the interior is evenly filled with lights.' },
        { num: 4, title: 'Fit Cork & Turn On', text: 'Firmly press the cork battery pack into the bottle mouth and switch on for cozy ambient table lighting.' }
      ]
    },
    {
      id: 'egg-tray-flowers',
      categoryId: 'slot-other',
      slotLabel: '🌿 Section 02: Egg Cartons',
      title: 'Molded Egg-Tray 3D Floral Wall Art',
      time: '15 Mins',
      difficulty: 'Beginner',
      channel: 'Pulp Art Crafts',
      videoId: 'R_ua9rbSlDU',
      url: 'https://youtu.be/R_ua9rbSlDU',
      format: 'Full HD Guide',
      duration: '6:45',
      description: 'Cut and paint molded cardboard egg cups to assemble layered 3D roses and blossoms for wall garlands.',
      itemsNeeded: ['🌿 1x Cardboard Egg Carton', '✂️ Craft Scissors', '🎨 Watercolors or Acrylics', '🧴 PVA Glue'],
      ecoTip: 'Reuses low-grade molded paper pulp that has already reached the end of traditional paper recycling fibers.',
      steps: [
        { num: 1, title: 'Cut Egg Cups', text: 'Cut the individual cups from a molded paper egg carton and snip 4 to 6 petal curves around each rim.' },
        { num: 2, title: 'Layer Petal Rings', text: 'Nest a smaller 4-petal cup inside a larger 6-petal cup, gluing the center with a drop of PVA.' },
        { num: 3, title: 'Paint with Watercolors', text: 'Paint with vibrant watercolors; the porous egg carton paper absorbs gradients beautifully like real petals.' },
        { num: 4, title: 'Assemble & Mount', text: 'Mount the finished blossoms onto a twig wreath or string into garland for zero-cost floral decor.' }
      ]
    }
  ];

  let tutorials = [...INITIAL_TUTORIALS];
  let activeCategory = 'all';
  let searchQuery = '';
  let savedOnly = false;
  let activeModalTutorial = null;
  let savedIds = new Set();
  let completedSteps = new Set(); // tracks completed steps: e.g. "plastic-planter-1"

  try {
    const stored = localStorage.getItem('ecoloop_saved_upcycle_crafts');
    if (stored) savedIds = new Set(JSON.parse(stored));
    const storedSteps = localStorage.getItem('ecoloop_completed_steps');
    if (storedSteps) completedSteps = new Set(JSON.parse(storedSteps));
  } catch (e) {}

  function persistSaved() {
    try {
      localStorage.setItem('ecoloop_saved_upcycle_crafts', JSON.stringify([...savedIds]));
    } catch (e) {}
  }

  function persistCompletedSteps() {
    try {
      localStorage.setItem('ecoloop_completed_steps', JSON.stringify([...completedSteps]));
    } catch (e) {}
  }

  function getFallbackThumbnailSvg(title, emoji) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#g)"/>
      <circle cx="160" cy="78" r="30" fill="rgba(255,255,255,0.18)"/>
      <text x="160" y="88" font-size="28" text-anchor="middle" fill="#ffffff">${emoji}</text>
      <text x="160" y="142" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#ecfdf5">${title.replace(/&/g, '&amp;')}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function renderTutorials() {
    const container = document.getElementById('tutorials-list-container');
    if (!container) return;
    const query = searchQuery.trim().toLowerCase();

    const filtered = tutorials.filter(item => {
      if (activeCategory !== 'all' && item.categoryId !== activeCategory) {
        return false;
      }
      if (savedOnly && !savedIds.has(item.id)) {
        return false;
      }
      if (query) {
        const catObj = CATEGORIES.find(c => c.id === item.categoryId);
        const stepsText = (item.steps || []).map(s => `${s.title} ${s.text}`).join(' ');
        const itemsText = (item.itemsNeeded || []).join(' ');
        const haystack = `${item.title} ${item.description} ${item.slotLabel} ${item.channel} ${stepsText} ${itemsText} ${catObj ? catObj.title : ''}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    const countPill = document.getElementById('visible-count-pill');
    if (countPill) countPill.textContent = `${filtered.length} ${filtered.length === 1 ? 'guide' : 'guides'}`;
    const allBadge = document.getElementById('count-badge-all');
    if (allBadge) allBadge.textContent = `${tutorials.length} guides`;
    const savedNum = document.getElementById('saved-count-num');
    if (savedNum) savedNum.textContent = `(${savedIds.size})`;
    const starIcon = document.getElementById('saved-star-icon');
    if (starIcon) starIcon.textContent = savedOnly ? '★' : '☆';

    // Update category badge counts on left
    CATEGORIES.forEach(cat => {
      const countEl = document.getElementById(`count-badge-${cat.id}`);
      if (countEl) {
        const count = tutorials.filter(t => t.categoryId === cat.id).length;
        countEl.textContent = `${count}`;
      }
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-3xl p-10 text-center border border-slate-200/80 space-y-3.5 shadow-sm">
          <div class="text-4xl">♻️</div>
          <h3 class="font-extrabold text-slate-800 text-lg">No matching upcycling guides found</h3>
          <p class="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Try searching for materials from Section 02 like "plastic bottle", "cardboard", "tin can", or "copper wire".
          </p>
          <button type="button" onclick="window.craftsResetAllFilters()" class="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:underline">
            Reset all filters
          </button>
        </div>
      `;
      return;
    }

    let html = '';
    CATEGORIES.forEach(cat => {
      const itemsInCat = filtered.filter(t => t.categoryId === cat.id);
      if (itemsInCat.length === 0) return;

      html += `
        <div class="space-y-3.5">
          <div class="bg-white/95 rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-3">
              <span class="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-lg shrink-0">${cat.emoji}</span>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-extrabold text-slate-900 text-sm sm:text-base">${cat.title}</h3>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">${cat.sectionSlot}</span>
                </div>
                <p class="text-xs text-slate-500 mt-0.5">${cat.description}</p>
              </div>
            </div>
            <span class="text-xs font-mono font-bold px-3 py-1 rounded-full ${cat.badgeClass} border shrink-0 self-start sm:self-auto">
              ${itemsInCat.length} ${itemsInCat.length === 1 ? 'project' : 'projects'}
            </span>
          </div>

          <div class="grid grid-cols-1 gap-3.5">
      `;

      itemsInCat.forEach(item => {
        const isSaved = savedIds.has(item.id);
        const thumbUrl = `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;
        const fallbackSvg = getFallbackThumbnailSvg(item.title, cat.emoji);
        const stepsCount = (item.steps || []).length;

        html += `
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center group">
            
            <!-- Video Thumbnail with Play Overlay -->
            <div class="relative w-full sm:w-48 h-40 sm:h-28 rounded-xl overflow-hidden bg-slate-950 shrink-0 cursor-pointer" onclick="window.craftsOpenVideoModal('${item.id}')">
              <img
                src="${thumbUrl}"
                alt="${item.title}"
                onerror="this.onerror=null;this.src='${fallbackSvg}';"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                <span class="w-10 h-10 rounded-full bg-white/95 text-emerald-800 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all text-xs font-black pl-0.5">
                  ▶
                </span>
              </div>
              <span class="absolute bottom-1.5 right-1.5 text-[10px] font-mono font-bold bg-slate-900/90 text-white px-2 py-0.5 rounded-md backdrop-blur">
                ${item.duration}
              </span>
              <span class="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-600/90 text-white px-2 py-0.5 rounded-md backdrop-blur">
                ${item.format}
              </span>
            </div>

            <!-- Content Details & Action -->
            <div class="flex-1 min-w-0 space-y-2 w-full">
              <div class="flex items-start justify-between gap-2">
                <div class="space-y-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-1.5">
                    <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      ${item.slotLabel}
                    </span>
                    <span class="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      ⏱️ ${item.time} · ${item.difficulty}
                    </span>
                  </div>
                  <h4 class="font-extrabold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                    ${item.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onclick="window.craftsToggleBookmark('${item.id}')"
                  title="${isSaved ? 'Remove from saved' : 'Save tutorial'}"
                  class="text-sm px-2.5 py-1 rounded-full border transition-all shrink-0 ${isSaved ? 'bg-amber-50 border-amber-300 text-amber-600 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'}"
                >
                  ${isSaved ? '★' : '☆'}
                </button>
              </div>

              <p class="text-xs text-slate-600 leading-relaxed line-clamp-2">
                ${item.description}
              </p>

              <!-- Step Guide Preview Bar -->
              <div class="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
                <span class="font-semibold text-slate-500 flex items-center gap-1.5">
                  <span class="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black">✓</span>
                  <span>${stepsCount} Step-by-Step Instructions</span>
                </span>
                <button
                  type="button"
                  onclick="window.craftsOpenVideoModal('${item.id}')"
                  class="font-bold text-emerald-700 hover:text-emerald-800 text-xs inline-flex items-center gap-1"
                >
                  <span>Watch &amp; View Steps</span>
                  <span>→</span>
                </button>
              </div>

            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function selectCategory(catId) {
    activeCategory = catId;

    // Update quick filter pills on top of list
    document.querySelectorAll('.cat-pill').forEach(btn => {
      const isMatch = btn.dataset.pill === catId;
      btn.className = isMatch
        ? 'cat-pill px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-[#059669] text-white shadow-sm'
        : 'cat-pill px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80';
    });

    // Update left category buttons
    document.querySelectorAll('.cat-btn-slot').forEach(btn => {
      const isMatch = btn.dataset.catSlot === catId;
      btn.classList.toggle('bg-slate-900', isMatch);
      btn.classList.toggle('text-white', isMatch);
      btn.classList.toggle('border-slate-900', isMatch);
      btn.classList.toggle('bg-white', !isMatch);
      btn.classList.toggle('text-slate-800', !isMatch);
      btn.classList.toggle('border-slate-200/90', !isMatch);
    });

    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) resetBtn.classList.toggle('hidden', catId === 'all');

    renderTutorials();
  }

  function handleSearchInput(val) {
    searchQuery = val || '';
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.classList.toggle('hidden', !searchQuery);
    renderTutorials();
  }

  function clearSearch() {
    searchQuery = '';
    const input = document.getElementById('craft-search-input');
    if (input) input.value = '';
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.classList.add('hidden');
    renderTutorials();
  }

  function toggleSavedFilter() {
    savedOnly = !savedOnly;
    const btn = document.getElementById('saved-only-btn');
    if (btn) {
      btn.classList.toggle('bg-amber-50', savedOnly);
      btn.classList.toggle('text-amber-800', savedOnly);
      btn.classList.toggle('border-amber-300', savedOnly);
    }
    renderTutorials();
  }

  function resetAllFilters() {
    activeCategory = 'all';
    searchQuery = '';
    savedOnly = false;
    const input = document.getElementById('craft-search-input');
    if (input) input.value = '';
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.classList.add('hidden');
    const savedBtn = document.getElementById('saved-only-btn');
    if (savedBtn) {
      savedBtn.classList.remove('bg-amber-50', 'text-amber-800', 'border-amber-300');
    }
    selectCategory('all');
  }

  function toggleBookmark(itemId) {
    if (savedIds.has(itemId)) {
      savedIds.delete(itemId);
    } else {
      savedIds.add(itemId);
    }
    persistSaved();
    renderTutorials();
    if (activeModalTutorial && activeModalTutorial.id === itemId) {
      updateModalBookmarkButton(itemId);
    }
  }

  function updateModalBookmarkButton(itemId) {
    const starEl = document.getElementById('modal-bookmark-star');
    const btn = document.getElementById('modal-bookmark-btn');
    const isSaved = savedIds.has(itemId);
    if (starEl) starEl.textContent = isSaved ? '★' : '☆';
    if (btn) {
      btn.classList.toggle('bg-amber-50', isSaved);
      btn.classList.toggle('border-amber-300', isSaved);
      btn.classList.toggle('text-amber-800', isSaved);
    }
  }

  function toggleStepCompletion(stepKey) {
    if (completedSteps.has(stepKey)) {
      completedSteps.delete(stepKey);
    } else {
      completedSteps.add(stepKey);
    }
    persistCompletedSteps();
    if (activeModalTutorial) {
      renderModalSteps(activeModalTutorial);
    }
  }

  function renderModalSteps(item) {
    const container = document.getElementById('modal-steps-container');
    const progressEl = document.getElementById('modal-steps-progress');
    if (!container || !item.steps) return;

    const total = item.steps.length;
    let completedCount = 0;

    const html = item.steps.map((step, idx) => {
      const stepKey = `${item.id}-${idx + 1}`;
      const isDone = completedSteps.has(stepKey);
      if (isDone) completedCount++;

      return `
        <div class="rounded-2xl p-3.5 border transition-all ${isDone ? 'bg-emerald-50/70 border-emerald-300 shadow-sm' : 'bg-slate-50 border-slate-200/90'} flex items-start gap-3">
          <button
            type="button"
            onclick="window.craftsToggleStep('${stepKey}')"
            class="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-all ${isDone ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white border border-slate-300 text-slate-600 hover:border-emerald-500'}"
            title="${isDone ? 'Click to unmark' : 'Click to mark complete'}"
          >
            ${isDone ? '✓' : String(idx + 1).padStart(2, '0')}
          </button>
          <div class="flex-1 min-w-0 space-y-0.5 cursor-pointer" onclick="window.craftsToggleStep('${stepKey}')">
            <div class="flex items-center justify-between gap-2">
              <h5 class="text-xs font-extrabold uppercase tracking-wide ${isDone ? 'text-emerald-900 line-through' : 'text-slate-800'}">
                Step ${idx + 1}: ${step.title}
              </h5>
              <span class="text-[10px] font-semibold text-emerald-700 ${isDone ? 'inline' : 'hidden'}">Done ✓</span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed ${isDone ? 'text-slate-500' : ''}">
              ${step.text}
            </p>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
    if (progressEl) {
      progressEl.textContent = `${completedCount} / ${total} completed`;
      progressEl.classList.toggle('bg-emerald-600', completedCount === total);
      progressEl.classList.toggle('text-white', completedCount === total);
    }
  }

  function openVideoModal(itemId) {
    const item = tutorials.find(t => t.id === itemId);
    if (!item) return;
    activeModalTutorial = item;

    const cat = CATEGORIES.find(c => c.id === item.categoryId);

    // Badges & text
    const modalCatBadge = document.getElementById('modal-cat-badge');
    if (modalCatBadge) modalCatBadge.textContent = cat ? `${cat.emoji} ${cat.title}` : 'Upcycling Guide';

    const slotBadge = document.getElementById('modal-slot-badge');
    if (slotBadge) slotBadge.textContent = item.slotLabel || (cat ? cat.sectionSlot : 'Section 02 Material');

    const titleEl = document.getElementById('modal-craft-title');
    if (titleEl) titleEl.textContent = item.title;

    const chanEl = document.getElementById('modal-craft-channel');
    if (chanEl) chanEl.textContent = `Tutorial by ${item.channel}`;

    const descEl = document.getElementById('modal-craft-desc');
    if (descEl) descEl.textContent = item.description;

    const timeBadge = document.getElementById('modal-time-badge');
    if (timeBadge) timeBadge.textContent = `⏱️ ${item.time || '15 Mins'}`;

    const diffBadge = document.getElementById('modal-difficulty-badge');
    if (diffBadge) diffBadge.textContent = `🟢 ${item.difficulty || 'Beginner'}`;

    const ecoTip = document.getElementById('modal-eco-tip');
    if (ecoTip) ecoTip.textContent = item.ecoTip || 'Upcycling household recyclables directly prevents extraction of new virgin materials.';

    const directLink = document.getElementById('modal-youtube-direct-link');
    if (directLink) directLink.href = item.url;

    // Materials needed list
    const itemsList = document.getElementById('modal-items-list');
    if (itemsList && item.itemsNeeded) {
      itemsList.innerHTML = item.itemsNeeded.map(m => `
        <span class="inline-flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full font-semibold text-slate-700 shadow-2xs">
          ${m}
        </span>
      `).join('');
    }

    // Step-by-step roadmap
    renderModalSteps(item);

    // YouTube iframe
    const iframe = document.getElementById('modal-youtube-iframe');
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`;
    }

    updateModalBookmarkButton(item.id);

    const modal = document.getElementById('video-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) modal.classList.add('hidden');
    const iframe = document.getElementById('modal-youtube-iframe');
    if (iframe) iframe.src = 'about:blank';
    document.body.style.overflow = '';
    activeModalTutorial = null;
  }

  function toggleCurrentModalBookmark() {
    if (activeModalTutorial) {
      toggleBookmark(activeModalTutorial.id);
    }
  }

  function copyModalLink() {
    if (!activeModalTutorial) return;
    const textToCopy = `EcoLoop Step-by-Step Upcycle Guide: ${activeModalTutorial.title} (${activeModalTutorial.url})`;
    navigator.clipboard?.writeText(textToCopy).then(() => {
      const btnText = document.getElementById('modal-copy-btn-text');
      if (btnText) {
        btnText.textContent = 'Copied to Clipboard! ✓';
        setTimeout(() => { if (btnText) btnText.textContent = 'Copy Guide'; }, 2000);
      }
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
    }
  });

  // Expose global window API for inline onclick handlers
  window.craftsSelectCategory = selectCategory;
  window.craftsHandleSearchInput = handleSearchInput;
  window.craftsClearSearch = clearSearch;
  window.craftsToggleSavedFilter = toggleSavedFilter;
  window.craftsResetAllFilters = resetAllFilters;
  window.craftsToggleBookmark = toggleBookmark;
  window.craftsToggleStep = toggleStepCompletion;
  window.craftsOpenVideoModal = openVideoModal;
  window.craftsCloseVideoModal = closeVideoModal;
  window.craftsToggleCurrentModalBookmark = toggleCurrentModalBookmark;
  window.craftsCopyModalLink = copyModalLink;

  document.addEventListener('DOMContentLoaded', () => {
    renderTutorials();
  });
})();
