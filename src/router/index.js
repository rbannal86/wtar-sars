import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import GameView from '../views/GameView.vue'
import ResultsView from '../views/ResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
      meta: { transition: 'slide-right' }
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
      meta: { transition: 'slide-right' }
    },
  ]
})

export default router
