#!/usr/bin/env bash
# Exit on error
set -e
# Remove lib folder
echo "Removing ./lib folder."
rm -rf ./lib 

# Compile typescript code to javascript code
echo "Compiling typescript code with tsconfig.lib.json."
tsc --project tsconfig.lib.json 

# Move lib two directories up
echo "Cleaning up ./lib directory."
if [ ! -d "./lib/src/lib" ]; then
    echo "Error: ./lib/src/lib directory not found after compilation"
    exit 1
fi
mv ./lib/src/lib/* ./lib 

# Remove unused files
rm -rf ./lib/src
rm -f ./lib/tsconfig.lib.tsbuildinfo 

# Move all css files from components to lib
echo "Copying .css files from the components folder."
if ls ./src/lib/components/*.css 1> /dev/null 2>&1; then
    cp ./src/lib/components/*.css ./lib/components
else
    echo "Warning: No CSS files found in ./src/lib/components/"
fi

# Transpile jsx files to js with babel
echo "Using Babel to transpile jsx."
BABEL_OUTPUT=$(./node_modules/.bin/babel lib --out-dir lib 2>&1)
echo "$BABEL_OUTPUT"

# Check if babel transpiled any files
if echo "$BABEL_OUTPUT" | grep -q " 0 files"; then
    echo "Error: Babel transpiled 0 files - build failed"
    exit 1
fi

find ./lib -name "*.jsx" -type f -delete

echo "Build completed successfully!"
