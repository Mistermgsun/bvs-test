import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import EventView from '@/views/EventView.vue'
import BookingView from '@/views/BookingView.vue'
import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chi-siamo',
      name: 'chi siamo',
      component: AboutView
    },
    {
      path: '/eventi',
      name: 'eventi',
      component: EventView
    },
    {
      path: '/prenota',
      name: 'prenota',
      component: BookingView
    },
    {
      path: '/contatti',
      name: 'contatti',
      component: ContactView
    }
  ]
})

export default router
