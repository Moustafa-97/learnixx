#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Repository URLs
SOURCE_REPO="https://github.com/organization-name/original-repo.git"
DESTINATION_REPO="https://github.com/your-username/new-repo.git"

echo -e "${YELLOW}Starting repository sync...${NC}"

# Create temporary directory
TEMP_DIR=$(mktemp -d)
cd $TEMP_DIR

# Clone the source repository (bare clone)
echo -e "${GREEN}Cloning source repository...${NC}"
git clone --bare $SOURCE_REPO
cd "$(basename "$SOURCE_REPO")"

# Push to destination repository
echo -e "${GREEN}Pushing to destination repository...${NC}"
git push --mirror $DESTINATION_REPO

# Clean up
echo -e "${GREEN}Cleaning up temporary files...${NC}"
cd ..
rm -rf "$(basename "$SOURCE_REPO")"

echo -e "${GREEN}Sync completed successfully!${NC}"