document.addEventListener("DOMContentLoaded", () => {
  // ─── Theme Toggle ───────────────────────────────────────────────
  const body = document.body;
  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "dark") body.classList.add("dark-theme");

  function applyTheme() {
    body.classList.toggle("dark-theme");
    localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
  }

  // Desktop theme toggle
  document.getElementById("theme-toggle")?.addEventListener("click", applyTheme);
  // Mobile sidebar theme toggle
  document.getElementById("theme-toggle-mobile")?.addEventListener("click", applyTheme);

  // ─── Mobile Sidebar ─────────────────────────────────────────────
  const hamburger   = document.getElementById("hamburger");
  const sidebar     = document.getElementById("sidebar");
  const sidebarClose= document.getElementById("sidebarClose");
  const backdrop    = document.getElementById("menuBackdrop");
  const sidebarLinks= document.querySelectorAll(".sidebar-links a");

  function openSidebar() {
    sidebar.classList.add("active");
    backdrop.classList.add("active");
    body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    backdrop.classList.remove("active");
    body.style.overflow = "";
  }

  hamburger?.addEventListener("click", openSidebar);
  sidebarClose?.addEventListener("click", closeSidebar);
  backdrop?.addEventListener("click", closeSidebar);

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  // ─── Smooth Scrolling ───────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
      }
    });
  });

  // ─── Navbar Scroll Effect ───────────────────────────────────────
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.style.padding = window.scrollY > 20 ? "10px 0" : "15px 0";
  });

  // ─── Scroll Reveal Animations ───────────────────────────────────
  const style = document.createElement("style");
  style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll("section, .service-card, .portfolio-item, .footer-col").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    revealObserver.observe(el);
  });
});
