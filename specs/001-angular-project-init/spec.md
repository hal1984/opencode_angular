# Feature Specification: Initialize Angular Project

**Feature Branch**: `001-angular-project-init`

**Created**: 2026-05-24

**Status**: Draft

**Input**: User description: "Lo primero va a ser iniciar el proyecto angular en este directorio"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Initialize Angular project via CLI (Priority: P1)

The developer wants to create a modern Angular project in this working directory
using Angular's command-line tools. The project MUST follow modern Angular
conventions: standalone components, configured routing, Tailwind CSS
styling, and SSR (Server-Side Rendering) enabled.

**Why this priority**: This is the mandatory starting point. Without this
initialization, no further feature development can proceed.

**Independent Test**: Run `ng serve` and verify the application loads correctly
in the browser at `http://localhost:4200`, displaying the default page.

**Acceptance Scenarios**:

1. **Given** the working directory with tooling configured, **When** the developer
    runs the scaffolding command `ng new`, **Then** an Angular project is created
    with standalone components, routing enabled, Tailwind CSS configured, and
    SSR enabled.

2. **Given** the Angular project has been created, **When** the developer runs
   `ng serve`, **Then** the application compiles without errors and is served at
   `http://localhost:4200`.

3. **Given** the application is running, **When** the developer opens the browser
   at `http://localhost:4200`, **Then** the default Angular welcome page is
   displayed.

---

### User Story 2 - Verify project base structure (Priority: P2)

The developer needs to verify that the generated structure follows the
established conventions: TypeScript strict mode, signals-based reactivity
patterns, and a working testing configuration.

**Why this priority**: The correct structure is necessary before writing any
application code, but it can be verified after the initial scaffolding.

**Independent Test**: Review `angular.json`, `tsconfig.json` and run `ng test`
to confirm the testing configuration works.

**Acceptance Scenarios**:

1. **Given** the project has been created, **When** the developer reviews the
   TypeScript configuration, **Then** strict mode (`strict: true`) is enabled.

2. **Given** the project has been created, **When** the developer runs
   `ng test`, **Then** the default tests execute and pass without errors.

3. **Given** the project has been created, **When** the developer runs
   `ng build`, **Then** the project compiles successfully without warnings or
   errors.

---

### Edge Cases

- What happens if `@angular/cli` is not installed globally? The tooling MUST
  detect this and guide the user on how to install it.
- What happens if a `package.json` or `src/` directory already exists in the
  working directory? The scaffolding MUST alert the user and avoid overwriting
  existing files.
- What happens if the directory has no write permissions?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST create an Angular project using the official
  Angular CLI (`ng new`) with the `--standalone`, `--routing`,
  `--style=tailwind`, and `--ssr` flags.
- **FR-002**: The created project MUST use standalone components as the
  default architecture (no NgModules for components and directives).
- **FR-003**: The project MUST have routing configured and functional from
  the start.
- **FR-004**: The project MUST use Tailwind CSS as the default styling
  framework (configured via the `--style=tailwind` flag).
- **FR-005**: The project MUST include a working test configuration ready
  to run (`ng test` works without additional setup). Tests MUST use
  Vitest as the testing framework.
- **FR-006**: The TypeScript configuration MUST enable strict mode
  (`strict: true` in `tsconfig.json`).
- **FR-007**: The project MUST be able to compile (`ng build`) and serve
  in development mode (`ng serve`) without errors.
- **FR-008**: The project MUST have Server-Side Rendering (SSR)
  configured and functional, verified by running the SSR dev server
  (`ng serve` uses SSR when `--ssr` is configured).

### Key Entities

- **Angular Project**: The generated root structure containing `angular.json`,
  `package.json`, `tsconfig.json`, and the `src/` folder with initial source
  code.
- **App Component**: The root component (`app.component.ts`) generated as
  standalone, serving as the visual entry point of the application.
- **Routes Configuration**: The `app.routes.ts` file defining the initial
  application routing.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The application starts and is served in the browser in under
  30 seconds after running `ng serve` for the first time.
- **SC-002**: The `ng build` command completes compilation without errors
  or warnings.
- **SC-003**: The `ng test` command runs the default tests and all pass.
- **SC-004**: The default Angular welcome page renders correctly in the
  browser.
- **SC-005**: The SSR build completes without errors and serves content
  from the server.

## Assumptions

- The developer has Node.js and npm installed in versions compatible with
  the latest Angular release.
- The working directory has write permissions and does not contain a
  previous Angular application that could conflict.
- The latest stable version of Angular CLI available at the time of
  execution is used.
- The local network configuration allows the development server to run on
  port 4200.
- The project is named `opencode_angular` (matching the repository/root
  directory name) as per the existing configuration.
- Vitest is the chosen testing framework and replaces Angular CLI's default
  Jasmine/Karma setup.
- Tailwind CSS is the chosen styling framework, configured via the native
  `--style=tailwind` Angular CLI flag.
- SSR is enabled via the Angular CLI `--ssr` flag.

## Clarifications

### Session 2026-05-24

- Q: Which testing framework should the project use? → A: Vitest
- Q: Use Tailwind CSS instead of SCSS for styling? → A: Yes, use `--style=tailwind`
- Q: Enable SSR (Server-Side Rendering)? → A: Yes, use `--ssr` flag

## Dependencies

- Angular CLI (`@angular/cli`) — MUST be available via `npx` or installed
  globally.
- Vitest + Angular Vitest integration — required for unit and component testing.
- Tailwind CSS (`tailwindcss`) — installed and configured via
  `ng add tailwindcss` or `--style=tailwind` flag.
- Angular SSR packages (`@angular/ssr`) — installed and configured via the
  `--ssr` flag.
- Node.js and npm — required by Angular CLI to download dependencies and
  compile.
- The `angular-new-app` skill MUST be loaded before executing scaffolding
  to follow modern Angular setup guidelines.
