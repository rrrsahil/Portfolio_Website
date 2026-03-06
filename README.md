# Alok Pandit — Developer Portfolio

> MERN Stack Developer · Blockchain Developer · Full Stack Engineer
> Built with Vanilla HTML, CSS and JavaScript — No Frameworks

🌐 **Live Portfolio:**
https://portfoolio-web.netlify.app/

---

# 🚀 About This Portfolio

This is my **personal developer portfolio website** built to showcase my skills, projects, and experience as a **MERN Stack Developer and Blockchain Developer**.

The goal of this project is to create a **modern, fast, responsive, and professional developer portfolio** without using heavy frameworks.

The website focuses on:

• Clean UI/UX
• High performance
• Modern animations
• Modular architecture
• Scalable project structure
• JSON-based dynamic content loading

This portfolio demonstrates my abilities in:

• Frontend Development
• Backend Development
• Full Stack MERN Applications
• Blockchain Development
• UI/UX Implementation
• Clean Architecture Design

---

# ✨ Key Features

| Feature                  | Description                                         |
| ------------------------ | --------------------------------------------------- |
| 🎨 Premium UI            | Dark glassmorphism theme with gradient highlights   |
| 📱 Fully Responsive      | Mobile-first layout optimized for all devices       |
| 🍔 Hamburger Menu        | Slide-in mobile navigation with outside click close |
| ⌨️ Typewriter Effect     | Animated developer role typing effect               |
| 🧠 Skills Filter         | Skills grouped by category with tab filtering       |
| 💬 Testimonials Marquee  | Infinite scrolling testimonials loaded from JSON    |
| 📬 Contact Form          | Interactive contact form with validation            |
| 🔢 Animated Counters     | Stats animate when scrolled into view               |
| 🔄 AOS Scroll Animations | Smooth section entrance animations                  |
| ⬆️ Back To Top           | Floating scroll-to-top button                       |
| ⚡ Page Loader            | Splash loading screen before site loads             |
| 🧩 JSON Data System      | Projects & testimonials loaded dynamically          |

---

# 👨‍💻 Developer Information

**Name:** Alok Pandit
**Role:** MERN Stack Developer & Blockchain Developer

Specializations:

• Full Stack Web Development
• REST API Development
• Blockchain Smart Contracts
• Web3 Integration
• Scalable Web Applications
• Real-time Web Applications

Tech Expertise:

**Frontend**

• HTML5
• CSS3
• JavaScript
• React.js
• Responsive Design

**Backend**

• Node.js
• Express.js
• MongoDB

**Blockchain**

• Solidity
• Smart Contracts
• Ethereum
• Web3.js

**Tools**

• Git
• GitHub
• Postman
• Docker
• VS Code

---

# 🧱 Project Architecture

The portfolio is built using a **modular and scalable structure**.

```
3D Portfolio/
│
├── index.html
├── all-projects.html
├── project-details.html
├── README.md
│
└── assets/
    ├── css/
    │   └── style.css
    │
    ├── js/
    │   ├── main.js
    │   ├── projects.js
    │   └── animations.js
    │
    ├── data/
    │   ├── testimonials.json
    │   └── projects.json
    │
    ├── images/
    │   ├── hero/
    │   │   └── hero-avatar.png
    │   │
    │   ├── icons/
    │   │   ├── react.png
    │   │   ├── node.png
    │   │   ├── mongodb.png
    │   │   └── blockchain.png
    │   │
    │   ├── projects/
    │   │   ├── project1.png
    │   │   ├── project2.png
    │   │   ├── project3.png
    │   │   └── project4.png
    │   │
    │   └── testimonials/
    │       ├── client1.jpg
    │       ├── client2.jpg
    │       ├── client3.jpg
    │       └── client4.jpg
    │
    └── resume/
        └── alok-pandit-resume.pdf
```

---

# 🎨 Design System

The design system is defined in `style.css`.

CSS variables ensure **consistent styling across the project**.

```
:root{

--primary:#6C63FF;
--secondary:#9B5DE5;
--accent:#00F5D4;

--bg-dark:#0F0F1A;
--card-dark:#1B1B2F;

--text-light:#F5F5F5;
--text-dark:#111111;

--grad-primary:linear-gradient(135deg,#6C63FF,#9B5DE5);

}
```

---

# 🖋 Typography

Fonts used:

**Poppins** — Headings
**Fira Code** — Developer styled text

CDN:

```
https://fonts.googleapis.com/css2?family=Poppins
https://fonts.googleapis.com/css2?family=Fira+Code
```

---

# 🧩 JSON Based Dynamic Content

Projects and testimonials are not hard-coded.

They are loaded from JSON files.

This makes the portfolio **scalable and easy to maintain**.

---

# 📊 Projects System

Projects are stored in:

```
assets/data/projects.json
```

Example structure:

```
{
"id":1,
"title":"Panic Outfits",
"category":"web",
"image":"assets/images/projects/project1.png",
"live":"https://example.com",
"github":"https://github.com/example"
}
```

Features:

• Latest projects on homepage
• Full project list on all-projects.html
• Filter by category
• Pagination support

---

# 💬 Testimonials System

Testimonials are stored in:

```
assets/data/testimonials.json
```

Example:

```
{
"name":"Rahul Kumar",
"company":"CEO, Panic Outfits",
"image":"",
"review":"Alok built our entire e-commerce platform..."
}
```

Features:

• Loaded dynamically using fetch()
• Infinite marquee animation
• 3 rows scrolling alternately

Row behaviour:

Row 1 → Left direction
Row 2 → Right direction
Row 3 → Left direction

---

# 📱 Responsive Design

Breakpoints used:

| Width   | Layout              |
| ------- | ------------------- |
| >1024px | Desktop layout      |
| ≤1024px | Tablet layout       |
| ≤768px  | Mobile layout       |
| ≤480px  | Small mobile layout |

All sections are designed **mobile-first**.

---

# 🧠 Core JavaScript Logic

Main logic is in:

```
assets/js/main.js
```

Responsibilities:

• Navbar toggle
• Hamburger animation
• Typewriter effect
• Counter animation
• Fetch testimonials
• Back to top button

---

# 🎬 Animations

Animations used:

• CSS Keyframe animations
• Scroll animations via AOS.js
• Marquee scrolling testimonials
• Hover gradient effects
• Floating decorative elements

---

# 🛠 Tech Stack

| Layer         | Technology   |
| ------------- | ------------ |
| Structure     | HTML5        |
| Styling       | CSS3         |
| Interactivity | JavaScript   |
| Animation     | AOS.js       |
| Icons         | FontAwesome  |
| Fonts         | Google Fonts |

---

# ⚙️ Running the Project

## Option 1 — Direct Open

Open `index.html`.

Note: JSON fetch may fallback if opened with `file://`.

---

## Option 2 — Local Server (Recommended)

Using Python

```
python -m http.server 3000
```

Using Node

```
npx http-server . -p 3000
```

Open:

```
http://localhost:3000
```

---

# 🔧 Customization Guide

Steps to customize this portfolio:

### 1 Update Avatar

Replace:

```
assets/images/hero/hero-avatar.png
```

---

### 2 Update Resume

Replace:

```
assets/resume/alok-pandit-resume.pdf
```

---

### 3 Add New Projects

Edit:

```
assets/data/projects.json
```

---

### 4 Add Testimonials

Edit:

```
assets/data/testimonials.json
```

---

### 5 Update GitHub Graph

Edit this image source in index.html:

```
https://ghchart.rshah.org/YOUR_USERNAME
```

Replace with your GitHub username.

---

# 🚀 Future Improvements

Possible upgrades:

• Blog section
• Dark/Light toggle
• WebGL hero animation
• GitHub contribution API
• Project case studies
• CMS integration

---

# 📄 License

MIT License

You are free to use this portfolio template.

Attribution is appreciated but not required.

---

# ❤️ Author

**Alok Pandit**

MERN Stack Developer
Blockchain Developer

GitHub:
https://github.com/alokpanditt

Portfolio:
https://portfoolio-web.netlify.app/

---

<p align="center">
Built with ❤️ by <strong>Alok Pandit</strong>
</p>
