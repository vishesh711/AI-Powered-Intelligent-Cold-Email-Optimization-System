#!/bin/bash
set -e

echo "🚀 Setting up AI-Powered Intelligent Cold Email Optimization System..."

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

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Setup completed successfully!"
echo "You can now run './deploy.sh' to start the application." 