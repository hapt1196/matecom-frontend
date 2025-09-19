import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PartnerView from '../views/PartnerView.vue'
import ServiceView from '../views/ServiceView.vue'
import AgencyCornerView from '../views/AgencyCornerView.vue'
import RecruitmentView from '../views/RecruitmentView.vue'
import ContactView from '../views/ContactView.vue'
import AIAssistantView from '../views/AIAssistantView.vue'
import BusinessView from '../views/BusinessView.vue'
import LoginView from '../views/LoginView.vue'
import BlogDetailView from '../views/BlogDetailView.vue'
import ServiceDetailView from '../views/ServiceDetailView.vue'
import { isAuthenticated } from '@/services/authService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Luôn scroll về đầu trang khi chuyển route
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/partners',
      name: 'partners',
      component: PartnerView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServiceView,
    },
    {
      path: '/agency',
      name: 'agency',
      component: AgencyCornerView,
    },
    {
      path: '/recruitment',
      name: 'recruitment',
      component: RecruitmentView,
    },
    {
      path: '/ai-assistant',
      name: 'ai-assistant',
      component: AIAssistantView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/business/login',
      name: 'business-login',
      component: LoginView,
    },
    {
      path: '/business',
      name: 'business',
      component: BusinessView,
      meta: { requiresAuth: true }
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: BlogDetailView,
    },
    {
      path: '/services/:serviceType',
      name: 'service-detail',
      component: ServiceDetailView,
    },
  ],
})

// Navigation guard để bảo vệ route business
router.beforeEach((to, from, next) => {
  
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/business/login')
  } else if (to.name === 'business-login' && isAuthenticated()) {
    next('/business')
  } else {
    next()
  }
})

export default router
