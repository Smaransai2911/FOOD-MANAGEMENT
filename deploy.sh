#!/bin/bash

# Script to prepare and deploy the application

# Ensure environment variables are loaded
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | sed 's/\r$//' | xargs)
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Create database tables if they don't exist
echo "Setting up database..."
npm run db:push

# Build for production
echo "Building for production..."
npm run build

# Start the application
echo "Starting application..."
npm run start