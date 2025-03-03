#!/bin/bash
set -e

echo "🔧 Complete system repair in progress..."

# Create a clean frontend directory
echo "Creating clean frontend environment..."
rm -rf frontend/node_modules frontend/package-lock.json

# Fix package.json with exact versions known to work together
cat > frontend/package.json << EOL
{
  "name": "cold-email-optimization-system-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@chakra-ui/react": "2.5.1",
    "@emotion/react": "11.10.6",
    "@emotion/styled": "11.10.6",
    "ajv": "8.12.0",
    "axios": "1.3.4",
    "framer-motion": "10.0.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-icons": "4.8.0",
    "react-router-dom": "6.8.2",
    "react-scripts": "5.0.1",
    "web-vitals": "2.1.4"
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

# Install dependencies with clean npm cache
echo "Installing frontend dependencies with clean cache..."
cd frontend
npm cache clean --force
npm install --legacy-peer-deps

echo "✅ Dependencies installed successfully!"

# Create a super simple run script
cd ..
cat > run-frontend-only.sh << EOL
#!/bin/bash
set -e

echo "🚀 Starting frontend-only mode with minimal dependencies..."
cd frontend
npm start
EOL

chmod +x run-frontend-only.sh

echo "✅ All fixes applied!"
echo "To run the application in frontend-only mode, execute: ./run-frontend-only.sh" 