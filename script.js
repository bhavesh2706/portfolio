/* ═══════════════════════════════════════════════════
   BHAVESH BAROT — PORTFOLIO SCRIPTS
═══════════════════════════════════════════════════ */

// ─── Custom Cursor ────────────────────────────────
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");

if (cursor && cursorDot) {
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + "px";
    cursor.style.top = curY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll("a, button, .skill-card, .project-card").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.style.transform = "translate(-50%,-50%) scale(1.6)");
    el.addEventListener("mouseleave", () => cursor.style.transform = "translate(-50%,-50%) scale(1)");
  });
}

// ─── Active Nav on Scroll ─────────────────────────
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -40% 0px",
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("data-section") === id);
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ─── Smooth Scroll ────────────────────────────────
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Close mobile menu
    sidebar.classList.remove("open");
  });
});

// CTA buttons
document.querySelectorAll(".btn-primary, .btn-ghost").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const href = btn.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ─── Mobile Hamburger ─────────────────────────────
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Close sidebar on outside click
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove("open");
  }
});

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

// ─── Hero parallax (subtle) ───────────────────────
const heroSection = document.getElementById("home");
if (heroSection) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      const heroText = heroSection.querySelector(".hero-text");
      if (heroText) {
        heroText.style.transform = `translateY(${scrolled * 0.08}px)`;
      }
    }
  }, { passive: true });
}

lucide.createIcons();
