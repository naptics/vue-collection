const pluginVue = require('eslint-plugin-vue')
const { defineConfigWithVueTs, vueTsConfigs } = require('@vue/eslint-config-typescript')
const js = require('@eslint/js')
const prettierConfig = require('@vue/eslint-config-prettier')

require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = defineConfigWithVueTs(
    {
        ignores: ['node_modules/**', 'dist/**', 'dist-ssr/**', 'lib/**', 'coverage/**'],
    },
    js.configs.recommended,
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    prettierConfig,
    {
        files: ['**/*.config.js', '**/*.config.cjs'],
        languageOptions: {
            globals: {
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
            },
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    }
)
