// WHATSAPP FORM SENDER
    function sendWhatsApp(btn) {
      const name = document.getElementById('fName').value.trim();
      const phone = document.getElementById('fPhone').value.trim();
      const service = document.getElementById('fService').value.trim();
      const date = document.getElementById('fDate').value.trim();
      const note = document.getElementById('fNote').value.trim();

      if (!name || !phone) {
        alert("Lütfen Ad Soyad ve Telefon alanlarını doldurunuz.");
        return;
      }

      const text = `Merhaba, randevu talebim var:%0A%0A*Ad Soyad:* ${name}%0A*Telefon:* ${phone}%0A*Hizmet:* ${service || 'Belirtilmedi'}%0A*Tarih Tercihi:* ${date || 'Belirtilmedi'}%0A*Not:* ${note || 'Yok'}`;
      const whatsappUrl = `https://wa.me/905523020613?text=${text}`;

      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<span>✓ WhatsApp\'a Yönlendiriliyor...</span>';
      btn.style.background = '#22C55E';

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        btn.innerHTML = originalHtml;
        btn.style.background = '';
      }, 1000);
    }

    // HAMBURGER MENU
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      });
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          hamburgerBtn.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // SCROLL TO TOP
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
      document.getElementById('nav').classList.toggle('scrolled', scrollY > 40);
      if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', scrollY > 400);
    });
    if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // PARTICLES
    const pc = document.getElementById('particles-container');
    function makeParticle() {
      const p = document.createElement('div');
      p.className = 'particle';
      const s = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const dur = Math.random() * 15 + 10;
      const delay = Math.random() * 8;
      const colors = ['rgba(201,169,110,0.35)', 'rgba(21,101,192,0.25)', 'rgba(255,255,255,0.15)'];
      p.style.cssText = `left:${x}%;width:${s}px;height:${s}px;background:${colors[Math.floor(Math.random() * colors.length)]};animation-duration:${dur}s;animation-delay:${delay}s;`;
      pc.appendChild(p);
      setTimeout(() => p.remove(), (dur + delay) * 1000);
    }
    for (let i = 0; i < 20; i++) setTimeout(makeParticle, i * 300);
    setInterval(makeParticle, 600);

    // SCROLL REVEAL
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible') } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(r => obs.observe(r));

    // COUNTER ANIMATION
    function animateCounter(el) {
      const target = parseFloat(el.dataset.target);
      const decimal = parseInt(el.dataset.decimal || 0);
      const suffix = el.dataset.suffix || '';
      const dur = 2000; const start = performance.now();
      function upd(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = (target * ease);
        el.textContent = (decimal > 0 ? val.toFixed(decimal) : Math.floor(val)) + suffix;
        if (p < 1) requestAnimationFrame(upd);
      }
      requestAnimationFrame(upd);
    }
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.count-num').forEach(animateCounter);
          counterObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelector('.hero-stats') && counterObs.observe(document.querySelector('.hero-stats'));

    // SCROLL SNAP DOTS
    function initScrollDots(scrollEl, hintEl) {
      if (!scrollEl || !hintEl) return;
      const dots = hintEl.querySelectorAll('.scroll-hint-dot');
      scrollEl.addEventListener('scroll', () => {
        const cardW = scrollEl.firstElementChild?.offsetWidth || 1;
        const idx = Math.round(scrollEl.scrollLeft / (cardW + 14));
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }, { passive: true });
    }
    initScrollDots(document.querySelector('.services-grid'), document.getElementById('servicesHint'));
    initScrollDots(document.querySelector('.gallery-grid'), document.getElementById('galleryHint'));
    const revScroll = document.getElementById('reviewsScroll');
    const btnPrev = document.getElementById('prevRev');
    const btnNext = document.getElementById('nextRev');
    if (revScroll && btnPrev && btnNext) {
      btnPrev.addEventListener('click', () => {
        revScroll.scrollBy({ left: -revScroll.offsetWidth * 0.8, behavior: 'smooth' });
      });
      btnNext.addEventListener('click', () => {
        revScroll.scrollBy({ left: revScroll.offsetWidth * 0.8, behavior: 'smooth' });
      });
    }

    initScrollDots(revScroll, document.getElementById('reviewsHint'));

    // AUTO SCROLL
    function initAutoScroll(el, interval = 5000) {
      if (!el) return;
      let direction = 1;
      let scrollTimer = setInterval(() => {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;

        if (el.scrollLeft >= maxScroll - 50) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const scrollAmount = el.offsetWidth * 0.8;
          el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, interval);

      // Pause interaction
      const pause = () => clearInterval(scrollTimer);
      el.addEventListener('touchstart', pause, { passive: true });
      el.addEventListener('mousedown', pause);
    }

    initAutoScroll(document.querySelector('.services-grid'));
    initAutoScroll(document.querySelector('.gallery-grid'));
    initAutoScroll(document.getElementById('reviewsScroll'));
    initAutoScroll(document.querySelector('.why-features'));
    initAutoScroll(document.querySelector('.price-cards'));

    // --- ADDED: NEW SCROLL REVEAL LOGIC ---
    document.addEventListener("DOMContentLoaded", () => {
      // Create scroll progress bar
      const progressBar = document.createElement('div');
      progressBar.id = 'scrollProgressBar';
      Object.assign(progressBar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '4px',
        background: 'linear-gradient(90deg, var(--gold2), var(--gold))',
        zIndex: '9999',
        width: '0%',
        transition: 'width 0.1s ease-out'
      });
      document.body.appendChild(progressBar);

      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      });

      // Setup dynamic scroll reveals
      const style = document.createElement('style');
      style.innerHTML = `
        .scroll-reveal {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
            transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
        }
        .scroll-reveal.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        .sc:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 24px 60px rgba(10, 31, 53, 0.15);
        }
      `;
      document.head.appendChild(style);

      const elementsToAnimate = document.querySelectorAll('.sc, .wf, .gc, .review-card, .s-head, .price-card, .contact-card, .ti, .why-main');
      elementsToAnimate.forEach((el, index) => {
        el.classList.add('scroll-reveal');
        el.style.transitionDelay = `${(index % 4) * 80}ms`;
      });

      const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.scroll-reveal').forEach(r => revealObs.observe(r));
    });