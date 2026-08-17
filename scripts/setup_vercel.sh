#!/usr/bin/env bash
set -e

echo "=== Vercel Git Repository Binding Setup ==="

# Check if Vercel CLI is available
if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel
fi

# If VERCEL_TOKEN is set, link non-interactively
if [ -n "$VERCEL_TOKEN" ]; then
  echo "Linking project using VERCEL_TOKEN..."
  vercel link --token "$VERCEL_TOKEN" --yes
  echo "Connecting Git repository to Vercel project..."
  vercel git connect --token "$VERCEL_TOKEN" --yes 2>/dev/null || vercel git connect --token "$VERCEL_TOKEN"
else
  echo "Please authenticate with Vercel:"
  vercel login
  echo "Linking project..."
  vercel link --yes
  echo "Connecting Git repository to Vercel project..."
  vercel git connect
fi

echo "=== Vercel Git binding setup complete! ==="
