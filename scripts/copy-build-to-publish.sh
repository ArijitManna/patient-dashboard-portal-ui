#!/bin/bash
# Copy build output into publish folder
set -e
ROOT_DIR="$(cd "$(dirname "$0")" && cd .. && pwd)"
cd "$ROOT_DIR"
if [ ! -d build ]; then
  echo "No build/ folder found. Run 'npm run build' first."
  exit 1
fi
rm -rf publish/*
cp -R build/* publish/
echo "Copied build/ -> publish/"
