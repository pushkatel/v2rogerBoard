# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Type-check with `tsc -b` then build with Vite
- `npm run lint` — Run ESLint across the project
- `npm run preview` — Preview the production build locally

## Architecture

React 19 + TypeScript app scaffolded with Vite 7.

- **Entry point**: `index.html` loads `src/main.tsx`, which renders `<App />` into `#root` with StrictMode
- **Source code**: All app code lives in `src/`
- **Static assets**: `public/` for files served as-is; `src/assets/` for imported assets
- **Build output**: `dist/` (gitignored)

## TypeScript

- Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- Two tsconfig project references: `tsconfig.app.json` (src code) and `tsconfig.node.json` (tooling config)
- Target: ES2022, JSX transform: `react-jsx`

## Linting

ESLint 9 flat config (`eslint.config.js`) with:
- `typescript-eslint` recommended rules
- `eslint-plugin-react-hooks` (recommended)
- `eslint-plugin-react-refresh` (Vite)
- Only lints `**/*.{ts,tsx}` files; `dist/` is ignored
