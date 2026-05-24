# Data Model: Angular Project Initialization

**Feature**: Initialize Angular Project | **Date**: 2026-05-24

## Entities

### Angular Project Workspace

The root workspace configuration that defines the entire Angular project.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Project name: `opencode_angular` |
| `root` | `string` | Workspace root path (current directory) |
| `sourceRoot` | `string` | App source root (`src/`) |
| `prefix` | `string` | Component selector prefix (`app`) |
| `standalone` | `boolean` | Standalone mode enabled (`true`) |
| `styleFormat` | `string` | Style format (`css` for Tailwind) |
| `ssrEnabled` | `boolean` | SSR enabled (`true`) |
| `testRunner` | `string` | Test runner (`vitest`) |
| `strictMode` | `boolean` | Strict TypeScript (`true`) |

**Configuration files**:
- `angular.json` — workspace and project configuration
- `package.json` — dependencies and scripts
- `tsconfig.json` — base TypeScript configuration
- `tsconfig.app.json` — app-specific TypeScript configuration
- `tsconfig.spec.json` — test-specific TypeScript configuration
- `tailwind.config.js` — Tailwind CSS configuration
- `vitest.config.ts` — Vitest test configuration

### App Root Module

The application entry point configuration.

| Field | Type | Description |
|-------|------|-------------|
| `main.ts` | `file` | Client bootstrap (`bootstrapApplication`) |
| `main.server.ts` | `file` | Server bootstrap for SSR |
| `app.config.ts` | `file` | Application configuration (providers, router) |
| `app.config.server.ts` | `file` | Server-specific configuration |
| `app.routes.ts` | `file` | Route definitions |
| `server.ts` | `file` | Express SSR server |
| `index.html` | `file` | HTML entry point with SSR markers |

### App Component

The root application component.

| Field | Type | Description |
|-------|------|-------------|
| `selector` | `string` | `app-root` |
| `standalone` | `boolean` | `true` (v20+ default) |
| `template` | `string` | Inline or external template |
| `styles` | `string[]` | Component styles |
| `changeDetection` | `enum` | `ChangeDetectionStrategy.OnPush` |

**Files**:
- `src/app/app.component.ts` — component class
- `src/app/app.component.html` — template (or inline)
- `src/app/app.component.css` — styles (or `styleUrls`)

### Clean Architecture Layers

Post-scaffold directory structure:

```
src/app/
├── domain/
│   ├── models/           # Entity interfaces, value objects
│   ├── use-cases/        # Use case interfaces
│   └── repositories/     # Repository interfaces
├── application/
│   ├── stores/           # NgRx SignalStores
│   └── features/         # Reusable store features
├── infrastructure/
│   ├── repositories/     # Repository implementations
│   └── data-sources/     # HTTP clients, adapters
└── presentation/
    ├── pages/            # Route-level components
    ├── components/       # Shared UI components
    └── layouts/          # App shell components
```

### Test Structure

```
src/
├── app/
│   ├── *.spec.ts         # Unit tests (Vitest, co-located)
│   └── **/*.spec.ts      # Component/service/store tests
├── test/
│   └── *.spec.ts         # Integration tests
e2e/
└── *.e2e-spec.ts         # Playwright E2E tests
```
