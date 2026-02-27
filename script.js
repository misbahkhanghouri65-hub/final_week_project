// ============================================
// REGEN THERAPY MD — GLOBAL JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAV SCROLL EFFECT ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ---- INTERSECTION OBSERVER (scroll animations) ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and elements
  const animateEls = document.querySelectorAll(
    '.service-card, .step-card, .testi-card, .clinic-card, .blog-card, .value-card, .team-card, .pricing-card, .blog-card-lg, .blog-card-sm, .service-detail-img, .service-detail-text'
  );

  animateEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.1}s, transform 0.6s ease ${(i % 4) * 0.1}s`;
    observer.observe(el);
  });

  // InView class triggers animation
  const style = document.createElement('style');
  style.textContent = `.in-view { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // ---- SMOOTH ANCHOR SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- NEWSLETTER INPUT ENTER KEY ----
  const newsletterInput = document.querySelector('section input[type="email"]');
  if (newsletterInput) {
    newsletterInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const btn = newsletterInput.nextElementSibling;
        if (btn) {
          btn.textContent = 'Subscribed ✦';
          btn.style.background = 'var(--gold)';
        }
      }
    });
  }

  // ---- ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- STAT COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.stat-num, .badge-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        if (num && num > 0) {
          let start = 0;
          const step = num / 40;
          const timer = setInterval(() => {
            start += step;
            if (start >= num) {
              el.textContent = text;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(start) + suffix;
            }
          }, 30);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

});
