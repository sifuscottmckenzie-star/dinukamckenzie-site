// ── PAGE SWITCHING ── uses data-page attribute, no inline JS
function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.nav-tabs a').forEach(function(a) { a.classList.remove('active'); });
  var pg = document.getElementById('page-' + id);
  var tb = document.getElementById('tab-' + id);
  if (pg) pg.classList.add('active');
  if (tb) tb.classList.add('active');
  window.scrollTo(0, 0);
  triggerReveal();
}

// Attach click handlers via JS (avoids inline onclick / CSP issues)
document.addEventListener('DOMContentLoaded', function() {

  // Nav tabs, logo, cta link, footer spans
  document.querySelectorAll('[data-page]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      var target = el.getAttribute('data-page');
      var scrollTo = el.getAttribute('data-scroll');
      showPage(target);
      if (scrollTo) {
        setTimeout(function() {
          var el2 = document.getElementById(scrollTo);
          if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    });
  });

  // Scroll to photos on about page
  document.querySelectorAll('.scroll-to-photos').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var el = document.getElementById('about-photos-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Press kit scroll btn
  document.querySelectorAll('.pk-scroll-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var el = document.getElementById('pk-photos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // News & Events in-page nav
  document.querySelectorAll('.ne-subnav-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.getAttribute('data-target');
      document.querySelectorAll('.ne-subnav-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.ne-section').forEach(function(s) { s.classList.add('ne-section--hidden'); });
      var sec = document.getElementById(target);
      if (sec) {
        sec.classList.remove('ne-section--hidden');
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // News & Events in-page nav
  document.querySelectorAll('.ne-subnav-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.getAttribute('data-target');
      document.querySelectorAll('.ne-subnav-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.ne-section').forEach(function(s) { s.classList.add('ne-section--hidden'); });
      var sec = document.getElementById(target);
      if (sec) {
        sec.classList.remove('ne-section--hidden');
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Announce bar close
  var closeBtn = document.getElementById('announce-close-btn');
  var announceBar = document.getElementById('announce-bar');
  if (closeBtn && announceBar) {
    closeBtn.addEventListener('click', function() {
      announceBar.style.display = 'none';
      var nav = document.getElementById('main-nav');
      if (nav) nav.style.top = '0';
    });
  }

});
  });

});

// ── NAV SCROLL SHADOW ──
window.addEventListener('scroll', function() {
  document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 40);
});

// ── SCROLL REVEAL ──
function triggerReveal() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.page.active .reveal').forEach(function(r) {
    if (!r.classList.contains('visible')) obs.observe(r);
  });
}
triggerReveal();

// ── PRAISE CAROUSEL ──
var quotes = [
  { text: '\u201cThe Torrent is subtle and clever and Dinuka has talent to burn. It unfolds so beautifully and the writer is in control every step of the way. Highly, highly recommended!\u201d', by: '\u2014 Dervla McTiernan, Author' },
  { text: '\u201cSuch a good read.\u201d', by: '\u2014 Val McDermid, Author' },
  { text: '\u201cA dark domestic rural mystery written by a born storyteller. More please.\u201d', by: '\u2014 Michael Robotham, Author' },
  { text: '\u201cHow lucky are we to have Dinuka McKenzie? Taken is a masterclass in crimes that are too close to home.\u201d', by: '\u2014 Hayley Scrivenor, Author' },
  { text: '\u201cThere are few other Australian crime writers in the same league as McKenzie. She is as close to a sure-thing as you can get.\u201d', by: '\u2014 Simon McDonald, Bookseller' },
  { text: '\u201cTipping Point is a truly masterful piece of Australian crime fiction. Pure perfection!\u201d', by: '\u2014 Josh Hortinela, Author & Bookseller' },
  { text: '\u201cVivid, pacy and refreshingly original. A gripping whodunnit with heart.\u201d', by: '\u2014 Emma Viskic, Author' }
];
var cur = 0;
var pt = document.getElementById('praise-text');
var pa = document.getElementById('praise-attrib');
var dc = document.getElementById('praise-dots');
if (pt) { pt.style.transition = pa.style.transition = 'opacity .3s'; }
if (dc) {
  quotes.forEach(function(_, i) {
    var d = document.createElement('button');
    d.className = 'praise-dot' + (i===0?' active':'');
    d.addEventListener('click', function() { goPraise(i); });
    dc.appendChild(d);
  });
}
function goPraise(idx) {
  cur = idx;
  if (!pt) return;
  pt.style.opacity = pa.style.opacity = '0';
  setTimeout(function() {
    pt.textContent = quotes[idx].text;
    pa.textContent = quotes[idx].by;
    pt.style.opacity = pa.style.opacity = '1';
  }, 300);
  document.querySelectorAll('.praise-dot').forEach(function(d,i) { d.classList.toggle('active', i===idx); });
}
setInterval(function() { goPraise((cur+1) % quotes.length); }, 5000);

// ── BOOK QUOTE CAROUSELS ──
document.querySelectorAll('.bqc').forEach(function(carousel) {
  var slides = Array.from(carousel.querySelectorAll('.bqc-slide'));
  var dots   = Array.from(carousel.querySelectorAll('.bqc-dot'));
  var counter = carousel.querySelector('.bqc-counter');
  var total  = slides.length, current = 0, timer = null;
  var row    = carousel.closest('.book-row');
  function goTo(idx) {
    slides[current].classList.remove('bqc-active');
    slides[current].classList.add('bqc-exit');
    setTimeout(function() { slides[current].classList.remove('bqc-exit'); }, 600);
    current = (idx + total) % total;
    slides[current].classList.add('bqc-active');
    dots.forEach(function(d,i) { d.classList.toggle('active', i===current); });
    if (counter) counter.textContent = (current+1) + ' / ' + total;
  }
  function start() { if (!timer) timer = setInterval(function() { goTo(current+1); }, 3800); }
  function stop()  { clearInterval(timer); timer = null; }
  dots.forEach(function(d,i) { d.addEventListener('click', function() { goTo(i); }); });
  var prev = carousel.querySelector('.bqc-prev');
  var next = carousel.querySelector('.bqc-next');
  if (prev) prev.addEventListener('click', function() { goTo(current-1); });
  if (next) next.addEventListener('click', function() { goTo(current+1); });
  if (row) { row.addEventListener('mouseenter', start); row.addEventListener('mouseleave', stop); }
});

// ── NEWSLETTER ──
var nlForm = document.getElementById('nl-form');
if (nlForm) {
  nlForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = nlForm.querySelector('button');
    btn.textContent = 'Subscribed \u2713';
    btn.style.background = 'var(--brown)';
    btn.style.color = '#fff';
    document.getElementById('nl-success').style.display = 'block';
  });
}

// ── REVIEW CAROUSELS ──
document.querySelectorAll('.review-carousel').forEach(function(car) {
  var slides  = Array.from(car.querySelectorAll('.rc-slide'));
  var dots    = Array.from(car.querySelectorAll('.rc-dot'));
  var counter = car.querySelector('.rc-counter');
  var total   = slides.length;
  var cur     = 0;
  var timer   = null;

  // Ensure only first slide is active on init
  slides.forEach(function(s, i) { s.classList.toggle('rc-active', i === 0); });

  function goTo(idx, dir) {
    var prev = slides[cur];
    prev.classList.remove('rc-active');
    prev.classList.add(dir === 'next' ? 'rc-exit-left' : 'rc-exit-right');
    setTimeout(function() { prev.classList.remove('rc-exit-left', 'rc-exit-right'); }, 550);

    cur = (idx + total) % total;
    var next = slides[cur];
    next.style.transform = dir === 'next' ? 'translateX(40px)' : 'translateX(-40px)';
    next.classList.add('rc-active');
    setTimeout(function() { next.style.transform = ''; }, 20);

    dots.forEach(function(d, i) { d.classList.toggle('active', i === cur); });
    if (counter) counter.textContent = (cur + 1) + ' / ' + total;
  }

  function startTimer() {
    if (!timer) timer = setInterval(function() { goTo(cur + 1, 'next'); }, 2000);
  }
  function stopTimer() { clearInterval(timer); timer = null; }
  var prevBtn = car.querySelector('.rc-prev');
  var nextBtn = car.querySelector('.rc-next');
  if (prevBtn) prevBtn.addEventListener('click', function() { stopTimer(); goTo(cur - 1, 'prev'); startTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', function() { stopTimer(); goTo(cur + 1, 'next'); startTimer(); });
  dots.forEach(function(d, i) { d.addEventListener('click', function() { stopTimer(); goTo(i, i > cur ? 'next' : 'prev'); startTimer(); }); });
  car.addEventListener('mouseenter', stopTimer);
  car.addEventListener('mouseleave', startTimer);
  startTimer();
});
