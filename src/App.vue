<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

const route = useRoute()

// Check if current route is business route
const isBusinessRoute = computed(() => {
  return route.path === '/business' || route.path === '/business/login'
})
</script>

<template>
  <v-app theme="dark">
    <AppHeader v-if="!isBusinessRoute" />
    <v-main>
      <RouterView />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style>
/* Global styles can go here */
</style>
