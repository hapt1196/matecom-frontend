<template>
  <div>
    <v-app-bar 
      app 
      :elevation="isScrolled ? 4 : 0"
      :class="{ 'header-scrolled': isScrolled }"
      class="app-header"
      height="80"
    >
      <div class="header-content">
        <!-- Mobile Menu Button -->
        <div class="mobile-menu-btn d-md-none">
          <v-btn 
            icon 
            variant="text"
            @click="toggleDrawer"
            class="menu-toggle"
          >
            <Menu class="w-6 h-6" />
          </v-btn>
        </div>
        
        <!-- Logo -->
        <div class="logo-container">
          <router-link to="/" class="logo-link">
            <div class="logo-image"></div>
          </router-link>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="desktop-nav d-none d-md-flex">
          <router-link 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ 'active': currentRoute === item.path }"
          >
            {{ item.title }}
          </router-link>
        </nav>
        
        <!-- Language Selector -->
        <div class="language-selector d-none d-md-flex">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="language-btn"
              >
                {{ currentLanguage }}
                <ChevronDown class="w-4 h-4 ml-1" />
              </v-btn>
            </template>
            <v-list class="language-list">
              <v-list-item 
                v-for="lang in languageStore.availableLanguages" 
                :key="lang.code"
                @click="changeLanguage(lang.code)"
                :class="{ 'active': currentLanguage === lang.name }"
              >
                <v-list-item-title>{{ lang.flag }} {{ lang.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer 
      v-model="drawer" 
      app 
      temporary 
      class="mobile-drawer"
      width="280"
      location="left"
      :scrim="true"
    >
      <div class="drawer-header">
        <img 
          src="@/assets/matecom_logo_transparent.png" 
          alt="MATECOM" 
          height="40" 
        />
        <v-btn 
          icon 
          variant="text"
          @click="drawer = false"
          class="close-btn"
        >
          <X class="w-6 h-6" />
        </v-btn>
      </div>
      
      <nav class="mobile-nav">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="mobile-nav-link"
          :class="{ 'active': currentRoute === item.path }"
          @click="handleMobileNavClick(item)"
        >
          {{ item.title }}
        </router-link>
      </nav>
      
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/language'
import { Menu, X, ChevronDown } from 'lucide-vue-next'

const route = useRoute()
const { t } = useI18n()
const languageStore = useLanguageStore()
const drawer = ref(false)
const isScrolled = ref(false)

const currentRoute = computed(() => route.path)

const menuItems = computed(() => [
  { path: '/', title: t('header.home') },
  { path: '/services', title: t('header.services') },
  { path: '/about', title: t('header.about') },
  { path: '/partners', title: t('header.partners') },
  { path: '/agency', title: t('header.agencyCorner') },
  { path: '/ai-assistant', title: t('header.aiAssistant') },
  { path: '/recruitment', title: t('header.recruitment') },
  { path: '/contact', title: t('header.contact') }
])

const currentLanguage = computed(() => languageStore.currentLanguageInfo.name)

const openSearch = () => {
  // TODO: Implement search functionality
  console.log('Open search')
}

const changeLanguage = (code) => {
  languageStore.setLanguage(code)
}

const contactUs = () => {
  // TODO: Navigate to contact page or open contact modal
  console.log('Contact us')
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Debug function to check drawer state
const toggleDrawer = () => {
  console.log('Toggle drawer clicked, current state:', drawer.value)
  drawer.value = !drawer.value
  console.log('New drawer state:', drawer.value)
}

// Handle mobile navigation click
const handleMobileNavClick = (item) => {
  console.log('Mobile nav clicked:', item.title, item.path)
  drawer.value = false
  console.log('Drawer closed after navigation')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Header Container */
.app-header {
  background: #05113b !important;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  border: none !important;
  border-bottom: none !important;
}

/* Override Vuetify app-bar styles */
:deep(.v-app-bar) {
  border: none !important;
  border-bottom: none !important;
}

:deep(.v-app-bar__content) {
  border: none !important;
  border-bottom: none !important;
}

.header-scrolled {
  background: #05113b !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
}

.header-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  height: 80px;
  position: relative;
}

/* Logo */
.logo-container {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

/* Center logo on mobile */
@media (max-width: 768px) {
  .logo-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block !important;
  }
}

.logo-link {
  text-decoration: none;
  display: block;
}

.logo-image {
  width: 200px;
  height: 120px;
  background-image: url('@/assets/matecom_logo_transparent.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.05);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 10;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

/* Language Selector */
.language-selector {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}

.language-btn {
  color: #F8FAFC !important;
  font-family: var(--font-family-heading) !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  text-transform: none !important;
  padding: 8px 12px !important;
  border-radius: 6px !important;
  transition: all 0.3s ease !important;
}

.language-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #3B82F6 !important;
}

.language-list {
  border-radius: 8px;
  overflow: hidden;
  background: #05113b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.language-list .v-list-item {
  transition: all 0.3s ease;
  color: #F8FAFC;
  padding: 12px 16px;
}

.language-list .v-list-item:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
}

.language-list .v-list-item.active {
  background: rgba(59, 130, 246, 0.2);
  color: #3B82F6;
  font-weight: 600;
}

.nav-link {
  font-family: var(--font-family-heading);
  font-size: 16px;
  font-weight: 500;
  color: #F8FAFC;
  text-decoration: none;
  padding: 8px 0;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #3B82F6;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link:hover {
  color: #3B82F6;
}

.nav-link.active {
  color: #3B82F6;
  font-weight: 600;
}


/* Mobile Menu Toggle */
.menu-toggle {
  color: #F8FAFC !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
}

.menu-toggle:hover {
  background: rgba(59, 130, 246, 0.2) !important;
  color: #3B82F6 !important;
  transform: scale(1.05);
}

/* Mobile Drawer */
.mobile-drawer {
  background: #05113b !important;
  z-index: 1000 !important;
}

:deep(.v-navigation-drawer) {
  background: #05113b !important;
  z-index: 1000 !important;
}

:deep(.v-navigation-drawer__content) {
  z-index: 1001 !important;
  position: relative;
}

:deep(.v-navigation-drawer__scrim) {
  z-index: 999 !important;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: #05113b;
  position: relative;
  z-index: 1001;
}

.drawer-header img {
  filter: brightness(0) invert(1);
}

.close-btn {
  color: white !important;
}

/* Mobile Navigation */
.mobile-nav {
  padding: 24px 0;
  position: relative;
  z-index: 1001;
}

.mobile-nav-link {
  display: block;
  font-family: var(--font-family-heading);
  font-size: 18px;
  font-weight: 500;
  color: #F8FAFC;
  text-decoration: none;
  padding: 16px 24px;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  position: relative;
  z-index: 1002;
  cursor: pointer;
  pointer-events: auto;
}

.mobile-nav-link:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
  border-left-color: #3B82F6;
}

.mobile-nav-link.active {
  background: rgba(59, 130, 246, 0.15);
  color: #3B82F6;
  font-weight: 600;
  border-left-color: #3B82F6;
}

/* Ensure router-link works properly in mobile drawer */
:deep(.mobile-nav .router-link-active) {
  background: rgba(59, 130, 246, 0.15) !important;
  color: #3B82F6 !important;
  font-weight: 600 !important;
  border-left-color: #3B82F6 !important;
}

:deep(.mobile-nav a) {
  display: block !important;
  text-decoration: none !important;
  color: inherit !important;
  width: 100% !important;
  height: 100% !important;
}


/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    padding: 0 20px;
  }
  
  .logo-container {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block !important;
    z-index: 2;
  }
  
  .mobile-menu-btn {
    left: 20px;
    display: flex !important; /* Ensure mobile menu button is visible */
  }
  
  .language-selector {
    right: 20px;
  }
  
  .logo-image {
    width: 200px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0 16px;
  }
  
  .logo-container {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block !important;
    z-index: 2;
  }
  
  .mobile-menu-btn {
    left: 16px;
    display: flex !important; /* Ensure mobile menu button is visible */
  }
  
  .language-selector {
    right: 16px;
  }
  
  .logo-image {
    width: 160px;
    height: 65px;
  }
}

</style>
