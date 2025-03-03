#!/bin/bash

# Create necessary directories
mkdir -p frontend/src/components
mkdir -p frontend/src/pages
mkdir -p frontend/src/services
mkdir -p frontend/public
mkdir -p backend/app/api/api_v1/endpoints
mkdir -p backend/app/core
mkdir -p backend/app/crud
mkdir -p backend/app/db
mkdir -p backend/app/models
mkdir -p backend/app/schemas
mkdir -p backend/app/services
mkdir -p backend/alembic/versions

# Make the script executable
chmod +x run.sh

# Start the application with Docker Compose
docker-compose up --build 