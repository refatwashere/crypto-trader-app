- Added cross-platform DB setup helpers: `scripts/dev-setup.sh` and `scripts/dev-setup.cmd` to create/apply DB schema and seed locally.

- Added a GitHub Actions workflow `.github/workflows/auto-create-pr.yml` that automatically opens a draft PR to `main` when a `feature/**` branch is pushed. This uses the repository `GITHUB_TOKEN` and the `peter-evans/create-pull-request` action.

- Added `.github/workflows/db-migrate.yml` which applies `database/schema.sql` and `database/seed.sql` to the environment pointed to by the `DATABASE_URL` GitHub Secret on push to `main` or by manual dispatch. This uses the system `psql` client.

- Fixed Fly smoke-check failure by binding the Express server to `0.0.0.0` and adding startup and error logging in `backend/app.js` so the platform can detect the listening address and surface errors.
- Rewrote `README.md` into a modern, detailed, professional guide covering architecture, local dev, testing, deployment to Fly, security, and troubleshooting.

- Added `backend/.env.example` to document required environment variables.
- Added cross-platform dev setup helpers: `scripts/dev-setup.sh` and `scripts/dev-setup.cmd` to create/apply DB schema and seed locally.
- Updated `fly.toml` build section to point to `backend/Dockerfile` so Fly's remote builder builds from the correct Dockerfile path instead of trying to pull an image named `Dockerfile`.

- Rewrote `README.md` into a modern, detailed, professional guide covering architecture, local dev, testing, deployment to Fly, security, and troubleshooting.
# Project Task Log — crypto-trader-app

Date: 2025-08-17

## Past actions (completed)
- Created project scaffold (backend, frontend, database) and initial files.
- Added `backend/app.js`, `backend/.env`, `frontend/App.js`, `frontend/package.json`, `database/schema.sql`, `database/seed.sql`, `README.md`, `.gitignore`.
- Added `backend/routes/priceRoutes.js` stub to serve sample prices.
- Added `backend/package.json` and installed backend dependencies via npx/npm.
- Implemented safe `binanceService` with `BINANCE_MODE=mock|live` to prevent accidental real trades.
- Aligned `database/schema.sql` with `seed.sql` (users.username, transactions table, timestamps).
- Added `frontend/screens/Trade.js` stub and updated `frontend/package.json` for React Native + axios.
- Added basic DB config (`backend/config/db.js`) and `models/user.js`.
- Added a Jest + supertest smoke test `backend/tests/prices.test.js` and exported express app from `backend/app.js`.
- Ran backend installs and started server in dev (nodemon). Performed smoke requests to `/api/prices` and `/api/trade` in mock mode.

## Ongoing tasks (in progress)
- Install frontend dependencies (started) — goal: populate `frontend/node_modules` and prepare for a smoke run. (installation attempted via npx)
 - Install frontend dependencies (attempted 2025-08-17T00:00:00Z) — installation started via npx; output not fully captured here. If you want, I can retry the install and stream the output.
- Resolve any remaining `npm audit` vulnerabilities in backend.

### Completed frontend scaffolding (2025-08-17)
- Added `frontend/screens/Login.js` — API key entry and secure save (in-memory placeholder).
- Replaced in-memory auth with secure storage wrapper `frontend/services/auth.js` that prefers `react-native-keychain` then AsyncStorage, with in-memory fallback.
- Added `frontend/screens/Portfolio.js` — holdings list and portfolio view.
- Added `frontend/services/api.js` — axios client wrapper.
- Added `frontend/services/auth.js` — minimal key storage (in-memory; replace with secure store).
- Wired screens in `frontend/App.js` (Login, Dashboard, Trade, Portfolio).

## Future recommendations (next steps)
1. Run backend tests in CI and ensure passing (Jest/supertest). Add GitHub Actions workflow.
2. Add DB migrations (eg. using `node-pg-migrate` or `knex`) and a proper seeding script.
3. Add integration tests for the trading flow with mock Binance responses.
4. Add a safe dev-mode and environment templates (`.env.example`).
5. Decide frontend platform (React Web vs React Native) and align package.json + run scripts.
6. Add README sections for local dev, testing, and deployment.
7. Add a pre-commit hook (linting, tests) and basic lint configuration.

## Notes / Risks
- Binance API keys must never be committed. `.env` is ignored in `.gitignore`.
- Frontend `package.json` currently targets React Native; installing may require native toolchains on Windows (Android SDK) to fully run the app.
- The project currently uses PostgreSQL `SERIAL` in SQL — ensure the developer has Postgres locally or adapt to SQLite for quick testing.

## How to continue
- To run frontend after dependencies install (example):

  - For React Native (if that's the target):

    cd frontend
    npx react-native start
    npx react-native run-android

  - For web React, replace `App.js` and use CRA or Vite and then:

    cd frontend
    npm install
    npm start


## Log
- 2025-08-17: Created task log and triggered frontend dependency installation.

## Assistant rule
- The assistant must update `TASKS.md` after each and every single task it performs. This file acts as the canonical local task log.


## Recent CI / Deploy changes (2025-08-17)
- Added `backend/Dockerfile` to containerize the backend for production deploys.
- Added `fly.toml` template at repo root for Fly.io deployment (replace `REPLACE_WITH_YOUR_FLY_APP_NAME`).
- Added GitHub Actions workflow `.github/workflows/deploy-fly.yml` that runs backend tests and, on push to `main`, builds and deploys a Docker image to Fly.io using secrets `FLY_APP_NAME` and `FLY_TOKEN`.

- Updated backend test script in `backend/package.json` to include `--detectOpenHandles` and added `backend/jest.config.js` to set `node` test environment and a 10s timeout. This improves CI failure logs for debugging.

- Updated GitHub Actions deploy job to use `flyctl deploy --remote-only` (remote build) instead of building/pushing to Fly registry from CI. This avoids registry login 401 errors seen in CI.

- Fixed invalid `--region` flag in the workflow's `flyctl deploy` command; removed the flag to prevent `unknown flag` errors during CI.

- Updated `fly.toml` build section to point to `backend/Dockerfile` so Fly's remote builder builds from the correct Dockerfile path instead of trying to pull an image named `Dockerfile`.

