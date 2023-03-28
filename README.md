# Vue Collection

Vue Collection is a collection of styled and fully functional Vue components which can easily be integrated into our projects.

## Demo Page 🎆

You can take a look at all components on [GitHub Pages](https://naptics.github.io/vue-collection/).

## Project Setup 🚧

This section shows how to create a new Vue project with the recommended tech-stack to be ready to install Vue-Collection afterwards.

1. Create a new vue-project with `npm init vue@latest`. Add at least typescript, jsx, vue-router, eslint and prettier.
2. Remove boilerplate code.
3. Follow the instructions to [install tailwind](https://tailwindcss.com/docs/installation/using-postcss).
    - `npm install -D tailwindcss postcss autoprefixer`
    - `npx tailwindcss init`
    - ... follow the further instructions
4. Add tailwind forms with `npm install -D @tailwindcss/forms`.
5. Add other dependencies with `npm install @heroicons/vue vue-i18n`
6. Copy files from `.vscode` to your project. Remove `.vscode/settings.json` file from `.gitignore`. Copy `.prettierrc` to your project.
7. Make sure typescript config is correct. Double check with this repo.

## Installation Guide 🔨

These are the steps to add Vue-Collection to an existing project. You may have to go through the steps of `Project Setup` and check if you have the neccesary (peer-)dependencies installed.

1. Go to [npmjs.com](https://npmjs.com), sign in with naptics and create a new read-only classic access token.
2. Save your access token under `~/.npmrc` with the following content, replacing `YOUR_TOKEN` with the access token.

```
//registry.npmjs.org/:_authToken=YOUR_TOKEN
```

3. Install Vue-Collection with `npm i @naptics/vue-collection`.
4. Add tailwind config -> See below
5. Register i18n provider -> See below

## Tailwind Config

With this tailwind config file, vue-collection works as expected. Feel free to change the `default`, `primary` and `secondary` colors and add whatever is needed in your project.

```js
// tailwind.config.js

/* eslint-disable no-undef */
const colors = require('tailwindcss/colors')

const unresolvedConfig = require('tailwindcss/defaultConfig')
const resolveConfig = require('tailwindcss/resolveConfig')
const config = resolveConfig(unresolvedConfig)

const allShades = '50|100|200|300|400|500|600|700|800|900'
const usedColors = 'default|primary|secondary|green|red|yellow|blue'
const smallSizes = '1|2|3|4|5|6|7|8|9|10|11|12|14|16|18|20'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{tsx,ts}', './node_modules/@naptics/vue-collection/**/*.{jsx,js}'],
    safelist: [
        {
            pattern: new RegExp(`^(bg|text)-(${usedColors})-(${allShades})$`),
            variants: ['hover'],
        },
        {
            pattern: new RegExp(`^ring-(${usedColors})-(${allShades})$`),
            variants: ['focus-visible'],
        },
        {
            pattern: new RegExp(`^(w|h)-(${smallSizes})$`),
        },
    ],
    theme: {
        extend: {
            colors: {
                default: colors.slate,
                primary: colors.violet,
                secondary: colors.fuchsia,
            },
            minHeight: config.theme.spacing,
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
```

## Register i18n Provider

These are two sample files, how the i18n provider can be registered by using `vue-i18n`. The translation files of Vue-Collection have to be added to the i18n provider in order for the Vue-Collection components to work properly.

```ts
// src/i18n/index.ts

import en from './en'
import de from './de'
import { createI18n } from 'vue-i18n'
import { registerTranslationProvider } from '@naptics/vue-collection/i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'de',
    messages: {
        en,
        de,
    },
})

registerTranslationProvider({
    trsl(key, params) {
        return i18n.global.t(key, params == null ? {} : params)
    },
    trslc(key, count, params) {
        const newCount = count ?? 0
        const newParams = { n: newCount, ...params }
        return i18n.global.t(key, newParams, { plural: newCount })
    },
})
```

```ts
// src/i18n/de.ts

import vueCollection from '@naptics/vue-collection/i18n/de/vue-collection.json'

const de = {
    ['vue-collection']: vueCollection,
    // other translation files
}

export default de
```
