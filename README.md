# Alok Pandit — Developer Portfolio

> MERN Stack & Blockchain Developer Portfolio · Vanilla HTML/CSS/JS · No frameworks

[![Live Demo](https://img.shields.io/badge/Live-Demo-6C63FF?style=for-the-badge&logo=vercel)](https://alokpandit.dev)
[![GitHub](https://img.shields.io/badge/GitHub-alokpanditt-181717?style=for-the-badge&logo=github)](https://github.com/alokpanditt)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Premium UI** | Dark glassmorphism theme with gradient accents and smooth animations |
| 📱 **Fully Responsive** | Mobile-first layout — tested at 480px, 768px, 1024px, 1440px |
| 🍔 **Hamburger Menu** | Slide-in mobile nav with X-button, outside-click and Escape-key close |
| ⌨️ **Typewriter Effect** | Animated role-cycling in the hero section |
| 🏃 **Skill Tabs** | Filter skills by category (Frontend / Backend / Blockchain / Tools) |
| 💬 **Testimonials Marquee** | 3-row infinite scroll — Row 1 & 3 left, Row 2 right — loaded from JSON |
| 📬 **Contact Form** | Client-side form with success state animation |
| 🔢 **Animated Counters** | Stats count up when scrolled into view (IntersectionObserver) |
| ⬆️ **Back to Top** | Floating button that appears after scrolling 400px |
| 🔄 **AOS Animations** | Scroll-triggered entrance animations via AOS.js |
| ⚡ **Page Loader** | Branded splash screen before content renders |

---

## 📁 Project Structure

```
3D Portfolio/
├── index.html              # Main portfolio page
├── all-projects.html       # Filterable projects grid
├── project-details.html    # Individual project case study
├── README.md
└── assets/
    ├── css/
    │   └── style.css       # All styles (design tokens → responsive breakpoints)
    ├── js/
    │   ├── main.js         # Core: navbar, typing, counters, testimonials fetch
    │   ├── projects.js     # Loads/filters projects from projects.json
    │   └── animations.js   # Particle canvas & extra scroll animations
    ├── data/
    │   ├── testimonials.json   # 12 client testimonials (fetched dynamically)
    │   └── projects.json       # Project data
    ├── images/
    │   ├── hero/
    │   │   └── hero-avatar.png
    │   └── projects/           # Project thumbnail images
    └── resume/
        └── alok-pandit-resume.pdf
```

---

## 🚀 Getting Started

### Option 1 — Open Directly (Quick Preview)
Just double-click `index.html`. Note: testimonials may use fallback data due to `fetch()` requiring a server.

### Option 2 — Local Dev Server (Recommended)
```bash
# Using VS Code Live Server extension (recommended)
# Right-click index.html → "Open with Live Server"

# Or using Python
python -m http.server 3000

# Or using Node.js http-server
npx http-server . -p 3000
```
Then open `http://localhost:3000` in your browser.

> **Why a server?** The `fetch('assets/data/testimonials.json')` call requires HTTP. The JS falls back to inline data automatically if running as `file://`.

---

## 🎨 Design System

All design tokens live in `style.css` `:root`:

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#6C63FF` | Brand purple |
| `--accent` | `#00F5D4` | Teal highlight |
| `--secondary` | `#9B5DE5` | Gradient end |
| `--bg-dark` | `#0F0F1A` | Page background |
| `--card-dark` | `#1B1B2F` | Card surfaces |
| `--grad-primary` | `135deg, #6C63FF → #9B5DE5` | Buttons, headings |

---

## 📱 Responsive Breakpoints

| Breakpoint | Behaviour |
|-----------|-----------|
| `> 1024px` | Full desktop — 2-col hero, multi-col footer |
| `≤ 1024px` | Tablet — stacked hero/about, 2-col footer |
| `≤ 768px` | Mobile — hamburger menu visible, all grids → 1 col |
| `≤ 480px` | Small mobile — full-width buttons, 2-col skills |

---

## 💬 Testimonials System

Testimonials are loaded dynamically from `assets/data/testimonials.json`:

```json
{
  "name": "Rahul Kumar",
  "company": "CEO, Panic Outfits",
  "image": "",
  "review": "Alok built our entire e-commerce platform..."
}
```

- **Image**: Provide a path like `assets/images/testimonials/client1.jpg`, or leave `""` for initials avatar fallback
- **Marquee rows**: JS renders 3 rows, alternating direction (Left → Right → Left)
- **Duplication**: Each row's cards are doubled in HTML for seamless infinite scroll

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styles | Vanilla CSS (custom properties, grid, flexbox) |
| Interactivity | Vanilla JavaScript (ES2022+) |
| Animations | AOS.js (scroll), custom CSS @keyframes |
| Icons | Font Awesome 6.5 |
| Fonts | Google Fonts — Poppins + Fira Code |

---

## 📝 Customisation Checklist

1. **Personal info** — Update name, email, location, GitHub/LinkedIn URLs in `index.html`
2. **Avatar** — Replace `assets/images/hero/hero-avatar.png` with your photo
3. **Resume** — Replace `assets/resume/alok-pandit-resume.pdf`
4. **Projects** — Add entries to `assets/data/projects.json`
5. **Testimonials** — Add/edit entries in `assets/data/testimonials.json`
6. **GitHub stats image** — Update the `src` of `#githubGraphImg` in `index.html` with your GitHub username:
   ```html
   <img src="https://ghchart.rshah.org/YOUR_USERNAME" ... />
   ```

---

## 📄 License

MIT — free to use as a template. Attribution appreciated but not required.

---

<p align="center">Built with ❤️ and ☕ by <strong>Alok Pandit</strong></p>
