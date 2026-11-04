# Software Requirements Specification (SRS)

## 1. System scope and objectives
TeamFlow is a browser-based system for project planning, task assignment, deadline tracking and progress monitoring. It comprises a Vite React SPA, Express REST API and MongoDB Atlas database.

## 2. Roles and permissions
| Capability | Admin | Developer |
|---|---:|---:|
| Sign in/out | Yes | Yes |
| View dashboard | All workspace data | Assigned scope |
| View projects | All | Member projects |
| Create/edit/delete projects | Yes | No |
| Create tasks | Yes | No |
| Edit/delete tasks | Yes | No |
| Assign/reassign tasks | Yes | No |
| Update own assigned task status/progress | Yes | Yes |
| Add task update | Yes | Yes, assigned tasks |
| Manage user accounts | Yes | No |

## 3. Functional requirements
FR-01 Authentication shall verify email/password and issue an HTTP-only JWT cookie. FR-02 API endpoints shall enforce role and ownership rules. FR-03 Admin shall manage projects. FR-04 Admin shall create, assign, edit and delete tasks. FR-05 Developers shall view assigned work and update status/progress/activity. FR-06 Users shall filter tasks by project, status and priority. FR-07 Dashboard shall calculate project/task metrics from persisted records. FR-08 Admin shall create and deactivate accounts.

## 4. Business rules
- Task statuses: TO_DO, IN_PROGRESS, UNDER_REVIEW, COMPLETED.
- Priorities: LOW, MEDIUM, HIGH.
- Progress integer 0–100; COMPLETED forces 100.
- Deadline before current time and non-completed status is overdue.
- Project progress is average task progress, rounded to an integer; zero tasks = 0.
- Assignee must be an active DEVELOPER included in the project members list.

## 5. Data requirements
User: name, unique email, password hash, role, active flag, timestamps. Project: name, description, status, priority, start/deadline, member references, creator, timestamps. Task: title, description, project reference, assignee reference, status, priority, deadline, progress, activity updates, creator, timestamps. Required fields and enums are enforced in Mongoose and request validation.

## 6. Non-functional requirements
Security: bcrypt hash, JWT verification, HTTP-only cookie, TLS in production, role checks, login rate limit, Helmet, allowlisted CORS. Validation: Zod at API boundary and Mongoose schema constraints. Maintainability: ES modules, controllers/models/routes separation, reusable UI. Responsivity: responsive MUI layouts and mobile navigation. Reliability: central error middleware, health endpoint, database indexes and graceful process shutdown.

## 7. Assumptions and design decisions
MongoDB Atlas is selected. Cookie authentication is used to avoid storing JWT in browser localStorage. Cross-origin production deployments require HTTPS, exact CORS origins and browser cookie compatibility; same-site custom domains are recommended. Project deletion cascades to tasks. Account deactivation preserves historical task records. No email workflow is included in this baseline.

## 8. Acceptance criteria
All acceptance criteria in `PRD.md` must pass. Additionally, verify API access control with both roles, test invalid inputs and missing records, verify mobile layout, and smoke-test production domains and cookies before release.
