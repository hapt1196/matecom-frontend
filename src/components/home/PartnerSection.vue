<template>
  <section class="partner-section">
    <v-container>
      <div class="section-header">
        <h2 class="section-title">{{ t('home.partners.title') }}</h2>
        <p class="section-subtitle">{{ t('home.partners.subtitle') }}</p>
      </div>
      
      <div class="partners-scroll-container">
        <div class="partners-scroll">
          <div 
            v-for="(partner, index) in partners" 
            :key="partner.id"
            class="partner-logo"
          >
            <img 
              :src="partner.logo" 
              :alt="partner.name"
              class="partner-image"
            />
          </div>
          <!-- Duplicate logos for seamless loop -->
          <div 
            v-for="(partner, index) in partners" 
            :key="`duplicate-${partner.id}`"
            class="partner-logo"
          >
            <img 
              :src="partner.logo" 
              :alt="partner.name"
              class="partner-image"
            />
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Import ảnh trực tiếp
import googlePartnerLogo from '@/assets/img/companion/googlepartner.png'
import metaBusinessLogo from '@/assets/img/companion/metabusiness.png'
import tiktokLogo from '@/assets/img/companion/tiktok.png'
import bingAdsLogo from '@/assets/img/companion/bingads.png'
import zaloBusinessLogo from '@/assets/img/companion/zalobusiness.png'

// Danh sách đối tác với logo từ thư mục companion
const partners = ref([
  {
    id: 1,
    name: 'Google Partner',
    logo: googlePartnerLogo
  },
  {
    id: 2,
    name: 'Meta Business',
    logo: metaBusinessLogo
  },
  {
    id: 3,
    name: 'TikTok',
    logo: tiktokLogo
  },
  {
    id: 5,
    name: 'Zalo Business',
    logo: zaloBusinessLogo
  }
])
</script>

<style scoped>
.partner-section {
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
  background: transparent;
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-5xl);
  font-weight: 900;
  color: #03045e;
  margin-bottom: var(--spacing-sm);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-subtitle {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  color: #03045e;
  max-width: 600px;
  margin: 0 auto;
}

.partners-scroll-container {
  overflow: hidden;
  margin-top: var(--spacing-2xl);
  position: relative;
}

.partners-scroll {
  display: flex;
  gap: var(--spacing-2xl);
  animation: scroll-left 30s linear infinite;
  width: fit-content;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.partner-logo {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 350px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.partner-logo:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #F59E0B;
}

.partner-image {
  max-width: 100%;
  max-height: 80px;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* Single Theme - No Dark/Light Mode */

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-4xl);
  }
  
  .partners-scroll {
    gap: var(--spacing-lg);
  }
  
  .partner-logo {
    height: 100px;
    min-width: 150px;
    padding: var(--spacing-lg);
  }
  
  .partner-image {
    max-height: 60px;
  }
}

@media (max-width: 480px) {
  .partner-logo {
    height: 80px;
    min-width: 120px;
    padding: var(--spacing-md);
  }
  
  .partner-image {
    max-height: 50px;
  }
}
</style>
