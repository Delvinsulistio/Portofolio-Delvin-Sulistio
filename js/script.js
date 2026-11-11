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


// PROJECT DETAIL DATA
const projectData = {
  codequest: {
    title: "CodeQuest",
    category: "MOBILE APP · GAMIFIED LEARNING",
    description:
      "CodeQuest is a gamified programming-learning application designed to help high school students and beginners learn programming through structured lessons, quizzes, experience points, and achievements.",

    images: [
      "assets/images/projects/Code1.jpeg",
      "assets/images/projects/Code2.jpeg",
      "assets/images/projects/Code3.jpeg"
    ],

    features: [
      "Structured programming learning materials",
      "Interactive quizzes and scoring",
      "XP, levels, and achievement badges",
      "Learning progress tracking"
    ],

    technologies: [
      "Flutter",
      "Dart",
      "MongoDB",
      "Node.js",
      "React"
    ],

    github: "https://github.com/Gunadi-kripto/CodeQuest-"
  },

  ponti: {
    title: "Ponti Jaya Motor",
    category: "WEBSITE · AUTOMOTIVE MARKETPLACE",
    description:
      "Ponti Jaya Motor is a web-based marketplace designed to showcase and sell Bajaj motorcycle spare parts, making it easier for customers to explore available products and services.",

    images: [
      "assets/images/projects/P1.jpeg",
      "assets/images/projects/P2.jpeg",
      "assets/images/projects/P3.jpeg"
    ],

    features: [
      "Spare parts product catalog",
      "Product category browsing",
      "Product information display",
      "Online marketplace experience"
    ],

    technologies: [
      "Next.js",
      "React",
      "Node.js"
    ],

    github: "https://github.com/Darrell30/Ponti-Jaya-Motor"
  },

  quickfood: {
    title: "Quick Food",
    category: "MOBILE APP · FOOD DELIVERY",
    description:
      "Quick Food is a food delivery application concept that simulates an online food ordering experience and integrates Google Maps for location-related functionality.",

    images: [
      "assets/images/projects/q1.jpeg",
      "assets/images/projects/q2.jpeg",
      "assets/images/projects/q3.jpeg"
    ],

    features: [
      "Food ordering interface",
      "Food and restaurant browsing",
      "Google Maps integration",
      "Mobile application experience"
    ],

    technologies: [
      "Flutter",
      "Dart",
      "MongoDB",
      "Cloudinary",
      "Google Maps API"
    ],

    github: "https://github.com/Darrell30/Food-Delivery-App"
  }
};


// PROJECT MODAL FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {

  const modalElement = document.getElementById("projectModal");

  if (!modalElement || typeof bootstrap === "undefined") {
    console.error("Project modal or Bootstrap JS was not found.");
    return;
  }

  const projectModal = new bootstrap.Modal(modalElement);

  const title = document.getElementById("projectTitle");
  const heading = document.getElementById("projectHeading");
  const category = document.getElementById("projectCategory");
  const description = document.getElementById("projectDescription");
  const image = document.getElementById("projectImage");
  const counter = document.getElementById("galleryCounter");
  const dots = document.getElementById("galleryDots");
  const features = document.getElementById("projectFeatures");
  const technologies = document.getElementById("projectTechnologies");
  const github = document.getElementById("projectGithub");

  let currentProject = null;
  let currentImageIndex = 0;

  function showProjectImage(index) {

    if (!currentProject) return;

    const images = currentProject.images;

    currentImageIndex =
      (index + images.length) % images.length;

    image.style.opacity = "0";

    const nextImage = new Image();

    nextImage.onload = function () {
      image.src = nextImage.src;
      image.alt = currentProject.title + " screenshot " +
        (currentImageIndex + 1);

      image.style.opacity = "1";
    };

    nextImage.onerror = function () {
      image.style.opacity = "1";
      console.error("Image not found:", images[currentImageIndex]);
    };

    nextImage.src = images[currentImageIndex];

    counter.textContent =
      String(currentImageIndex + 1).padStart(2, "0") +
      " / " +
      String(images.length).padStart(2, "0");

    dots.innerHTML = "";

    images.forEach((_, i) => {

      const dot = document.createElement("button");

      dot.type = "button";
      dot.className =
        "gallery-dot" +
        (i === currentImageIndex ? " active" : "");

      dot.setAttribute("aria-label", "Show screenshot " + (i + 1));

      dot.addEventListener("click", () => {
        showProjectImage(i);
      });

      dots.appendChild(dot);
    });
  }


  function openProject(projectKey) {

    const project = projectData[projectKey];

    if (!project) return;

    currentProject = project;
    currentImageIndex = 0;

    title.textContent = project.title;
    heading.textContent = project.title;
    category.textContent = project.category;
    description.textContent = project.description;

    // FEATURES
    features.innerHTML = "";

    project.features.forEach(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      features.appendChild(li);
    });

    // TECHNOLOGIES
    technologies.innerHTML = "";

    project.technologies.forEach(tech => {
      const span = document.createElement("span");
      span.textContent = tech;
      technologies.appendChild(span);
    });

    // GITHUB LINK
    github.href = project.github;

    showProjectImage(0);

    projectModal.show();
  }


  // OPEN PROJECT BUTTONS
  document.querySelectorAll(".project-detail-btn").forEach(button => {

    button.addEventListener("click", function () {

      const projectKey = this.dataset.project;

      openProject(projectKey);

    });

  });


  // NEXT IMAGE
  document.getElementById("galleryNext")
    .addEventListener("click", function () {

      showProjectImage(currentImageIndex + 1);

    });


  // PREVIOUS IMAGE
  document.getElementById("galleryPrev")
    .addEventListener("click", function () {

      showProjectImage(currentImageIndex - 1);

    });

});
