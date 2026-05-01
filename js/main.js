/* ============================================================
   BiblioHub — main.js
   Handles: navbar, slider, filters, search, form, scroll-top,
            count-up animation
   ============================================================ */

/* ── Helper: run after DOM is ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollTop();
  initSlider();
  initCountUp();
  initCatalogueFilters();
  initContactForm();
});

/* ============================================================
   1. NAVBAR — hamburger toggle + active link
   ============================================================ */
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    /* Close menu when a link is clicked (mobile UX) */
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    /* Close menu on outside click */
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  /* Active nav link: match by page filename */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) link.classList.add('active');
  });
}

/* ============================================================
   2. SCROLL-TO-TOP BUTTON
   ============================================================ */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   3. FEATURED BOOKS SLIDER (auto-play + prev/next + dots)
   ============================================================ */
function initSlider() {
  const track  = document.getElementById('sliderTrack');
  const prev   = document.getElementById('sliderPrev');
  const next   = document.getElementById('sliderNext');
  const dotsEl = document.getElementById('sliderDots');

  if (!track) return;

  const slides   = track.querySelectorAll('.slide');
  const total    = slides.length;
  let   current  = 0;
  let   autoPlay = null;

  /* Build dot buttons */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  const dots = dotsEl.querySelectorAll('.dot');

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    stopAuto();
    autoPlay = setInterval(() => goTo(current + 1), 4500);
  }

  function stopAuto() {
    if (autoPlay) { clearInterval(autoPlay); autoPlay = null; }
  }

  prev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  next.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  /* Pause on hover */
  track.closest('.slider-wrapper').addEventListener('mouseenter', stopAuto);
  track.closest('.slider-wrapper').addEventListener('mouseleave', startAuto);

  /* Keyboard support */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
  });

  /* Touch swipe support */
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); startAuto(); }
  });

  startAuto();
}

/* ============================================================
   4. COUNT-UP ANIMATION (triggered by IntersectionObserver)
   ============================================================ */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCount(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  const prefix   = el.dataset.prefix || '';
  const duration = 1800; /* ms */
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    /* Ease-out cubic */
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = Math.floor(eased * target);
    el.textContent = prefix + value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ============================================================
   5. CATALOGUE — real-time search + category filter
   ============================================================ */
function initCatalogueFilters() {
  const searchInput  = document.getElementById('bookSearch');
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const bookCards    = document.querySelectorAll('.catalogue-grid .book-card');
  const noResults    = document.getElementById('noResults');

  if (!searchInput && !filterBtns.length) return;

  let activeCategory = 'tous';

  /* Category filter */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      applyFilters();
    });
  });

  /* Live search */
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visible = 0;

    bookCards.forEach(card => {
      const title    = (card.querySelector('.book-title')?.textContent || '').toLowerCase();
      const author   = (card.querySelector('.book-author')?.textContent || '').toLowerCase();
      const category = (card.dataset.category || '').toLowerCase();

      const matchSearch   = !query || title.includes(query) || author.includes(query);
      const matchCategory = activeCategory === 'tous' || category === activeCategory;

      const show = matchSearch && matchCategory;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (noResults) {
      noResults.style.display = visible === 0 ? 'block' : 'none';
    }
  }
}

/* ============================================================
   6. CONTACT FORM VALIDATION
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm') || document.getElementById('reservForm');  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      showSuccess(form);
    }
  });

  /* Live inline validation on blur */
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearError(field));
  });
}

function validateForm(form) {
  let valid = true;

  form.querySelectorAll('[data-required]').forEach(field => {
    if (!validateField(field)) valid = false;
  });

  return valid;
}

function validateField(field) {
  clearError(field);
  const value = field.value.trim();

  /* Required check */
  if (field.dataset.required === 'true' && !value) {
    showError(field, 'Ce champ est obligatoire.');
    return false;
  }

  /* Email format */
  if (field.type === 'email' && value) {
    const emailRx = /^[^\s@]+@uca\.ac\.ma$/;
    if (!emailRx.test(value)) {
      showError(field, 'Veuillez saisir une adresse e-mail valide.');
      return false;
    }
  }

  /* Minimum message length */
  if (field.dataset.minlength) {
    const min = parseInt(field.dataset.minlength, 10);
    if (value.length < min) {
      showError(field, `Le message doit comporter au moins ${min} caractères.`);
      return false;
    }
  }

  return true;
}

function showError(field, message) {
  field.classList.add('error');
  const errEl = document.getElementById(field.id + 'Error');
  if (errEl) { errEl.textContent = message; errEl.classList.add('visible'); }
}

function clearError(field) {
  field.classList.remove('error');
  const errEl = document.getElementById(field.id + 'Error');
  if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }
}

function showSuccess(form) {
  form.reset();
  form.style.display = 'none';

  const msg = document.getElementById('successMessage');
  if (msg) msg.classList.add('visible');
}
