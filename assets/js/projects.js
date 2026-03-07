/* ================================================
   projects.js — JSON Fetch, Render, Filter, Pagination
   ================================================ */

let allProjects = [];
const PROJECTS_PER_PAGE = 6;
let currentPage = 1;
let currentFilter = "all";

// === Determine which page we're on ===
const isAllProjects = document.body.dataset.page === "all-projects";
const isIndex = document.body.dataset.page === "index";

// === Icon map for categories ===
const categoryIcon = {
  web: "fa-globe",
  blockchain: "fa-link",
  api: "fa-server",
  realtime: "fa-bolt",
};

const categoryLabel = {
  web: "Web App",
  blockchain: "Blockchain",
  api: "API / Backend",
  realtime: "Real-Time",
};

// === Load Projects ===
async function loadProjects(jsonPath = "assets/data/projects.json") {
  try {
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error("Failed to load projects.json");
    allProjects = await res.json();

    if (isIndex) renderLatestProjects();
    if (isAllProjects) {
      initFilters();
      renderAllProjects();
      renderPagination();
    }
  } catch (err) {
    console.warn("Projects load error:", err);
    renderFallbackMessage();
  }
}

// === Render latest 4 for index.html ===
function renderLatestProjects() {
  const grid = document.getElementById("latestProjectsGrid");
  if (!grid) return;

  const latest = allProjects.slice(0, 3);
  grid.innerHTML = "";
  latest.forEach((project, i) => {
    grid.innerHTML += buildProjectCard(project, i);
  });
}

// === Render all projects with filter + pagination ===
function renderAllProjects() {
  const grid = document.getElementById("allProjectsGrid");
  if (!grid) return;

  const filtered =
    currentFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === currentFilter);

  const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE);
  const start = (currentPage - 1) * PROJECTS_PER_PAGE;
  const end = start + PROJECTS_PER_PAGE;
  const paged = filtered.slice(start, end);

  grid.innerHTML = "";
  if (paged.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted);">
        <i class="fas fa-search" style="font-size:3rem;margin-bottom:16px;display:block;"></i>
        No projects found in this category.
      </div>`;
    return;
  }

  paged.forEach((project, i) => {
    grid.innerHTML += buildProjectCard(project, i);
  });

  renderPagination(totalPages);
}

// === Build a project card HTML ===
function buildProjectCard(project, index) {
  const delay = index * 100;
  const techPills = (project.tech || [])
    .slice(0, 4)
    .map((t) => `<span class="tech-pill">${t}</span>`)
    .join("");

  const imgContent = project.image
    ? `
    <img src="${project.image}" 
         alt="${project.title}" 
         loading="lazy"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
    ${buildPlaceholderImg(project.category)}
  `
    : buildPlaceholderImg(project.category);

  return `
    <div class="project-card" data-aos="fade-up" data-aos-delay="${delay}">
      <div class="project-img">
        ${imgContent}
        <div class="project-cat-badge">
          <i class="fas ${categoryIcon[project.category] || "fa-code"}"></i>
          ${categoryLabel[project.category] || project.category}
        </div>
      </div>
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${truncate(project.description, 100)}</p>
        <div class="project-tech">${techPills}</div>
        <div class="project-footer">
          <div class="project-links-row">
            ${project.live ? `<a href="${project.live}" target="_blank" class="proj-link-btn"><i class="fas fa-external-link-alt"></i> Live</a>` : ""}
            ${project.github ? `<a href="${project.github}" target="_blank" class="proj-link-btn"><i class="fab fa-github"></i> Code</a>` : ""}
          </div>
          <a href="project-details.html?id=${project.id}" class="proj-link-btn" style="color:var(--accent)">
            Case Study <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>`;
}

function buildPlaceholderImg(category) {
  const icons = { web: "fa-globe", blockchain: "fa-link", api: "fa-server" };
  return `<div class="project-img-placeholder">
    <i class="fas ${icons[category] || "fa-code"}"></i>
    <span>Project Preview</span>
  </div>`;
}

// === Filter Buttons ===
function initFilters() {
  const filterBar = document.getElementById("filterBar");
  if (!filterBar) return;

  const categories = ["all", ...new Set(allProjects.map((p) => p.category))];
  filterBar.innerHTML = categories
    .map(
      (cat) => `
    <button class="filter-btn ${cat === "all" ? "active" : ""}" data-filter="${cat}">
      ${cat === "all" ? "All Projects" : categoryLabel[cat] || cat}
    </button>`,
    )
    .join("");

  filterBar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBar
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      currentPage = 1;
      renderAllProjects();
    });
  });
}

// === Pagination ===
function renderPagination(totalPages) {
  const pagWrap = document.getElementById("pagination");
  if (!pagWrap) return;

  pagWrap.innerHTML = "";
  if (!totalPages || totalPages <= 1) return;

  // Prev
  pagWrap.innerHTML += `<button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled style="opacity:.4;cursor:default"' : ""}>
    <i class="fas fa-chevron-left"></i></button>`;

  for (let i = 1; i <= totalPages; i++) {
    pagWrap.innerHTML += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">${i}</button>`;
  }

  // Next
  pagWrap.innerHTML += `<button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled style="opacity:.4;cursor:default"' : ""}>
    <i class="fas fa-chevron-right"></i></button>`;
}

function changePage(page) {
  const filtered =
    currentFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === currentFilter);
  const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderAllProjects();
  document
    .getElementById("allProjectsGrid")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// === Project Details Page ===
function loadProjectDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const detailEl = document.getElementById("projectDetailContent");
  if (!detailEl) return;

  fetch("assets/data/projects.json")
    .then((r) => r.json())
    .then((data) => {
      const project = data.find((p) => p.id === id) || data[0];
      renderProjectDetail(project, detailEl);

      // Related projects
      const relGrid = document.getElementById("relatedProjectsGrid");
      if (relGrid) {
        const related = data
          .filter((p) => p.category === project.category && p.id !== project.id)
          .slice(0, 3);
        relGrid.innerHTML = related
          .map((p, i) => buildProjectCard(p, i))
          .join("");
      }
    });
}

function renderProjectDetail(p, container) {
  const techPills = (p.tech || [])
    .map((t) => `<span class="tech-pill">${t}</span>`)
    .join("");

  container.innerHTML = `
    <div class="pd-grid" data-aos="fade-up">

      <div class="pd-content">

        <div class="pd-badge">
          <span class="service-tag">
            <i class="fas ${categoryIcon[p.category] || "fa-code"}"></i>
            ${categoryLabel[p.category]}
          </span>
        </div>

        <h1 class="pd-title">${p.title}</h1>

        <p class="pd-desc">
          ${p.description}
        </p>

        <div class="project-tech" style="margin-bottom:32px;">
          ${techPills}
        </div>

        <div class="pd-links">

          ${
            p.live
              ? `
          <a href="${p.live}" target="_blank" class="btn btn-primary">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>
          `
              : ""
          }

          ${
            p.github
              ? `
          <a href="${p.github}" target="_blank" class="btn btn-outline">
            <i class="fab fa-github"></i> GitHub
          </a>
          `
              : ""
          }

        </div>

      </div>


      <div class="pd-img">

        ${
          p.image
            ? `
          <img src="${p.image}" 
               alt="${p.title}" 
               loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">

          <div class="project-img-placeholder" style="height:280px;display:none;">
             <i class="fas ${categoryIcon[p.category] || "fa-code"}"
                style="font-size:4rem;color:var(--primary);opacity:.5;"></i>
          </div>
        `
            : `
          <div class="project-img-placeholder" style="height:280px;">
             <i class="fas ${categoryIcon[p.category] || "fa-code"}"
                style="font-size:4rem;color:var(--primary);opacity:.5;"></i>
          </div>
        `
        }

      </div>

    </div>


    <div class="cs-grid" style="margin-top:60px;">

      <div class="cs-card" data-aos="fade-up" data-aos-delay="100">
        <h4>
          <i class="fas fa-search"></i> Problem
        </h4>
        <p>
          ${p.problem || "Identifying the core challenge and user pain points."}
        </p>
      </div>


      <div class="cs-card" data-aos="fade-up" data-aos-delay="200">
        <h4>
          <i class="fas fa-lightbulb"></i> Solution
        </h4>
        <p>
          ${p.solution || "Engineering an elegant, scalable solution."}
        </p>
      </div>


      <div class="cs-card" data-aos="fade-up" data-aos-delay="300">
        <h4>
          <i class="fas fa-code"></i> Tech Stack
        </h4>

        <div class="project-tech" style="margin-top:8px;">
          ${techPills}
        </div>
      </div>


      <div class="cs-card" data-aos="fade-up" data-aos-delay="400">
        <h4>
          <i class="fas fa-chart-line"></i> Result
        </h4>
        <p>
          ${p.result || "Delivered measurable business impact and improved UX."}
        </p>
      </div>

    </div>
  `;
}

// === Fallback ===
function renderFallbackMessage() {
  const grids = ["latestProjectsGrid", "allProjectsGrid"];
  grids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">
        <i class="fas fa-exclamation-circle" style="font-size:3rem;margin-bottom:16px;display:block;color:var(--primary)"></i>
        <p>Projects will appear here. Please ensure projects.json is configured.</p>
      </div>`;
    }
  });
}

// === Helpers ===
function truncate(str, maxLen) {
  if (!str) return "";
  return str.length > maxLen ? str.slice(0, maxLen) + "..." : str;
}

// === Auto-init ===
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "project-details") {
    loadProjectDetails();
  } else {
    loadProjects();
  }
});
