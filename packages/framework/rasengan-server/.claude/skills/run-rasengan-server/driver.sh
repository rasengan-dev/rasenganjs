#!/usr/bin/env bash
# Driver for the rasengan-server-demo playground app.
#
# Rebuilds the packages this demo exercises (server, ws, queue,
# validators, runtime, futon) if their dist/ is missing or --build is
# passed, launches the demo (`pnpm dev`, port 3006) in the background,
# waits for readiness, then drives all four capabilities:
#   HTTP & DI, Validation (Zod rejection), WebSocket (raw + Gateway),
#   Queue (route-triggered + repeating job).
#
# Usage:
#   ./driver.sh              # skip build if dist/ already present
#   ./driver.sh --build      # force-rebuild all six packages first
#
# Exit code is 0 iff every check passed.

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../.." && pwd)"
DEMO_DIR="$REPO_ROOT/apps/playground/rasengan-server-demo"
LOG_FILE="/tmp/rasengan-server-demo.log"
PORT=3006
BASE_URL="http://127.0.0.1:${PORT}"

PKGS=(
  "@rasenganjs/runtime:packages/platform/runtime"
  "@rasenganjs/futon:packages/framework/futon"
  "@rasenganjs/server:packages/framework/rasengan-server"
  "@rasenganjs/ws:packages/ecosystem/ws"
  "@rasenganjs/queue:packages/ecosystem/queue"
  "@rasenganjs/validators:packages/ecosystem/validators"
)

PASS=0
FAIL=0
FAILED_CHECKS=()

pass() { PASS=$((PASS + 1)); echo "  PASS - $1"; }
fail() { FAIL=$((FAIL + 1)); FAILED_CHECKS+=("$1"); echo "  FAIL - $1"; }

cleanup() {
  echo
  echo "== Cleaning up =="
  lsof -ti:"${PORT}" -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null
  sleep 0.3
  # `pnpm dev` -> `sh -c "rasengan-server dev"` -> spawns `tsx watch` as a
  # DETACHED child (its own session, per Node's spawn({detached:true})) —
  # killing only the port's listener leaves that tree as an orphan. A
  # path-scoped pkill catches it without risking the agent's own shell
  # (the pattern only matches processes whose cmdline contains this
  # demo's absolute path).
  pkill -f "$DEMO_DIR" 2>/dev/null
  echo "Server stopped. Log kept at $LOG_FILE"
}
trap cleanup EXIT

echo "== Build (if needed) =="
NEED_BUILD=0
if [[ "${1:-}" == "--build" ]]; then
  NEED_BUILD=1
else
  for entry in "${PKGS[@]}"; do
    dir="${entry#*:}"
    if [[ ! -d "$REPO_ROOT/$dir/dist" ]]; then
      NEED_BUILD=1
      break
    fi
  done
fi

if [[ "$NEED_BUILD" == "1" ]]; then
  filters=()
  for entry in "${PKGS[@]}"; do
    name="${entry%%:*}"
    filters+=(--filter "$name")
  done
  (cd "$REPO_ROOT" && pnpm "${filters[@]}" run build)
else
  echo "  dist/ present for all 6 packages, skipping build (pass --build to force)"
fi

echo
echo "== Install demo deps (if needed) =="
if [[ ! -d "$DEMO_DIR/node_modules/@rasenganjs/queue" ]]; then
  (cd "$REPO_ROOT" && pnpm install --filter "rasengan-server-demo...")
else
  echo "  node_modules already linked"
fi

echo
echo "== Launch demo server (background, port ${PORT}) =="
rm -f "$LOG_FILE"
lsof -ti:"${PORT}" -sTCP:LISTEN 2>/dev/null | xargs -r kill 2>/dev/null
(cd "$DEMO_DIR" && setsid pnpm dev > "$LOG_FILE" 2>&1 < /dev/null &)

READY=0
for i in $(seq 1 30); do
  if curl -sf "${BASE_URL}/ping" > /dev/null 2>&1; then
    READY=1
    echo "  ready after ${i}s"
    break
  fi
  sleep 1
done
if [[ "$READY" != "1" ]]; then
  echo "  server did not become ready within 30s — see $LOG_FILE"
  tail -n 40 "$LOG_FILE"
  exit 1
fi

echo
echo "== Capability: HTTP & DI =="
resp=$(curl -s "${BASE_URL}/ping")
[[ "$resp" == '{"ok":true}' ]] && pass "GET /ping -> $resp" || fail "GET /ping -> $resp"

resp=$(curl -s "${BASE_URL}/users")
[[ "$resp" == \[*\] ]] && pass "GET /users -> $resp" || fail "GET /users -> $resp"

resp=$(curl -s -X POST "${BASE_URL}/users" -H 'content-type: application/json' -d '{"name":"driver-user"}')
echo "$resp" | grep -q '"name":"driver-user"' && pass "POST /users -> $resp" || fail "POST /users -> $resp"

resp=$(curl -s "${BASE_URL}/users/1")
echo "$resp" | grep -q '"id":1' && pass "GET /users/1 -> $resp" || fail "GET /users/1 -> $resp"

echo
echo "== Capability: Validation (Zod) =="
resp=$(curl -s -w '\n%{http_code}' "${BASE_URL}/users/abc")
status="${resp##*$'\n'}"
body="${resp%$'\n'*}"
[[ "$status" == "400" ]] && pass "GET /users/abc -> HTTP $status, $body" || fail "GET /users/abc -> HTTP $status, $body"

echo
echo "== Capability: Upload (futon fileUpload) =="
tmpfile="$(mktemp /tmp/rasengan-driver-upload.XXXXXX.txt)"
echo "driver upload smoke test $(date -Iseconds)" > "$tmpfile"
resp=$(curl -s -F "avatar=@${tmpfile}" "${BASE_URL}/upload/avatar")
echo "$resp" | grep -q '"ok":true' && pass "POST /upload/avatar -> $resp" || fail "POST /upload/avatar -> $resp"
rm -f "$tmpfile"

echo
echo "== Capability: WebSocket / Gateway =="
ws_out=$(cd "$DEMO_DIR" && node scripts/ws-client.mjs 2>&1)
ws_status=$?
if [[ "$ws_status" == "0" ]] && echo "$ws_out" | grep -q "echo: hello"; then
  pass "scripts/ws-client.mjs (/chat echo round trip)"
else
  fail "scripts/ws-client.mjs (/chat echo round trip)"
  echo "$ws_out"
fi

rooms_out=$(cd "$DEMO_DIR" && node scripts/ws-rooms-client.mjs 2>&1)
rooms_status=$?
if [[ "$rooms_status" == "0" ]] && echo "$rooms_out" | grep -q "ALL PASS"; then
  pass "scripts/ws-rooms-client.mjs (/rooms Gateway, rooms + broadcast)"
else
  fail "scripts/ws-rooms-client.mjs (/rooms Gateway, rooms + broadcast)"
  echo "$rooms_out"
fi

echo
echo "== Capability: Queue (in-memory adapter) =="
resp=$(curl -s -X POST "${BASE_URL}/jobs/hello" -H 'content-type: application/json' -d '{"name":"driver-job"}')
job_id=$(echo "$resp" | grep -oE '"jobId":"[^"]+"' | cut -d'"' -f4)
if [[ -n "$job_id" ]]; then
  pass "POST /jobs/hello -> queued $resp"
else
  fail "POST /jobs/hello -> $resp"
fi

sleep 2
if grep -q "greeted driver-job (job ${job_id})" "$LOG_FILE" 2>/dev/null; then
  pass "queue log shows job ${job_id} processed (route-triggered)"
else
  fail "queue log missing 'greeted driver-job (job ${job_id})'"
fi

# The repeating "tick" job (registered in HelloQueue.onInit(), see
# src/hello.queue.ts) fires once immediately at boot, then again every
# time the plugin's sweeper promotes it (default sweepInterval: 5s) — so
# give it a few seconds beyond the sweep interval before checking.
tick_deadline=$((SECONDS + 6))
tick_count=0
while [[ $SECONDS -lt $tick_deadline ]]; do
  tick_count=$(grep -c 'hello-queue] tick' "$LOG_FILE" 2>/dev/null)
  tick_count=${tick_count:-0}
  [[ "$tick_count" -ge 1 ]] && break
  sleep 1
done
if [[ "$tick_count" -ge 1 ]]; then
  pass "queue log shows repeating 'tick' job firing (${tick_count}x so far)"
else
  fail "queue log missing repeating 'tick' job"
fi

echo
echo "=================================="
echo "  RESULT: ${PASS} passed, ${FAIL} failed"
echo "=================================="
if [[ "$FAIL" -gt 0 ]]; then
  echo "Failed checks:"
  for c in "${FAILED_CHECKS[@]}"; do echo "  - $c"; done
  exit 1
fi
exit 0
