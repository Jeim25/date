// ---------- Countdown to July 20, 2026, midnight (local time) ----------
(function () {
  const target = new Date(2026, 6, 20, 0, 0, 0); // month is 0-indexed: 6 = July

  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs'),
  };

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const now = new Date();
    let diff = target - now;

    if (diff <= 0) {
      els.days.textContent = '00';
      els.hours.textContent = '00';
      els.mins.textContent = '00';
      els.secs.textContent = '00';
      clearInterval(timer);
      return;
    }

    const day = Math.floor(diff / 86400000);
    diff -= day * 86400000;
    const hour = Math.floor(diff / 3600000);
    diff -= hour * 3600000;
    const min = Math.floor(diff / 60000);
    diff -= min * 60000;
    const sec = Math.floor(diff / 1000);

    els.days.textContent = pad(day);
    els.hours.textContent = pad(hour);
    els.mins.textContent = pad(min);
    els.secs.textContent = pad(sec);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

// ---------- Subtle reveal for timeline items ----------
(function () {
  const items = document.querySelectorAll('.tl-item');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((el) => observer.observe(el));
})();