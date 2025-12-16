#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const rootDir = path.join(__dirname, '..')
const nvmrcPath = path.join(rootDir, '.nvmrc')
const packageJsonPath = path.join(rootDir, 'package.json')

// Read .nvmrc
if (!fs.existsSync(nvmrcPath)) {
    console.error('Error: .nvmrc file not found')
    process.exit(1)
}

const nvmrcContent = fs.readFileSync(nvmrcPath, 'utf8').trim()

// Extract major version from .nvmrc
// Supports formats like: "24", "v24", "24.12.0", "lts/iron", etc.
let nodeMajorVersion

if (nvmrcContent.startsWith('lts/')) {
    // Map LTS names to major versions
    const ltsMap = {
        krypton: '24',
        jod: '22',
        iron: '20',
        hydrogen: '18',
        gallium: '16',
        fermium: '14',
    }
    const ltsName = nvmrcContent.replace('lts/', '').toLowerCase()
    nodeMajorVersion = ltsMap[ltsName]
    if (!nodeMajorVersion) {
        console.error(`Error: Unknown LTS name "${ltsName}"`)
        process.exit(1)
    }
} else {
    // Extract numeric version
    const versionMatch = nvmrcContent.match(/^v?(\d+)/)
    if (!versionMatch) {
        console.error(`Error: Could not extract Node version from .nvmrc: "${nvmrcContent}"`)
        process.exit(1)
    }
    nodeMajorVersion = versionMatch[1]
}

console.log(`Node version from .nvmrc: ${nodeMajorVersion}`)

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

// Check current @types/node version
const currentTypesNode = packageJson.devDependencies?.['@types/node']
const desiredTypesNode = `^${nodeMajorVersion}`

if (currentTypesNode === desiredTypesNode) {
    console.log(`✓ @types/node is already set to ${desiredTypesNode}`)
    process.exit(0)
}

console.log(`Updating @types/node from ${currentTypesNode} to ${desiredTypesNode}`)

// Update package.json
packageJson.devDependencies['@types/node'] = desiredTypesNode

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8')

console.log('✓ package.json updated. Run `npm install` to install the correct @types/node version.')
