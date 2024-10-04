export const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'typography',
        component: () => import('@/pages/typography.vue'),
      },
      {
        path: 'icons',
        component: () => import('@/pages/icons.vue'),
      },
      {
        path: 'cards',
        component: () => import('@/pages/cards.vue'),
      },
      {
        path: 'tables',
        component: () => import('@/pages/tables.vue'),
      },
      {
        path: 'form-layouts',
        component: () => import('@/pages/form-layouts.vue'),
      },
      {
        path: 'mahasiswa',
        component: () => import('@/pages/mahasiswa.vue'),
      },
      {
        path: 'invoice',
        component: () => import('@/pages/invoice.vue'),
      },
      {
        path: 'mahasiswa/:id',
        component: () => import('@/pages/mahasiswa/[id].vue'),
        props: true,
      },
      {
        path: 'kelas',
        component: () => import('@/pages/kelas.vue'),
      },
      {
        path: 'kelas/:id',
        component: () => import('@/pages/kelas/[id].vue'),
        props: true,
      },
      {
        path: 'pengajar',
        component: () => import('@/pages/pengajar.vue'),
      },
      {
        path: 'matakuliah',
        component: () => import('@/pages/matakuliah.vue'),
      },
      {
        path: 'nilai-ujian',
        component: () => import('@/pages/nilai-ujian.vue'),
      },
      {
        path: 'jenis-tagihan',
        component: () => import('@/pages/jenis-invoice.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
        name: 'Error',
      },
    ],
  },
]
