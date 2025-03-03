#!/bin/bash
set -e

echo "🚀 Deploying AI-Powered Intelligent Cold Email Optimization System..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Build and start the containers
echo "Building and starting Docker containers..."
docker-compose up --build -d

echo "✅ Deployment completed successfully!"
echo "🌐 The application is now running at:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000/api/v1"
echo "   - API Documentation: http://localhost:8000/docs"
echo ""
echo "Default login credentials:"
echo "   - Email: admin@example.com"
echo "   - Password: admin"
echo ""
echo "To stop the application, run: docker-compose down" 