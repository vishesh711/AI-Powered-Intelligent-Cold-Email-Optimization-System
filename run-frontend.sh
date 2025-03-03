#!/bin/bash
set -e

echo "🚀 Starting frontend..."

# Create .env file if it doesn't exist
if [ ! -f frontend/.env ]; then
  echo "Creating .env file..."
  echo "REACT_APP_API_URL=http://localhost:8000/api/v1" > frontend/.env
fi

# Change to frontend directory and start the app
cd frontend
npm start 