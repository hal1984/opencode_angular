# Quickstart: Angular Project Initialization

**Feature**: Initialize Angular Project | **Date**: 2026-05-24

## Prerequisites

- Node.js 18+ and npm 9+
- Write access to the current working directory
- No existing `package.json` or `src/` directory (or use `--force`)

## One-Command Scaffold

```bash
npx @angular/cli@latest new opencode_angular \
  --directory=. \
  --standalone \
  --routing \
  --style=tailwind \
  --ssr \
  --strict \
  --skip-git \
  --defaults
```

- `--directory=.` — use the current directory (avoids nested folder)
- `--standalone` — standalone components (default in v20+)
- `--routing` — enable routing
- `--style=tailwind` — native Tailwind CSS support
- `--ssr` — Server-Side Rendering enabled
- `--strict` — strict TypeScript (default in v20+)
- `--skip-git` — don't initialize git (already a git repo)
- `--defaults` — accept all defaults without prompts

## Verify Installation

```bash
# Start SSR dev server
npm start

# Build for production
npm run build

# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage
```

Open `http://localhost:4200` — the default Angular welcome page should render.

## Post-Scaffold Steps

1. **Verify coverage config**: Ensure `vitest.config.ts` enforces 80% line/branch/function coverage thresholds.

2. **Verify OnPush**: Confirm `ChangeDetectionStrategy.OnPush` is set in
   `app.component.ts`.

3. **Organize Clean Architecture**: Restructure `src/app/` into:
   - `domain/` — entities, use cases, repository interfaces
   - `application/` — NgRx SignalStores, store features
   - `infrastructure/` — repository implementations, data sources
   - `presentation/` — components, pages, layouts

4. **Install NgRx Signals**:
   ```bash
   npm install @ngrx/signals
   ```

5. **Verify best practices compliance** (constitution VIII):
   - No `standalone: true` in decorators
   - No `@HostBinding`/`@HostListener` decorators
   - No `ngClass`/`ngStyle` directives
   - Uses `@if`/`@for`/`@switch` control flow
   - Uses `input()`/`output()` functions
   - Uses `inject()` not constructor injection
