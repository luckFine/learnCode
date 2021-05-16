
import Router from 'vue-router'
Vue.use(Router)

// import Home from './pages/home.vue'
// import Market from './pages/Market.vue'
// import APP from './pages/app.vue'

var routes = [
    {
        path: '/app',
        name: 'APP',
        component: import('./pages/app.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: import('./pages/home.vue')
    },
    {
        path: '/market',
        name: 'Market',
        component: import('./pages/Market.vue'),
    }
]
export default new Router({ routes })