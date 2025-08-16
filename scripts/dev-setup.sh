#!/usr/bin/env bash
# Dev setup helper (Linux/macOS)
# - creates a local Postgres DB (requires psql user to exist)
# - applies schema and seed
# Usage: ./scripts/dev-setup.sh

set -euo pipefail
DB_URL=${DATABASE_URL:-postgres://postgres:postgres@localhost:5432/crypto_trader_dev}

echo "Using DB URL: $DB_URL"
# Parse out connection params for psql
# This script assumes psql is available and the current user can create DBs
psql "$DB_URL" -c 'SELECT 1' >/dev/null 2>&1 || (
  echo "Database not found. Attempting to create..."
  createdb ${DB_URL##*/}
)

psql "$DB_URL" -f database/schema.sql
psql "$DB_URL" -f database/seed.sql

echo "Database schema and seed applied."
