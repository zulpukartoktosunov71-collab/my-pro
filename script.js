// ===== 1. МОБИЛДИК МЕНЮ =====
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuBtn.classList.toggle("open", isOpen);
  menuBtn.setAttribute("aria-expanded", isOpen);
});

// ===== 2. SMOOTH SCROLLING =====
// Меню шилтемесин басканда менюну жаап, бөлүмгө жылмакай жылабыз
const navLinks = document.querySelectorAll(".nav-link");

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (id.length < 2) return;            // "#" гана болсо — өткөрүп жиберебиз
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    menu.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ===== 3. SCROLL АНИМАЦИЯСЫ =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== 4. АКТИВДҮҮ МЕНЮ ПУНКТУ =====
const sections = document.querySelectorAll("main section[id]");

function setActiveLink() {
  const scrollPos = window.scrollY + 120;
  let currentId = "home";
  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) currentId = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

// ===== 5. «ЖОГОРУ ЧЫГУУ» КНОПКАСЫ =====
const toTop = document.getElementById("toTop");

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  setActiveLink();
  toTop.classList.toggle("show", window.scrollY > 500);
});

setActiveLink();
