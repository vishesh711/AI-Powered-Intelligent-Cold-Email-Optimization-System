#!/bin/bash
set -e

echo "🚀 Starting the Cold Email Optimization System in simplified mode..."

# Create minimal .env file
echo "Creating minimal .env file..."
cat > .env << EOF
SECRET_KEY=simplifiedsecretkey123456789
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=coldmail
FIRST_SUPERUSER_EMAIL=admin@example.com
FIRST_SUPERUSER_PASSWORD=admin
OPENAI_API_KEY=your-openai-api-key
REACT_APP_API_URL=http://localhost:8000/api/v1
EOF

# Start frontend only (for testing UI)
echo "Starting frontend in development mode..."
cd frontend
npm start

echo "✅ Frontend started!"
echo "🌐 Access point: http://localhost:3000"
