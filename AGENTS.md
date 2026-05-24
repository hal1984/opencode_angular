# opencode_angular

## Current state

Tooling infrastructure is provisioned but no Angular app code exists yet. No `src/`, no project `package.json` at root.

## Squad (agent orchestration)

- `.squad/team.md` — roster with Ralph (work monitor) and Scribe (logger) agents initialized; domain agents need hiring via Squad's Init Mode.
- `.squad/routing.md`, `.squad/ceremonies.md`, `.squad/decisions.md`, `.squad/identity/` — operational config.
- `.squad/config.json` — `{ "version": 1 }` (no model overrides set).
- `.squad/casting/policy.json` — allowed casting universes and capacities.

## Angular skills (installed)

`skills-lock.json` references two skills from `angular/skills`:
- `angular-new-app` — use to scaffold with `ng new` (triggers on project creation)
- `angular-developer` — use for Angular code generation, architecture, forms, routing, signals, etc.

Run `ng new <name> --standalone --routing --style=scss` when initializing the app.

## Speckit workflow commands

Commands live in `.opencode/commands/` and are invoked via `speckit.<verb>`:
- `speckit.specify` — create a feature spec
- `speckit.plan` — create an implementation plan
- `speckit.tasks` — break plan into tasks
- `speckit.implement` — execute tasks
- `speckit.checklist` — generate checklist
- `speckit.clarify` — ask clarifying questions
- `speckit.constitution` — project constitution
- `speckit.analyze` — analyze existing code
- `speckit.git.*` — git workflow helpers

## Copilot skills

`.copilot/skills/` contains: agent-collaboration, error-recovery, git-workflow, reviewer-protocol, secret-handling, session-recovery, squad-conventions, test-discipline.

## MCP

`.copilot/mcp-config.json` has a GitHub MCP server entry (requires `GITHUB_TOKEN` env var).

## Key config references

- `.specify/init-options.json`: `context_file: AGENTS.md` — this file is the designated context source.
- `.gitattributes`: `merge=union` for `.squad/*` append-only files.
- No `opencode.json` found — agent behavior is guided by Squad agent (`squad.agent.md`) and this file.
