# REST API reference
Base URL: `http://localhost:5000/api` (local). JSON request/response. Protected endpoints require the `accessToken` HTTP-only cookie returned by login.

## Authentication
- `POST /auth/login` – `{ "email":"admin@example.com", "password":"..." }`; returns user and sets cookie.
- `POST /auth/logout` – clears cookie.
- `GET /auth/me` – current user.

## Users (authenticated; writes Admin only)
- `GET /users` – active users.
- `POST /users` – `{name,email,password,role}`.
- `PATCH /users/:id` – `{name?,role?,isActive?}`.
- `DELETE /users/:id` – deactivates account (does not erase history).

## Projects
- `GET /projects` – Admin sees all; Developer sees projects where they are a member.
- `POST /projects` (Admin) – `{name,description?,status?,priority?,startDate,deadline,members?}`.
- `GET /projects/:id` – project and tasks; membership required for Developer.
- `PATCH /projects/:id` (Admin) – same mutable fields.
- `DELETE /projects/:id` (Admin) – deletes project and associated tasks.

## Tasks
- `GET /tasks?project=&status=&priority=&assignee=` – Developer automatically scoped to their assignments.
- `POST /tasks` (Admin) – `{title,description?,project,assignee,status?,priority?,deadline,progress?}`. Assignee must be a project member and active Developer.
- `GET /tasks/:id` – Admin or assigned Developer.
- `PATCH /tasks/:id` – Admin can edit all task fields; Developer only status/progress.
- `DELETE /tasks/:id` (Admin).
- `POST /tasks/:id/updates` – `{message,status?,progress?}`; Admin or assigned Developer.

## Dashboard
- `GET /dashboard` – metrics, task status counts and project progress for the caller's scope.
- `GET /health` – unauthenticated health check.

## Response and errors
Success: `{ "success":true,"data":... }`. Error: `{ "success":false,"message":"..." }`. Common codes: 400 validation/business rule, 401 authentication, 403 role/ownership, 404 missing route/record, 409 duplicate unique value, 500 unexpected server error.
