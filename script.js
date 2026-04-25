/* ═══════════════════════════════════════════════════
   BHAVESH BAROT — PORTFOLIO SCRIPTS
═══════════════════════════════════════════════════ */

// ─── Theme Toggle (Light / Dark) ──────────────────
(function () {
  const toggle = document.getElementById("themeToggle");
  const saved  = localStorage.getItem("bb-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next    = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("bb-theme", next);
    });
  }
})();

// ─── Custom Cursor ────────────────────────────────
const cursor    = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");

if (cursor && cursorDot) {
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;
  let cursorVisible = false;

  // Hide until first mouse move so cursor doesn't flash at 0,0
  cursor.style.opacity = "0";
  cursorDot.style.opacity = "0";

  document.addEventListener("mousemove", (e) => {
    if (!cursorVisible) {
      cursorVisible = true;
      cursor.style.opacity = "1";
      cursorDot.style.opacity = "1";
    }
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top  = mouseY + "px";
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + "px";
    cursor.style.top  = curY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll("a, button, .skill-card, .project-card").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.style.transform = "translate(-50%,-50%) scale(1.6)");
    el.addEventListener("mouseleave", () => cursor.style.transform = "translate(-50%,-50%) scale(1)");
  });
}

// ─── Active Nav on Scroll ─────────────────────────
const sections  = document.querySelectorAll(".section");
const navLinks  = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("data-section") === id);
      });
    }
  });
}, { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

// ─── Smooth Scroll ────────────────────────────────
const sidebar = document.getElementById("sidebar");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (sidebar) sidebar.classList.remove("open");
  });
});

document.querySelectorAll(".btn-primary, .btn-ghost").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const href = btn.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ─── Mobile Hamburger ─────────────────────────────
const hamburger = document.getElementById("hamburger");

if (hamburger && sidebar) {
  hamburger.addEventListener("click", () => sidebar.classList.toggle("open"));
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });
}

// ─── Scroll Fade-In Animations ────────────────────
const fadeEls = document.querySelectorAll(
  ".skill-card, .timeline-item, .project-card, .highlight-item, .edu-card, .contact-item"
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach((el, i) => {
  el.classList.add("fade-in-up");
  el.style.transitionDelay = (i % 6) * 70 + "ms";
  fadeObserver.observe(el);
});

// ─── Hero Parallax (subtle) ───────────────────────
const heroSection = document.getElementById("home");
if (heroSection) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      const heroText = heroSection.querySelector(".hero-text");
      if (heroText) heroText.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
  }, { passive: true });
}

lucide.createIcons();
