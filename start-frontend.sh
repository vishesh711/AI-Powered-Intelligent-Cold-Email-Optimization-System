#!/bin/bash
set -e

echo "🚀 Starting frontend-only mode..."

# Build and start just the frontend container
docker-compose -f docker-compose.simple.yml up --build

echo "✅ Frontend started at http://localhost:3000" 