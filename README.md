# Keyform

An interactive 87-key ANSI QWERTY keyboard built with React and Vite. It mirrors physical keyboard input, supports mouse and touch interaction, switches between Mac and Windows modifier legends, renders typed text live, tracks keystrokes, and includes optional Web Audio key feedback.

## Project structure

```text
public/
└── keyform-key.svg     Shared header logo and favicon
src/
├── components/
│   ├── keyboard/       Keyboard rendering, layout data, and styles
│   ├── InteractionFooter.jsx
│   ├── LiveDisplay.jsx
│   ├── SiteHeader.jsx
│   └── SoundIcon.jsx
├── hooks/
│   ├── useKeyboardInput.js
│   └── usePlatformPreference.js
├── App.css             Page-level layout and controls
├── App.jsx             Page composition
├── index.css           Global tokens and resets
└── main.jsx            React entry point
```

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## GitHub Pages

The production build uses the `/keyform/` base path and deploys `dist/` through
the workflow in `.github/workflows/deploy-pages.yml`.

Before the first deployment, open the repository's **Settings → Pages** and set
**Build and deployment → Source** to **GitHub Actions**. Pushes to `master` will
then publish automatically, and the workflow can also be run manually.
