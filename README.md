<div align="center">

  <img src="assets/img/logo.png" alt="Memento Logo" width="110" />

  # Memento

  **A modern, client-side photo album management application**

  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://afonsoBenedito.github.io/Memento)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

  [🌐 Live Demo](https://memento.afonsobenedito.com/)

</div>

---

## About

**Memento** is a fully client-side photo album management application built with pure HTML5, CSS3, and Vanilla JavaScript — no frameworks, no backend, no build steps. It runs entirely in the browser with all data persisted through the browser's `localStorage`.

Designed as a complete photo management ecosystem, Memento lets you organize memories into albums, import photos from multiple sources, share them across social platforms, and much more — all without leaving your browser.

> Originally developed as an academic project for the IC discipline at OMQ.

---

## Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Register and log in with locally stored credentials |
| 📁 **Album Management** | Create, rename, and delete photo albums with custom covers and descriptions |
| 🖼️ **Photo Library** | Import, view, and organize all your photos in one place |
| 🔍 **Smart Filters** | Create albums by filtering photos by date, location, or people |
| ❤️ **Favorites** | Mark photos as liked and access them instantly |
| 👁️ **Most Viewed** | Automatically track your most visited photos |
| 🔗 **Share** | Share photos via WhatsApp, Facebook, Instagram, Twitter, and Email |
| 🗑️ **Recycle Bin** | Soft-delete with restore support — nothing lost permanently |
| 🔎 **Search** | Quickly find any photo or album with the built-in search |
| ⚙️ **Settings** | Personalize your Memento experience |
| 📱 **Responsive UI** | Collapsible sidebar for a seamless experience on any screen |

---

## Tech Stack

| Technology | Role |
|---|---|
| **HTML5** | Semantic markup and page structure |
| **CSS3** | Custom styling, animations, and responsive layout |
| **Vanilla JavaScript** | Application logic, DOM manipulation, and data management |
| **localStorage** | Client-side persistence — no server or database needed |

---

## Project Structure

```
Memento/
├── index.html           # Login / Registration page
├── Albuns.html          # Album management
├── Fotografias.html     # Photo library
├── Busca.html           # Search
├── Definicoes.html      # Settings
├── Lixo.html            # Recycle bin
└── assets/
    ├── css/             # Stylesheets (per-page + shared base)
    ├── js/              # JavaScript modules (per-page + shared base)
    ├── img/             # UI icons and sample photo albums
    └── fonts/           # Custom typography
```

---

## Getting Started

Memento requires no installation or build step — it runs directly in the browser.

**1. Clone the repository**

```bash
git clone https://github.com/AfonsoBenedito/Memento.git
```

**2. Open in your browser**

Navigate to the project folder and open `index.html` in any modern browser. That's all it takes.

> Alternatively, visit the live version on **[GitHub Pages](https://afonsoBenedito.github.io/Memento)**.

**3. Register an account**

Fill out the registration form with any credentials — they are stored locally in your browser via `localStorage`.

**4. Log in and explore**

Use your credentials to sign in and start managing your photo albums.

---

## Notes

- **No backend required** — the app runs entirely in the browser
- **Data is local** — clearing your browser storage will reset the application
- **No external dependencies** — 100% pure HTML, CSS, and JavaScript
