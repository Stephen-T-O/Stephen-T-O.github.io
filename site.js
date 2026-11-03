document.documentElement.classList.add("js");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const header = document.querySelector(".header");
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 28);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const pointer = { x: 0, y: 0 };
window.addEventListener("pointermove", (event) => {
  pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
  pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  document.documentElement.style.setProperty("--pointer-x", `${pointer.x.toFixed(3)}`);
  document.documentElement.style.setProperty("--pointer-y", `${pointer.y.toFixed(3)}`);
}, { passive: true });

document.querySelectorAll(".hero, .cta").forEach((section) => {
  section.addEventListener("pointermove", (event) => {
    const rect = section.getBoundingClientRect();
    section.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    section.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }, { passive: true });
});

document.querySelectorAll(".service-card, .project, .detail").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
  }, { passive: true });
  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  });
});

const logoLinks = document.querySelectorAll(".logo");
logoLinks.forEach((logo) => logo.setAttribute("data-brand", "XciX Digitals"));
