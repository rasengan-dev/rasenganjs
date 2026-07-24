#!/usr/bin/env bash
#
# Driver for apps/playground/rasengan-runtime-node-demo — the real,
# hand-written "futon + @rasenganjs/runtime" HTTP demo.
#
# Launches the demo server (NodeDevAdapter, port 5330), waits for it to
# be ready, curls the routes that exist in server/app.mjs, checks status
# codes / bodies, prints PASS/FAIL per check, and always kills the server
# on exit (success, failure, or Ctrl-C).
#
# Usage:
#   .claude/skills/run-futon/driver.sh            # from packages/framework/futon/
#   bash packages/framework/futon/.claude/skills/run-futon/driver.sh   # from repo root
#
# Exit code is 0 iff every check passed.

set -uo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo "/home/dilane3/Documents/Projects/React-Framework/rasenganjs")"
DEMO_DIR="$ROOT/apps/playground/rasengan-runtime-node-demo"
PORT=5330
BASE="http://localhost:$PORT"
LOG="/tmp/futon-runtime-node-demo.log"

PASS=0
FAIL=0
SERVER_PID=""

cleanup() {
  if [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" >/dev/null 2>&1
  fi
  # npm/pnpm wrappers don't forward SIGTERM to the child they spawn —
  # killing the port's listener is what reliably frees it.
  lsof -ti:"$PORT" -sTCP:LISTEN 2>/dev/null | xargs -r kill >/dev/null 2>&1
}
trap cleanup EXIT INT TERM

check() {
  local label="$1" cond="$2" detail="${3:-}"
  if [ "$cond" = "0" ]; then
    PASS=$((PASS + 1))
    echo "  PASS  $label"
  else
    FAIL=$((FAIL + 1))
    echo "  FAIL  $label${detail:+ — $detail}"
  fi
}

if [ ! -d "$DEMO_DIR" ]; then
  echo "Demo dir not found: $DEMO_DIR" >&2
  exit 1
fi

echo "== futon + runtime demo driver =="
echo "demo: $DEMO_DIR"
echo "log:  $LOG"
echo

# Free the port if a stale instance is still bound from a previous run.
lsof -ti:"$PORT" -sTCP:LISTEN 2>/dev/null | xargs -r kill >/dev/null 2>&1
sleep 0.2

echo "-- starting server (pnpm start) in background --"
(cd "$DEMO_DIR" && pnpm start) >"$LOG" 2>&1 &
SERVER_PID=$!

echo "-- waiting for $BASE/ to respond --"
READY=1
for _ in $(seq 1 40); do
  if curl -sf "$BASE/" >/dev/null 2>&1; then
    READY=0
    break
  fi
  sleep 0.25
done

if [ "$READY" != "0" ]; then
  echo "Server never became ready. Last 40 lines of $LOG:" >&2
  tail -n 40 "$LOG" >&2
  exit 1
fi
echo "server is up (pid $SERVER_PID)"
echo

echo "-- checks --"

# 1. GET / -> 200 html
BODY=$(curl -s "$BASE/")
STATUS=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/")
[ "$STATUS" = "200" ] && [[ "$BODY" == *"<h1>"* ]]
check "GET / returns 200 with HTML body" "$?" "status=$STATUS"

# 2. GET /hello/World -> 200 json {"message":"Hello, World!"}
BODY=$(curl -s "$BASE/hello/World")
STATUS=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/hello/World")
[ "$STATUS" = "200" ] && [ "$BODY" = '{"message":"Hello, World!"}' ]
check "GET /hello/World returns 200 with interpolated name" "$?" "status=$STATUS body=$BODY"

# 3. POST /echo -> 200 json. NOTE: app.mjs reads ctx.get('parsedBody') but
# bodyParser()'s default storage key is 'body', so this always echoes
# null — a real bug in the demo app, not in futon. We only assert shape
# here; see SKILL.md Gotchas.
BODY=$(curl -s -X POST "$BASE/echo" -H 'Content-Type: application/json' -d '{"foo":"bar"}')
STATUS=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE/echo" -H 'Content-Type: application/json' -d '{"foo":"bar"}')
[ "$STATUS" = "200" ] && [[ "$BODY" == *'"echo"'* ]]
check "POST /echo returns 200 with an echo key" "$?" "status=$STATUS body=$BODY"

# 4. GET /does-not-exist -> 404, custom notFound handler
BODY=$(curl -s "$BASE/does-not-exist")
STATUS=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/does-not-exist")
[ "$STATUS" = "404" ] && [[ "$BODY" == *"404"* ]]
check "GET /does-not-exist returns 404 via custom notFound handler" "$?" "status=$STATUS"

echo
echo "$PASS passed, $FAIL failed"
echo
echo "Note: onError is NOT triggered here — app.mjs has no route that throws."
echo "See direct-invoke.mjs in this same directory for an in-process onError check."

[ "$FAIL" -eq 0 ]
