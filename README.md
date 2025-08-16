
# Crypto Trader App

A modern, safety-first monorepo for a crypto trading prototype. This repo provides a production-minded starting point combining a Node.js + Express backend, a React (React Native compatible) frontend, and SQL-based persistence. It ships with mock-safe trading utilities, secure key storage patterns, and a CI/CD path to Fly.io.

Table of contents
- About
- Architecture
- Quickstart (dev)
- Testing
- Environment & configuration
- Database
- Security considerations
- Deployment (GitHub Actions + Fly.io)
- Troubleshooting
- Contributing
- License

About
-----
This project demonstrates a practical layout and workflow for building a trading-capable application while minimizing accidental real trades during development. The backend supports a `BINANCE_MODE` toggle (mock vs live), the frontend uses a secure storage abstraction for API keys, and CI builds and deploys via Fly.io.

Architecture
------------
- backend/: Express API that exposes endpoints for prices, trades, and portfolio operations. Exports the Express `app` for testability.
- frontend/: React / React Native UI (screens: Login, Dashboard, Trade, Portfolio). Contains `services/api.js` (axios wrapper) and `services/auth.js` (secure storage abstraction).
- database/: SQL schema and seed files for PostgreSQL.
- .github/workflows/: CI pipeline which runs tests and deploys to Fly.io.

Quickstart (local development)
-----------------------------
Prerequisites
- Node.js 20+
- npm (matching Node); Docker for container builds (optional)
- PostgreSQL (for database-backed workflows) or use the provided SQL to create a local DB

Backend
1. Copy `.env.example` to `.env` and set values (see Environment section).
2. Start DB (Postgres) and apply `database/schema.sql` and `database/seed.sql` if you want sample data.
3. Install and run the backend:

```cmd
cd backend
npm ci
npm run dev
```

Frontend (React Native simple flow)
1. Install frontend deps and start Metro (or adapt to web):

```cmd
cd frontend
npm ci
npx react-native start
```

2. Run on a device/emulator. The frontend `services/api.js` defaults to `http://10.0.2.2:3000` for Android emulator; change base URL to match your backend host.

Testing
-------
Backend tests use Jest + Supertest. The Express app is exported so tests run without starting the HTTP listener.

Run locally:

```cmd
cd backend
npm ci
npm test -- --detectOpenHandles --runInBand --verbose
```

CI runs the same commands; see `.github/workflows/deploy-fly.yml`.

Environment & configuration
---------------------------
Use environment variables for all credentials and runtime configuration. Example keys expected by the backend:

- PORT (default 3000)
- DATABASE_URL (Postgres connection string)
- BINANCE_API_KEY
- BINANCE_API_SECRET
- BINANCE_MODE (mock | live)

Create `.env` in `backend/` with the variables above (do not commit).

Database
--------
The `database/schema.sql` file contains the schema for Postgres. `database/seed.sql` provides minimal sample data. For production, use a managed Postgres (Supabase, RDS, ElephantSQL) or run migrations with a tool such as `node-pg-migrate`.

Security considerations (must-read for trading apps)
-----------------------------------------------
- Never commit API keys or .env files to Git. Use GitHub Secrets (`FLY_TOKEN`, `FLY_APP_NAME`) for CI and Fly secrets for runtime.
- Use the `BINANCE_MODE=mock` toggle during development and testing to avoid real trades.
- Restrict API keys using Binance permissions (only enable trading if necessary) and prefer IP allowlists if supported.
- Store secrets in secure stores on clients (React Native Keychain or AsyncStorage fallback) and on servers use environment variables or secret stores.
- TLS is required in production. Fly.io provides TLS for deployed apps.
- Implement rate-limiting, authentication, and monitoring for endpoints that perform trades.

Deployment (GitHub Actions + Fly.io)
-----------------------------------
This repo includes a GitHub Actions workflow `.github/workflows/deploy-fly.yml` that:
- Runs backend tests on push/PR to `main`.
- After tests pass, triggers a `flyctl deploy --remote-only` using the `FLY_TOKEN` and `FLY_APP_NAME` GitHub Secrets.

Setup steps
1. Create a Fly app and obtain an API token:

```cmd
curl -L https://fly.io/install.sh | sh
flyctl auth login
flyctl apps create your-app-name --region iad
flyctl auth token
```

2. In GitHub repo settings → Secrets, add `FLY_APP_NAME` and `FLY_TOKEN`.
3. Commit and push to `main`. CI will run tests and, if successful, deploy via Fly's remote builder.

Troubleshooting
---------------
- CI: If a deploy step fails with registry authentication, ensure `FLY_TOKEN` is valid. The workflow uses `flyctl deploy --remote-only` to avoid registry login.
- Local Docker build: to replicate the production image build:

```cmd
docker build -t crypto-trader-backend:local -f backend/Dockerfile .
docker run -e PORT=3000 -p 3000:3000 crypto-trader-backend:local
```

- Tests: If Jest reports open handles, use the `--detectOpenHandles` flag. Ensure no running server is binding to the test port (tests import the app directly).

Contributing
------------
- Create feature branches from `main`.
- Open PRs with a clear description and link to any running demo or screenshots.
- CI will run tests automatically. Fix failing tests locally before pushing.

Contact & support
-----------------
If you need help configuring Fly, CI, or the DB, open an issue or share CI logs and I’ll help diagnose the failure.

License
-------
This project is released under the MIT License — see the `LICENSE` file.

----
Generated with care — run in mock mode while iterating and move to live mode only after review.
