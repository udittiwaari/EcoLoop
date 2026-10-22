/* ==========================================================================
   EcoLoop — Section 05: Curated Video Library (DIY Paper Crafts)
   ========================================================================== */

(function () {
  const CATEGORIES = [
    {
      id: 'no-glue-no-tape',
      emoji: '🚫✂️',
      title: 'Without Glue & Without Tape (Pure Origami)',
      description: 'These crafts rely purely on paper folding techniques to hold their shape.',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      headerBg: 'bg-emerald-500'
    },
    {
      id: 'with-glue',
      emoji: '💧',
      title: 'With Glue (No Tape)',
      description: 'These crafts use liquid glue, glue sticks, or craft glue to attach intricate paper parts together.',
      badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
      headerBg: 'bg-sky-500'
    },
    {
      id: 'with-tape',
      emoji: '📼',
      title: 'With Tape (Clear Tape, Washi Tape, or Double-Sided Tape)',
      description: 'These crafts specifically utilize tape to create structural shapes or squishy textures that glue cannot achieve.',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
      headerBg: 'bg-amber-500'
    },
    {
      id: 'both-glue-tape',
      emoji: '🛠️',
      title: 'With Both Glue & Tape',
      description: 'For more complex structures that need the fast hold of tape and the permanent bond of glue.',
      badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
      headerBg: 'bg-purple-500'
    }
  ];

  const INITIAL_TUTORIALS = [
    {
      id: 'jumping-frog',
      categoryId: 'no-glue-no-tape',
      title: 'Origami Jumping Frog',
      featuredLink: true,
      description: 'A classic, fun paper toy that actually jumps when you press its back.',
      materialsTag: 'Paper only • Pure Origami',
      channel: 'Crafts And Kutir',
      videoId: 'q8Zz3R08o7E',
      url: 'https://www.youtube.com/shorts/q8Zz3R08o7E',
      format: 'YouTube Short'
    },
    {
      id: 'paper-crown',
      categoryId: 'no-glue-no-tape',
      title: 'Paper Crown',
      featuredLink: false,
      description: 'A wearable paper crown made using just standard A4 paper folded together without any adhesives.',
      materialsTag: 'Standard A4 Paper • No Adhesives',
      channel: 'Apple art & craft',
      videoId: 'WwWCq82Iztw',
      url: 'https://www.youtube.com/watch?v=WwWCq82Iztw',
      format: 'Full Tutorial'
    },
    {
      id: 'paper-knife-sword',
      categoryId: 'no-glue-no-tape',
      title: 'Origami Paper Knife/Sword',
      featuredLink: false,
      description: 'A cool folded paper craft that looks like a ninja sword or knife, using interlocking paper folds.',
      materialsTag: 'Paper only • Interlocking Folds',
      channel: 'Duuings for All',
      videoId: 'ay5u6MLs2r0',
      url: 'https://www.youtube.com/watch?v=ay5u6MLs2r0',
      format: 'Full Tutorial'
    },
    {
      id: 'mini-flip-notebook',
      categoryId: 'no-glue-no-tape',
      title: 'Mini Flip Paper Notebook',
      featuredLink: false,
      description: 'A tiny, cute pocket notebook made by smartly cutting and tucking the paper pages into a cover.',
      materialsTag: 'Paper + Scissors • Tuck Binding',
      channel: 'Craftz Talent',
      videoId: 'AyGqNIJByjE',
      url: 'https://www.youtube.com/watch?v=AyGqNIJByjE',
      format: 'Full Tutorial'
    },
    {
      id: 'easy-paper-flowers',
      categoryId: 'with-glue',
      title: 'Easy DIY Paper Flowers',
      featuredLink: true,
      description: 'Beautiful fringed paper flowers built by wrapping and gluing fringed paper around a stem.',
      materialsTag: 'Colored Paper + Craft Glue',
      channel: 'VIKI Studio Crafts',
      videoId: '2dHhvV18eX8',
      url: 'https://youtu.be/2dHhvV18eX8',
      format: 'Full Tutorial'
    },
    {
      id: 'paper-butterfly-decor',
      categoryId: 'with-glue',
      title: 'Paper Butterfly Wall Decor',
      featuredLink: false,
      description: '3D paper butterflies made by folding paper like an accordion and gluing the center joints together.',
      materialsTag: 'Paper + Glue Stick / Liquid Glue',
      channel: 'Red Ted Art',
      videoId: 'wxZzr9IU1nU',
      url: 'https://www.youtube.com/watch?v=wxZzr9IU1nU',
      format: 'Full Tutorial'
    },
    {
      id: 'cute-tape-squishies',
      categoryId: 'with-tape',
      title: 'Cute Tape Squishies',
      featuredLink: false,
      description: 'Creating a 3D squishy toy by layering clear tape over paper cutouts and stuffing it with cotton or plastic bags.',
      materialsTag: 'Paper Cutouts + Clear Tape + Stuffing',
      channel: 'Fati Craft World',
      videoId: 'AMBKSZkn0Ao',
      url: 'https://www.youtube.com/watch?v=AMBKSZkn0Ao',
      format: 'YouTube Short'
    },
    {
      id: 'cello-tape-ice-cubes',
      categoryId: 'with-tape',
      title: 'Cello Tape Ice Cubes',
      featuredLink: false,
      description: 'A viral craft where you fold and assemble thick clear tape into a perfectly square hollow box that looks exactly like a glass ice cube.',
      materialsTag: 'Thick Clear Cello Tape',
      channel: 'Jannat Crafting And Art',
      videoId: 'xgKzwVqIV5s',
      url: 'https://www.youtube.com/shorts/xgKzwVqIV5s',
      format: 'YouTube Short'
    },
    {
      id: 'endless-magic-strip',
      categoryId: 'both-glue-tape',
      title: 'Endless Paper Magic Strip (Kaleidocycle)',
      featuredLink: false,
      description: 'A mesmerizing 3D geometric paper toy that flexes and rotates endlessly. It requires tape for the hinges and glue to assemble the paper modules.',
      materialsTag: 'Paper Modules + Tape Hinges + Glue',
      channel: 'Art to Crafts',
      videoId: 'XoVx6aIphIY',
      url: 'https://www.youtube.com/shorts/XoVx6aIphIY',
      format: 'YouTube Short'
    }
  ];

  let tutorials = [...INITIAL_TUTORIALS];
  let activeCategory = 'all';
  let searchQuery = '';
  let savedOnly = false;
  let savedIds = new Set();

  try {
    const rawSaved = localStorage.getItem('ecoloop_saved_paper_crafts');
    if (rawSaved) {
      JSON.parse(rawSaved).forEach(id => savedIds.add(id));
    }
  } catch (e) {}

  function persistSavedIds() {
    try {
      localStorage.setItem('ecoloop_saved_paper_crafts', JSON.stringify([...savedIds]));
    } catch (e) {}
  }

  function getFallbackThumbnailSvg(title, emoji) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#g)"/>
      <circle cx="160" cy="78" r="30" fill="rgba(255,255,255,0.14)"/>
      <text x="160" y="88" font-size="26" text-anchor="middle" fill="#ffffff">${emoji}</text>
      <text x="160" y="142" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#f8fafc">${title.replace(/&/g, '&amp;')}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function renderTutorials() {
    const container = document.getElementById('tutorials-list-container');
    if (!container) return;
    const query = searchQuery.trim().toLowerCase();

    const filtered = tutorials.filter(item => {
      if (activeCategory === 'featured') {
        if (!item.featuredLink) return false;
      } else if (activeCategory !== 'all' && item.categoryId !== activeCategory) {
        return false;
      }
      if (savedOnly && !savedIds.has(item.id)) {
        return false;
      }
      if (query) {
        const catObj = CATEGORIES.find(c => c.id === item.categoryId);
        const haystack = `${item.title} ${item.description} ${item.materialsTag} ${item.channel} ${catObj ? catObj.title : ''}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    const countPill = document.getElementById('visible-count-pill');
    if (countPill) countPill.textContent = `${filtered.length} ${filtered.length === 1 ? 'video' : 'videos'}`;
    const allBadge = document.getElementById('count-badge-all');
    if (allBadge) allBadge.textContent = `${tutorials.length} videos`;
    const savedNum = document.getElementById('saved-count-num');
    if (savedNum) savedNum.textContent = `(${savedIds.size})`;
    const starIcon = document.getElementById('saved-star-icon');
    if (starIcon) starIcon.textContent = savedOnly ? '★' : '☆';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-2xl p-8 text-center border border-slate-200/80 space-y-3">
          <div class="text-3xl">📄</div>
          <h3 class="font-bold text-slate-800 text-base">No matching paper craft tutorials found</h3>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">
            Try clearing your search query or switching back to "All DIY Paper Craft Ideas".
          </p>
          <button type="button" onclick="window.craftsResetAllFilters()" class="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#2563eb] hover:underline">
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
        <div class="space-y-3">
          <div class="bg-white/90 rounded-2xl p-3.5 border border-slate-200/90 shadow-sm">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-base">${cat.emoji}</span>
                <h3 class="font-extrabold text-slate-900 text-sm sm:text-base">${cat.title}</h3>
              </div>
              <span class="text-[11px] font-mono-code font-semibold px-2.5 py-0.5 rounded-full ${cat.badgeClass} border shrink-0">
                ${itemsInCat.length} ${itemsInCat.length === 1 ? 'craft' : 'crafts'}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">${cat.description}</p>
          </div>
          <div class="space-y-3">
      `;

      itemsInCat.forEach(item => {
        const isSaved = savedIds.has(item.id);
        const thumbUrl = `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;
        const fallbackSvg = getFallbackThumbnailSvg(item.title, cat.emoji);

        html += `
          <div class="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:shadow-md hover:border-blue-200 transition-all group">
            <div class="relative w-full sm:w-40 h-36 sm:h-24 rounded-xl overflow-hidden bg-slate-900 shrink-0 cursor-pointer" onclick="window.craftsOpenVideoModal('${item.id}')">
              <img
                src="${thumbUrl}"
                alt="${item.title}"
                onerror="this.onerror=null;this.src='${fallbackSvg}';"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95"
              />
              <div class="absolute inset-0 bg-slate-950/25 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                <span class="w-9 h-9 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform text-xs font-bold pl-0.5">
                  ▶
                </span>
              </div>
              <span class="absolute bottom-1.5 right-1.5 text-[10px] font-mono-code font-semibold bg-slate-900/85 text-white px-2 py-0.5 rounded-md">
                ${item.format}
              </span>
            </div>

            <div class="flex-1 min-w-0 space-y-1.5 w-full">
              <div class="flex items-start justify-between gap-2">
                <div class="flex flex-wrap items-center gap-1.5">
                  <h4 class="font-bold text-slate-900 text-base leading-snug">
                    ${item.title}
                  </h4>
                  ${item.featuredLink ? `<span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">★ Your link!</span>` : ''}
                </div>
                <button
                  type="button"
                  onclick="window.craftsToggleBookmark('${item.id}')"
                  title="${isSaved ? 'Remove from saved' : 'Save tutorial'}"
                  class="text-sm px-2 py-0.5 rounded-full border transition-all shrink-0 ${isSaved ? 'bg-amber-50 border-amber-300 text-amber-600 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'}"
                >
                  ${isSaved ? '★' : '☆'}
                </button>
              </div>

              <p class="text-xs text-slate-600 leading-relaxed">
                ${item.description}
              </p>

              <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="inline-block text-[11px] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
                    ${item.materialsTag}
                  </span>
                  <span class="text-[11px] text-slate-400 font-medium">
                    • ${item.channel}
                  </span>
                </div>

                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    onclick="window.craftsOpenVideoModal('${item.id}')"
                    class="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                  >
                    <span>Preview</span>
                  </button>
                  <a
                    href="${item.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs font-bold text-[#2563eb] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Watch Tutorial</span>
                    <span>↗</span>
                  </a>
                </div>
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

    const allCatBtns = ['all', 'no-glue-no-tape', 'with-glue', 'with-tape', 'both-glue-tape'];
    allCatBtns.forEach(id => {
      const btn = document.getElementById(`cat-btn-${id}`);
      if (!btn) return;
      if (id === catId) {
        btn.className = 'w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 bg-[#1e293b] text-white border-[#1e293b] shadow-sm';
      } else {
        btn.className = 'w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90 shadow-sm';
      }
    });

    document.querySelectorAll('.cat-pill').forEach(pill => {
      const pillCat = pill.getAttribute('data-pill');
      if (pillCat === catId) {
        pill.className = 'cat-pill px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-[#2563eb] text-white';
      } else {
        pill.className = 'cat-pill px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80';
      }
    });

    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) {
      if (catId !== 'all' || searchQuery || savedOnly) {
        resetBtn.classList.remove('hidden');
      } else {
        resetBtn.classList.add('hidden');
      }
    }

    renderTutorials();
  }

  function handleSearchInput(val) {
    searchQuery = val;
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) {
      if (val.trim().length > 0) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
    }
    renderTutorials();
  }

  function clearSearch() {
    const input = document.getElementById('craft-search-input');
    if (input) input.value = '';
    handleSearchInput('');
  }

  function toggleSavedFilter() {
    savedOnly = !savedOnly;
    const btn = document.getElementById('saved-only-btn');
    if (btn) {
      if (savedOnly) {
        btn.className = 'px-3 py-2 rounded-full text-xs font-semibold border transition-all bg-amber-100 text-amber-900 border-amber-300 inline-flex items-center gap-1 shrink-0';
      } else {
        btn.className = 'px-3 py-2 rounded-full text-xs font-semibold border transition-all bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50 inline-flex items-center gap-1 shrink-0';
      }
    }
    renderTutorials();
  }

  function resetAllFilters() {
    savedOnly = false;
    const btn = document.getElementById('saved-only-btn');
    if (btn) btn.className = 'px-3 py-2 rounded-full text-xs font-semibold border transition-all bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50 inline-flex items-center gap-1 shrink-0';
    clearSearch();
    selectCategory('all');
  }

  function toggleBookmark(itemId) {
    if (savedIds.has(itemId)) {
      savedIds.delete(itemId);
      showLocalToast('Removed from your saved tutorials');
    } else {
      savedIds.add(itemId);
      showLocalToast('Saved to your EcoLoop tutorials!');
    }
    persistSavedIds();
    renderTutorials();
  }

  function openVideoModal(itemId) {
    const item = tutorials.find(t => t.id === itemId);
    if (!item) return;
    const cat = CATEGORIES.find(c => c.id === item.categoryId);

    const modalCatBadge = document.getElementById('modal-cat-badge');
    if (modalCatBadge) modalCatBadge.textContent = cat ? `${cat.emoji} ${cat.title}` : 'DIY Paper Craft';

    const featBadge = document.getElementById('modal-featured-badge');
    if (featBadge) {
      if (item.featuredLink) featBadge.classList.remove('hidden');
      else featBadge.classList.add('hidden');
    }

    const titleEl = document.getElementById('modal-craft-title');
    if (titleEl) titleEl.textContent = item.title;
    const chanEl = document.getElementById('modal-craft-channel');
    if (chanEl) chanEl.textContent = `YouTube Channel: ${item.channel}`;
    const descEl = document.getElementById('modal-craft-desc');
    if (descEl) descEl.textContent = item.description;
    const matEl = document.getElementById('modal-craft-materials');
    if (matEl) matEl.textContent = item.materialsTag;
    const typeEl = document.getElementById('modal-video-type');
    if (typeEl) typeEl.textContent = item.format;
    const directLink = document.getElementById('modal-youtube-direct-link');
    if (directLink) directLink.href = item.url;

    const iframe = document.getElementById('modal-youtube-iframe');
    if (iframe) iframe.src = `https://www.youtube.com/embed/${item.videoId}?rel=0`;

    const modal = document.getElementById('video-modal');
    if (modal) modal.classList.remove('hidden');
  }

  function closeVideoModal() {
    const iframe = document.getElementById('modal-youtube-iframe');
    if (iframe) iframe.src = 'about:blank';
    const modal = document.getElementById('video-modal');
    if (modal) modal.classList.add('hidden');
  }

  function openAddVideoModal() {
    const modal = document.getElementById('add-video-modal');
    if (modal) modal.classList.remove('hidden');
  }

  function closeAddVideoModal() {
    const modal = document.getElementById('add-video-modal');
    if (modal) modal.classList.add('hidden');
  }

  function extractYouTubeId(url) {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '2dHhvV18eX8';
  }

  function submitNewTutorial(e) {
    e.preventDefault();
    const title = document.getElementById('new-craft-title')?.value.trim();
    const categoryId = document.getElementById('new-craft-category')?.value;
    const url = document.getElementById('new-craft-url')?.value.trim();
    const description = document.getElementById('new-craft-desc')?.value.trim();
    if (!title || !url) return;

    const videoId = extractYouTubeId(url);
    const newItem = {
      id: 'custom-' + Date.now(),
      categoryId,
      title,
      featuredLink: false,
      description,
      materialsTag: 'Community Shared Paper Craft',
      channel: 'EcoLoop Community',
      videoId,
      url,
      format: url.includes('/shorts/') ? 'YouTube Short' : 'Full Tutorial'
    };

    tutorials.unshift(newItem);
    document.getElementById('add-video-form')?.reset();
    closeAddVideoModal();
    selectCategory(categoryId);
    showLocalToast(`Added "${title}" to Curated Video Library!`);
  }

  let toastTimer = null;
  function showLocalToast(msg) {
    const banner = document.getElementById('toast-banner');
    const text = document.getElementById('toast-message');
    if (banner && text) {
      text.textContent = msg;
      banner.classList.remove('hidden');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        banner.classList.add('hidden');
      }, 3200);
    } else if (typeof window.showToast === 'function') {
      window.showToast(msg, true);
    }
  }

  // Export functions to window
  window.craftsSelectCategory = selectCategory;
  window.craftsHandleSearchInput = handleSearchInput;
  window.craftsClearSearch = clearSearch;
  window.craftsToggleSavedFilter = toggleSavedFilter;
  window.craftsResetAllFilters = resetAllFilters;
  window.craftsToggleBookmark = toggleBookmark;
  window.craftsOpenVideoModal = openVideoModal;
  window.craftsCloseVideoModal = closeVideoModal;
  window.craftsOpenAddVideoModal = openAddVideoModal;
  window.craftsCloseAddVideoModal = closeAddVideoModal;
  window.craftsSubmitNewTutorial = submitNewTutorial;

  document.addEventListener('DOMContentLoaded', () => {
    renderTutorials();
  });
})();
