@echo off
REM Dev setup helper for Windows (cmd.exe)
REM Usage: scripts\dev-setup.cmd

nsetlocal enabledelayedexpansion
if "%DATABASE_URL%"=="" (
  echo DATABASE_URL not set, using default postgres://postgres:postgres@localhost:5432/crypto_trader_dev
  set DATABASE_URL=postgres://postgres:postgres@localhost:5432/crypto_trader_dev
)

necho Using DB URL: %DATABASE_URL%

nREM Apply schema and seed using psql. Assumes psql is on PATH and current user can create DB.
psql "%DATABASE_URL%" -c "SELECT 1" 2>nul || (
  echo Database not found. Attempting to create...
  for /f "tokens=1 delims=/" %%a in ("%DATABASE_URL%") do set DBNAME=%%~nxa
  createdb %DBNAME%
)

npsql "%DATABASE_URL%" -f database/schema.sql
psql "%DATABASE_URL%" -f database/seed.sql

echo Database schema and seed applied.
endlocal
