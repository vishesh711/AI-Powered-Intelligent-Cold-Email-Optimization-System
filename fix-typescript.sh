#!/bin/bash
set -e

echo "🔧 Fixing TypeScript compatibility issues..."

# Install TypeScript and required type definitions
cd frontend
npm install --save-dev typescript @types/react @types/react-dom @types/node

# Create a react-app-env.d.ts file to help with module resolution
cat > src/react-app-env.d.ts << EOL
/// <reference types="react-scripts" />
EOL

# Update package.json to include TypeScript configuration
cat > package.json << EOL
{
  "name": "cold-email-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@chakra-ui/react": "2.5.1",
    "@emotion/react": "11.10.6",
    "@emotion/styled": "11.10.6",
    "axios": "1.3.4",
    "framer-motion": "10.0.1",
    "react": "18.2.0", 
    "react-dom": "18.2.0",
    "react-icons": "4.8.0",
    "react-router-dom": "6.8.2",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "@types/node": "^16.18.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^4.9.5"
  },
  "scripts": {
    "start": "BROWSER=none react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
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
npm install --legacy-peer-deps

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  echo "REACT_APP_API_URL=http://localhost:8000/api/v1" > .env
fi

echo "✅ TypeScript compatibility fixes applied!"
echo "Run 'npm start' in the frontend directory to start the application." 