import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.use(VueAnalytics, {
  id: 'G-964MQ92E0M',
  router
})

export default router
