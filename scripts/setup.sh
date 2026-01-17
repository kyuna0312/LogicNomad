#!/bin/bash
# Setup script - Initial project setup

echo "📦 Setting up LogicNomad..."

# Install dependencies
yarn install

# Build engine package first
yarn build:engine

echo "✅ Setup complete!"
echo "Run 'yarn dev' to start development"
