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

# Move all css files to lib
echo "Copying .css files."
cp ./src/lib/components/*.css ./lib/components

# Transpile jsx file to js with babel
echo "Using Babel to transpile jsx."
./node_modules/.bin/babel lib --out-dir lib