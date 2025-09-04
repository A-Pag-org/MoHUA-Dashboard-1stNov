# MoHUA Dashboard

A Progressive Web App (PWA) dashboard for MoHUA, built with React, Vite, Material UI (MUI), and Recharts.

## Features

- ⚡️ Vite + React for fast development
- 🎨 Material UI (MUI) for UI components and theming (with dark mode toggle)
- 📊 Recharts for charts and data visualization
- 📱 PWA support (installable, offline-ready, with manifest)
- 🧩 Expandable cards for dashboards
- 📝 Mock data for prototyping
- ☁️ Ready for Vercel deployment

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/A-Pag-org/MoHUA-Dashboard-1stNov.git
cd MoHUA-Dashboard-1stNov
git checkout feature/initial-dashboard-setup
npm install
```

### Development

```bash
npm run dev
```
- Local server runs at http://localhost:5173

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run serve
```

## PWA Features

- The app can be installed on desktop and mobile.
- Offline support via service worker.
- Customize the manifest in `public/manifest.json`.
- Update the app icon in `public/icon.png`.

## Deployment

- The project is ready for deployment on [Vercel](https://vercel.com/).
- Push to main or your feature branch and connect your repo on Vercel.
- No extra configuration needed for React + Vite.

## Folder Structure

```
MoHUA-Dashboard-1stNov/
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   └── icon.png
├── src/
│   ├── assets/
│   ├── components/
│   ├── mock/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## License

MIT

---

Happy building! 🚀