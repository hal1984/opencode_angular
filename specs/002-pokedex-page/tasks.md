# Tasks: Pokedex Page

**Input**: Design documents from `/specs/002-pokedex-page/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included per constitution IV (Test-First). Unit tests (Vitest) + E2E tests (Playwright). Coverage target: >=80% line/branch/function.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- All paths are relative to the repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Directory scaffolding and HTTP/image loader configuration -- no domain code yet.

- [ ] T001 Create directory structure per quickstart.md:
  - `src/app/domain/models/`
  - `src/app/domain/repositories/`
  - `src/app/infrastructure/data-sources/`
  - `src/app/presentation/components/pokemon-card/`
  - `src/app/presentation/pages/pokedex-page/`
- [ ] T002 Add providers to `src/app/presentation/app.config.ts`:
  - `provideHttpClient(withFetch())` from `@angular/common/http`
  - `IMAGE_LOADER` passthrough provider: `{ provide: IMAGE_LOADER, useValue: (config: ImageLoaderConfig) => config.src }` for NgOptimizedImage external sprite CDN URLs

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Domain entities and repository contract -- MUST complete before ANY user story implementation.

- [ ] T003 [P] Create `Pokemon` entity (`id: number`, `name: string`, `spriteUrl: string`) and `PokemonListResponse` value object (`pokemon`, `count`, `next`, `previous`) in `src/app/domain/models/pokemon.model.ts`
- [ ] T004 [P] Create `IPokemonRepository` interface with `getPokemonList(offset: number, limit: number): Promise<PokemonListResponse>` and export `POKEMON_REPOSITORY` injection token in `src/app/domain/repositories/pokemon.repository.ts`

**Checkpoint**: Domain contract ready -- user story implementation can now begin.

---

## Phase 3: User Story 1 - Navigate to Pokedex from Home (Priority: P1)

**Goal**: A "Pokedex" button on the home page navigates to a new `/pokedex` route. The Pokedex page renders an empty shell (heading only) at this stage.

**Independent Test**: Load home page -> verify "Pokedex" button visible -> click -> verify navigation to `/pokedex` -> verify page heading renders. Page transition completes in under 3 seconds (SC-001).

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T005 [US1] Write unit test for PokedexPage shell rendering (heading "Pokedex" present, router outlet integration) in `src/app/presentation/pages/pokedex-page/pokedex-page.spec.ts`

### Implementation for User Story 1

- [ ] T006 [US1] Create PokedexPage shell component (`pokedex-page.ts` + `pokedex-page.html`) with heading "Pokedex" in `src/app/presentation/pages/pokedex-page/`
  - Component must use `ChangeDetectionStrategy.OnPush`
- [ ] T007 [US1] Add `/pokedex` lazy-loaded route using `loadComponent` in `src/app/presentation/app.routes.ts`
- [ ] T008 [US1] Add "Pokedex" button with `routerLink="/pokedex"` as the first pill in the pill-group section of `src/app/presentation/app.html`
- [ ] T009 [US1] Add `RouterLink` to the `imports` array in `src/app/presentation/app.ts`

**Checkpoint**: Home page shows Pokedex button -> click navigates to Pokedex page shell with heading. T005 tests pass.

---

## Phase 4: User Story 2 - View Pokemon List (Priority: P2)

**Goal**: Pokedex page fetches Pokemon from PokeAPI and displays them as a responsive card grid. Includes loading indicator and error state handling.

**Independent Test**: Navigate to `/pokedex` -> loading indicator appears -> Pokemon cards render with name + image -> verify responsive grid layout (1 col mobile, 2 col sm, 3 col md, 4 col lg). Break API endpoint (404/500/network-down) to verify error state shows "Could not load Pokemon. Please try again." with a retry button.

### Tests for User Story 2

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US2] Write unit test for `PokeapiDataSource` in `src/app/infrastructure/data-sources/pokeapi.datasource.spec.ts`
  - Test HTTP 200 success path: verifies ID extraction from URL, sprite URL construction, DTO mapping
  - Test HTTP error paths: 404, 500, network error (offline), timeout (>15s via AbortSignal)
  - Test edge case: empty results array returns empty Pokemon[]
  - Test edge case: malformed `url` field (no numeric ID) throws descriptive error
- [ ] T011 [P] [US2] Write unit test for `PokemonCard` component in `src/app/presentation/components/pokemon-card/pokemon-card.spec.ts`
  - Test: renders Pokemon name and `ngSrc` image correctly
  - Test: image `(error)` event triggers fallback behavior (CSS class toggle or placeholder ngSrc swap)
  - Test: NgOptimizedImage `ngSrc` binding equals `pokemon().spriteUrl`
- [ ] T012 [P] [US2] Write unit test for `PokedexStore` in `src/app/application/stores/pokedex.store.spec.ts`
  - Test initial state: `pokemon: []`, `isLoading: false`, `error: null`, `offset: 0`, `hasMore: true`
  - Test `loadPokemon` success: appends Pokemon[], increments offset, sets `hasMore` based on `next`
  - Test `loadPokemon` failure: sets `error` string, `isLoading` returns to false
  - Test `isEmpty` computed: true when pokemon=[], not loading, no error
- [ ] T013 [US2] Write unit test for PokedexPage full integration in `src/app/presentation/pages/pokedex-page/pokedex-page.spec.ts`
  - Test loading state: spinner/skeleton visible when store isLoading && pokemon.length === 0
  - Test data state: Pokemon cards rendered in grid using `@for` with `track pokemon.id`
  - Test error state: error message "Could not load Pokemon. Please try again." visible, retry button present
  - Test empty state: message shown when `isEmpty()` is true
  - Test grid stability (SC-004): verify card containers maintain consistent width/height dimensions regardless of image load state

### Implementation for User Story 2

- [ ] T014 [P] [US2] Create `PokeapiDataSource` implementing `IPokemonRepository` in `src/app/infrastructure/data-sources/pokeapi.datasource.ts`
  - Use `inject(HttpClient)` (not constructor)
  - `GET https://pokeapi.co/api/v2/pokemon?offset={offset}&limit={limit}`
  - Extract Pokemon ID from `url` field using regex `/\/(\d+)\/$/`
  - Construct `spriteUrl`: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
  - Map response to `PokemonListResponse` with `count`, `next`, `previous`, `pokemon: Pokemon[]`
  - 15-second timeout via `AbortSignal.timeout(15000)` on the fetch
  - Throw descriptive errors for: network failure, non-2xx status, timeout, malformed response
- [ ] T015 [P] [US2] Create `PokemonCard` dumb component (`pokemon-card.ts` + `pokemon-card.html`) in `src/app/presentation/components/pokemon-card/`
  - `pokemon = input.required<Pokemon>()`
  - Template: `<article>` card with `<img [ngSrc]="pokemon().spriteUrl" [alt]="pokemon().name" (error)="onImageError()">` and `<p>{{ pokemon().name }}</p>`
  - On image error: toggle a CSS class that shows a grey placeholder (`background-color: #e5e7eb; min-height: 96px;` with a centered Pokeball emoji via `::after` pseudo-element) and hides the broken img
  - Import `NgOptimizedImage` from `@angular/common`
  - Responsive grid card: `w-full rounded-lg border p-4 shadow-sm` with Tailwind
  - Name text: capitalize first letter via CSS `text-transform: capitalize`
  - `ChangeDetectionStrategy.OnPush`
- [ ] T016 [US2] Create `PokedexStore` in `src/app/application/stores/pokedex.store.ts`
  - `signalStore({ providedIn: 'root' })` with `withState`, `withComputed`, `withMethods`, `withHooks`, `withProps`
  - State: `pokemon: Pokemon[]`, `isLoading: boolean`, `error: string | null`, `offset: number`, `limit: number` (20), `hasMore: boolean`
  - Computed: `isEmpty(): boolean` (pokemon.length === 0 && !isLoading && !error), `allLoaded(): boolean` (!hasMore && pokemon.length > 0)
  - Methods: `loadPokemon()` -- sets `isLoading`, clears `error`, calls `repository.getPokemonList(offset, limit)`, patches state with appended pokemon and incremented offset, sets `hasMore` from `response.next !== null`
  - Hooks: `onInit` -> calls `loadPokemon()`
  - Inject repository via `inject(POKEMON_REPOSITORY)` inside `withProps`
  - Export `type PokedexStore = InstanceType<typeof PokedexStore>`
- [ ] T017 [US2] Register `POKEMON_REPOSITORY` DI provider (`useClass: PokeapiDataSource`) in `src/app/presentation/app.config.ts`
- [ ] T018 [US2] Update `PokedexPage` component in `src/app/presentation/pages/pokedex-page/`
  - Inject `PokedexStore` via `inject(PokedexStore)`
  - Template states using `@if`:
    - **Loading**: `<p role="status">Loading Pokemon...</p>` shown when `isLoading() && pokemon().length === 0`
    - **Error**: `<p role="alert">Could not load Pokemon. Please try again.</p>` + `<button (click)="store.loadPokemon()">Retry</button>` shown when `error() !== null`
    - **Data**: `<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">` containing `<pokemon-card>` via `@for (mon of store.pokemon(); track mon.id)`
    - **Empty**: `<p>No Pokemon available.</p>` shown when `store.isEmpty()`
  - Import `PokemonCard` and `PokedexStore`
  - `ChangeDetectionStrategy.OnPush`

**Checkpoint**: Navigating to Pokedex shows loading -> Pokemon card grid renders with names and images in responsive layout. Error state works with retry. T010-T013 tests pass.

---

## Phase 5: User Story 3 - Browse Extended Pokemon List (Priority: P3)

**Goal**: User can load more Pokemon beyond the initial batch via a "Load More" button. When all Pokemon are loaded, the button is hidden and an "All Pokemon loaded" message appears.

**Independent Test**: Load Pokedex page -> scroll to bottom -> click "Load More" -> more Pokemon append (offset increases by 20) -> repeat until "All Pokemon loaded" message appears and button disappears.

### Tests for User Story 3

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T019 [US3] Write pagination tests in `src/app/application/stores/pokedex.store.spec.ts`
  - Test `loadPokemon` call with offset=20 appends to existing pokemon[] instead of replacing
  - Test `hasMore` computed: true when response.next is non-null, false when null
  - Test `allLoaded` computed: true when hasMore is false and pokemon.length > 0
  - Test guard: calling `loadPokemon` when `isLoading` is true does not trigger a second request
- [ ] T020 [US3] Write load-more UI tests in `src/app/presentation/pages/pokedex-page/pokedex-page.spec.ts`
  - Test "Load More" button visible when `hasMore()` is true and not loading
  - Test "Load More" button disabled while `isLoading()` is true
  - Test "All Pokemon loaded" message visible when `allLoaded()` is true
  - Test button click calls `store.loadPokemon()`

### Implementation for User Story 3

- [ ] T021 [US3] Add guard to `loadPokemon()` method in `src/app/application/stores/pokedex.store.ts`
  - Early return if `isLoading` is already true (prevents double-fetch)
  - `hasMore` is updated based on `response.next !== null` after each successful fetch
- [ ] T022 [US3] Add Load More button and completion message to `src/app/presentation/pages/pokedex-page/pokedex-page.html`
  - Button: `<button (click)="store.loadPokemon()" [disabled]="store.isLoading()">Load More</button>` shown when `store.hasMore()`
  - Message: `<p>All Pokemon loaded.</p>` shown when `store.allLoaded()`
  - Both placed after the card grid `<section>`

**Checkpoint**: Load More appends Pokemon in batches of 20. When all loaded, button disappears and completion message shows. T019-T020 tests pass.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Image fallback, retry on error, E2E verification with performance assertions, accessibility checks, and final validation.

- [ ] T023 [P] Refine PokemonCard fallback CSS styling in `src/app/presentation/components/pokemon-card/pokemon-card.ts` and its component styles — ensures the placeholder (with Pokeball emoji `::after`) has proper `min-height: 96px` and `background-color: #e5e7eb` so grid cards maintain stable dimensions before and after image loads, preventing layout shift per SC-004
- [ ] T024 [P] Add retry button to error state in `src/app/presentation/pages/pokedex-page/pokedex-page.html`
  - Retry button calls `store.loadPokemon()` which clears the error and re-fetches
  - Button must have `type="button"` to prevent form submission
- [ ] T025 [P] Write E2E test for Pokedex user journey in `e2e/pokedex.spec.ts`
  - **US1**: Load home page -> click "Pokedex" button -> assert URL ends with `/pokedex` -> assert heading visible
  - **SC-001**: Measure and assert page transition time < 3000ms (using `Date.now()` before/after click)
  - **US2**: Wait for cards to render -> assert at least 1 Pokemon card visible with image and name
  - **SC-002**: Measure and assert first card render time < 5000ms (using `page.waitForSelector` with timeout)
  - **US3**: Scroll to "Load More" -> click -> assert Pokemon count increases
  - **C4 (navigate-away-back)**: Navigate to home -> navigate back to `/pokedex` -> assert loading indicator appears -> assert fresh cards render (not stale)
  - **Image fallback (U3)**: Use `page.route('**/PokeAPI/sprites/**')` to intercept sprite CDN and return 404 -> assert fallback placeholder visible
  - **Error state**: Use `page.route('**/pokeapi.co/**')` to return 500 -> assert error message "Could not load Pokemon. Please try again." visible -> click Retry -> remove route -> assert cards load
  - **Empty state**: Not applicable for PokeAPI (always returns data), but defensive
- [ ] T026 [P] Write E2E accessibility test for Pokedex page in `e2e/pokedex-accessibility.spec.ts`
  - Navigate to `/pokedex` -> wait for cards to load
  - Run `@axe-core/playwright` AxeBuilder analysis with `wcag2a` and `wcag2aa` tags
  - Assert zero critical or serious violations
  - Verify all cards have `alt` text on images
  - Verify loading text uses `role="status"` and error text uses `role="alert"`
- [ ] T027 Run `quickstart.md` validation:
  - `ng build` -- no TypeScript errors, production build succeeds (SSR)
  - `ng test` -- all unit tests pass, >=80% line/branch/function coverage
  - `npx playwright test` -- all E2E tests pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies -- can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion -- BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 -> US2 -> US3 (sequential -- each builds on the previous)
  - US1: route + button + page shell (standalone deliverable)
  - US2: data fetching + card grid (requires US1 page shell)
  - US3: load more pagination (requires US2 store + page)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2). No dependencies on other stories.
- **User Story 2 (P2)**: Depends on US1 (Pokedex page shell must exist to extend). Domain model and repository interface already exist from Foundational.
- **User Story 3 (P3)**: Depends on US2 (PokedexStore and PokedexPage must have loadPokemon + grid before adding loadMore).

### Within Each User Story

- Tests MUST be written and observe failure BEFORE implementation (constitution IV)
- Infrastructure data source before store (store injects repository)
- Dumb components (PokemonCard) can parallel with smart components
- Store before page integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Foundational tasks marked [P] can run in parallel (T003, T004)
- Within US2 tests: T010, T011, T012 can run in parallel (different files)
- Within US2 impl: T014, T015 can run in parallel (different files, no dependency)
- Within Phase 6: T023, T024, T025, T026 can all run in parallel
- Different user stories CANNOT run in parallel (sequential dependency: US1 -> US2 -> US3)

---

## Parallel Example: User Story 2

```bash
# Launch unit tests for different layers in parallel (write first, observe failure):
Task: "Write unit test for PokeapiDataSource in src/app/infrastructure/data-sources/pokeapi.datasource.spec.ts"
Task: "Write unit test for PokemonCard component in src/app/presentation/components/pokemon-card/pokemon-card.spec.ts"
Task: "Write unit test for PokedexStore in src/app/application/stores/pokedex.store.spec.ts"

# After tests written, launch data source + card component in parallel:
Task: "Create PokeapiDataSource in src/app/infrastructure/data-sources/pokeapi.datasource.ts"
Task: "Create PokemonCard component in src/app/presentation/components/pokemon-card/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (directories, HTTP + image loader config)
2. Complete Phase 2: Foundational (Pokemon model, repository interface)
3. Complete Phase 3: User Story 1 (route, button, page shell, unit test)
4. **STOP and VALIDATE**: Test home page button -> navigate to Pokedex shell. Run `ng test`.
5. Deploy/demo if ready -- users can navigate but see an empty Pokedex page.

### Incremental Delivery

1. Complete Setup + Foundational -> Foundation ready
2. Add User Story 1 -> Test independently -> Navigation works (MVP!)
3. Add User Story 2 -> Test independently -> Pokemon card grid renders with data, loading/error states work
4. Add User Story 3 -> Test independently -> Load More pagination works
5. Add Polish -> Image fallback, error retry, E2E + a11y tests, perf assertions -> Production ready
6. Each story adds value without breaking previous stories

### Single Developer Strategy

Execute phases sequentially: Phase 1 -> Phase 2 -> Phase 3 -> Phase 4 -> Phase 5 -> Phase 6. Within each phase, parallel tasks can be batched but sequential tasks must respect order.

---

## Notes

- **Per-Task Execution Cycle** (Constitution SSDevelopment Workflow): EVERY task T001-T027 MUST follow the 5-step cycle:
  1. Implement the task
  2. Run `ng test` -- all tests must pass
  3. Manual Playwright MCP verification (`playwright_browser_navigate`, `playwright_browser_snapshot`, `playwright_browser_take_screenshot`) -- save screenshots to `test-screenshots/`
  4. Commit: `git add . && git commit -m "Txxx: <description> (closes #N)"` -- exactly one task per commit
  5. Close GitHub issue with commit SHA via `github_issue_write`
  - If a step is skipped, the task is NOT complete. Proceed to next task only after all 5 steps.
- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (test-first per constitution IV)
- Stop at any checkpoint to validate story independently
- All new components use `ChangeDetectionStrategy.OnPush` (standalone is default in v21, do NOT set explicitly)
- Store uses `withHooks` to call `loadPokemon()` on init; `withProps` for DI injection of repository
- PokeAPI URL extraction regex: `/\/(\d+)\/$/` applied to result `url` field
- Sprite CDN template: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
- Error message: "Could not load Pokemon. Please try again." with `role="alert"` for accessibility
- Loading text: "Loading Pokemon..." with `role="status"` for screen readers
- Grid breakpoints: 1 col (default), 2 col (sm: 640px), 3 col (md: 768px), 4 col (lg: 1024px)
- Existing `app.spec.ts` does not require modification -- the Pokedex button is tested via E2E (T025) and does not break the existing title assertion
