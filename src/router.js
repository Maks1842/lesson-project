import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from "@/pages/MainPage"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/photo',
        component: () => import('./pages/PhotosPage')
    },
    {
        path: '/statistics',
        component: () => import('./pages/statistics/StatisicsPage')
    },
    {
        path: '/dashboard',
        component: () => import('./pages/statistics/DashboardPage')
    },
    {
        path: '/organisations',
        component: () => import('./pages/statistics/OrganistionsPage')
    },
    {
        path: '/booking',
        component: () => import('./components/booking/Booking')
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})