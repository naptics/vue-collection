import { createView } from './utils/vue'
import { RouterView } from 'vue-router'
import './App.css'

export default createView('App', () => () => <RouterView />)
