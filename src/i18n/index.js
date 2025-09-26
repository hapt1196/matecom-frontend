import { createI18n } from 'vue-i18n'
import vi from './locales/vi/index.js'
import en from './locales/en/index.js'

const messages = {
  vi,
  en
}

const i18n = createI18n({
  legacy: false, // Sử dụng Composition API
  locale: 'vi', // Mặc định là 'vi'
  fallbackLocale: 'vi',
  messages
})

// Set locale từ localStorage sau khi i18n được tạo
try {
  const savedLanguage = localStorage.getItem('lang') || 'vi'
  i18n.global.locale.value = savedLanguage
} catch (e) {
  console.warn('localStorage not available, using default language')
}

export default i18n
