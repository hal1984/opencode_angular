# opencode_angular

## Constitution

**.specify/memory/constitution.md** is the authoritative source for architecture, coding standards, and workflow. **MUST** be followed on every task. Key rules:

- Clean Architecture: Domain → Application → Infrastructure → Presentation (unidirectional)
- Signals-first: `signal()`, `computed()`, `linkedSignal()`, `resource()`, NOT RxJS
- Standalone components only; `standalone: true` is default in v21 — do NOT set it
- NgRx SignalStore (`@ngrx/signals`) for state; `@if`/`@for`/`@switch` in templates
- Test-first (Vitest unit, Playwright E2E); 80% line/branch/function coverage enforced
- TypeScript strict; no `any` without comment; inject() not constructor; OnPush on every component
- English only (docs, comments, commits)
- Speckit SDD: `specify → plan → tasks → implement` with strict per-task cycle (5 steps)

## Current state

Angular v21.2 app scaffolded with Clean Architecture layers in `src/app/`. Layer directories exist but most are empty — only `application/stores/counter.store.ts` and `presentation/` root files are populated.

**Active feature**: `002-pokedex-page` (`.specify/feature.json` → `specs/002-pokedex-page/`)

## Commands

| Command | Does |
|---------|------|
| `ng serve` | Dev server on `http://localhost:4200` |
| `ng build` | Production build (SSR, `outputMode: server`) |
| `ng test` | Vitest unit tests (config: `vitest-base.config.ts`) |
| `ng test -- --watch` | Vitest in watch mode |
| `npx playwright test` | E2E tests (needs `ng serve` running on 4200) |
| `npm run e2e` | Alias for `npx playwright test` |
| `npx prettier --write .` | Format all files |

## Testing

- **Unit**: Vitest via `ng test`. One command runs everything. Coverage thresholds enforced at 80% line/branch/function/statements in `vitest-base.config.ts`.
- **E2E**: Playwright in `e2e/`. Run with `npm run e2e`. Requires `ng serve` running on port 4200. **NON-NEGOTIABLE**: E2E test failures mean the implementation is incorrect — the implementation MUST be fixed, not the tests weakened. Includes AXE accessibility checks (`@axe-core/playwright`).
- **Per-task verification**: After every task, run `ng test` then use Playwright MCP for manual browser verification. Screenshots go to `test-screenshots/` (gitignored).

## Architecture layers

```
src/app/
├── domain/          # Entities, value objects, use case interfaces, repository interfaces
├── application/     # NgRx SignalStores, store features (withState, withMethods, withComputed)
├── infrastructure/  # Repository impls, data sources, DTO mappers
└── presentation/    # Standalone components, pages, layouts. Inject stores, use input() signals
```

Presentation never imports from Infrastructure directly — both depend on Domain interfaces, resolved via Angular DI.

## MCP servers (opencode.json)

| Server | Type | Auth |
|--------|------|------|
| GitHub | remote (api.githubcopilot.com) | Bearer `.secrets/github-token` |
| Angular CLI | local (`npx -y @angular/cli@latest mcp`) | none |
| Context7 | remote (mcp.context7.com) | `CONTEXT7_API_KEY` from `.secrets/context7-key` |
| Playwright | local (`npx -y @playwright/mcp@latest`) | none |

## Skills (skills-lock.json)

- `angular-developer` — code generation, architecture, forms, routing, signals, SSR, testing
- `angular-new-app` — use before `ng new` scaffolding
- `find-skills` — discover/install new skills

Skills live in `.agents/skills/`.

## Speckit workflow

Commands: `speckit.specify → speckit.plan → speckit.tasks → speckit.implement`. Also `speckit.analyze`, `speckit.clarify`, `speckit.checklist`, `speckit.constitution`, `speckit.taskstoissues`, `speckit.git.*`.

Feature branches via `speckit.git.feature`.

## Important paths

- `opencode.json` — central agent config (instructions, skills, MCP)
- `.specify/init-options.json` — `context_file: AGENTS.md`
- `.specify/memory/constitution.md` — **must read before any code change**
- `.opencode/package.json` — `@opencode-ai/plugin@1.15.10`

## Secrets

`.secrets/github-token` and `.secrets/context7-key` are gitignored. MCP failures → check for missing/empty secret files.

## Deleted artifacts

`.squad/` and `.copilot/` — removed. Ignore any references to squad agents or copilot skills.
