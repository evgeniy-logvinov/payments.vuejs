import { createRouter, createWebHistory } from 'vue-router'

// https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
const router = createRouter({
  // TODO: check
  // TODO: add router hook before entry
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('../views/main/MainLayout.vue'),
      redirect: { name: 'Public' },
      children: [
        {
          path: '/private',
          name: 'Private',
          // props: (route) => ({ page: parseInt(route.query.page as string) || 1 }),
          component: () => import('../views/private/PrivateLayout.vue'),
          children: [
            {
              path: '',
              name: 'Dashboard',
              component: () => import('../views/private/PrivateDashboard.vue')
            },
            {
              path: '/events',
              name: 'Events',
              props: (route) => ({
                page: parseInt(route.query.page as string) || 1
              }),
              component: () => import('../views/private/PrivateEvents.vue')
            },
            {
              path: '/event/:id',
              name: 'EventLayout',
              props: true,
              component: () => import('../views/private/event/EventLayout.vue'),
              children: [
                {
                  path: '',
                  name: 'EventDetails',
                  component: () =>
                    import('../views/private/event/EventDetails.vue')
                },
                {
                  path: 'register',
                  name: 'EventRegister',
                  component: () =>
                    import('../views/private/event/EventRegister.vue')
                },
                {
                  path: 'edit',
                  name: 'EventEdit',
                  component: () =>
                    import('../views/private/event/EventEdit.vue')
                }
              ]
            },
            {
              path: '/payments',
              name: 'Payments',
              props: true,
              component: () =>
                import('../views/private/payments/PaymentsLayout.vue')
            },
            {
              path: '/payments-info',
              name: 'PaymentsInfo',
              props: true,
              component: () =>
                import('../views/private/payments/PaymentsInfo.vue')
            },
            {
              path: '/counter',
              name: 'Counter',
              props: { showExtra: true },
              component: () => import('../views/private/PrivateCounter.vue')
            }
          ]
        },
        {
          path: '/public',
          name: 'Public',
          // props: (route) => ({ page: parseInt(route.query.page as string) || 1 }),
          component: () => import('../views/public/PublicLayout.vue'),
          redirect: { name: 'About' },
          children: [
            {
              path: '/about',
              name: 'About',
              // route level code-splitting
              // this generates a separate chunk (About.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import('../views/public/PublicAbout.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/login',
      name: 'SignIn',
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('../views/NotFound.vue')
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: () => import('../views/NotFound.vue'),
      props: true
    }
  ]
})

export default router
