(function () {
  const saved = localStorage.getItem("theme") || "light";

  function apply(t) {
    document.documentElement.setAttribute("data-theme", t);
    const sl = document.getElementById("site-logo");
    const fl = document.getElementById("footer-logo");
    const btn = document.getElementById("themeToggle");
    if (sl) sl.src = t === "dark" ? "assets/logo-dark.png" : "assets/logo-light.png";
    if (fl) fl.src = t === "dark" ? "assets/logo-dark.png" : "assets/logo-light.png";
    if (btn) btn.textContent = t === "dark" ? "☀" : "☾";
    localStorage.setItem("theme", t);
  }

  // Apply immediately (before DOM ready) to prevent flash
  apply(saved);

  window.addEventListener("DOMContentLoaded", function () {
    apply(saved);

    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme");
        apply(current === "dark" ? "light" : "dark");
      });
    }

    // Active nav link
    const path = window.location.pathname.split("/").pop() || "index.html";
    const map = {
      "index.html": "nav-home",
      "services.html": "nav-services",
      "how-it-works.html": "nav-how",
      "about.html": "nav-about",
      "contact.html": "nav-contact",
    };
    const activeEl = document.getElementById(map[path]);
    if (activeEl) activeEl.classList.add("active");

    // FAQ accordion (if present)
    document.querySelectorAll(".faq-item").forEach((item) => {
      const q = item.querySelector(".faq-q");
      if (q) q.addEventListener("click", () => item.classList.toggle("open"));
    });

    // Contact form (if present)
    const form = document.getElementById("auditForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        this.style.display = "none";
        const success = document.getElementById("successBox");
        if (success) success.classList.add("show");
      });
    }
  });
})();
