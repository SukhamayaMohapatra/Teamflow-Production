# MongoDB data model

## Collections
### users
`name` (string, required), `email` (unique lowercase string), `password` (bcrypt hash, excluded from normal queries), `role` (ADMIN/DEVELOPER), `isActive` (boolean), timestamps.

### projects
`name`, `description`, `status` (PLANNING/ACTIVE/ON_HOLD/COMPLETED), `priority` (LOW/MEDIUM/HIGH), `startDate`, `deadline`, `members` (User ObjectId array), `createdBy` (User ObjectId), timestamps.

### tasks
`title`, `description`, `project` (Project ObjectId), `assignee` (User ObjectId), `status`, `priority`, `deadline`, `progress` (0–100), `updates` embedded array (`author`, `message`, timestamps), `createdBy`, timestamps.

## Relationships
- Project has many Tasks (`tasks.project`).
- Project has many Users as members (`projects.members`).
- Task belongs to one Project and one assignee.
- Task updates reference the author.

## Indexes
Unique user email; project status/deadline; task project/status/assignee; task deadline/status/priority. Review index usage against real query plans as data grows.

## Sample documents
```json
{"name":"Platform Refresh","description":"Refresh customer portal","status":"ACTIVE","priority":"HIGH","startDate":"2026-11-01T00:00:00.000Z","deadline":"2026-12-15T00:00:00.000Z","members":["<userObjectId>"],"createdBy":"<adminObjectId>"}
```
```json
{"title":"Build login page","description":"Implement accessible sign-in","project":"<projectObjectId>","assignee":"<developerObjectId>","status":"IN_PROGRESS","priority":"HIGH","deadline":"2026-11-12T00:00:00.000Z","progress":40,"createdBy":"<adminObjectId>"}
```
