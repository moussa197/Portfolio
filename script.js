// Toast alternance
const toast = document.getElementById("toast-alternance");
const toastClose = document.getElementById("toast-close");

function hideToast() {
  toast.classList.add("hiding");
  setTimeout(() => {
    toast.style.display = "none";
  }, 400);
}

toastClose.addEventListener("click", hideToast);

// Auto-close après la barre de progression (20s + 2.1s delay)
setTimeout(hideToast, 22100);

// Navigation scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu
const burger = document.getElementById("burger");
const navMenu = document.getElementById("nav-menu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars
      if (entry.target.classList.contains("skills-container")) {
        const skillBars = entry.target.querySelectorAll(".skill-progress");
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 200);
        });
      }
    }
  });
}, observerOptions);

// Observe sections
document
  .querySelectorAll(
    ".section-header, .about-content, .skills-container, .github-container, .projects-container, .contact-container",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Form submission
const form = document.getElementById("form-contact");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Merci pour votre message ! Je vous répondrai dans les plus brefs délais.",
  );
  form.reset();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Typewriter effect
const roles = ["Développeur Full Stack", "Créateur Web", "Passionné Tech"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriter");

function typeWrite() {
  if (!typewriterEl) return;
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeWrite, 2200);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeWrite, 400);
  } else {
    setTimeout(typeWrite, isDeleting ? 45 : 90);
  }
}
typeWrite();

// 3D tilt on project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -7;
    const rotY = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transition = "transform 0.6s ease";
    card.style.transform = "";
    setTimeout(() => {
      card.style.transition = "";
    }, 600);
  });
  card.addEventListener("mouseenter", () => {
    card.style.transition = "transform 0.1s ease";
  });
});
