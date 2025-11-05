# Storefront Backend API

## Setup
1) Copy `.env.example` to `.env` and fill values.
2) Create Postgres DBs:
   - store_dev
   - store_test
3) Install deps: `npm install`
4) Run migrations: `npm run migrate:up`
5) Start dev server: `npm run dev` (or build+start)

Backend port: **3000** (change via `.env`)
DB port: your local Postgres port (default 5432).

## Scripts
- `npm run dev` run TS directly
- `npm run build` compile TS
- `npm start` run compiled
- `npm test` build then run Jasmine
- `npm run migrate:up` apply migrations
- `npm run migrate:down` revert
- `npm run migrate:test` migrate test DB

## Endpoints
See **REQUIREMENTS.md** for all routes.

## Notes
- JWT required for protected routes (send as `Authorization: Bearer <token>`).
- Passwords hashed with bcrypt + pepper.
