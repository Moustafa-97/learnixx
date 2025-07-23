#!/bin/bash

echo "======================================="
echo "Syncing from Yllaaa/learnix to Moustafa-97/learnix..."
echo "======================================="

# Fetch latest changes from organization repo
echo "→ Fetching from organization repo..."
git fetch upstream

# Checkout main branch
echo "→ Switching to main branch..."
git checkout main

# Merge changes from organization repo
echo "→ Merging latest changes..."
git merge upstream/main

# Push to your repo
echo "→ Pushing to your repository..."
git push origin main

echo "======================================="
echo "✓ Sync completed successfully!"
echo "Your repo is now up-to-date with Yllaaa/learnix"
echo "======================================="