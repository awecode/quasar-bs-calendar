const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { homepage: true },
      },
      {
        path: 'index',
        component: () => import('pages/IndexPage.vue'),
        meta: { homepage: true },
      },
      {
        path: 'date-range',
        component: () => import('pages/DateRange.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/login/',
    name: 'login',
    component: () => import('src/pages/LoginPage.vue'),
  },
  {
    path: '/test/',
    name: 'test',
    component: () => import('src/pages/TestPage.vue'),
  },
]

export default routes
