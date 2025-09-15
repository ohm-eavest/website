#!/bin/bash

# Deploy script for staging environment
# This script builds and prepares the Next.js app for deployment

echo "🚀 Starting deployment preparation for staging..."

# 1. Build the application
echo "📦 Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo "✅ Build completed successfully!"

# 2. Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy-staging.tar.gz \
    .next \
    public \
    package.json \
    package-lock.json \
    .env.production \
    next.config.ts

echo "✅ Deployment package created: deploy-staging.tar.gz"

# 3. Display deployment instructions
echo ""
echo "📋 DEPLOYMENT INSTRUCTIONS FOR STAGING:"
echo "========================================"
echo ""
echo "1. Upload deploy-staging.tar.gz to your staging server"
echo ""
echo "2. On the staging server, extract the files:"
echo "   tar -xzf deploy-staging.tar.gz"
echo ""
echo "3. Install production dependencies:"
echo "   npm ci --production"
echo ""
echo "4. Set environment variables:"
echo "   export NODE_ENV=production"
echo "   export BACKEND_URL=http://localhost:8000  # Or your Django backend URL"
echo ""
echo "5. Start the application:"
echo "   npm run start"
echo "   # Or use PM2 for process management:"
echo "   pm2 start npm --name 'eavest-staging' -- start"
echo ""
echo "6. Configure your web server (nginx/apache) to proxy to port 3000"
echo ""
echo "========================================"
echo ""
echo "⚠️  IMPORTANT: Make sure your Django backend is accessible from the staging server!"
echo "⚠️  The current error on staging is because the Django backend returns HTML error pages."
echo "⚠️  Check the Django logs for RuntimeError details."