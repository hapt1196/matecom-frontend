import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// i18n
import i18n from './i18n'

import App from './App.vue'
import { routes } from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#3B82F6',
          secondary: '#60A5FA',
          accent: '#FBBF24',
          success: '#34D399',
          info: '#60A5FA',
          warning: '#FBBF24',
          error: '#F87171',
          background: '#0F172A',
          surface: '#1E293B',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
          'on-accent': '#0F172A',
          'on-background': '#F8FAFC',
          'on-surface': '#F8FAFC',
          'surface-variant': '#334155',
          'on-surface-variant': '#CBD5E1',
          'outline': '#334155',
          'outline-variant': '#475569',
        }
      }
    }
  }
})

export const createApp = ViteSSG(
  App,
  { 
    routes,
    scrollBehavior(to, from, savedPosition) {
      return { top: 0 }
    }
  },
  ({ app, router, initialState }) => {
    const pinia = createPinia()
    const head = createHead()
    
    // Navigation guard cho business routes
    router.beforeEach(async (to, from, next) => {
      if (to.meta.requiresAuth || to.name === 'business-login') {
        const { isAuthenticated } = await import('@/services/authService')
        
        if (to.meta.requiresAuth && !isAuthenticated()) {
          next('/business/login')
        } else if (to.name === 'business-login' && isAuthenticated()) {
          next('/business')
        } else {
          next()
        }
      } else {
        next()
      }
    })
    
    app.use(pinia)
    app.use(vuetify)
    app.use(i18n)
    app.use(head)
  }
)

