(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- scroll progress rail ---------------- */
  var progressFill = document.getElementById("progressFill");
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------------- generic reveal-on-scroll ---------------- */
  var revealEls = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------- count-up numbers (stats) ---------------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    var duration = 1100;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  var statNums = document.querySelectorAll(".stat-num");
  if ("IntersectionObserver" in window) {
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNums.forEach(function (el) {
      statObserver.observe(el);
    });
  } else {
    statNums.forEach(animateCount);
  }

  /* ---------------- skill gauges ---------------- */
  var gauges = document.querySelectorAll(".gauge");
  var GAUGE_CIRCUMFERENCE = 157; /* length of the semicircle path, radius 50: PI * r */

  function animateGauge(gaugeEl) {
    var value = parseInt(gaugeEl.getAttribute("data-value"), 10) || 0;
    var fillPath = gaugeEl.querySelector(".gauge-fill");
    var valueLabel = gaugeEl.querySelector(".gauge-value");
    var offsetTarget = GAUGE_CIRCUMFERENCE * (1 - value / 100);

    if (reduceMotion) {
      if (fillPath) fillPath.style.strokeDashoffset = offsetTarget;
      if (valueLabel) valueLabel.textContent = value + "%";
      return;
    }

    if (fillPath) {
      fillPath.style.transition = "stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1)";
      requestAnimationFrame(function () {
        fillPath.style.strokeDashoffset = offsetTarget;
      });
    }

    var duration = 1200;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * value);
      if (valueLabel) valueLabel.textContent = current + "%";
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var gaugeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateGauge(entry.target);
            gaugeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    gauges.forEach(function (el) {
      gaugeObserver.observe(el);
    });
  } else {
    gauges.forEach(animateGauge);
  }

  /* ---------------- experience timeline: draws as you scroll through it ---------------- */
  var timelineSection = document.querySelector(".timeline");
  var timelineDraw = document.getElementById("timelineDraw");

  function updateTimelineDraw() {
    if (!timelineSection || !timelineDraw) return;
    var rect = timelineSection.getBoundingClientRect();
    var viewportH = window.innerHeight;

    var total = rect.height + viewportH * 0.6;
    var traveled = viewportH * 0.85 - rect.top;
    var progress = Math.max(0, Math.min(1, traveled / total));

    var offset = 100 * (1 - progress);
    timelineDraw.style.strokeDashoffset = offset;
  }

  if (reduceMotion && timelineDraw) {
    timelineDraw.style.strokeDashoffset = 0;
  } else {
    window.addEventListener("scroll", updateTimelineDraw, { passive: true });
    window.addEventListener("resize", updateTimelineDraw);
    updateTimelineDraw();
  }
})();
