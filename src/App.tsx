import { createView } from '@/utils/vue-collection/component'
import { RouterView } from 'vue-router'
import './App.css'

export default createView('App', () => () => <RouterView />)
