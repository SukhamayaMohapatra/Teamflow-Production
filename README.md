# TeamFlow – Project & Task Management System

A full-stack React/Vite + Material UI application with an Express REST API, MongoDB Atlas, cookie-based JWT authentication, role-based permissions, and deployment configuration for Vercel and Render.

## Requirements
- Node.js 20.19+ or 22.12+ (use an active LTS release)
- npm
- MongoDB Atlas database
- GitHub account; Render and Vercel accounts for deployment

## 1. Install
From the repository root in GitHub Codespaces:
```bash
npm install
npm install --prefix server
npm install --prefix client
```

## 2. Configure environment
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```
Set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`, and `COOKIE_SECURE` in `server/.env`. Use a long random JWT secret (at least 32 bytes). Keep `VITE_API_URL=/api` in `client/.env` for local development. Vite proxies `/api` requests to the backend, which also avoids cross-origin cookie issues in GitHub Codespaces.

MongoDB Atlas: create a cluster, create a database user, allow your Codespace IP (or temporarily use the Atlas network access option appropriate for your environment), and copy the Node.js connection string. Replace the password placeholder and URL-encode special characters in credentials.

## 3. Seed the first admin
```bash
npm run seed
```
The seed script reads `SEED_ADMIN_NAME`, `SEED_ADMIN_EMAIL`, and `SEED_ADMIN_PASSWORD` from `server/.env`. Change the password immediately after first login. Do not use demo credentials in production.

## 4. Run locally
```bash
npm run dev
```
Open the Vite forwarded port 5173 in Codespaces. Vite proxies API calls to port 5000; you do not need to expose the API port publicly. For a direct API health check inside the Codespace terminal, run `curl http://localhost:5000/api/health`.

## 5. Production build
```bash
npm run build
npm start
```

## Roles and main features
- Admin: create/update/delete projects and tasks, invite/create developers, assign work, inspect dashboard metrics.
- Developer: view assigned projects/tasks, update assigned task status/progress, and add task updates.
- Task statuses: `To Do`, `In Progress`, `Under Review`, `Completed`.
- Priorities: `Low`, `Medium`, `High`.
- Project progress is derived from average task progress; projects without tasks show 0%.

## Deployment
### Render (API)
1. Push this repository to GitHub.
2. Create a Render **Web Service**, select the repository, root directory `server`.
3. Build command: `npm install`; start command: `npm start`.
4. Add environment variables from `server/.env.example`. Set `NODE_ENV=production`, `COOKIE_SECURE=true`, `CLIENT_ORIGIN=https://YOUR-VERCEL-DOMAIN.vercel.app`, and the Atlas URI.
5. Add a persistent log/monitoring solution appropriate to your deployment. Confirm `/api/health` returns healthy.

### Vercel (frontend)
1. Import the same repository into Vercel.
2. Set root directory to `client`, framework preset Vite, build command `npm run build`, output directory `dist`.
3. Add `VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com/api`.
4. Deploy. Add the Vercel domain to Render `CLIENT_ORIGIN` and redeploy the API.
5. Because auth uses secure HTTP-only cookies, frontend and API must be HTTPS and cookie/CORS origins must match exactly. For cross-site deployments, the server uses `SameSite=None; Secure`; test browser third-party-cookie restrictions. A same-site custom domain setup is preferable.

## GitHub Actions
The workflow in `.github/workflows/ci.yml` installs dependencies, checks backend syntax, builds the frontend, and deploys on pushes to `main`. Add GitHub repository secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `RENDER_DEPLOY_HOOK`. Link the Vercel project to the `client` root and configure Render to deploy the `server` root. For the Vercel project, set the production `VITE_API_URL` environment variable to your Render API URL. Ensure the Render service is configured with the exact Vercel origin in `CLIENT_ORIGIN`. The deploy job runs only after CI succeeds on `main`. Never commit secrets.

## API overview
All routes are prefixed `/api`.
- `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
- `GET|POST /users`, `PATCH|DELETE /users/:id` (Admin for management)
- `GET|POST /projects`, `GET|PATCH|DELETE /projects/:id`
- `GET|POST /tasks`, `GET|PATCH|DELETE /tasks/:id`, `POST /tasks/:id/updates`
- `GET /dashboard`
- `GET /health`

All protected endpoints use the HTTP-only JWT cookie. Validation errors return HTTP 400; unauthenticated requests return 401; insufficient role/ownership returns 403; missing records return 404. See `docs/API.md` for payload examples.

## Documentation
- `docs/PRD.md` – product requirements
- `docs/SRS.md` – software requirements specification
- `docs/TECHNICAL-EXECUTION-PLAN.md` – three-week plan for four developers
- `docs/DATA-MODEL.md` – MongoDB collections and relationships
- `docs/API.md` – endpoint reference

## Production hardening checklist
- [ ] Configure production secrets in Render/Vercel, not source control.
- [ ] Set strict Atlas network access and least-privilege DB user.
- [ ] Set exact CORS origin and verify cookie behaviour in target browsers.
- [ ] Enable TLS, backups, alerts, and database monitoring.
- [ ] Add automated integration/E2E tests and load tests before launch.
- [ ] Configure email-based account invitation/password reset if required.
- [ ] Review retention, audit logging, privacy and legal requirements.
- [ ] Replace seed credentials; disable or remove seed endpoint/script after bootstrap.

This is a deployable assignment implementation foundation, not a substitute for security review, integration testing, monitoring, or operational sign-off before handling real organisational data.
