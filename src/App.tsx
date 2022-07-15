import { createView } from './utils/component'
import { RouterView } from 'vue-router'
import './App.css'

export default createView('App', () => () => <RouterView />)
