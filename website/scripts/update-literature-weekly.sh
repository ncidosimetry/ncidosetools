#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="/Users/choonsiklee/Sites/ncidosetools"
NPM="/opt/homebrew/bin/npm"
LOG_DIR="$PROJECT_DIR/logs"
LOG_FILE="$LOG_DIR/literature-update.log"

mkdir -p "$LOG_DIR"

{
  printf '\n[%s] Starting NCI Dose Tools literature update\n' "$(date '+%Y-%m-%d %H:%M:%S')"
  cd "$PROJECT_DIR"
  "$NPM" run literature:update
  "$NPM" run build
  printf '[%s] Finished NCI Dose Tools literature update\n' "$(date '+%Y-%m-%d %H:%M:%S')"
} >>"$LOG_FILE" 2>&1
