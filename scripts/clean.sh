#!/bin/bash
# Clean script - Remove all build artifacts and node_modules

echo "🧹 Cleaning LogicNomad..."

# Clean build outputs
yarn clean

# Optionally clean all (uncomment to also remove node_modules)
# yarn clean:all

echo "✅ Clean complete!"
