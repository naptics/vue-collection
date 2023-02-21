import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        vueI18n({
            compositionOnly: true,
            runtimeOnly: false,
            fullInstall: false,
            include: resolve(__dirname, 'src/i18n/*'),
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    base: process.env.VITE_BASE_PATH,
})
