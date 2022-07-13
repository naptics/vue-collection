/* eslint-disable no-undef */
const colors = require('tailwindcss/colors')

const allShades = '50|100|200|300|400|500|600|700|800|900'
const usedColors = 'default|primary|secondary|green|red|yellow|blue'
const smallSizes = '1|2|3|4|5|6|7|8|9|10|11|12|14|16|18|20'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{tsx,ts}'],
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
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
