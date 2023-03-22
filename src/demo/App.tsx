import { createView } from '@/lib/utils/component'
import { RouterView } from 'vue-router'
import './App.css'

export default createView('App', () => () => <RouterView />)
