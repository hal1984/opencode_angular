# opencode_angular

## Current state

Tooling infrastructure is provisioned but no Angular app code exists yet. No `src/`, no project `package.json` at root.

## Scaffolding

Run `ng new <name> --standalone --routing --style=tailwind --ssr` when initializing the app. Use the `angular-new-app` skill before scaffolding (it contains guidelines for modern Angular setup).

## Skills (installed)

`skills-lock.json` pins two skills from `angular/skills`:
- `angular-developer` — use for Angular code generation, architecture, forms, routing, signals, SSR, testing, etc.
- `angular-new-app` — use before `ng new` scaffolding

Skills live in `.agents/skills/`. OpenCode loads them via `opencode.json` `skills.paths`.

## MCP servers (opencode.json)

| Server | Type | Auth |
|--------|------|------|
| GitHub | remote (api.githubcopilot.com) | Bearer token from `.secrets/github-token` |
| Angular CLI | local (`npx -y @angular/cli@latest mcp`) | none |
| Context7 | remote (mcp.context7.com) | `CONTEXT7_API_KEY` from `.secrets/context7-key` |

Tokens are gitignored (`.secrets/`). If an MCP call fails, check that the corresponding secret file exists and is non-empty.

## Speckit workflow (`.opencode/commands/`)

Commands invoked via `speckit.<verb>`. The full SDD cycle:
```
speckit.specify → speckit.plan → speckit.tasks → speckit.implement
```
Additional helpers: `speckit.analyze`, `speckit.clarify`, `speckit.checklist`, `speckit.constitution`, `speckit.taskstoissues`, `speckit.git.*`.

The workflow is defined in `.specify/workflows/speckit/workflow.yml` and expects `speckit_version >=0.8.5` (initialized at 0.8.13).

## Important paths / config

- `opencode.json` — central agent config (instructions, skills, MCP). This is the agent's primary entry point.
- `.specify/init-options.json` — `context_file: AGENTS.md` — this file is the designated context source.
- `.opencode/package.json` — depends on `@opencode-ai/plugin@1.15.10`.

## Secrets

- `.secrets/github-token` — required for GitHub MCP server
- `.secrets/context7-key` — required for Context7 MCP server
- Both are in `.gitignore` and must exist locally for their respective MCP servers to work.

## Deleted directories (no longer present)

`.squad/` and `.copilot/` directories have been removed. Ignore any references to squad agents or copilot skills from old docs.

<!-- SPECKIT START -->
## Active Spec

**Feature**: Initialize Angular Project
**Plan**: `specs/001-angular-project-init/plan.md`
**Spec**: `specs/001-angular-project-init/spec.md`
**Branch**: `001-angular-project-init`
<!-- SPECKIT END -->
