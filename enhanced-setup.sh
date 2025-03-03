#!/bin/bash
set -e

echo "🚀 Setting up AI-Powered Intelligent Cold Email Optimization System with enhanced dependencies..."

# Create .env file with default values
echo "Creating .env file..."
cat > .env << EOL
# Backend settings
SECRET_KEY=$(openssl rand -hex 32)
POSTGRES_SERVER=db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=coldmail
FIRST_SUPERUSER_EMAIL=admin@example.com
FIRST_SUPERUSER_PASSWORD=admin

# OpenAI settings
OPENAI_API_KEY=your-openai-api-key

# Email settings
SMTP_TLS=True
SMTP_PORT=587
SMTP_HOST=smtp.example.com
SMTP_USER=your-smtp-user
SMTP_PASSWORD=your-smtp-password
EMAILS_FROM_EMAIL=info@example.com
EMAILS_FROM_NAME="Cold Email System"

# Frontend settings
REACT_APP_API_URL=http://localhost:8000/api/v1
EOL

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Install frontend dependencies with specific versions and alternatives
echo "Installing frontend dependencies with specific versions..."
cd frontend

# Create or update package.json with specific versions
cat > package.json << EOL
{
  "name": "cold-email-optimization-system-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@chakra-ui/react": "^2.5.1",
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3",
    "axios": "^1.3.4",
    "framer-motion": "^10.0.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.8.0",
    "react-router-dom": "^6.8.2",
    "react-scripts": "5.0.1",
    "recharts": "^2.4.3",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOL

# Install dependencies
npm install

cd ..

echo "✅ Setup completed successfully!"
echo "You can now run './run-local.sh' to start the application locally." 