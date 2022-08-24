import { createApp } from 'vue'
import App from './App'
import router from './router'
import { addDocumentResizeEventListener } from './utils/breakpoints'

addDocumentResizeEventListener()

const app = createApp(App)

app.use(router)

app.mount('#app')
