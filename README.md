# AI-Powered Intelligent Cold Email Optimization System

Welcome to the **AI-Powered Intelligent Cold Email Optimization System** repository. This project is designed to optimize cold email marketing campaigns through intelligent segmentation, data analysis, and real‑time performance dashboards.

![Banner](./Sample_Img/banner.png)  
*(*Replace `banner.png` with an appropriate image from your Sample_Img folder if needed.*)*

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
  - [Full System (Backend + Frontend)](#full-system-backend--frontend)
  - [Frontend-Only Mode](#frontend-only-mode)
  - [Docker-based Frontend](#docker-based-frontend)
- [Images & Screenshots](#images--screenshots)
- [Usage](#usage)
  - [Dashboard](#dashboard)
  - [Campaigns](#campaigns)
  - [Prospects](#prospects)
  - [Templates](#templates)
  - [Analytics](#analytics)
  - [Settings](#settings)
- [AI Integration](#ai-integration)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🔍 Overview

This system combines a powerful backend (built using Python and FastAPI) with a dynamic React frontend (using Chakra UI) to provide actionable insights for cold email campaigns. The frontend features real‑time data updates (via polling) and a modern UI to help you monitor campaign effectiveness.

## ✨ Features

### Core Features

- **Prospect Management**: Import, categorize, and manage prospect data efficiently
- **Campaign Management**: Create, schedule, and monitor email campaigns
- **Template Library**: Build and store reusable email templates with AI-assisted writing
- **Analytics Dashboard**: Track key metrics and performance indicators
- **AI-Powered Personalization**: Generate tailored content for each prospect
- **Engagement Tracking**: Monitor email opens, clicks, and responses in real-time

### AI Capabilities

- **Content Generation**: AI-assisted email writing and subject line creation
- **Prospect Analysis**: Automated research and insights about prospects
- **Optimization Suggestions**: Data-driven recommendations to improve performance
- **Sentiment Analysis**: Evaluate response tone and sentiment
- **Best Time Detection**: Identify optimal sending times for maximum engagement

## 🏗️ System Architecture

The system consists of:

- **Frontend**: React-based single-page application with Chakra UI components
- **Backend**: FastAPI Python backend with PostgreSQL database
- **AI Integration**: OpenAI GPT models for content generation and analysis
- **Email Service**: SMTP integration for sending and tracking emails
- **Analytics Engine**: Real-time data processing for performance metrics

## 🚀 Project Structure

```
├── backend/                   # REST
├── frontend/                  # React
└── docker/                    # Docker
```

## 🚀 Setup & Installation

### Prerequisites

- Docker and Docker Compose
- Git
- OpenAI API key (for AI features)
- SMTP server credentials (for email sending)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cold-email-optimization-system.git
   cd cold-email-optimization-system
   ```

2. Make the setup script executable:
   ```bash
   chmod +x setup.sh
   ```

3. Run the setup script:
   ```bash
   ./setup.sh
   ```

   This will:
   - Create a `.env` file with default configuration values
   - Install backend dependencies
   - Install frontend dependencies

4. Configure your environment:
   Edit the `.env` file to add your:
   - OpenAI API key
   - SMTP server details
   - Other custom configurations

### Deployment

1. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

   This will:
   - Check if Docker and Docker Compose are installed
   - Build and start the Docker containers
   - Display access information for the application

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/v1
   - API Documentation: http://localhost:8000/docs

   Default login credentials:
   - Email: admin@example.com
   - Password: admin

## 🚀 Running the Application

### Full System (Backend + Frontend)

To run the full system, follow the deployment steps above.

### Frontend-Only Mode

To run the frontend without the backend, use the following command:
```bash
npm run start
```

### Docker-based Frontend

To run the frontend in a containerized environment, use the following command:
```bash
docker run -p 3000:3000 yourusername/cold-email-optimization-system-frontend
```

## 📊 Usage

### Dashboard

The dashboard provides an overview of your email outreach performance, including:
- Active campaigns
- Email metrics (sent, opened, clicked, replied)
- Recent activity
- AI-generated insights

### Campaigns

Manage your email campaigns:
- Create new campaigns
- Schedule sending times
- Monitor campaign performance
- Pause, resume, or duplicate campaigns

### Prospects

Organize and manage your prospect database:
- Add individual prospects or import in bulk
- Categorize prospects by status
- View prospect details and interaction history
- Add prospects to campaigns

### Templates

Create and manage email templates:
- Build templates with AI assistance
- Organize templates by category
- Track template performance
- Use variables for personalization

### Analytics

Gain insights from comprehensive analytics:
- Email performance metrics
- Campaign comparisons
- Template effectiveness
- Best sending times
- Top-performing subject lines

### Settings

Configure system settings:
- Account information
- Email configuration
- AI settings
- Notification preferences
- Integrations with other tools

## 🤖 AI Integration

The system integrates with OpenAI's GPT models to provide:

1. **Email Content Generation**:
   - Generate complete emails based on prospect information
   - Create compelling subject lines
   - Suggest personalized opening lines

2. **Prospect Research**:
   - Analyze prospect data to identify key talking points
   - Generate company-specific insights
   - Recommend personalization strategies

3. **Performance Optimization**:
   - Analyze successful emails to identify patterns
   - Suggest improvements to underperforming templates
   - Recommend optimal sending times and frequencies

4. **Response Analysis**:
   - Evaluate prospect responses for sentiment
   - Suggest appropriate follow-up strategies
   - Identify objections and recommend counter-points

## 📚 API Documentation

The system provides a comprehensive API for integration with other tools:

- **Authentication**: JWT-based authentication
- **Prospects**: CRUD operations for prospect management
- **Campaigns**: Campaign creation and management
- **Templates**: Template storage and retrieval
- **Analytics**: Performance data access

Detailed API documentation is available at http://localhost:8000/docs when the system is running.

## 💻 Development

### Project Structure

```
├── backend/                   # REST
├── frontend/                  # React
└── docker/                    # Docker
```
