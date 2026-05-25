---

description: "Task list for Pokemon Detail Navigation feature implementation"

---

# Tasks: Pokemon Detail Navigation

**Input**: Design documents from `specs/003-pokemon-detail-navigation/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are included for each layer to maintain 80% coverage. Tests MUST be written before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `e2e/` at repository root
- Paths shown below assume the existing Angular project structure at `src/app/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project is already scaffolded. No setup tasks needed.

*N/A — Phase 1 is empty because the Angular project already exists with routing, HTTP client, and testing infrastructure.*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Domain models, repository interface, API implementation, and store that ALL user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T001 Create PokemonDetail, PokemonType, PokemonAbility, PokemonStat domain entities in src/app/domain/models/pokemon.model.ts
- [x] T002 Add getPokemonById method to IPokemonRepository interface in src/app/domain/repositories/pokemon.repository.ts
- [x] T003 [P] Implement getPokemonById in PokeapiDataSource with DTO mapping in src/app/infrastructure/data-sources/pokeapi.datasource.ts
- [x] T004 [P] Write unit tests for getPokemonById in src/app/infrastructure/data-sources/pokeapi.datasource.spec.ts
- [x] T005 Create PokemonDetailStore (SignalStore) in src/app/application/stores/pokemon-detail.store.ts
- [x] T006 [P] Write unit tests for PokemonDetailStore in src/app/application/stores/pokemon-detail.store.spec.ts
- [x] T007 Enable withComponentInputBinding and withInMemoryScrolling in src/app/presentation/app.config.ts
- [x] T008 Add prerender entry for pokedex/:id in src/app/presentation/app.routes.server.ts

**Checkpoint**: Foundation ready — all layers from domain through application config support Pokemon detail fetching. User story implementation can now begin.

---

## Phase 3: User Story 1 - View Pokemon Details from List (Priority: P1) 🎯 MVP

**Goal**: User clicks any Pokemon card on the Pokedex list and navigates to a detail page that shows the Pokemon's name, image, and a loading indicator while full details load.

**Independent Test**: Navigate to `/pokedex`, click any Pokemon card, verify navigation to `/pokedex/{id}` with the Pokemon's name and image visible on the detail page.

### Implementation for User Story 1

- [x] T009 Add pokedex/:id route (lazy, sibling) in src/app/presentation/app.routes.ts
- [x] T010 Create PokemonDetailPage component shell with id input binding in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.ts
- [x] T011 Write unit tests for PokemonDetailPage creation and id binding in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.spec.ts
- [x] T012 Add routerLink input to PokemonCard component in src/app/presentation/components/pokemon-card/pokemon-card.ts
- [x] T013 Add routerLink to each Pokemon card in src/app/presentation/pages/pokedex-page/pokedex-page.html
- [x] T014 Implement PokemonDetailPage template with name, image, and loading state in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.html

**Checkpoint**: At this point, User Story 1 should be fully functional. User can click any Pokemon card, navigate to its detail page, and see the Pokemon's name, image, and loading indicator.

---

## Phase 4: User Story 2 - See Detailed Pokemon Information (Priority: P2)

**Goal**: The detail page fetches and displays comprehensive Pokemon information: types, height, weight, abilities, and base stats (HP, Attack, Defense, Special Attack, Special Defense, Speed).

**Independent Test**: Navigate to any Pokemon's detail page (e.g., `/pokedex/25`) and verify that types, height, weight, abilities, and base stats are displayed after loading completes.

### Implementation for User Story 2

- [x] T015 [P] [US2] Add detail content section to PokemonDetailPage template showing types, height, weight, abilities, and stats in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.html
- [x] T016 [US2] Wire PokemonDetailStore's loadPokemonById to the PokemonDetailPage onInit and display loaded detail data in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.ts
- [x] T017 [US2] Add error state and retry button to PokemonDetailPage template in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.html
- [x] T018 [US2] Add image error fallback on detail page (reuse placeholder pattern from PokemonCard) in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.ts

**Checkpoint**: At this point, User Story 2 is functional. Pokemon detail page shows all the rich information (types, stats, abilities, physical characteristics) with loading and error states.

---

## Phase 5: User Story 3 - Navigate Back to Pokedex List (Priority: P2)

**Goal**: After viewing a Pokemon's details, the user can easily return to the Pokedex list via a back button, with scroll position preserved. Invalid Pokemon IDs show a "not found" state.

**Independent Test**: Navigate to any Pokemon's detail page, click a "Back" button, and verify the application returns to the Pokedex list page with correct scroll position.

### Implementation for User Story 3

- [x] T019 [US3] Add back button (routerLink="/pokedex") to PokemonDetailPage template in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.html
- [x] T020 [US3] Handle invalid Pokemon ID (404 from API) by displaying "Pokemon not found" message in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.html
- [x] T021 [US3] Write unit test for invalid ID scenario in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.spec.ts

**Checkpoint**: At this point, User Story 3 is functional. Users can navigate back to the list, and invalid IDs are handled gracefully.

---

## Phase 6: E2E Tests & Polish

**Purpose**: End-to-end tests covering the complete Pokemon detail navigation user journey, including accessibility checks.

- [ ] T022 [P] Write E2E test for US1: click Pokemon card and verify navigation to detail page in e2e/pokedex.spec.ts
- [ ] T023 [P] Write E2E test for US2: verify detail data (types, stats, abilities) displays on detail page in e2e/pokedex.spec.ts
- [ ] T024 [P] Write E2E test for US3: back button navigation from detail to list in e2e/pokedex.spec.ts
- [ ] T025 [P] Write E2E test for error state: API failure on detail page shows error + retry in e2e/pokedex.spec.ts
- [ ] T026 [P] Write E2E test for direct URL navigation to valid Pokemon in e2e/pokedex.spec.ts
- [ ] T027 [P] Write E2E test for invalid Pokemon ID in URL (not found state) in e2e/pokedex.spec.ts
- [ ] T028 [P] Write E2E accessibility tests for detail page in e2e/pokedex-accessibility.spec.ts
- [ ] T029 Run ng test and verify all tests pass (unit + store + component + infrastructure)
- [ ] T030 Run ng build and verify production build succeeds with zero TypeScript errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: N/A — project already exists
- **Foundational (Phase 2)**: Can start immediately — BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 (Phase 3) must complete before US2 (Phase 4) and US3 (Phase 5) can deliver full value
  - US2 (Phase 4) can start after US1 detail page exists
  - US3 (Phase 5) can start after detail page shell exists
- **E2E Tests (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2). No direct dependency on US2 or US3.
- **User Story 2 (P2)**: Depends on US1 completing (detail page must exist to display detail data). Independently testable once detail page shell is in place.
- **User Story 3 (P2)**: Depends on US1 completing (detail page must exist to have a back button). Independently testable once detail page exists.

### Within Each Phase

- Tests MUST be written and FAIL before implementation (T004, T006, T011)
- Models before services
- Store before presentation
- Core implementation before UI

### Parallel Opportunities

- T003 and T004 (API implementation + tests) can run in parallel with T001, T002
- T006 (store tests) can run in parallel with T007 (config)
- T022-T028 (E2E tests) can all run in parallel
- All tests within a phase marked [P] can run in parallel

---

## Parallel Example: Phase 2 Foundational

```bash
# Launch API implementation and domain/interface changes in parallel:
Task: "Create PokemonDetail domain entities in src/app/domain/models/pokemon.model.ts"
Task: "Add getPokemonById to IPokemonRepository in src/app/domain/repositories/pokemon.repository.ts"
Task: "Implement getPokemonById in PokeapiDataSource in src/app/infrastructure/data-sources/pokeapi.datasource.ts"
```

## Parallel Example: Phase 3 User Story 1

```bash
# DB changes and API implementation in parallel:
Task: "Add routerLink input to PokemonCard component in src/app/presentation/components/pokemon-card/pokemon-card.ts"
Task: "Add pokedex/:id route in src/app/presentation/app.routes.ts"

# Then after routes:
Task: "Create PokemonDetailPage component shell in src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.ts"
Task: "Add routerLink to each Pokemon card in src/app/presentation/pages/pokedex-page/pokedex-page.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
2. Complete Phase 3: User Story 1 (MVP: click card → see detail page with name, image, loading)
3. **STOP and VALIDATE**: Run `ng test`, then verify manually via Playwright
4. This is a valid MVP — the detail page shell is functional even if full data hasn't loaded yet

### Incremental Delivery

1. Complete Foundational → Foundation ready
2. Add US1 (card click → detail page) → Test independently → Deploy/Demo (MVP!)
3. Add US2 (detail data display) → Test independently → Deploy/Demo
4. Add US3 (back navigation, error handling) → Test independently → Deploy/Demo
5. Add E2E tests → Final validation

### Parallel Team Strategy

With multiple developers:

1. Team completes Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (card click + route + detail shell)
   - Developer B: User Story 2 (detail data rendering)
3. Both independently testable once US1 shell is in place

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Follow Clean Architecture: Domain → Application → Infrastructure → Presentation
- Use `ng generate` from Angular CLI where applicable for new components/pages
