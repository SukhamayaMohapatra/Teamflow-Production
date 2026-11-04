# Product Requirements Document – TeamFlow

## 1. Purpose
Deliver a responsive web-based Project & Task Management System for organisations to organise projects, assign work, monitor delivery and review performance.

## 2. Users
- **Admin / Team Lead:** manage projects and tasks, assign developers, manage team accounts and monitor performance.
- **Developer / Team Member:** view assigned projects/tasks, update status and progress, and add task updates.

## 3. Scope and features
### Authentication
Secure sign-in/out, password hashing, JWT session cookie, protected routes and role-based access.
### Projects
Create, read, update and delete projects; maintain description, status, priority, start/deadline dates and members; calculate progress from associated tasks.
### Tasks
Create tasks under a project, assign a project member, set priority/deadline, change status and progress, filter task lists, and append activity updates. Admin can edit/delete all tasks. Developers can update status/progress and add updates only to their assigned tasks.
### Dashboard
Show active projects, total tasks, completed/pending/overdue counts, status distribution and project progress.
### Team
Admin can create and deactivate user accounts and assign roles.

## 4. Business rules
- Statuses: To Do, In Progress, Under Review, Completed.
- Priorities: High, Medium, Low.
- Progress is an integer from 0 to 100. Completed status forces 100%.
- Overdue means deadline earlier than now and status is not Completed.
- Project progress is the average task progress; no tasks means 0%.
- A task assignee must be an active Developer who is a member of its project.
- Deleting a project deletes its tasks (explicit cascade behaviour).

## 5. Non-functional requirements
Responsive UI; secure password hashing; HTTP-only JWT cookie; server-side validation; RBAC; rate-limited login; Helmet; CORS allowlist; consistent errors; modular code; indexes on frequent query fields; environment-based secrets.

## 6. Assumptions and decisions
MongoDB Atlas/Mongoose are used instead of the assignment's PostgreSQL-or-MongoDB choice. React Router, Material UI, Axios and Recharts are implementation choices. Email invitations, password reset, file attachments and audit export are outside the first implementation scope unless later requested.

## 7. Acceptance criteria
- Admin and Developer can authenticate.
- Admin can create/edit/delete projects and tasks and manage team members.
- Developer sees only assigned tasks and member projects, and cannot change task ownership or delete records.
- Status/progress updates persist and completed tasks become 100%.
- Dashboard aggregates persisted data dynamically.
- API validates inputs and returns appropriate 400/401/403/404/409 errors.
- Layout is usable at mobile, tablet and desktop widths.
- Application can be configured locally and deployed to Vercel/Render with Atlas.
