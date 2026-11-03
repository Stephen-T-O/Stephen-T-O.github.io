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

const header = document.querySelector(".header");
const nav = header?.querySelector("nav");
if (header && nav) {
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
