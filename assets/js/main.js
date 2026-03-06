/* ================================================
   main.js — Core Portfolio Functionality
   Author: Alok Pandit
   ================================================ */

// ====================================================
// === LOADER
// ====================================================
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("hide");
      setTimeout(() => loader.remove(), 600);
    }
  }, 1600);
});

// ====================================================
// === DOMContentLoaded — initialise all modules
// ====================================================
document.addEventListener("DOMContentLoaded", () => {
  // AOS scroll animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }

  initNavbar(); // Fixed hamburger + smooth close-outside
  initTyping(); // Typewriter
  initCounters(); // Animated counters
  initBackToTop(); // Back-to-top button
  initFormSubmit(); // Contact form
  initSkillTabs(); // Skill category filter tabs
  initSkillBars(); // Animate skill level bars
  initTestimonials(); // Fetch + render testimonials dynamically
  initSmoothScroll(); // Smooth anchor scrolling
});

// ====================================================
// === 1. NAVBAR + HAMBURGER MENU
//     - Slides from the right side
//     - Animates hamburger → X icon
//     - Clicking a link closes menu
//     - Clicking outside menu closes menu
//     - Works on mobile, tablet, and desktop
// ====================================================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const mobileClose = document.getElementById("mobileClose");
  const overlay = document.getElementById("mobileOverlay");

  if (!navbar) return;

  // Collect all mobile nav links
  const mobileLinks = mobileNav
    ? mobileNav.querySelectorAll("a")
    : document.querySelectorAll(".mobile-nav a");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    updateActiveNav();
  });

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileNav();
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener("click", closeMobileNav);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMobileNav);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

  function toggleMobileNav() {
    mobileNav.classList.contains("open") ? closeMobileNav() : openMobileNav();
  }

  function openMobileNav() {
    mobileNav.classList.add("open");
    hamburger.classList.add("active");

    hamburger.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");

    if (overlay) overlay.classList.add("show");

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    if (navbar) navbar.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    mobileNav.classList.remove("open");
    hamburger?.classList.remove("active");

    hamburger?.setAttribute("aria-expanded", "false");
    mobileNav?.setAttribute("aria-hidden", "true");

    if (overlay) overlay.classList.remove("show");

    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    if (navbar) navbar.style.paddingRight = "";
  }
}

// --- Highlight active nav link based on scroll position ---
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  let current = "";

  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) current = sec.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
}

// ====================================================
// === 2. TYPING ANIMATION
//     Cycles through developer role strings
// ====================================================
function initTyping() {
  const el = document.getElementById("typingText");
  if (!el) return;

  const words = [
    "MERN Stack Developer",
    "Blockchain Engineer",
    "Smart Contract Dev",
    "Full Stack Engineer",
    "Web3 Builder",
    "Node.js Expert",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const word = words[wordIndex];

    if (isDeleting) {
      el.textContent = word.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = word.substring(0, charIndex + 1);
      charIndex++;
    }

    // Reached end of word → pause then delete
    if (!isDeleting && charIndex === word.length) {
      isDeleting = true;
      return setTimeout(type, 2000);
    }

    // Finished deleting → move to next word
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      return setTimeout(type, 400);
    }

    setTimeout(type, isDeleting ? 60 : 110);
  }

  type();
}

// ====================================================
// === 3. COUNTER ANIMATION
//     Uses IntersectionObserver to trigger once in view
// ====================================================
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target, parseInt(entry.target.dataset.count));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((el) => observer.observe(el));
}

function animateCounter(el, target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 30);
}

// ====================================================
// === 4. BACK TO TOP BUTTON
// ====================================================
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ====================================================
// === 5. CONTACT FORM — Simulated submit with success state
// ====================================================
function initFormSubmit() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".submit-btn");
    if (btn) {
      btn.textContent = "Sending...";
      btn.disabled = true;
    }

    setTimeout(() => {
      form.style.display = "none";
      const success = document.getElementById("formSuccess");
      if (success) success.style.display = "block";
    }, 1500);
  });
}

// ====================================================
// === 6. SKILL TABS — Filter skill cards by category
// ====================================================
function initSkillTabs() {
  const tabs = document.querySelectorAll(".skill-tab");
  const cards = document.querySelectorAll(".skill-card");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Update active tab
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const cat = tab.dataset.tab;

      // Show/hide cards
      cards.forEach((card) => {
        const show = cat === "all" || card.dataset.category === cat;
        card.style.display = show ? "flex" : "none";
        card.style.flexDirection = show ? "column" : "";
        card.style.alignItems = show ? "center" : "";
      });
    });
  });
}

// ====================================================
// === 7. SKILL BARS — Animate width when visible
// ====================================================
function initSkillBars() {
  const fills = document.querySelectorAll(".skill-level-fill");
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.level + "%";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  fills.forEach((f) => observer.observe(f));
}

// ====================================================
// === 8. TESTIMONIALS — Fetch JSON + Dynamic Render
//     Rows:  1 → left-to-right
//            2 → right-to-left
//            3 → left-to-right
// ====================================================
async function initTestimonials() {
  const wrapper = document.getElementById("testimonialsWrapper");
  if (!wrapper) return;

  let testimonials = [];

  try {
    const res = await fetch("assets/data/testimonials.json");
    if (!res.ok) throw new Error("fetch failed");
    testimonials = await res.json();
  } catch (err) {
    // Fallback inline data if fetch fails (e.g. opened directly as file://)
    console.warn(
      "testimonials.json fetch failed, using fallback data:",
      err.message,
    );
    testimonials = getFallbackTestimonials();
  }

  // We need enough cards to fill 3 rows; duplicate data across rows
  renderTestimonialRows(wrapper, testimonials);
}

/**
 * Renders 3 marquee rows from testimonial data.
 * Each row gets cards duplicated for a seamless infinite loop.
 * Row directions: left, right, left
 */
function renderTestimonialRows(wrapper, data) {
  // Clear any existing static content
  wrapper.innerHTML = "";

  // Decide how many items per row (min 5 for visual density)
  // Cycle through the data array as many times as needed
  const rowCount = 3;
  const minCards = 6; // minimum cards to fill one row before duplication

  for (let row = 0; row < rowCount; row++) {
    const rowEl = document.createElement("div");
    const direction = row % 2 === 0 ? "marquee-left" : "marquee-right";
    rowEl.classList.add("marquee-row", direction);

    // Build enough cards (real + duplicate for seamless loop)
    const cards = buildRowCards(data, row, minCards);
    // Duplicate once for the seamless infinite scroll effect
    const doubled = cards + cards;
    rowEl.innerHTML = doubled;

    wrapper.appendChild(rowEl);
  }
}

/**
 * Builds HTML string of testimonial cards for a given row.
 * Cycles through data array with an offset per row.
 */
function buildRowCards(data, rowOffset, minCount) {
  let html = "";
  const total = Math.max(minCount, data.length);

  for (let i = 0; i < total; i++) {
    const item = data[(i + rowOffset * 2) % data.length];
    html += createTestimonialCard(item);
  }
  return html;
}

/**
 * Creates a single testimonial card HTML element.
 * Supports image or initials fallback avatar.
 */
function createTestimonialCard(item) {
  // Build avatar: try image, fallback to initials
  const initials = (item.name || "AP")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatarHtml = item.image
    ? `<img src="${item.image}"
             alt="${item.name}"
             class="testi-avatar-img"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
       <div class="testi-avatar" style="display:none;">${initials}</div>`
    : `<div class="testi-avatar">${initials}</div>`;

  return `
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-text">"${item.review || item.text || ""}"</p>
      <div class="testi-author">
        <div class="testi-avatar-wrap">
          ${avatarHtml}
        </div>
        <div>
          <div class="testi-name">${item.name || "Anonymous"}</div>
          <div class="testi-role">${item.company || item.role || ""}</div>
        </div>
      </div>
    </div>`;
}

/** Fallback testimonials if JSON fails to load */
function getFallbackTestimonials() {
  return [
    {
      name: "Michael T.",
      company: "Photophorm Innovations",
      image: "assets/images/testimonials/client1.jpg",
      review:
        "Alok delivered exceptional work and helped bring our product concept to life. The MERN stack app was flawless.",
    },
    {
      name: "David R.",
      company: "Apex Interactive",
      image: "assets/images/testimonials/client2.jpg",
      review:
        "Great experience working with Alok. The smart contract implementation was clean, secure and gas-optimized.",
    },
    {
      name: "Ian Ahmad",
      company: "Meteor Visuals",
      image: "assets/images/testimonials/client3.jpg",
      review:
        "Highly professional and detail-oriented. Our REST API now handles 10k+ requests daily without breaking a sweat.",
    },
    {
      name: "Rahul Kumar",
      company: "Panic Outfits",
      image: "assets/images/testimonials/client4.jpg",
      review:
        "Alok built our entire e-commerce platform in record time. Performance, code quality, and communication — all top-notch.",
    },
    {
      name: "Priya Mehta",
      company: "TaskFlow Inc.",
      image: "",
      review:
        "The Socket.IO integration Alok implemented works flawlessly for thousands of concurrent users. Highly recommend!",
    },
    {
      name: "James Wilson",
      company: "DeFi Labs",
      image: "",
      review:
        "Best blockchain developer I've worked with. He understood our DeFi requirements and delivered a robust, well-tested solution.",
    },
  ];
}

// ====================================================
// === 9. SMOOTH SCROLL — for all anchor links
// ====================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetEl = document.querySelector(this.getAttribute("href"));
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}