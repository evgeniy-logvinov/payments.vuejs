import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
const router = createRouter({
  // TODO: check
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/events',
      name: 'EventList',
      props: (route) => ({ page: parseInt(route.query.page as string) || 1 }),
      component: () => import('../views/EventList.vue')
    },
    {
      path: '/event/:id',
      name: 'EventLayout',
      props: true,
      component: () => import('../views/event/EventLayout.vue'),
      children: [
        {
          path: '',
          name: 'EventDetails',
          component: () => import('../views/event/EventDetails.vue')
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: () => import('../views/event/EventRegister.vue')
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: () => import('../views/event/EventEdit.vue')
        }
      ]
    },
    {
      path: '/counter',
      name: 'Counter',
      props: { showExtra: true },
      component: () => import('../views/CounterView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue')
    }
  ]
})

export default router
