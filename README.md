# v2rogerBoard

React 19 + TypeScript app built with Vite 7.

## Tech Stack

- **Framework**: React 19 + TypeScript (strict mode)
- **Build**: Vite 7
- **Routing**: TanStack Router (file-based, auto-generated route tree)
- **UI**: Mantine (`@mantine/core`, `@mantine/hooks`, `@mantine/form`)
- **Linting**: ESLint 9 + import sorting (`eslint-plugin-simple-import-sort`)
- **Unused code detection**: Knip
- **Pre-commit hooks**: Husky + lint-staged (ESLint auto-fix + knip)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run knip` | Find unused imports, exports, and dependencies |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
  main.tsx              # Entry point — creates router, renders app
  index.css             # Global styles
  routes/
    __root.tsx           # Root layout (MantineProvider, AppShell, nav)
    index.tsx            # Home page (/)
    pages.$id.tsx        # Dynamic page (/pages/:id)
  routeTree.gen.ts       # Auto-generated — do not edit
```

## Adding Routes

Create a new file in `src/routes/`. The Vite plugin auto-generates the route tree on save.

- `src/routes/about.tsx` → `/about`
- `src/routes/users.$id.tsx` → `/users/:id`
- `src/routes/settings/index.tsx` → `/settings`

See [TanStack Router docs](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing) for more patterns.
