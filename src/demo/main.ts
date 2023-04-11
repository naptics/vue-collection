import { createApp } from 'vue'
import App from './App'
import router from './router'
import { addDocumentResizeEventListener } from '@/lib/utils/breakpoints'
import { i18n } from './i18n'

addDocumentResizeEventListener()

const app = createApp(App)
app.use(router)
app.use(i18n)

app.mount('#app')
