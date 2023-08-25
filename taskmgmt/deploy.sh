#!/bin/bash

# Replace these variables with your Firebase project settings
FIREBASE_PROJECT="task-management-6dd6f"
FIREBASE_TOKEN="AIzaSyCT3r6euUXBt_YHxQt0HqUnOGgUMZEgiBQ"

# Build the Next.js app
echo "Building the Next.js app..."
npm run build

# Deploy to Firebase
echo "Deploying to Firebase..."
firebase deploy --project $FIREBASE_PROJECT --token $FIREBASE_TOKEN

echo "Deployment complete!"
