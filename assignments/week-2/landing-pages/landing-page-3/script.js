// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", function () {
  // ===== Header scroll effect =====
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ===== Mobile menu toggle =====
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("menu-open");
      mobileNav.classList.toggle("open");
      body.classList.toggle("no-scroll"); // Prevent background scrolling when menu is open
    });

    // Close menu when clicking on menu items
    const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("menu-open");
        mobileNav.classList.remove("open");
        body.classList.remove("no-scroll");
      });
    });
  }

  // ===== Scroll reveal animations =====
  const revealElements = document.querySelectorAll(
    ".reveal-on-scroll, .section-header, .tea-card"
  );

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150; // How many pixels from the bottom of the viewport to start revealing elements

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("revealed");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  // Initial check on page load
  revealOnScroll();

  // ===== Create floating tea leaves =====
  const createFloatingElements = () => {
    const floatingContainer = document.createElement("div");
    floatingContainer.className = "floating-elements";
    document.querySelector(".hero").appendChild(floatingContainer);

    // Create 5 tea leaves
    for (let i = 0; i < 5; i++) {
      const leaf = document.createElement("div");
      leaf.className = "tea-leaf";

      // Random positioning
      leaf.style.left = `${Math.random() * 100}%`;

      // Random animation duration between 15-25s
      const duration = 15 + Math.random() * 10;
      leaf.style.animationDuration = `${duration}s`;

      // Random delay so they don't all start at once
      const delay = Math.random() * 5;
      leaf.style.animationDelay = `${delay}s`;

      // Random initial rotation
      const rotation = Math.random() * 360;
      leaf.style.transform = `rotate(${rotation}deg)`;

      floatingContainer.appendChild(leaf);
    }
  };

  createFloatingElements();

  // ===== Smooth scroll for anchor links =====
  const smoothScroll = () => {
    const anchorLinks = document.querySelectorAll(
      'a[href^="#"]:not([href="#"])'
    );

    anchorLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Get the target position with offset for fixed header
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  };

  smoothScroll();

  // ===== Shop Button Shine Effect =====
  const addButtonShine = () => {
    const shopButton = document.querySelector(".shop-button");

    if (shopButton) {
      shopButton.addEventListener("mouseover", function () {
        this.classList.add("shine");

        // Remove the class after animation completes
        setTimeout(() => {
          this.classList.remove("shine");
        }, 1000);
      });
    }
  };

  addButtonShine();

  // ===== Testimonial Slider =====
  const initTestimonialSlider = () => {
    const testimonials = [
      {
        text: "This tea has completely transformed my morning routine. The aroma, the flavor, everything is simply perfect!",
        author: "Emily Chen",
      },
      {
        text: "I've been a tea enthusiast for years, but nothing compares to the quality and taste of these blends.",
        author: "Michael Johnson",
      },
      {
        text: "The attention to detail in sourcing and preparing these teas is evident from the first sip. Absolutely remarkable.",
        author: "Sarah Williams",
      },
    ];

    let currentTestimonial = 0;
    const testimonialContainer = document.querySelector(".testimonial-quote");

    if (testimonialContainer) {
      // Function to update the testimonial
      const updateTestimonial = () => {
        // Fade out
        testimonialContainer.style.opacity = 0;

        setTimeout(() => {
          // Update content
          testimonialContainer.innerHTML = `
            <div class="testimonial-text">${testimonials[currentTestimonial].text}</div>
            <div class="testimonial-author">- ${testimonials[currentTestimonial].author}</div>
          `;

          // Fade in
          testimonialContainer.style.opacity = 1;

          // Update counter
          currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }, 500);
      };

      // Initialize first testimonial
      updateTestimonial();

      // Set interval for rotation
      setInterval(updateTestimonial, 5000);
    }
  };

  initTestimonialSlider();

  // ===== Parallax Effect for Hero Background =====
  const parallaxEffect = () => {
    const bgImage = document.querySelector(".bg-image");

    if (bgImage) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.pageYOffset;
        bgImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      });
    }
  };

  parallaxEffect();

  // ===== Interactive Tea Cards =====
  const enhanceTeaCards = () => {
    const teaCards = document.querySelectorAll(".tea-card");

    teaCards.forEach((card) => {
      // Add hover sound effect (subtle)
      card.addEventListener("mouseenter", () => {
        // You can uncomment this if you want sound effects
        // const hoverSound = new Audio('path-to-your-sound.mp3');
        // hoverSound.volume = 0.2;
        // hoverSound.play();
      });

      // Add click functionality for mobile
      card.addEventListener("click", function (e) {
        // Only trigger if not clicking the buy button
        if (!e.target.classList.contains("buy-button")) {
          this.classList.toggle("active");
        }
      });
    });
  };

  enhanceTeaCards();

  // ===== Image lazy loading =====
  const lazyLoadImages = () => {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  };

  // Check if Intersection Observer is supported
  if ("IntersectionObserver" in window) {
    lazyLoadImages();
  } else {
    // Fallback for browsers that don't support Intersection Observer
    document.querySelectorAll("img[data-src]").forEach((img) => {
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
    });
  }

  // ===== Preloader =====
  const handlePreloader = () => {
    const preloader = document.querySelector(".preloader");

    if (preloader) {
      // Hide preloader after page loads
      window.addEventListener("load", () => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
      });
    }
  };

  handlePreloader();

  // ===== AOS - Animation On Scroll Alternative =====
  // This is a simpler alternative to the AOS library
  const initScrollAnimations = () => {
    const elements = document.querySelectorAll("[data-animation]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animation = entry.target.getAttribute("data-animation");
            entry.target.classList.add(animation);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  };

  initScrollAnimations();

  // ===== Add random sparkle effect to accent elements =====
  const addSparkleEffect = () => {
    const accentElements = document.querySelectorAll(".accent-element");

    accentElements.forEach((element) => {
      // Create sparkle container
      const sparkleContainer = document.createElement("div");
      sparkleContainer.className = "sparkle-container";
      element.appendChild(sparkleContainer);

      // Create random sparkles
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const sparkle = document.createElement("div");
          sparkle.className = "sparkle";

          // Random position within the element
          sparkle.style.left = `${Math.random() * 100}%`;
          sparkle.style.top = `${Math.random() * 100}%`;

          sparkleContainer.appendChild(sparkle);

          // Remove sparkle after animation completes
          setTimeout(() => {
            sparkle.remove();
          }, 1500);
        }, i * 300);
      }
    });
  };

  // Run sparkle effect every 5 seconds
  setInterval(addSparkleEffect, 5000);
});
