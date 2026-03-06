/* ================================================
   animations.js — Floating, Marquee, Particles
   ================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initMarquee();
  initParticles();
  initGitHubGraph();
  initCodeSnippetHighlight();
});

// === MARQUEE PAUSE ON HOVER ===
function initMarquee() {
  const rows = document.querySelectorAll(".marquee-row");
  rows.forEach((row) => {
    row.addEventListener(
      "mouseenter",
      () => (row.style.animationPlayState = "paused"),
    );
    row.addEventListener(
      "mouseleave",
      () => (row.style.animationPlayState = "running"),
    );
  });
}

// === PARTICLE BACKGROUND ===
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W = (canvas.width = window.innerWidth);
  let H = (canvas.height = window.innerHeight);

  const particles = [];
  const COUNT = 60;

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108,99,255,${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

// === GITHUB CONTRIBUTION GRAPH ===
function initGitHubGraph() {
  const img = document.getElementById("githubGraphImg");
  if (!img) return;

  // GitHub contribution graph via third-party service
  const username = "alokpanditt"; // Update with actual GitHub username
  img.src = `https://ghchart.rshah.org/6C63FF/${username}`;
  img.alt = "GitHub contribution graph";
  img.onerror = function () {
    this.parentElement.innerHTML = `
      <div style="text-align:center;padding:32px;color:var(--text-muted);">
        <i class="fab fa-github" style="font-size:3rem;color:var(--primary);margin-bottom:12px;display:block;"></i>
        <p>Connect your GitHub to show contributions</p>
        <a href="https://github.com/alokpanditt" target="_blank" class="btn btn-outline" style="margin-top:16px;display:inline-flex;">
          <i class="fab fa-github"></i> View GitHub Profile
        </a>
      </div>`;
  };
}

// === CODE SNIPPET LIVE TYPING EFFECT ===
function initCodeSnippetHighlight() {
  // Add copy button to snippet
  const snippetWrap = document.querySelector(".snippet-wrap");
  if (!snippetWrap) return;

  const copyBtn = document.createElement("button");
  copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
  copyBtn.style.cssText = `
    position:absolute;top:12px;right:12px;
    background:rgba(108,99,255,0.2);border:1px solid rgba(108,99,255,0.4);
    color:var(--primary);padding:8px 12px;border-radius:6px;cursor:pointer;
    font-size:0.8rem;transition:all .3s;z-index:5;font-family:inherit;
  `;
  copyBtn.title = "Copy code";

  snippetWrap.style.position = "relative";
  snippetWrap.appendChild(copyBtn);

  copyBtn.addEventListener("click", () => {
    const code = snippetWrap.querySelector("pre")?.textContent;
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.color = "var(--accent)";
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
          copyBtn.style.color = "var(--primary)";
        }, 2000);
      });
    }
  });
}

// === TILT EFFECT on cards ===
document.addEventListener("mousemove", (e) => {
  const tiltCards = document.querySelectorAll(".service-card, .project-card");
  tiltCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 0.6) {
      card.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-4px)`;
    } else {
      card.style.transform = "";
    }
  });
});
