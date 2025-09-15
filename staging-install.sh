#!/bin/bash

# Installation script for staging server
# Handles React version conflicts

echo "📦 Installing dependencies for staging..."
echo ""

# Use legacy peer deps to handle React 19 conflicts
echo "Using --legacy-peer-deps to resolve React version conflicts..."
npm ci --omit=dev --legacy-peer-deps

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Start the application:"
    echo "   npm run start"
    echo "   or"
    echo "   pm2 start ecosystem.config.js"
    echo ""
    echo "2. Check the application:"
    echo "   curl http://localhost:3000"
else
    echo "❌ Installation failed. Trying alternative approach..."
    echo ""
    echo "Installing with force flag..."
    npm install --omit=dev --force

    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed with force flag"
    else
        echo "❌ Installation failed. Please check the error messages above."
        exit 1
    fi
fi

echo ""
echo "📝 Note: react-simple-maps doesn't officially support React 19 yet,"
echo "   but it should work fine with --legacy-peer-deps flag."