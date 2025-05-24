import { createRouter, createWebHistory } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: '/home',
      component: HomeView,
    },
    {
      path: '/solo',
      children: [
        {
          path: '',
          name: 'SoloGameSettings',
          component: () => import('@/views/GameSettings.vue'),
        },
        {
          path: 'game',
          name: 'SoloGame',
          component: () => import('@/views/Game.vue'),
        },
      ],
    },
    {
      path: '/multi',
      redirect: () => ({
        name: 'MultiSettings',
        params: { roomId: uuidv4() },
      }),
    },
    {
      path: '/multi/:roomId',
      children: [
        {
          path: '',
          name: 'MultiGameSettings',
          component: () => import('@/views/GameSettings.vue'),
        },
        {
          path: '',
          name: 'MultiGame',
          component: () => import('@/views/Game.vue'),
        },
      ],
    },
  ],
})

export default router
