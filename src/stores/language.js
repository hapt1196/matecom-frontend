import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import i18n from '@/i18n'

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref(localStorage.getItem('lang') || 'vi')

  const availableLanguages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const currentLanguageInfo = computed(() => {
    return availableLanguages.find(lang => lang.code === currentLanguage.value) || availableLanguages[0]
  })

  const setLanguage = (languageCode) => {
    if (availableLanguages.some(lang => lang.code === languageCode)) {
      currentLanguage.value = languageCode
      localStorage.setItem('lang', languageCode)
      i18n.global.locale.value = languageCode
    }
  }

  const toggleLanguage = () => {
    const newLanguage = currentLanguage.value === 'vi' ? 'en' : 'vi'
    setLanguage(newLanguage)
  }

  return {
    currentLanguage,
    availableLanguages,
    currentLanguageInfo,
    setLanguage,
    toggleLanguage
  }
})
