#!/usr/bin/env bash
# Ship this repo to GitHub. Usage: ./push.sh [repo-url]
# Needs git, plus either an authenticated `gh` CLI or credentials for the remote.
set -euo pipefail
REPO_URL="${1:-https://github.com/Mehran-Ul-Islam/design-skills.git}"
NAME="$(basename "${REPO_URL%.git}")"
OWNER="$(basename "$(dirname "${REPO_URL}")")"

cd "$(dirname "$0")"
npm run --silent tokens
npm run --silent audit

[ -d .git ] || git init -b main
git add -A
git diff --cached --quiet || git commit -m "feat: design skills (tokens, spring-motion, sheet-modal, glass-surface, design-review)"

if git remote get-url origin >/dev/null 2>&1; then
  git push -u origin main
elif command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  gh repo create "${OWNER}/${NAME}" --public --source=. --remote=origin --push
else
  git remote add origin "${REPO_URL}"
  git push -u origin main
fi
echo "Shipped to ${REPO_URL}"
