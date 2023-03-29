#!/usr/bin/env bash

# Remove lib folder
echo "Removing ./lib folder."
rm -rf ./lib 

# Compile typescript code to javascript code
echo "Compiling typescript code with tsconfig.lib.json."
tsc --project tsconfig.lib.json 

# Move lib two directories up
echo "Cleaning up ./lib directory."
mv ./lib/src/lib/* ./lib 

# Remove unused files
rm -rf ./lib/src 
rm ./lib/tsconfig.lib.tsbuildinfo 

# Move all css files from components to lib
echo "Copying .css files from the components folder."
cp ./src/lib/components/*.css ./lib/components

# Transpile jsx files to js with babel
echo "Using Babel to transpile jsx."
./node_modules/.bin/babel lib/components --out-dir lib/components
find ./lib -name "*.jsx" -type f -delete
