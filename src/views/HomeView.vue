<template>
  <div class="home-view">
    <HeroSection class="fade-in-up" />
    <ServiceSection class="fade-in-up" />
    <PartnerSection class="fade-in-up" />
    <CompanySection class="fade-in-up" />
    <BlogSection class="fade-in-up" />
    <RecruitmentSection class="fade-in-up" />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import ServiceSection from '@/components/home/ServiceSection.vue'
import PartnerSection from '@/components/home/PartnerSection.vue'
import CompanySection from '@/components/home/CompanySection.vue'
import BlogSection from '@/components/home/BlogSection.vue'
import RecruitmentSection from '@/components/home/RecruitmentSection.vue'

onMounted(async () => {
  await nextTick()
  
  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)
  
  // Observe animation elements
  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  
  /* Gradient background for entire view */
  background: linear-gradient(180deg, 
    #060F2A 0%, 
    #072845 25%, 
    #0D4496 50%, 
    #1E3A8A 75%, 
    #0F172A 100%
  );
}

/* Scroll Animation */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animation for sections */
.fade-in-up:nth-child(1) { transition-delay: 0.05s; }
.fade-in-up:nth-child(2) { transition-delay: 0.1s; }
.fade-in-up:nth-child(3) { transition-delay: 0.15s; }
.fade-in-up:nth-child(4) { transition-delay: 0.2s; }
.fade-in-up:nth-child(5) { transition-delay: 0.25s; }
.fade-in-up:nth-child(6) { transition-delay: 0.3s; }
</style>
