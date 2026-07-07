#!/bin/bash
set -uo pipefail

MARKER="Scribe ATP"
URLS=(
  "https://scribe-atp.app"
  "https://docs.scribe-atp.app"
)

fail=0

for url in "${URLS[@]}"; do
  echo "==> Checking $url"
  body=$(curl -fsSL --max-time 15 "$url" 2>&1)
  if [ $? -ne 0 ]; then
    echo "FAIL: $url did not respond with a successful status"
    fail=1
    continue
  fi
  if [[ "$body" != *"$MARKER"* ]]; then
    echo "FAIL: $url responded but did not contain the expected marker \"$MARKER\" (stale/wrong content?)"
    fail=1
    continue
  fi
  echo "OK: $url"
done

exit $fail
