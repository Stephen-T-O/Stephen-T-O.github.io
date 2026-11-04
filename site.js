document.documentElement.classList.add("js");

document.querySelectorAll(".logo").forEach((logo) => {
  logo.innerHTML = `<span class="brand-mark" aria-hidden="true"><i></i><i></i></span><span class="brand-copy"><strong class="brand-name">XciX</strong><span class="brand-tag">Digital Intelligence</span></span>`;
  logo.setAttribute("aria-label", "XciX Digitals home");
});

document.querySelectorAll("a, b").forEach((element) => {
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) node.textContent = node.textContent.replace(/[↗→]/g, "");
  });
});

document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  const target = link.getAttribute("href");
  if (target && target !== "index.html") link.setAttribute("href", `${target.replace(/\.html$/, "")}/`);
  if (target === "index.html") link.setAttribute("href", "./");
});

// GitHub Pages serves the homepage from the repository root, not /index/.
// Normalize legacy Home and logo links on nested routes before navigation.
document.querySelectorAll('a[href="../index/"], a[href="../index"]').forEach((link) => {
  link.setAttribute("href", "../");
});
document.querySelectorAll(".header nav a").forEach((link) => {
  if (link.textContent.trim().toLowerCase() === "home") {
    link.setAttribute("href", location.pathname === "/" ? "/" : "../");
  }
});

const header = document.querySelector(".header");
const nav = header?.querySelector("nav");
if (header && nav) {
  if (!nav.querySelector('[href="founder.html"]')) {
    const founderLink = document.createElement("a");
    founderLink.href = "founder.html";
    founderLink.textContent = "Founder";
    if (location.pathname.endsWith("founder.html")) founderLink.classList.add("active");
    nav.append(founderLink);
  }
  const menuButton = document.createElement("button");
  menuButton.className = "menu-toggle";
  menuButton.type = "button";
  menuButton.setAttribute("aria-label", "Open navigation");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "<span></span><span></span>";
  header.insertBefore(menuButton, nav);
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuButton.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal, .service-card, .project, .detail, .reason-list article").forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

const whatsapp = document.createElement("a");
whatsapp.className = "whatsapp-float";
whatsapp.href = "https://wa.me/2348137477654";
whatsapp.target = "_blank";
whatsapp.rel = "noreferrer";
whatsapp.setAttribute("aria-label", "Chat with XciX Digitals on WhatsApp");
whatsapp.innerHTML = '<span>WhatsApp</span><b>◔</b>';
document.body.append(whatsapp);

const contactMethods = document.querySelector(".contact-methods");
if (contactMethods) {
  const whatsappMethod = document.createElement("a");
  whatsappMethod.href = "https://wa.me/2348137477654";
  whatsappMethod.target = "_blank";
  whatsappMethod.rel = "noreferrer";
  whatsappMethod.innerHTML = "<div><p>WhatsApp</p><h3>+234 813 747 7654</h3></div><span></span>";
  contactMethods.prepend(whatsappMethod);
}

document.querySelectorAll(".socials").forEach((socials) => {
  if (!socials.querySelector('[href^="https://wa.me/"]')) {
    const link = document.createElement("a");
    link.href = "https://wa.me/2348137477654";
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "WhatsApp";
    socials.append(link);
  }
});

// Site-wide interaction layer: fixed-header state, scroll progress, and subtle pointer motion.
const progress = document.createElement("div");
progress.className = "scroll-progress";
document.body.append(progress);
const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
document.body.append(cursorGlow);

const updateScrollState = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  header?.classList.toggle("scrolled", window.scrollY > 18);
};
window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState, { passive: true });
updateScrollState();

if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = "1";
    document.querySelectorAll(".hero, .cta").forEach((section) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      section.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  }, { passive: true });
  document.querySelectorAll(".service-card, .project, .detail, .value-card, .expertise-grid article").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty("--tilt-x", `${(y * -3).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 3).toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

// Stagger visible elements so each page feels composed, not mechanically animated.
document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
});
