// Theme toggle functionality
const toggle = document.getElementById("darkModeToggle");
const body = document.body;
const themeIcon = document.getElementById("themeIcon");

// Create a transition overlay for smooth theme changes
const createTransitionOverlay = () => {
  const overlay = document.createElement("div");
  overlay.className = "theme-transition";
  document.body.appendChild(overlay);
  return overlay;
};

const transitionOverlay = createTransitionOverlay();

// Load saved mode from localStorage
const darkMode = localStorage.getItem("dark-mode");
if (darkMode === "enabled") {
  body.classList.add("dark");
  updateThemeIcon(true);
}

// Update theme icon based on current mode
function updateThemeIcon(isDark) {
  if (themeIcon) {
    themeIcon.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }
}

// Toggle theme with animation
toggle.addEventListener("click", () => {
  // Activate transition overlay
  transitionOverlay.classList.add("active");

  setTimeout(() => {
    // Toggle dark mode
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");

    // Update localStorage
    if (isDark) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }

    // Update icon
    updateThemeIcon(isDark);

    // Remove transition overlay
    setTimeout(() => {
      transitionOverlay.classList.remove("active");
    }, 300);
  }, 100);
});

// Create particles for background effect
const createParticles = () => {
  const container = document.createElement("div");
  container.className = "particles-container";
  document.body.appendChild(container);

  // Create particles
  const particleCount = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random sizing
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random positioning
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random animation duration and delay
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    // Add to container
    container.appendChild(particle);
  }
};

// Handle scroll animations
const handleScrollAnimations = () => {
  const elements = document.querySelectorAll(".reveal");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("active");
    }
  });
};

// Add reveal class to elements that should animate on scroll
const setupScrollAnimations = () => {
  // Add reveal class to elements that should be animated on scroll
  const sections = document.querySelectorAll("section:not(.hero)");
  sections.forEach((section) => section.classList.add("reveal"));

  // Additional elements to animate
  const additionalElements = document.querySelectorAll(
    ".brands-section, .hero-image"
  );
  additionalElements.forEach((el) => {
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal");
    }
  });
};

// Add floating effect to selected elements
const addFloatingEffect = () => {
  const floatingElements = document.querySelectorAll(".hero-image");
  floatingElements.forEach((el) => el.classList.add("floating"));
};

// Add hover effect for buttons
const addButtonEffects = () => {
  const buttons = document.querySelectorAll(".demo-button, .dark-mode-toggle");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", (e) => {
      // Create ripple effect
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
};

// Create typing effect for hero headline
const createTypingEffect = () => {
  const headlineElement = document.querySelector(".content-col h1");
  if (!headlineElement) return;

  const originalText = headlineElement.textContent;
  headlineElement.textContent = "";

  let i = 0;
  const typingEffect = setInterval(() => {
    if (i < originalText.length) {
      headlineElement.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typingEffect);
    }
  }, 100);
};

// Initialize all effects when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  setupScrollAnimations();
  addFloatingEffect();
  addButtonEffects();

  // Add scroll event listener for reveal animations
  window.addEventListener("scroll", handleScrollAnimations);

  // Initial check for elements in viewport
  handleScrollAnimations();
});

// Handle window resize
window.addEventListener("resize", () => {
  // Update particles if needed
  const container = document.querySelector(".particles-container");
  if (container) {
    container.innerHTML = "";
    createParticles();
  }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add intersection observer for more advanced scroll animations
const setupIntersectionObserver = () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
};

// Setup intersection observer if browser supports it
if ("IntersectionObserver" in window) {
  setupIntersectionObserver();
}
