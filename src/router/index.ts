import { createRouter, createWebHistory } from 'vue-router'

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
            component: () => import('../views/HomeView'),
        },
    ],
})

export default router
