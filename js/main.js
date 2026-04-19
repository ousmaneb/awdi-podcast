// ===== AWDI PODCAST - JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function () {

  // --- Scroll progress bar ---
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });

  // --- Navbar scroll + hide/show on direction ---
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  if (navbar) {
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      navbar.classList.toggle('scrolled', current > 20);
      if (current > 120 && current > lastScroll) {
        navbar.classList.add('nav-hidden');
      } else {
        navbar.classList.remove('nav-hidden');
      }
      lastScroll = current;
    });
  }

  // --- Mobile menu toggle ---
  const mobileBtn = document.querySelector('.nav-mobile-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
      mobileBtn.innerHTML = isOpen
        ? `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) navLinks.classList.remove('open');
    });
  }

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Typewriter effect in hero ---
  const typeTarget = document.querySelector('.typewriter');
  if (typeTarget) {
    const words = typeTarget.dataset.words ? typeTarget.dataset.words.split('|') : [];
    if (words.length > 0) {
      let wordIdx = 0, charIdx = 0, deleting = false;
      function type() {
        const word = words[wordIdx];
        if (!deleting) {
          typeTarget.textContent = word.slice(0, ++charIdx);
          if (charIdx === word.length) {
            deleting = true;
            return setTimeout(type, 1800);
          }
        } else {
          typeTarget.textContent = word.slice(0, --charIdx);
          if (charIdx === 0) {
            deleting = false;
            wordIdx = (wordIdx + 1) % words.length;
          }
        }
        setTimeout(type, deleting ? 60 : 100);
      }
      type();
    }
  }

  // --- Hero parallax ---
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroImage.style.transform = `translateY(${scrolled * 0.08}px)`;
    }, { passive: true });
  }

  // --- Staggered scroll reveal ---
  const revealSelectors = [
    '.feature-card', '.blog-card', '.service-card', '.video-card',
    '.testimonial-card', '.stat-item', '.reveal', '.faq-item',
    '.about-content > *', '.mission-card'
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(revealSelectors.join(',')).forEach((el, i) => {
    el.classList.add('reveal-hidden');
    // Stagger siblings in same parent
    const siblings = el.parentElement ? [...el.parentElement.children].filter(c => c.matches && revealSelectors.some(s => c.matches(s))) : [];
    const sibIdx = siblings.indexOf(el);
    el.dataset.delay = sibIdx * 80;
    observer.observe(el);
  });

  // --- Counter animation with easing ---
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el, target, suffix = '') {
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      el.textContent = value.toLocaleString('fr') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.count), el.dataset.suffix || '');
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) statsObserver.observe(statsSection);

  // --- Magnetic buttons ---
  document.querySelectorAll('.btn-primary, .btn-lg').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // --- Toast ---
  window.showToast = function (message, type = 'success') {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  };

  // --- Contact form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite"><path d="M21 12a9 9 0 1 1-6.22-8.56"/></svg> Envoi en cours…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        contactForm.reset();
        showToast('Votre message a bien été envoyé. Merci !');
      }, 1500);
    });
  }

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isOpen = this.classList.contains('open');
      document.querySelectorAll('.faq-question').forEach(x => {
        x.classList.remove('open');
        if (x.nextElementSibling) x.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) { this.classList.add('open'); answer.classList.add('open'); }
    });
  });

  // --- Smooth anchor scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Floating orbs (hero) ---
  const hero = document.querySelector('.hero');
  if (hero) {
    for (let i = 0; i < 3; i++) {
      const orb = document.createElement('div');
      orb.className = 'hero-orb';
      orb.style.cssText = `
        width: ${180 + i * 120}px; height: ${180 + i * 120}px;
        top: ${[10, 60, 30][i]}%; left: ${[70, 80, 10][i]}%;
        animation-delay: ${i * 2}s; animation-duration: ${8 + i * 3}s;
      `;
      hero.appendChild(orb);
    }
  }

  // --- Page entrance animation ---
  document.body.classList.add('page-loaded');

});
