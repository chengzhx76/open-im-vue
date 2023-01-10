import { createRouter, createWebHistory } from 'vue-router'

import { routers } from './router'

const router = createRouter({
    history: createWebHistory(),
    routes: routers
})


export default router
