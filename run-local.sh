#!/bin/bash
set -e

echo "🚀 Starting the Cold Email Optimization System locally..."

# Create minimal .env file
echo "Creating minimal .env file..."
cat > .env << EOL
SECRET_KEY=$(openssl rand -hex 32)
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=coldmail
FIRST_SUPERUSER_EMAIL=admin@example.com
FIRST_SUPERUSER_PASSWORD=admin
OPENAI_API_KEY=your-openai-api-key
REACT_APP_API_URL=http://localhost:8000/api/v1
EOL

# Start backend in background
echo "Starting backend..."
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &
cd ..

# Start frontend
echo "Starting frontend..."
cd frontend
npm start

echo "✅ System started!" 