// Highlights the nav link for the section currently in view.
// Progressive enhancement only — the page is fully usable without this.
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) {
    return;
  }

  var linkByHref = {};
  navLinks.forEach(function (link) {
    linkByHref[link.getAttribute('href')] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = linkByHref['#' + entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(function (section) {
    if (linkByHref['#' + section.id]) {
      observer.observe(section);
    }
  });
})();
