/* Zuwa Investments Limited — site interactions */
(function () {
  'use strict';

  // ---- Nav: scrolled state + mobile menu ----
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  var links = document.querySelector('.nav-links');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    var tt = document.querySelector('.totop');
    if (tt) tt.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger && links) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // ---- Back to top ----
  var totop = document.querySelector('.totop');
  if (totop) totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // ---- Hero / CTA slideshow ----
  document.querySelectorAll('[data-slideshow]').forEach(function (ss) {
    // pipe separated when present: an inlined image is a data URI and carries commas of its own
    var raw = ss.getAttribute('data-slideshow') || '';
    var imgs = (raw.indexOf('|') >= 0 ? raw.split('|') : raw.split(',')).map(function (s) { return s.trim(); }).filter(Boolean);
    if (!imgs.length) return;
    var layers = [document.createElement('div'), document.createElement('div')];
    layers.forEach(function (l) { l.className = 'slide'; ss.appendChild(l); });
    var active = 0, idx = 0;
    layers[0].style.backgroundImage = "url('" + imgs[0] + "')";
    layers[0].style.opacity = '1';
    if (imgs.length > 1) {
      setInterval(function () {
        idx = (idx + 1) % imgs.length;
        var next = 1 - active;
        layers[next].style.backgroundImage = "url('" + imgs[idx] + "')";
        layers[next].style.opacity = '1';
        layers[active].style.opacity = '0';
        active = next;
      }, 4500);
    }
  });

  // ---- Scroll reveal ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('in'); });
  }

  // ---- Animated counters ----
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = (target % 1 === 0) ? Math.round(val) : val.toFixed(0);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target % 1 === 0 ? target : target;
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  // ---- Footer year ----
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // ---- Reading progress ----
  var bar = document.createElement('div');
  bar.className = 'progress';
  document.body.appendChild(bar);
  function progress() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', progress, { passive: true });
  window.addEventListener('resize', progress);
  progress();

  // ---- Service picker ----
  var tabs = document.querySelectorAll('.picker-tab');
  if (tabs.length) {
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var key = t.getAttribute('data-pick');
        tabs.forEach(function (x) { x.classList.toggle('on', x === t); });
        document.querySelectorAll('.picker-panel .pp').forEach(function (p) {
          p.classList.toggle('on', p.getAttribute('data-panel') === key);
        });
      });
    });
  }

})();
