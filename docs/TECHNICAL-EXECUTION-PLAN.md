# Technical Execution Plan – 3 weeks / 4 developers

## Architecture
React/Vite SPA with Material UI and React Router → HTTPS REST API (Node/Express) → MongoDB Atlas via Mongoose. JWT in HTTP-only cookie, Zod validation, role/ownership middleware. Vercel hosts frontend; Render hosts API; GitHub Actions runs CI.

## Team allocation
| Developer | Ownership | Key outputs |
|---|---|---|
| 1 – Team Lead | Architecture, auth/RBAC, integration, reviews, release | API conventions, auth, integration and release sign-off |
| 2 – Frontend | App shell, routing, dashboard, responsive UI | Shared components, dashboard and navigation |
| 3 – Backend | Projects/tasks/users APIs, schemas, validation | CRUD endpoints, business rules, API documentation |
| 4 – Full-stack QA | Task UI, team UI, tests, CI/CD and deployment support | Task flows, test coverage, CI workflow, deployment checklist |

## Sprint schedule
### Week 1 – Foundation
Day 1: confirm requirements, data model, architecture and backlog. Day 2: repo, lint/build conventions, Atlas and environment setup. Days 3–4: authentication, RBAC, shell/navigation and base models. Day 5: project CRUD API/UI and first integration demo.

### Week 2 – Core functionality
Days 6–7: task CRUD, assignment, status/priority/deadline rules. Days 8–9: developer task updates, filtering and project details. Day 10: dashboard aggregations, team management and integrated demo.

### Week 3 – Quality and release
Days 11–12: unit/API integration tests and role/negative-path tests. Day 13: responsive/accessibility review, performance and security fixes. Day 14: staging deployment, smoke tests, backup/config review. Day 15: production release, README/API/SRS handover and demo rehearsal.

## Monitoring and coordination
Daily 15-minute stand-up: yesterday/today/blockers. Use a board with Backlog, Ready, In Progress, Review, QA and Done. Every task has an owner, acceptance criteria, estimate and target date. Escalate blockers within one working day; reassign or reduce scope with lead approval; track risks and burndown twice weekly.

## Code review
Use `main` protected and short-lived `feature/<ticket>-description` branches. Require PR, linked ticket, passing CI, one reviewer (lead for auth/data/security), no direct pushes to main, conventional commits, formatting and clear API contracts. Keep secrets out of git.

## Testing and deployment
Unit-test validation/business rules; API integration-test auth/RBAC/CRUD and error paths; frontend component tests; Playwright end-to-end smoke tests; responsive checks. CI runs install, syntax/lint, tests and build. Deploy API to Render and SPA to Vercel; verify Atlas connectivity, cookies/CORS, health endpoint, logs and rollback plan.

## Risk management
- Scope creep: prioritise assignment must-haves and defer enhancements.
- Integration mismatch: agree API contracts and use shared sample payloads early.
- Atlas/network or cookie issue: test staging origins and TLS early.
- Developer absence: pair on critical modules, document setup, keep tickets small and cross-review.
- Production regression: staged release, health checks, backups and documented rollback.
