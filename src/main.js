import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// i18n
import i18n from './i18n'

import App from './App.vue'
import router from './router'

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

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
