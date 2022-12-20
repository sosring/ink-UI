import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Homepage from '../views/Homepage.vue'
import Aboutpage from '../views/Aboutpage.vue'
import Editnote from '../views/Editnote.vue'
import Auth from '../views/Auth.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Editnote,
      props: true
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/about',
      name: 'about',
      component: Aboutpage
    }
  ]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guards

router.beforeEach(async (to, from) => {
  const useAuth = useAuthStore()

  if(!useAuth.user.id && to.name !== 'auth') return { name: 'auth' };
  if(useAuth.user.id && to.name === 'auth') return false;
})

export default router
