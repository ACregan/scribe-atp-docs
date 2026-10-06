#!/bin/bash
set -uo pipefail

fail=0

# scribe-atp.app still serves the landing page: check for real content.
MARKER="Scribe ATP"
url="https://scribe-atp.app"
echo "==> Checking $url"
body=$(curl -fsSL --max-time 15 "$url" 2>&1)
if [ $? -ne 0 ]; then
  echo "FAIL: $url did not respond with a successful status"
  fail=1
elif [[ "$body" != *"$MARKER"* ]]; then
  echo "FAIL: $url responded but did not contain the expected marker \"$MARKER\" (stale/wrong content?)"
  fail=1
else
  echo "OK: $url"
fi

# docs.scribe-atp.app is retired: every URL 301s to sdk.skyscribe.app or
# skyscribe.app (nginx map in vps-hosting, SDK repo ADR 0003). Spot-check one
# path of each kind.
REDIRECTS=(
  "https://docs.scribe-atp.app/ https://sdk.skyscribe.app/"
  "https://docs.scribe-atp.app/developers/quickstart/ https://sdk.skyscribe.app/quickstart"
  "https://docs.scribe-atp.app/developers/api-reference/react-router-framework/ https://sdk.skyscribe.app/api/react-router-framework"
  "https://docs.scribe-atp.app/authors/contributors/ https://skyscribe.app/users-guide/authoring/collaborators"
  "https://docs.scribe-atp.app/privacy/ https://skyscribe.app/privacy"
)

for pair in "${REDIRECTS[@]}"; do
  read -r from to <<<"$pair"
  echo "==> Checking $from"
  result=$(curl -s -o /dev/null --max-time 15 -w '%{http_code} %{redirect_url}' "$from")
  if [ "$result" != "301 $to" ]; then
    echo "FAIL: expected \"301 $to\", got \"$result\""
    fail=1
    continue
  fi
  echo "OK: $from -> $to"
done

exit $fail
