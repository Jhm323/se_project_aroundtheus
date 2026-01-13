# Around The U.S. — Responsive Web Project

Welcome to **Project 3** from the TripleTen Web Development Program! This project demonstrates a responsive, adaptive layout using modern HTML and CSS techniques. Users can explore a profile-based photo gallery, like images, and enjoy a seamless experience across devices.

### [View the project on GitHub Pages] (https://github.com/Jhm323/se_project_aroundtheus)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Responsive Design](#responsive-design)
- [Figma & Design](#figma--design)
- [Project Setup](#project-setup)
- [File Structure](#file-structure)
- [Fonts](#fonts)
- [Video Walkthrough](#video-walkthrough)
- [What I Learned](#what-i-learned)

---

## Project Overview

"Around the U.S." is a responsive web page designed to showcase user-uploaded photographs. It mimics the behavior of a small social photo-sharing application. This version focuses on **responsive layouts**, semantic HTML, and adaptive styling based on screen size.

### Key objectives:

- Implement responsive layout with Flexbox and Grid
- Handle content overflow elegantly
- Ensure mobile-first development practices
- Follow BEM naming conventions and clean project structure

---

## Features

- Responsive layout (mobile-first approach)
- Profile section with editable data
- Card grid with interactive "like" buttons
- Smoothly scales from 320px to 1280px
- Hidden text overflow with ellipses
- Clean semantic HTML structure

---

## Technologies Used

- HTML5
- CSS3
- Flexbox & CSS Grid
- Media Queries
- BEM Methodology
- Normalize.css
- Git & GitHub
- Figma for design reference

---

## Responsive Design

The layout is optimized for 3 main screen widths:

| Device  | Width Range      | Layout Description       |
| ------- | ---------------- | ------------------------ |
| Mobile  | 320px – \~600px  | Single-column layout     |
| Tablet  | \~600px – 1024px | Two-column card layout   |
| Desktop | 1024px – 1280px+ | Three-column card layout |

Responsive techniques used:

- `flex-wrap` and `justify-content` for dynamic alignment
- `auto-fit` with `minmax()` in Grid layouts
- Relative units (`%`, `fr`) for flexible spacing
- `object-fit` to maintain image proportions

---

## Project Setup

Clone the repo and open in your browser:

```bash
git clone https://github.com/yourusername/se_project_aroundtheus.git
cd se_project_aroundtheus
```

To view locally:

1. Open `index.html` in your browser.
2. Use DevTools to test different resolutions.

---

## File Structure

```
images/             → All image assets
pages/              → HTML files (main: index.html)
blocks/             → Modular BEM-style CSS files
vendor/
├── fonts/          → Inter font files
├── fonts.css       → Font-face declarations
└── normalize.css   → Reset styles
index.css           → Main stylesheet (imports all block styles)
README.md
```

---

## Fonts

- Primary font: **Inter**
- Fallbacks: `Arial, sans-serif`
- Font files from: [https://rsms.me/inter/](https://rsms.me/inter/)

Loaded via local files and declared with `@font-face` in `vendor/fonts.css`.

---

## Video Walkthrough

View the project: Around The U.S. Website. Watch the video presentation:[Adaptive Web Design Video](https://www.loom.com/share/4e7774f2d00e48b495a7f360439ecb32?sid=b398c05e-6167-4e68-b0c4-1bbc1aea20ce) 

This project reflects a strong foundation in adaptive design and JavaScript while showcasing a forward-thinking approach to future improvements. Here is a [Link to the project](https://jhm323.github.io/se_project_aroundtheus/)


In the video:

- Tour of the layout
- Explanation of media queries
- Use of BEM and semantic HTML
- Responsive card behavior

---

## What I Learned

- Creating responsive grids with `auto-fit` and `minmax()`
- Effectively using Flexbox for layout control
- Managing text overflow with `ellipsis`
- Structuring CSS with the BEM methodology
- Importance of semantic HTML and accessibility
- Using Figma to extract design specs

---

## Future Improvements

- Add interactivity via JavaScript (e.g., modals, form validation)
- Persist user data with localStorage or backend integration
- Improve accessibility with ARIA roles and landmarks

---

## Credits

- Designed by [TripleTen](https://tripleten.com/)
- Font by [Rasmus Andersson](https://rsms.me/inter/)
- Figma design provided in curriculum

---

## Submission Checklist

- [x] Mobile, tablet, and desktop layouts implemented
- [x] Follows BEM methodology
- [x] Fonts and normalize.css included
- [x] Responsive card grid
- [x] No horizontal scrolling at any width
- [x] Deployed on GitHub Pages
- [x] Walkthrough video recorded and linked

---

**Feel free to fork, clone, and explore. Happy coding!**
