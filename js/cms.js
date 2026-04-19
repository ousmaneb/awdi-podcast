// ===== AWDI CMS — reads admin data and injects into site pages =====

const AWDI = {
  get: function(key) {
    try { return JSON.parse(localStorage.getItem('awdi_' + key)) || []; }
    catch(e) { return []; }
  },
  getObj: function(key, def) {
    try { return JSON.parse(localStorage.getItem('awdi_' + key)) || def; }
    catch(e) { return def; }
  },
  saveSub: function(type, data) {
    const list = this.get('submissions');
    list.unshift({ id: Date.now().toString(), type, date: new Date().toISOString(), data });
    localStorage.setItem('awdi_submissions', JSON.stringify(list));
  },
  esc: function(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
};

document.addEventListener('DOMContentLoaded', function() {
  cmsStats();
  cmsTestimonials();
  cmsVideos();
  cmsArticles();
  cmsForms();
});

/* ── STATS ── */
function cmsStats() {
  const s = AWDI.getObj('stats', null);
  if (!s) return;
  document.querySelectorAll('.stat-item').forEach(function(item) {
    const label = (item.querySelector('.stat-label') || {}).textContent || '';
    const num   = item.querySelector('[data-count]');
    if (!num) return;
    const lo = label.toLowerCase();
    if (lo.includes('épisode'))            { num.dataset.count = s.episodes;  num.textContent = s.episodes + '+'; }
    else if (lo.includes('plateforme'))    { num.dataset.count = s.platforms; num.textContent = s.platforms; }
    else if (lo.includes('auditeur'))      { num.dataset.count = s.listeners; num.textContent = Number(s.listeners).toLocaleString('fr-FR') + '+'; }
    else if (lo.includes('gratuit') || lo.includes('accessible')) { num.dataset.count = s.free; num.textContent = s.free + '%'; }
  });
}

/* ── TESTIMONIALS ── */
function cmsTestimonials() {
  const grid = document.querySelector('.testimonials-grid');
  if (!grid) return;
  const list = AWDI.get('testimonials');
  if (!list.length) return;
  list.forEach(function(t) {
    const starsHTML = [1,2,3,4,5].map(function(i) {
      return '<svg width="14" height="14" viewBox="0 0 24 24" fill="' + (i <= t.stars ? '#F59E0B' : '#E5E7EB') + '"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    }).join('');
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML =
      '<div class="stars">' + starsHTML + '</div>' +
      '<p class="testimonial-text">&ldquo;' + AWDI.esc(t.text) + '&rdquo;</p>' +
      '<div class="testimonial-author">' +
        '<div class="testimonial-avatar">' + AWDI.esc(t.name[0].toUpperCase()) + '</div>' +
        '<div>' +
          '<div class="testimonial-name">' + AWDI.esc(t.name) + '</div>' +
          '<div class="testimonial-role">' + AWDI.esc(t.role || '') + '</div>' +
        '</div>' +
      '</div>';
    grid.prepend(card);
  });
}

/* ── VIDEOS ── */
function cmsVideos() {
  const grid = document.querySelector('.video-grid');
  if (!grid) return;
  const list = AWDI.get('videos');
  if (!list.length) return;
  list.forEach(function(v) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML =
      '<div class="video-embed">' +
        '<iframe src="https://www.youtube.com/embed/' + v.ytId + '?rel=0" title="' + AWDI.esc(v.title) + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>' +
      '</div>' +
      '<div class="video-card-body">' +
        '<h3>' + AWDI.esc(v.title) + '</h3>' +
        '<p>' + AWDI.esc(v.desc || '') + '</p>' +
      '</div>';
    grid.prepend(card);
  });
}

/* ── ARTICLES ── */
function cmsArticles() {
  const grid = document.querySelector('.blog-grid');
  if (!grid) return;
  const list = AWDI.get('articles');
  if (!list.length) return;
  list.forEach(function(a) {
    const imgUrl = a.image || ('https://picsum.photos/seed/' + a.id + '/800/450');
    const dateStr = new Date(a.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    const link = document.createElement('a');
    link.href = 'article.html';
    link.className = 'blog-card';
    link.innerHTML =
      '<div class="blog-card-img"><img src="' + imgUrl + '" alt="' + AWDI.esc(a.title) + '" loading="lazy" /></div>' +
      '<div class="blog-card-body">' +
        '<span class="blog-tag">' + AWDI.esc(a.category) + '</span>' +
        '<h3>' + AWDI.esc(a.title) + '</h3>' +
        '<p>' + AWDI.esc(a.excerpt) + '</p>' +
        '<div class="blog-card-meta">' +
          '<span class="meta-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' + dateStr + '</span>' +
          '<span class="meta-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' + AWDI.esc(a.readTime || '5 min') + '</span>' +
        '</div>' +
      '</div>';
    grid.prepend(link);
  });
}

/* ── FORM INTERCEPTION ── */
function cmsForms() {
  // Contact form
  const cf = document.getElementById('contact-form');
  if (cf) {
    cf.addEventListener('submit', function(e) {
      e.preventDefault();
      const subject = (document.querySelector('.subject-btn.selected') || {}).dataset?.subject || '';
      AWDI.saveSub('contact', {
        prenom:  (cf.querySelector('[name=prenom]') || {}).value || '',
        nom:     (cf.querySelector('[name=nom]')    || {}).value || '',
        email:   (cf.querySelector('[name=email]')  || {}).value || '',
        sujet:   subject || (cf.querySelector('[name=sujet]') || {}).value || '',
        message: (cf.querySelector('[name=message]')|| {}).value || ''
      });
      // Show success feedback
      cf.innerHTML = '<div style="text-align:center;padding:40px 20px">' +
        '<div style="width:64px;height:64px;background:var(--green-pale);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px">' +
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--green-primary)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>' +
        '<h3 style="font-size:20px;font-weight:800;color:var(--text-dark);margin-bottom:10px">Message envoyé !</h3>' +
        '<p style="color:var(--text-mid);line-height:1.7">Merci pour votre message. Je vous réponds personnellement dans les 48h.</p></div>';
    });
  }

  // Service request buttons (any button with data-service)
  document.querySelectorAll('[data-service]').forEach(function(btn) {
    if (btn.tagName === 'BUTTON' || btn.tagName === 'A') {
      btn.addEventListener('click', function() {
        AWDI.saveSub('service', { service: btn.dataset.service || btn.textContent.trim() });
      });
    }
  });
}
