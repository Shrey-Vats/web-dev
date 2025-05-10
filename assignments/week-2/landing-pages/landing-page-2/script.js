// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    lastScrollY = window.scrollY;
  });

  // Reveal animations on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Add reveal class to elements you want to animate
  document
    .querySelectorAll(
      ".highlight-card, .hero-content h1, .hero-content p, .hero-content img, .enroll-button"
    )
    .forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });

  // Cursor spotlight effect (follows mouse) for hero section
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mousemove", (e) => {
      const spotlight = document.createElement("div");
      spotlight.className = "spotlight";

      // Position spotlight at mouse position
      const x = e.pageX - hero.offsetLeft;
      const y = e.pageY - hero.offsetTop;

      spotlight.style.left = x + "px";
      spotlight.style.top = y + "px";

      hero.appendChild(spotlight);

      // Remove spotlight after animation completes
      setTimeout(() => {
        spotlight.remove();
      }, 1000);
    });
  }

  // Button pulse animation
  const ctaButton = document.querySelector(".enroll-button");
  if (ctaButton) {
    setInterval(() => {
      ctaButton.classList.add("pulse");
      setTimeout(() => {
        ctaButton.classList.remove("pulse");
      }, 1000);
    }, 5000);
  }

  // Add parallax effect to background
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;

    // Only apply parallax if screen is large enough
    if (window.innerWidth > 768) {
      document.body.style.backgroundPosition = `center ${
        scrollPosition * 0.05
      }px`;
    }
  });

  // Add additional CSS for the spotlight effect (add this dynamically)
  const style = document.createElement("style");
  style.textContent = `
    .spotlight {
      position: absolute;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, rgba(0, 255, 157, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 1;
      opacity: 1;
      animation: fadeOut 1s forwards;
    }
    
    @keyframes fadeOut {
      0% { opacity: 1; width: 0; height: 0; }
      50% { opacity: 0.8; }
      100% { opacity: 0; width: 150px; height: 150px; }
    }
    
    .pulse {
      animation: buttonPulse 1s;
    }
    
    @keyframes buttonPulse {
      0% { transform: scale(1); box-shadow: 0 5px 15px rgba(0, 255, 157, 0.3); }
      50% { transform: scale(1.05); box-shadow: 0 5px 20px rgba(0, 255, 157, 0.5); }
      100% { transform: scale(1); box-shadow: 0 5px 15px rgba(0, 255, 157, 0.3); }
    }
  `;
  document.head.appendChild(style);
});
