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
BABEL_EXIT_CODE=$?
echo "$BABEL_OUTPUT"

# Check if Babel command succeeded
if [ $BABEL_EXIT_CODE -ne 0 ]; then
    echo "Error: Babel transpilation failed with exit code $BABEL_EXIT_CODE"
    exit $BABEL_EXIT_CODE
fi

# Optionally, check if any .js files were produced
if ! find ./lib -name "*.js" -type f | grep -q .; then
    echo "Error: No .js files produced by Babel transpilation"
    exit 1
fi

find ./lib -name "*.jsx" -type f -delete

echo "Build completed successfully!"
