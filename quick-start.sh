#!/bin/bash
set -e

echo "🚀 Quick-starting the Cold Email Optimization System..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Create minimal .env file
echo "Creating minimal .env file..."
cat > .env << EOL
# Backend settings
SECRET_KEY=$(openssl rand -hex 32)
POSTGRES_SERVER=db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=coldmail
FIRST_SUPERUSER_EMAIL=admin@example.com
FIRST_SUPERUSER_PASSWORD=admin
OPENAI_API_KEY=your-openai-api-key
REACT_APP_API_URL=http://localhost:8000/api/v1
EOL

# Start only the backend and database
echo "Starting backend and database..."
docker-compose up -d db backend

echo "Starting frontend in development mode..."
cd frontend
npm start

echo "✅ System started!"
echo "🌐 Access points:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000/api/v1"
echo "   - API Documentation: http://localhost:8000/docs" 