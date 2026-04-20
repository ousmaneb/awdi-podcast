// ===== AWDI PODCAST — Main JS v3 =====

/* ── Global toast notification ── */
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ${message}`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3000);
}

/* ── bfcache: remove page-exiting on restore ── */
window.addEventListener('pageshow', (e) => {
  if (e.persisted) document.body.classList.remove('page-exiting');
});

// ─────────────────────────────────────────────────────
// RENDER FUNCTIONS — all content comes from AWDI_DATA
// ─────────────────────────────────────────────────────

/* Episode card HTML — reusable component */
function renderEpisodeCard(ep) {
  const thumb = `https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`;
  return `
    <article class="ep-card reveal-hidden" data-tag="${ep.tag}">
      <a href="${ep.youtubeUrl}" target="_blank" rel="noopener" class="ep-card-thumb" aria-label="Regarder ${ep.title}">
        <img src="${thumb}" alt="${ep.title}" loading="lazy" />
<span class="ep-card-play-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,0.95)"/>
            <polygon points="10 8 17 12 10 16 10 8" fill="#1B6B3A"/>
          </svg>
        </span>
      </a>
      <div class="ep-card-body">
        <div class="ep-card-tags">
          <span class="ep-tag">${ep.tag}</span>
          <span class="ep-duration">${ep.duration}</span>
        </div>
        <h3 class="ep-card-title">${ep.title}</h3>
        <p class="ep-card-date">${ep.date}</p>
        <div class="ep-card-links">
          <a href="${ep.spotifyUrl}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="#1DB954" width="12" height="12"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Spotify
          </a>
          <a href="${ep.youtubeUrl}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="#FF0000" width="12" height="12"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            YouTube
          </a>
        </div>
      </div>
    </article>`;
}

/* Render featured episode (the latest with featured:true) */
function renderFeaturedEpisode() {
  const el = document.getElementById('featured-ep-section');
  if (!el || !window.AWDI_DATA) return;
  const ep = AWDI_DATA.episodes.find(e => e.featured) || AWDI_DATA.episodes[0];
  if (!ep) return;

  el.innerHTML = `
    <div class="featured-ep-inner">
      <div class="featured-ep-thumb">
        <img src="https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg"
             alt="${ep.title}" loading="eager" decoding="async" />
        <a href="${ep.youtubeUrl}" target="_blank" rel="noopener"
           class="featured-ep-play" aria-label="Regarder sur YouTube">
          <div class="play-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#1B6B3A"><polygon points="6 4 20 12 6 20 6 4"/></svg>
          </div>
        </a>
      </div>
      <div class="featured-ep-info">
        <div class="featured-ep-badge">
          <span class="live-dot"></span>
          Dernier épisode
        </div>
        <h2 class="featured-ep-title" id="featured-ep-title">${ep.title}</h2>
        <p class="featured-ep-desc">${ep.excerpt}</p>
        <div class="featured-ep-meta">
          <span class="ep-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${ep.duration}
          </span>
          <span class="ep-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${ep.date}
          </span>
          <span class="ep-meta-item" style="color:rgba(110,231,160,0.65);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${ep.tag}
          </span>
        </div>
        <div class="featured-ep-actions">
          <a href="${ep.spotifyUrl}" target="_blank" rel="noopener" class="btn-spotify">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Écouter sur Spotify
          </a>
          <a href="${ep.youtubeUrl}" target="_blank" rel="noopener" class="btn-youtube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Voir sur YouTube
          </a>
        </div>
      </div>
    </div>`;
}

/* Render episode marquee ticker */
function renderMarquee() {
  const el = document.getElementById('ep-marquee');
  if (!el || !window.AWDI_DATA) return;
  const items = AWDI_DATA.episodes
    .map(ep => `<span class="ep-marquee-item">${ep.title}</span><span class="ep-marquee-dot">◆</span>`)
    .join('');
  el.innerHTML = `<div class="ep-marquee-track">${items}${items}</div>`;
}

/* Render episode filter chips */
const EP_PAGE_SIZE = 6;
let epActiveTag = 'Tous';
let epShown = EP_PAGE_SIZE;

function renderEpisodeFilters() {
  const el = document.getElementById('ep-filters');
  if (!el || !window.AWDI_DATA) return;
  const tags = ['Tous', ...new Set(AWDI_DATA.episodes.map(e => e.tag))];
  el.innerHTML = tags.map(tag => `
    <button class="ep-filter-btn${tag === epActiveTag ? ' active' : ''}"
            data-tag="${tag}"
            style="font-size:12px;font-weight:600;letter-spacing:.04em;
                   padding:7px 16px;border-radius:999px;cursor:pointer;
                   border:1.5px solid ${tag === epActiveTag ? 'var(--green)' : 'var(--border-2)'};
                   background:${tag === epActiveTag ? 'var(--green-pale)' : 'var(--white)'};
                   color:${tag === epActiveTag ? 'var(--green)' : 'var(--ink-3)'};
                   transition:all 150ms ease;">
      ${tag}
    </button>`).join('');

  el.querySelectorAll('.ep-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      epActiveTag = btn.dataset.tag;
      epShown = EP_PAGE_SIZE;
      renderEpisodeFilters();
      renderEpisodes();
    });
  });
}

/* Render episode grid (with pagination) */
function renderEpisodes() {
  const grid = document.getElementById('ep-grid');
  const moreWrap = document.getElementById('ep-load-more');
  if (!grid || !window.AWDI_DATA) return;

  const filtered = epActiveTag === 'Tous'
    ? AWDI_DATA.episodes
    : AWDI_DATA.episodes.filter(ep => ep.tag === epActiveTag);

  const visible = filtered.slice(0, epShown);
  grid.innerHTML = visible.map(renderEpisodeCard).join('');

  if (moreWrap) {
    moreWrap.style.display = filtered.length > epShown ? 'block' : 'none';
  }

  // Re-observe new cards for reveal animation
  if (window._revealObserver) {
    grid.querySelectorAll('.reveal-hidden').forEach(el => window._revealObserver.observe(el));
  }
}

/* Render topics grid */
function renderTopics() {
  const el = document.getElementById('topics-grid');
  if (!el || !window.AWDI_DATA) return;
  el.innerHTML = AWDI_DATA.topics.map(t => `
    <div class="topic-item">
      <div class="topic-icon">${t.icon}</div>
      <div class="topic-label">${t.label}</div>
      <p class="topic-desc">${t.desc}</p>
    </div>`).join('');
}

/* Render stats strip */
function renderStats() {
  const el = document.getElementById('stats-grid');
  if (!el || !window.AWDI_DATA) return;
  el.innerHTML = AWDI_DATA.stats.map(s => `
    <div class="stat-item">
      <div class="stat-number"
           ${s.count ? `data-count="${s.count}" data-suffix="${s.suffix || ''}"` : ''}>
        ${s.display || (s.count + (s.suffix || ''))}
      </div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');
}

/* Render testimonials */
function renderTestimonials() {
  const el = document.getElementById('testimonials-grid');
  if (!el || !window.AWDI_DATA) return;
  el.innerHTML = AWDI_DATA.testimonials.map(t => `
    <div class="testimonial-card reveal-hidden">
      <div class="testimonial-quote-icon">"</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initial}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>`).join('');
}

/* Render blog articles */
function renderArticles() {
  const el = document.getElementById('blog-grid');
  if (!el || !window.AWDI_DATA) return;
  el.innerHTML = AWDI_DATA.articles.map(a => `
    <a href="${a.url}" class="blog-card reveal-hidden">
      <div class="blog-card-img">
        <img src="${a.image}" alt="${a.title}" loading="lazy" />
      </div>
      <div class="blog-card-body">
        <span class="blog-tag">${a.tag}</span>
        <h3 class="blog-card-title">${a.title}</h3>
        <p class="blog-card-excerpt">${a.excerpt}</p>
        <div class="blog-meta">
          <span class="blog-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${a.date}
          </span>
          <span class="blog-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${a.readTime} de lecture
          </span>
        </div>
      </div>
    </a>`).join('');
}

/* Render FAQ accordion */
function renderFAQ() {
  const el = document.getElementById('faq-list');
  if (!el || !window.AWDI_DATA) return;
  el.innerHTML = AWDI_DATA.faq.map(item => `
    <div class="faq-item">
      <button class="faq-question">
        ${item.q}
        <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="faq-answer">
        <div class="faq-answer-inner">${item.a}</div>
      </div>
    </div>`).join('');

  el.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      el.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ─────────────────────────────────────────────────────
// BOOTSTRAP
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  /* Safety: remove any stuck page-exiting class */
  document.body.classList.remove('page-exiting');

  /* ── MOBILE DETECTION ── */
  const isMobile = window.innerWidth <= 768;

  /* ── RENDER ALL DYNAMIC SECTIONS ── */
  renderFeaturedEpisode();
  renderMarquee();
  renderEpisodeFilters();
  renderEpisodes();
  renderTopics();
  renderStats();
  renderTestimonials();
  renderArticles();
  renderFAQ();

  /* ── LOAD MORE EPISODES ── */
  const loadMoreBtn = document.getElementById('ep-load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      epShown += EP_PAGE_SIZE;
      renderEpisodes();
    });
  }

  /* ── SCROLL PROGRESS ── */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ── NAVBAR SCROLL STATE ── */
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  if (navbar) {
    window.addEventListener('scroll', () => {
      const cur = window.scrollY;
      navbar.classList.toggle('scrolled', cur > 20);
      lastScroll = cur <= 0 ? 0 : cur;
    }, { passive: true });
  }

  /* ── DARK MODE ── */
  const saved = localStorage.getItem('awdi-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  const sunIcon  = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  const darkToggle = document.createElement('button');
  darkToggle.id = 'dark-toggle';
  darkToggle.setAttribute('aria-label', 'Changer le thème');
  darkToggle.innerHTML = saved === 'dark' ? sunIcon : moonIcon;
  const navRight = document.querySelector('.nav-right');
  if (navRight) navRight.prepend(darkToggle);

  darkToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('awdi-theme', next);
    darkToggle.innerHTML = next === 'dark' ? sunIcon : moonIcon;
  });

  /* ── ACTIVE NAV LINK ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html'))
      a.classList.add('active');
  });

  /* ── MOBILE MENU ── */
  const mobileBtn = document.querySelector('.nav-mobile-btn');
  const navLinks  = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    const menuIcon  = `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    const closeIcon = `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function closeMenu() {
      navLinks.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', 'false');
      mobileBtn.innerHTML = menuIcon;
      document.body.style.overflow = '';
      overlay.classList.remove('show');
    }

    mobileBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', open);
      mobileBtn.innerHTML = open ? closeIcon : menuIcon;
      document.body.style.overflow = open ? 'hidden' : '';
      overlay.classList.toggle('show', open);
    });

    overlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ── REVEAL ANIMATIONS (desktop only) ── */
  if (!isMobile) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add('revealed'), +(entry.target.dataset.delay || 0));
        revealObs.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal-hidden').forEach((el, i) => {
      el.dataset.delay = (i % 4) * 80;
      revealObs.observe(el);
    });

    window._revealObserver = revealObs;
    setTimeout(() => document.querySelectorAll('.reveal-hidden:not(.revealed)').forEach(el => el.classList.add('revealed')), 2500);
  }

  /* ── ANIMATED COUNTERS ── */
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      if (!target) return;
      const start = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      const tick = now => {
        const t = Math.min((now - start) / 2000, 1);
        const val = Math.floor(ease(t) * target);
        el.textContent = (target >= 1000 ? val.toLocaleString('fr-FR') : val) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = (target >= 1000 ? target.toLocaleString('fr-FR') : target) + suffix;
      };
      requestAnimationFrame(tick);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));

  /* ── YOUTUBE FACADE (click-to-embed) ── */
  document.addEventListener('click', e => {
    const facade = e.target.closest('.yt-facade');
    if (!facade) return;
    const vid = facade.dataset.vid;
    if (!vid) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`;
    iframe.title = 'Awdi Podcast — YouTube';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;';
    facade.innerHTML = '';
    facade.appendChild(iframe);
  });

  /* ── TESTIMONIALS CAROUSEL ── */
  const tGrid = document.getElementById('testimonials-grid');
  if (tGrid) {
    const items = Array.from(tGrid.children);
    if (items.length > 1) {
      const wrap = document.createElement('div'); wrap.className = 'testimonials-track-wrap';
      const track = document.createElement('div'); track.className = 'testimonials-track';
      items.forEach(c => { c.classList.remove('reveal-hidden','revealed'); track.appendChild(c); });
      wrap.appendChild(track);
      tGrid.parentNode.replaceChild(wrap, tGrid);

      const nav = document.createElement('div'); nav.className = 'testimonials-nav';
      const dotsWrap = document.createElement('div'); dotsWrap.className = 'testimonials-dots';
      const prev = document.createElement('button'); prev.className = 't-prev';
      prev.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>`;
      const next = document.createElement('button'); next.className = 't-next';
      next.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;

      let cur = 0;
      const vis = () => window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
      const maxIdx = () => Math.max(0, items.length - vis());
      const dots = items.map((_, i) => {
        const d = document.createElement('button'); d.className = 't-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => goTo(i)); dotsWrap.appendChild(d); return d;
      });

      function goTo(idx) {
        cur = Math.max(0, Math.min(idx, maxIdx()));
        const w = (items[0].offsetWidth || 300) + 12;
        track.style.transform = `translateX(-${cur * w}px)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === cur));
      }

      prev.addEventListener('click', () => goTo(cur - 1));
      next.addEventListener('click', () => goTo(cur + 1));
      nav.append(prev, dotsWrap, next);
      wrap.after(nav);

      let timer = setInterval(() => goTo((cur + 1) % (maxIdx() + 1)), 5500);
      wrap.addEventListener('mouseenter', () => clearInterval(timer));
      wrap.addEventListener('mouseleave', () => { clearInterval(timer); timer = setInterval(() => goTo((cur + 1) % (maxIdx() + 1)), 5500); });
      window.addEventListener('resize', () => goTo(cur));
    }
  }

  /* ── BACK TO TOP ── */
  const btt = document.createElement('button');
  btt.id = 'back-to-top';
  btt.setAttribute('aria-label', 'Retour en haut');
  btt.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(btt);
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── FLOATING PODCAST PLAYER ── */
  if (!sessionStorage.getItem('player-dismissed')) {
    const player = document.createElement('div'); player.id = 'podcast-player';
    player.innerHTML = `
      <div class="player-icon-wrap">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
      </div>
      <div class="player-info">
        <span class="player-label">Disponible maintenant</span>
        <span class="player-title">Awdi Podcast — Écouter le dernier épisode</span>
      </div>
      <a href="https://open.spotify.com/show/4qpYXLneuemPRcuMJTWDAq" target="_blank" rel="noopener" class="player-listen-btn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
        Écouter
      </a>
      <button class="player-close" aria-label="Fermer">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>`;
    document.body.appendChild(player);
    setTimeout(() => player.classList.add('visible'), isMobile ? 8000 : 4000);
    player.querySelector('.player-close').addEventListener('click', () => {
      player.classList.remove('visible');
      sessionStorage.setItem('player-dismissed', '1');
    });
  }

  /* ── BUTTON RIPPLE ── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect(), size = Math.max(r.width, r.height);
      const rip = document.createElement('span');
      rip.className = 'ripple';
      rip.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px;`;
      btn.appendChild(rip);
      setTimeout(() => rip.remove(), 650);
    });
  });

  /* ── PAGE TRANSITIONS (desktop only — avoids bfcache opacity bug on mobile) ── */
  if (!isMobile) {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') ||
          href.startsWith('tel:') || href.startsWith('mailto:') || link.target === '_blank') return;
      link.addEventListener('click', e => {
        e.preventDefault();
        document.body.classList.add('page-exiting');
        setTimeout(() => { window.location.href = href; }, 280);
      });
    });
  }

  /* ── TOAST UTILITY ── */
  window.showToast = (msg, type = 'success') => {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    const colors = { success: 'var(--green)', error: '#ef4444', info: '#3b82f6' };
    t.className = `toast ${type}`;
    t.innerHTML = `<span style="width:18px;height:18px;background:${colors[type]};border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;flex-shrink:0;">✓</span>${msg}`;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 4000);
  };

  /* ── BLOG SEARCH (if on blog page) ── */
  if (document.querySelector('.blog-filters')) {
    const sw = document.createElement('div');
    sw.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input type="search" id="blog-search" placeholder="Rechercher un article…" aria-label="Rechercher" />`;
    sw.style.cssText = 'display:flex;align-items:center;gap:8px;background:var(--white);border:1px solid var(--border-2);border-radius:var(--r-md);padding:10px 16px;margin-bottom:32px;';
    document.querySelector('.blog-filters').before(sw);
    document.getElementById('blog-search').addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.blog-card, .featured-article').forEach(card => {
        card.style.display = (!q || card.textContent.toLowerCase().includes(q)) ? '' : 'none';
      });
    });
  }

});
