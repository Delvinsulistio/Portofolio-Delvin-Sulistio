const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Show the back-to-top button after scrolling down.
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  if (!backTop) return;
  backTop.classList.toggle("show", window.scrollY > 450);
});

// Close the mobile navigation menu after selecting a section.
const navElement = document.getElementById("mainNav");

document.querySelectorAll("#mainNav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navElement && navElement.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navElement).hide();
    }
  });
});

// Highlight the current navigation section while scrolling.
const sections = document.querySelectorAll("header[id], main section[id]");
const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));


document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  // Reveal elements when scrolling
  const revealElements = document.querySelectorAll(
    "#about .col-lg-5, #about .tech-panel, " +
    "#skills .section-title, " +
    ".project-card, .timeline-item, " +
    "#experience .tech-panel, " +
    "#contact .col-lg-6"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  // Animate skill cards
  const skillCards = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

  skillCards.forEach((card) => {
    observer.observe(card);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const roleElement = document.getElementById("typing-role");

  if (!roleElement) return;

  const roles = [
    "Web Developer",
    "Data Analyst",
    "Aspiring Data Analyst"
  ];

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) {
    roleElement.textContent = "Data Analyst";
    return;
  }

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = true;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    roleElement.textContent = currentRole.substring(0, charIndex);

    let delay = deleting ? 45 : 85;

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    } else if (!deleting && charIndex === roles[roleIndex].length) {
      deleting = true;
      delay = 1500;
    }

    setTimeout(typeEffect, delay);
  }

  setTimeout(typeEffect, 1800);
});
