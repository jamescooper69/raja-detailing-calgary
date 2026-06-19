/* ============================================================
   Raja & Co AutoDetailing — main.js
   Handles: navbar scroll, mobile menu, FAQ toggle
   No external dependencies required.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll shadow ──────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ── Mobile nav toggle ─────────────────────────────────────
  const toggle   = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Mobile accordion submenu ──────────────────────────────
  document.querySelectorAll('.mobile-parent').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = item.nextElementSibling;
      if (sub) sub.classList.toggle('open-sub');
      const arrow = item.querySelector('.m-arrow');
      if (arrow) arrow.style.transform =
        sub && sub.classList.contains('open-sub') ? 'rotate(180deg)' : '';
    });
  });

  // ── Active nav link highlight ─────────────────────────────
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });

  // ── Dynamic add-ons for booking form ─────────────────────
  const serviceSelect = document.getElementById('serviceType');
  const addonSelect   = document.getElementById('addons');
  if (serviceSelect && addonSelect) {
    const addonMap = {
      'interior': [
        { value: '', label: 'Select an add-on (optional)' },
        { value: 'pet-hair',    label: 'Pet Hair Removal (+$25)' },
        { value: 'odor',        label: 'Odor Elimination (+$30)' },
        { value: 'seat-shampoo',label: 'Deep Seat Shampooing (+$40)' },
        { value: 'ceramic-glass', label: 'Ceramic Glass Coating (+$50)' },
      ],
      'exterior': [
        { value: '', label: 'Select an add-on (optional)' },
        { value: 'wax',         label: 'Full Wax Coat (+$35)' },
        { value: 'iron-decon',  label: 'Iron Decontamination (+$25)' },
        { value: 'clay-bar',    label: 'Clay Bar Treatment (+$45)' },
        { value: 'tire-shine',  label: 'Premium Tire Shine (+$15)' },
      ],
      'complete': [
        { value: '', label: 'Select an add-on (optional)' },
        { value: 'ceramic',     label: 'Ceramic Coating (+$199)' },
        { value: 'headlight',   label: 'Headlight Restoration (+$55)' },
        { value: 'engine-bay',  label: 'Engine Bay Clean (+$60)' },
        { value: 'scratch',     label: 'Scratch & Swirl Removal (+$80)' },
      ],
    };
    serviceSelect.addEventListener('change', () => {
      const opts = addonMap[serviceSelect.value] || [{ value: '', label: 'Select a service first' }];
      addonSelect.innerHTML = opts.map(o =>
        `<option value="${o.value}">${o.label}</option>`
      ).join('');
      addonSelect.disabled = !addonMap[serviceSelect.value];
    });
    addonSelect.disabled = true;
  }

  // ── Scroll-reveal via IntersectionObserver ────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Counter animation for stats ───────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          countObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObs.observe(c));
  }

  function animateCount(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const update = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (t < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // ── Smooth set min-date on date picker ───────────────────
  const datePicker = document.getElementById('preferredDate');
  if (datePicker) {
    const today = new Date().toISOString().split('T')[0];
    datePicker.min = today;
  }

});