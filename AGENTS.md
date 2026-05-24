# AGENTS.md

This repository is empty. There is no code, tooling, or configuration yet.

## What will go here

This is intended to be an Angular project. Once initialized, update this file with:

- **Setup**: `npm install` / `ng new` / `ng serve` commands
- **Development**: `ng serve`, `ng build`, `ng test`, `ng lint`
- **Testing**: Single test run — `ng test` (Karma/Jasmine) or `npx jest` (if Jest is configured)
- **Lint/Format**: `ng lint` or `npx eslint .` / `npx prettier --check .`
- **Typecheck**: TypeScript compilation via `ng build` or `npx tsc --noEmit`
- **Build**: `ng build` (production) or `ng build --configuration production`
- **Run**: `ng serve` (dev server at `http://localhost:4200`)

## Angular-specific conventions

- Components are generated via `ng generate component <name>`
- Services via `ng generate service <name>`
- Default test runner: Karma with Jasmine (via `ng test`). If changed to Jest, update above.
- Default style: `.css`, `.scss`, `.sass`, or `.less` — set during `ng new`
- Angular standalone components are preferred over NgModules for new Angular projects.
- `angular.json` is the single source of truth for project configuration.
- Environment files live in `src/environments/`.
- State management, if needed, is typically NgRx or Angular Signals — confirm before choosing.
- HTTP client is configured via `provideHttpClient()` in app config.

## To initialize

```bash
ng new <project-name> --standalone --routing --style=scss
```

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
