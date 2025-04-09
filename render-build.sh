#!/bin/bash
# Exit immediately if any command fails
set -o errexit

echo "Starting build process..."

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# If you have a frontend that needs building (like React), you would add:
# echo "Building frontend..."
# cd client && npm install && npm run build

# Ensure the public directory exists for static files
echo "Setting up public files..."
mkdir -p public_build

# Copy all public assets to the build directory
echo "Copying public files..."
cp -a public/. public_build/

# If you have any additional build steps, add them here
# For example, database migrations would go here

echo "Build completed successfully!"