# Tasks: Initialize Angular Project

**Input**: Design documents from `/specs/001-angular-project-init/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project structure per plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Load required skills and verify tooling before scaffolding

- [X] T001 Load the `angular-new-app` skill before scaffolding per constitution requirement I
- [X] T002 Verify Angular CLI is available (`npx @angular/cli@latest version` or global `ng version`)
- [X] T003 Verify Node.js version is 18+ and npm is 9+

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The scaffold operation itself is foundational — no other work can proceed until the project exists

**⚠️ CRITICAL**: No user story work can begin until the Angular project is scaffolded

- [X] T004 Verify current directory is writable and contains no conflicting `package.json` or `src/`

**Checkpoint**: Directory ready — scaffolding can proceed

---

## Phase 3: User Story 1 - Initialize Angular project via CLI (Priority: P1) 🎯 MVP

**Goal**: Create a modern Angular project in the current directory using the CLI with standalone components, routing, Tailwind CSS, and SSR

**Independent Test**: Run `ng serve` and verify the application loads correctly in the browser at `http://localhost:4200`, displaying the default Angular welcome page

### Implementation for User Story 1

- [X] T005 [US1] Run `ng new opencode_angular --directory=. --standalone --routing --style=tailwind --ssr --strict --skip-git --defaults` to scaffold the project in the current directory
- [X] T006 [P] [US1] Verify scaffold structure: `angular.json`, `package.json`, `tsconfig.json`, and `src/` directory exist at repository root
- [X] T007 [P] [US1] Verify Tailwind CSS is configured: `@import 'tailwindcss'` is in `src/styles.css` and `@tailwindcss/postcss` in `.postcssrc.json` (Tailwind v4 uses CSS-based config, no `tailwind.config.js`)
- [X] T008 [P] [US1] Verify SSR is configured: check `server.ts`, `src/main.server.ts`, and `src/app/app.config.server.ts` exist
- [X] T009 [P] [US1] Verify standalone components: check `src/app/app.ts` has no `NgModule` imports and no explicit `standalone: true` (default in v20+)
- [X] T010 [US1] Verify routing is configured: check `src/app/app.routes.ts` exists and `src/app/app.config.ts` provides the router
- [X] T011 [US1] Run `ng build` and verify the application compiles without errors and SSR prerenders correctly
- [X] T012 [US1] Verify the build output: `dist/` contains both browser and server bundles, default page is prerendered

**Checkpoint**: At this point, User Story 1 should be fully functional — the project is scaffolded, running, and the default page loads

---

## Phase 4: User Story 2 - Verify project base structure (Priority: P2)

**Goal**: Verify the generated project follows the established conventions: TypeScript strict mode, signals-based reactivity, OnPush change detection, and working testing configuration

**Independent Test**: Review `tsconfig.json`, run `ng test`, and run `ng build` to confirm the testing configuration and build work without errors

### Implementation for User Story 2

- [X] T013 [P] [US2] Verify TypeScript strict mode: check `strict: true` is set in `tsconfig.json`
- [X] T014 [P] [US2] Verify Vitest is configured as the test runner: check `angular.json` builder uses `@angular/build:unit-test` (Vite-based Vitest)
- [X] T015 [P] [US2] Verify `OnPush` change detection is set in `src/app/app.ts` — added `ChangeDetectionStrategy.OnPush`
- [X] T016 [P] [US2] Verify no `@HostBinding` or `@HostListener` decorators exist in generated code (per constitution VIII)
- [X] T017 [P] [US2] Verify no `ngClass` or `ngStyle` directives are used in generated templates (per constitution VIII)
- [X] T018 [P] [US2] Verify native control flow (`@if`, `@for`, `@switch`) is used in generated templates instead of structural directives
- [X] T019 [P] [US2] Run `ng test` and verify all default tests execute and pass without errors (2 tests, 1 file, Vitest 4.1.7)
- [X] T020 [P] [US2] Run `ng build` and verify the project compiles successfully without warnings or errors
- [X] T021 [US2] Verify SSR build works: `dist/` contains both browser and server bundles, 1 route prerendered
- [X] T022 [US2] Verify `NgOptimizedImage` is available via `@angular/common` (will be used when static images are added)

**Checkpoint**: At this point, User Stories 1 AND 2 should both be verified — the project scaffold is correct and all conventions are met

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Add NgRx SignalStore, configure coverage thresholds, restructure into Clean Architecture, and add E2E tests

- [ ] T023 [P] Install `@ngrx/signals` via `npm install @ngrx/signals`
- [ ] T024 [P] Configure Vitest coverage thresholds in `vitest.config.ts`: enforce minimum 80% line, 80% branch, 80% function coverage
- [ ] T025 Restructure `src/app/` into Clean Architecture layers:
  - Create `src/app/domain/` with `models/`, `use-cases/`, `repositories/`
  - Create `src/app/application/` with `stores/`, `features/`
  - Create `src/app/infrastructure/` with `repositories/`, `data-sources/`
  - Create `src/app/presentation/` with `pages/`, `components/`, `layouts/`
- [ ] T026 Move `src/app/app.component.ts`, `src/app/app.config.ts`, and `src/app/app.routes.ts` into `src/app/presentation/` and update imports in `main.ts` and `main.server.ts`
- [ ] T027 [P] Create a sample NgRx SignalStore in `src/app/application/stores/` to verify the setup works
- [ ] T028 [P] Add a Playwright E2E test in `e2e/default-page.e2e-spec.ts` that navigates to `http://localhost:4200` and verifies the welcome page
- [ ] T029 [P] Verify `src/app/app.component.ts` uses `input()` and `output()` functions instead of decorators
- [ ] T030 [P] Verify `inject()` is used instead of constructor injection in generated services
- [ ] T031 Run all validation steps from `quickstart.md` (serve, build, test, SSR)
- [ ] T032 Run `speckit.git.commit` to save all changes

---

## Phase 6: Compliance & Verification

**Purpose**: Address constitution-mandated verification gaps: accessibility, Playwright MCP manual testing, SSR HTML validation, and service convention checks

- [ ] T033 [P] Configure AXE accessibility testing: install `@axe-core/playwright` and create accessibility audit test in `e2e/accessibility.e2e-spec.ts` that runs AXE checks on the default page
- [ ] T034 Run manual Playwright MCP browser verification: use Playwright MCP tools to navigate to `http://localhost:4200`, take a snapshot, and verify the welcome page renders correctly (per constitution Development Workflow §5)
- [ ] T035 [P] Start SSR server (`npm run serve:ssr:opencode_angular` or equivalent), run `curl http://localhost:4000` and verify HTML response contains rendered Angular content (not an empty shell)
- [ ] T036 [P] Verify all generated services use `providedIn: 'root'` pattern (not per-component providers unless intentional)
- [ ] T037 [P] Verify Tailwind utility classes render correctly: add a test component with a Tailwind class (e.g., `text-red-500`) and confirm the style applies in the browser
- [ ] T038 Run full validation: `ng test` with coverage thresholds, `ng build`, SSR build, AXE audit, and E2E test — all must pass
- [ ] T039 Run `speckit.git.commit` to save compliance verification changes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — verifies directory state
- **User Story 1 (Phase 3)**: Depends on Foundational phase — the scaffold IS the user story
- **User Story 2 (Phase 4)**: Depends on US1 completion — can only verify a project that exists
- **Polish (Phase 5)**: Depends on all user stories being complete
- **Compliance (Phase 6)**: Depends on Phase 5 completion — verifies constitution compliance

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (P2)**: Can start after User Story 1 — May integrate with US1 but is independently testable

### Within Each User Story

- Phase 1 tasks can run in parallel
- Phase 2 is sequential (directory verification before scaffold)
- US1 tasks T006–T009 are parallel verifications after T005 scaffold
- US2 tasks T013–T018 are parallel verifications
- Phase 5 tasks T023–T030 can run in parallel after US2
- Phase 6 tasks T033–T038 can run in parallel after Phase 5

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All US1 verification tasks (T006–T009) can run in parallel
- All US2 verification tasks (T013–T018) can run in parallel
- All Polish tasks (T023–T030) can run in parallel
- All Compliance tasks (T033, T035–T037) can run in parallel; T034 (Playwright MCP) is sequential as it requires interactive browser verification

---

## Parallel Example: User Story 1

```bash
# Launch all verifications for User Story 1 together after scaffold:
Task: "Verify scaffold structure (angular.json, package.json, src/)"
Task: "Verify Tailwind CSS configuration (tailwind.config.js, styles.css)"
Task: "Verify SSR configuration (server.ts, main.server.ts, app.config.server.ts)"
Task: "Verify standalone components (no NgModule imports in app.component.ts)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify tools)
2. Complete Phase 2: Foundational (verify directory state)
3. Complete Phase 3: User Story 1 (scaffold the project)
4. **STOP and VALIDATE**: Run `ng serve` and verify the welcome page loads
5. The project is now ready for feature development

### Incremental Delivery

1. Complete Setup + Foundational → Directory ready
2. Complete US1 → Project scaffolded and running (MVP!)
3. Complete US2 → All conventions verified
4. Complete Polish → Clean Architecture + coverage + E2E ready
5. Complete Compliance → Accessibility + SSR validation + Playwright MCP verified
6. Each phase adds value without breaking previous work

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Verify tests fail before implementing (for new features after scaffold)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
