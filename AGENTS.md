# Agentic Development Instructions & Project Standards

## 1. Agent Operating Loop (Observe -> Plan -> Act -> Verify)
Every session and non-trivial task must follow this 4-stage execution cycle:
1. **Observe & Context Discovery**:
   - Inspect existing files, interfaces, schemas, and configurations before writing or modifying code.
   - Never assume API contracts, package versions, or dependencies; verify against `package.json`, `requirements.txt`, or existing exports.
2. **Plan & Clarify**:
   - For multi-step tasks, outline a concise step-by-step plan before execution.
   - Clarify ambiguous requirements or major architectural trade-offs with the user rather than guessing.
3. **Act (Surgical Implementation)**:
   - Make focused, minimal diffs. Avoid unnecessary file rewrites or reformatting unrelated code.
   - Preserve existing comments, docstrings, and established architectural patterns.
4. **Verify & Validate**:
   - Run automated verification (e.g., `pnpm tsc --noEmit`, linter, or tests) before concluding changes.
   - Report verification results clearly to the user.

---

## 2. Directory Structure & Boundaries
Strictly respect the following directory organization across the workspace:
- **`docs/`**: All documentation (architecture decision records, API specs, setup guides, project notes, diagrams).
- **`infra/`**: Infrastructure, build pipelines, CI/CD configs, deployment scripts, Dockerfiles, and cloud resources.
- **`src/`** (Frontend): Next.js App Router frontend:
  - `src/app/`: App Router pages, layouts, and route handlers.
  - `src/components/`: Reusable, modular UI components.
  - `src/lib/`: Shared utilities, API clients, and helper functions.
  - `src/data/` or `src/types/`: Type definitions and static data.
- **`backend/`** (Backend): Python / FastAPI service:
  - `backend/routers/`: Modular route controllers.
  - `backend/main.py`: Application entrypoint.
  - `backend/requirements.txt`: Python dependencies.

---

## 3. Engineering & Code Quality Standards

### Frontend (TypeScript / Next.js / React)
- **Strict Type Safety**: Prohibit `any`. Define explicit interfaces and types for all props, API responses, and state hooks.
- **Modular Components**: Separate presentation from data fetching/business logic. Keep components composable and reusable.
- **State & UX**: Always account for loading states, empty states, and error handling.

### Backend (Python / FastAPI)
- **Type Annotations & Validation**: Use type hints on all function signatures and Pydantic models for request/response validation.
- **Modularity**: Organize logic into domain-driven routers and service functions.

---

## 4. Execution Autonomy & Zero-Prompt Sandboxing
- **Unattended Execution**: Execute tasks autonomously without pausing for manual approval modals, plan reviews, or interactive prompts unless a destructive operation is involved.
- **Sandboxed Execution**: Always execute commands within the standard workspace sandbox (`BypassSandbox: false`). Commands must auto-run seamlessly without interrupting the user.
- **Prefix-Matchable & Clean Commands**: Run commands directly (e.g., `pnpm ...`, `git ...`, `python3 ...`) without unnecessary wrappers or subshells so they execute immediately without triggering approval prompts.

---

## 5. Safety & Security Guardrails
- **No Destructive Operations**: Never run destructive commands (e.g., `git reset --hard`, `git clean -fd`, deleting branches, dropping database tables, or removing critical files) without explicit confirmation.
- **Secrets Management**: Never log, hardcode, or display secrets, API keys, or `.env` files. Ensure secrets use environment variables.

---

## 6. Communication & Workflow Conventions
- **Clickable File & Symbol Links**: Always format file and symbol paths as clickable Markdown links (e.g., `[main.py](file:///Users/corinnelucas/dev/projects/ReproUs/backend/main.py)` or `[docs/](file:///Users/corinnelucas/dev/projects/ReproUs/docs)`).
- **Concise & High-Signal**: Keep explanations direct, actionable, and structured with GitHub-style Markdown.
- **Conventional Commits**: Format proposed git commit messages using Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).
