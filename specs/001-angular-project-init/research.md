# Research: Angular Project Initialization

**Feature**: Initialize Angular Project | **Date**: 2026-05-24

## Decision: Anguar CLI v20+ with native Tailwind and SSR support

**Rationale**: Angular v20+ includes native `--style=tailwind` and `--ssr` CLI
flags. No manual PostCSS configuration or SSR wiring needed. The CLI handles
Tailwind CSS scaffold (installs `tailwindcss`, creates config, adds imports) and
server-side rendering setup (`server.ts`, `app.config.server.ts`, `main.server.ts`)
automatically.

**Alternatives considered**:
- Manual Tailwind setup with `ng add tailwindcss` — works but extra step; the
  `--style=tailwind` flag does everything in one command.
- Manual SSR setup — unnecessary since `--ssr` flag handles all configuration.
- SCSS + Tailwind — rejected per user decision; Tailwind replaces SCSS.

## Decision: Vitest as default testing framework

**Rationale**: Angular v20+ defaults to `--test-runner=vitest`. No additional
configuration needed. Vitest provides faster test execution than Karma and
supports Angular TestBed out of the box via the Angular builder integration.

**Alternatives considered**:
- Jasmine/Karma — Angular's previous default, but Vitest is now the modern
  standard and the CLI default.
- Jest — supported but requires more manual setup than Vitest in Angular.

## Decision: NgRx SignalStore as state management

**Rationale**: `@ngrx/signals` is the signals-native state management library for
Angular. It integrates with Angular's signal system, supports Clean Architecture
patterns via store features, and is the recommended approach per the constitution.

**Alternatives considered**:
- Plain Angular services with signals — simpler but lacks store features
  (`withState`, `withComputed`, `withMethods`, `signalStoreFeature`).
- Akita — signals support is newer, smaller community.
- Elf — less Angular-specific, lacks `signalStoreFeature` pattern.

## Decision: Clean Architecture directory structure

**Rationale**: Constitution Principle VII mandates Domain/Application/Infrastructure/
Presentation layers. The scaffolded `src/app/` directory will be restructured
post-`ng new` to follow this convention. The `ng new` command creates a flat
structure initially; the agency will reorganize into the 4-layer structure.

**Layer mapping**:
- `src/app/domain/` — entities, value objects, use case interfaces,
  repository interfaces
- `src/app/application/` — NgRx SignalStores, store features
- `src/app/infrastructure/` — repository implementations, data sources (HTTP)
- `src/app/presentation/` — components, pages, layouts

## Edge Cases

- **Existing files**: Run `ng new` with `--directory=.` to use current
  directory. If `package.json` or `src/` already exists, Angular CLI will warn
  and abort. Use `--force` only if intentional.
- **CLI not installed**: Run via `npx @angular/cli@latest new ...` to use
  the latest version without global install.
- **Write permissions**: Verify directory is writable before running.
