import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: to => {
        if (to.hash) {
            return {
                el: to.hash,
            }
        }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/present',
            name: 'present',
            component: () => import('@/views/PresentationView'),
        },
    ],
})

export default router
