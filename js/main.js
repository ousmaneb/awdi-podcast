// ===== AWDI PODCAST — DYNAMIC JS v2 =====

document.addEventListener('DOMContentLoaded', function () {

  /* ── SCROLL PROGRESS ── */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ── NAVBAR ── */
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  if (navbar) {
    window.addEventListener('scroll', () => {
      const cur = window.scrollY;
      navbar.classList.toggle('scrolled', cur > 40);
      if (cur > 200 && cur > lastScroll + 8) navbar.classList.add('nav-hidden');
      else if (cur < lastScroll - 4) navbar.classList.remove('nav-hidden');
      lastScroll = cur <= 0 ? 0 : cur;
    }, { passive: true });
  }

  /* ── DARK MODE ── */
  const saved = localStorage.getItem('awdi-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  const sunIcon  = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  const darkToggle = document.createElement('button');
  darkToggle.id = 'dark-toggle';
  darkToggle.setAttribute('aria-label', 'Changer le thème');
  darkToggle.innerHTML = saved === 'dark' ? sunIcon : moonIcon;
  if (navbar) navbar.appendChild(darkToggle);

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
    const menuIcon  = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    const closeIcon = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

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
  }

  /* ── HERO MESH + ORBS ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    const mesh = document.createElement('div');
    mesh.className = 'hero-mesh';
    hero.prepend(mesh);
    [
      { w: 300, h: 300, top: '5%',  left: '65%', delay: 0,   dur: 12 },
      { w: 200, h: 200, top: '55%', left: '75%', delay: 3,   dur: 9  },
      { w: 250, h: 250, top: '30%', left: '3%',  delay: 1.5, dur: 11 },
    ].forEach(o => {
      const orb = document.createElement('div');
      orb.className = 'hero-orb';
      orb.style.cssText = `width:${o.w}px;height:${o.h}px;top:${o.top};left:${o.left};animation-delay:${o.delay}s;animation-duration:${o.dur}s;`;
      hero.appendChild(orb);
    });
  }

  /* ── HERO TYPING WORDS ── */
  const typingEl = document.getElementById('hero-keyword');
  if (typingEl) {
    const words = ['santé mentale', 'nos émotions', 'bien-être', 'nos tabous', 'notre avenir'];
    let wordIdx = 0, charIdx = words[0].length, deleting = false;
    typingEl.classList.add('typing-cursor');
    function typeStep() {
      const current = words[wordIdx];
      if (!deleting) {
        charIdx++;
        typingEl.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) { deleting = true; setTimeout(typeStep, 2400); return; }
      } else {
        charIdx--;
        typingEl.textContent = current.slice(0, charIdx);
        if (charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; }
      }
      setTimeout(typeStep, deleting ? 55 : 105);
    }
    setTimeout(typeStep, 3000);
  }

  /* ── REVEAL ANIMATIONS ── */
  ['.feature-card','.blog-card','.service-card','.stat-item',
   '.testimonial-card','.section-header','.platform-link',
   '.video-card','.contact-info-item','.episode-card','.host-highlight'].forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal-hidden');
      el.dataset.delay = (i % 4) * 90;
    });
  });
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('revealed'), +(entry.target.dataset.delay || 0));
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal-hidden').forEach(el => revealObs.observe(el));

  /* ── COUNTERS ── */
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
      const start = performance.now(), ease = t => 1 - Math.pow(1 - t, 3);
      const tick = now => {
        const t = Math.min((now - start) / 2000, 1), val = Math.floor(ease(t) * target);
        el.textContent = (target >= 1000 ? val.toLocaleString('fr-FR') : val) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = (target >= 1000 ? target.toLocaleString('fr-FR') : target) + suffix;
      };
      requestAnimationFrame(tick);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));

  /* ── MAGNETIC BUTTONS ── */
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.1}px,${(e.clientY-r.top-r.height/2)*0.1}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ── RIPPLE EFFECT ── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect(), size = Math.max(r.width, r.height);
      const rip = document.createElement('span');
      rip.className = 'ripple';
      rip.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px;`;
      btn.appendChild(rip);
      setTimeout(() => rip.remove(), 700);
    });
  });

  /* ── TESTIMONIALS CAROUSEL ── */
  const tGrid = document.querySelector('.testimonials-grid');
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
      prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>`;
      const next = document.createElement('button'); next.className = 't-next';
      next.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;

      let cur = 0;
      const vis = () => window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
      const maxIdx = () => Math.max(0, items.length - vis());

      const dots = items.map((_, i) => {
        const d = document.createElement('button');
        d.className = 't-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d); return d;
      });

      function goTo(idx) {
        cur = Math.max(0, Math.min(idx, maxIdx()));
        const w = (items[0].offsetWidth || 300) + 24;
        track.style.transform = `translateX(-${cur * w}px)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === cur));
      }

      prev.addEventListener('click', () => goTo(cur - 1));
      next.addEventListener('click', () => goTo(cur + 1));
      nav.append(prev, dotsWrap, next);
      wrap.after(nav);

      let timer = setInterval(() => goTo((cur + 1) % (maxIdx() + 1)), 5000);
      wrap.addEventListener('mouseenter', () => clearInterval(timer));
      wrap.addEventListener('mouseleave', () => {
        clearInterval(timer);
        timer = setInterval(() => goTo((cur + 1) % (maxIdx() + 1)), 5000);
      });
      window.addEventListener('resize', () => goTo(cur));
    }
  }

  /* ── BLOG SEARCH ── */
  if (document.querySelector('.blog-filters')) {
    const sw = document.createElement('div'); sw.id = 'blog-search-wrap';
    sw.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input type="search" id="blog-search" placeholder="Rechercher un article…" aria-label="Rechercher" />`;
    document.querySelector('.blog-filters').before(sw);
    document.getElementById('blog-search').addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.blog-card, .featured-article').forEach(card => {
        card.style.display = (!q || card.textContent.toLowerCase().includes(q)) ? '' : 'none';
      });
    });
  }

  /* ── FLOATING PODCAST PLAYER ── */
  if (!sessionStorage.getItem('player-dismissed')) {
    const player = document.createElement('div'); player.id = 'podcast-player';
    player.innerHTML = `
      <div class="player-icon-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
      </div>
      <div class="player-info">
        <span class="player-label">Nouveau sur Spotify</span>
        <span class="player-title">Awdi Podcast — Écouter le dernier épisode</span>
      </div>
      <a href="https://open.spotify.com/show/4qpYXLneuemPRcuMJTWDAq" target="_blank" rel="noopener" class="player-listen-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
        Écouter
      </a>
      <button class="player-close" aria-label="Fermer">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>`;
    document.body.appendChild(player);
    setTimeout(() => player.classList.add('visible'), 3500);
    player.querySelector('.player-close').addEventListener('click', () => {
      player.classList.remove('visible');
      sessionStorage.setItem('player-dismissed', '1');
    });
  }

  /* ── BACK TO TOP ── */
  const btt = document.createElement('button');
  btt.id = 'back-to-top';
  btt.setAttribute('aria-label', 'Retour en haut');
  btt.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(btt);
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── IMAGE FADE-IN ── */
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
      img.classList.add('img-loading');
      img.addEventListener('load',  () => { img.classList.remove('img-loading'); img.classList.add('img-loaded'); });
      img.addEventListener('error', () => img.classList.remove('img-loading'));
    }
  });

  /* ── PAGE TRANSITIONS ── */
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

  /* ── TYPEWRITER ── */
  document.querySelectorAll('.typewriter').forEach(el => {
    const words = JSON.parse(el.dataset.words || '[]');
    if (!words.length) return;
    let wi = 0, ci = 0, del = false;
    const cur = '<span style="animation:blink .8s step-end infinite">|</span>';
    setInterval(() => {
      const w = words[wi];
      if (!del) { el.innerHTML = w.slice(0, ++ci) + cur; if (ci >= w.length) del = true; }
      else       { el.innerHTML = w.slice(0, --ci) + cur; if (ci === 0) { del = false; wi = (wi+1) % words.length; } }
    }, 100);
  });

  /* ── HERO PARALLAX ── */
  const heroImg = document.querySelector('.hero-image');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      heroImg.style.transform = `translateY(${window.scrollY * 0.05}px)`;
    }, { passive: true });
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item'), isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── TOAST ── */
  window.showToast = (msg, type = 'success') => {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    const icons  = { success: '✓', error: '✕', info: 'ℹ' };
    const colors = { success: 'var(--green-primary)', error: '#ef4444', info: '#3b82f6' };
    t.className = `toast ${type}`;
    t.innerHTML = `<span style="width:20px;height:20px;background:${colors[type]};border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700;flex-shrink:0;">${icons[type]||'✓'}</span>${msg}`;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 4000);
  };

  /* ── PAGE LOADED ── */
  requestAnimationFrame(() => document.body.classList.add('page-loaded'));

});
