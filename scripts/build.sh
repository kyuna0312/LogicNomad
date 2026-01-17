#!/bin/bash
# Build script - Build all packages and apps

echo "🔨 Building LogicNomad..."

# Build in order: engine -> api -> web
yarn build:engine
yarn build:api
yarn build:web

echo "✅ Build complete!"
