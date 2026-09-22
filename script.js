// Animate skill bars once they scroll into view
const bars = document.querySelectorAll('.bar-fill');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('filled');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach((bar) => observer.observe(bar));
} else {
  bars.forEach((bar) => bar.classList.add('filled'));
}
