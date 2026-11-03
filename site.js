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
