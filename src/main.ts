import { createApp } from 'vue'
import App from './App'
import router from './router'
import { addDocumentResizeEventListener } from './utils/vue-collection/breakpoints'

addDocumentResizeEventListener()

const app = createApp(App)

app.use(router)

app.mount('#app')
