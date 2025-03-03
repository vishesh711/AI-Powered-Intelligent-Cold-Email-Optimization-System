#!/bin/bash
set -e

# Clean existing installations
rm -rf frontend/node_modules frontend/package-lock.json

# Create clean minimal package.json
cat > frontend/package.json << EOL
{
  "name": "cold-email-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@chakra-ui/react": "2.5.1",
    "@emotion/react": "11.10.6",
    "@emotion/styled": "11.10.6",
    "axios": "1.3.4",
    "react": "18.2.0", 
    "react-dom": "18.2.0",
    "react-scripts": "5.0.1",
    "react-icons": "4.8.0"
  },
  "scripts": {
    "start": "BROWSER=none react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
EOL

# Install dependencies
cd frontend
npm install --legacy-peer-deps

# Create minimal .env
echo "REACT_APP_API_URL=http://localhost:8000/api/v1" > .env

echo "✅ Setup complete! Run 'npm start' in frontend directory" 