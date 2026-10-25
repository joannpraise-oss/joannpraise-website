// joannpraise.com — scroll-reveal + small interactions
document.addEventListener('DOMContentLoaded', function () {
  var els = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { obs.observe(el); });

  initBookCycle();
});

// ---------------------------------------------------------------------
// "What I'm Reading" — year-of-books cycler (Now page)
// To add a book: just add a new { title, author, month } entry below.
// They'll cycle in order, fading one into the next automatically.
// ---------------------------------------------------------------------
var BOOKS = [
  { title: 'His Very Best: Jimmy Carter, A Life', author: 'Jonathan Alter', month: 'October 2026' },
  { title: 'Vibe', author: 'Adam Grant', month: 'November 2026' }
];

function initBookCycle() {
  var el = document.getElementById('book-cycle');
  if (!el || !BOOKS.length) return;

  el.innerHTML = BOOKS.map(function (b, i) {
    return '<div class="book-slide" style="position:absolute; top:0; left:0; width:100%; opacity:' + (i === 0 ? 1 : 0) + '; transition:opacity 1s ease;">' +
      '<div style="font-family:\'Cormorant Garamond\',serif; font-size:18px; font-style:italic; color:#14151A; line-height:1.45;">' + b.title + '</div>' +
      '<div style="font-size:13px; color:#26333F; opacity:0.7; margin-top:6px;">' + b.author + ' · ' + b.month + '</div>' +
    '</div>';
  }).join('');

  if (BOOKS.length < 2) return;

  var slides = el.querySelectorAll('.book-slide');
  var idx = 0;
  setInterval(function () {
    slides[idx].style.opacity = '0';
    idx = (idx + 1) % slides.length;
    slides[idx].style.opacity = '1';
  }, 4000);
}
