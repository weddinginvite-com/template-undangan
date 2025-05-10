#!/bin/bash

# Periksa environment dan konfigurasi
echo "Setting up environment..."
if [ ! -f .env ]; then
  echo "Creating .env file..."
  echo "DATABASE_URL=$DATABASE_URL" > .env
fi

# Pindahkan file index.html ke src dan pastikan public directory ada
echo "Setting up directory structure..."
mkdir -p client/public
if [ ! -f client/src/index.html ]; then
  echo "Copying index.html to src directory..."
  cp client/index.html client/src/index.html
  sed -i 's|"./src/main.tsx"|"./main.tsx"|g' client/src/index.html
fi

# Jalankan build dengan konfigurasi khusus
echo "Running build..."
node_modules/.bin/vite build --config vite.config.project.js

# Build server
echo "Building server..."
node_modules/.bin/esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/api