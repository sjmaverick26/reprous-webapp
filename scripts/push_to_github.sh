#!/usr/bin/env bash
set -e

REPO_NAME="reprous-webapp"
GITHUB_USER="sjMaverick26"

if [ -z "$GITHUB_USER_PAT" ]; then
  echo "Error: GITHUB_USER_PAT environment variable is not set."
  echo "Please run: export GITHUB_USER_PAT=\"your_personal_access_token\""
  echo "Then rerun this script."
  exit 1
fi

echo "Checking if repository ${GITHUB_USER}/${REPO_NAME} exists on GitHub..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token ${GITHUB_USER_PAT}" "https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}")

if [ "$HTTP_STATUS" -eq 404 ]; then
  echo "Creating repository ${GITHUB_USER}/${REPO_NAME} on GitHub..."
  CREATE_RES=$(curl -s -X POST \
    -H "Authorization: token ${GITHUB_USER_PAT}" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/user/repos \
    -d "{\"name\":\"${REPO_NAME}\",\"description\":\"ReproUs — Free, honest reproductive health education learning hub for youth\",\"private\":false}")
  echo "Repository created successfully."
else
  echo "Repository ${GITHUB_USER}/${REPO_NAME} already exists (HTTP ${HTTP_STATUS})."
fi

echo "Configuring remote origin and pushing main branch..."
git remote set-url origin "https://${GITHUB_USER_PAT}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
git push -u origin main
# Reset remote origin URL to clean HTTPS format so token is not persisted in git config
git remote set-url origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo "Push to https://github.com/${GITHUB_USER}/${REPO_NAME} completed successfully!"
