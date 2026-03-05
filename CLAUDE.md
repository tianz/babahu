# babahu

## Project Overview
A Mahjong practice website.

## Tech Stack
- **Framework**: React (with Vite as the build tool)
- **Language**: TypeScript
- **Styling**: TBD
- **Package Manager**: npm

## Project Structure
```
babahu/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Helper functions
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Development Commands
```bash
npm install       # Install dependencies
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```

## Requirements
See [docs/requirements.md](docs/requirements.md) for detailed app requirements.
See [docs/execution-plan.md](docs/execution-plan.md) for the implementation plan.

## Conventions
- Use functional components and hooks only — no class components
- Keep components small and focused
- Co-locate component styles with their component file if using CSS modules
- No API calls to a backend — all data is local, static, or from public third-party APIs

## Deployment: GitHub Pages
- Host: GitHub Pages via the `gh-pages` branch
- Deploy method: GitHub Actions workflow (`.github/workflows/deploy.yml`)
- Build output: `dist/` (Vite default)
- Vite must set `base` to the repo name: `base: '/babahu/'` in `vite.config.ts`
- Workflow: push to `main` triggers build + deploy to `gh-pages` branch
