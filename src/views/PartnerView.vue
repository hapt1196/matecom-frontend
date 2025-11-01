<template>
  <div class="partner-view">
    <!-- Hero Section -->
    <section class="hero-section fade-in-up">
      <v-container>
        <div class="hero-content">
          <p class="hero-slogan">
            "{{ t('partners.hero.slogan') }}"
          </p>
        </div>
      </v-container>
    </section>

    <!-- Partner Logos Section -->
    <section class="partners-section">
      <v-container>
        <div class="section-header fade-in-up">
          <h2 class="section-title">{{ t('partners.strategicPartners.title') }}</h2>
          <p class="section-subtitle">{{ t('partners.strategicPartners.subtitle') }}</p>
        </div>
        
        <div class="partners-scroll-container fade-in-up">
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

    <!-- Technology Partners Section -->
    <section class="tech-partners-section">
      <v-container>
        <div class="section-header fade-in-up">
          <h2 class="section-title">{{ t('partners.techPartners.title') }}</h2>
          <p class="section-subtitle">{{ t('partners.techPartners.subtitle') }}</p>
        </div>
        
        <div class="tech-partners-grid fade-in-up">
          <div class="tech-partner-logo">
            <img 
              :src="zohopartnerLogo" 
              alt="Zoho Partner"
              class="tech-partner-image"
            />
          </div>
        </div>
      </v-container>
    </section>

    <!-- Introduction Section -->
    <section class="intro-section">
      <v-container>
        <div class="intro-content fade-in-up">
          <p class="intro-text">
            {{ t('partners.intro.text1') }}
          </p>
          <p class="intro-text">
            {{ t('partners.intro.text2') }}
          </p>
        </div>
      </v-container>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section">
      <v-container>
        <div class="section-header fade-in-up">
          <h2 class="section-title">{{ t('partners.benefits.title') }}</h2>
        </div>
        
        <div class="benefits-list">
          <div 
            v-for="(benefit, index) in benefits" 
            :key="benefit.id"
            class="benefit-item fade-in-up"
            :style="{ transitionDelay: `${index * 0.1}s` }"
          >
            <div class="benefit-number">{{ benefit.number }}</div>
            <div class="benefit-content">
              <h3 class="benefit-title">{{ benefit.title }}</h3>
              <p class="benefit-description">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <v-container>
        <div class="cta-content fade-in-up">
          <h2 class="cta-title">{{ t('partners.cta.title') }}</h2>
          <p class="cta-text">
            {{ t('partners.cta.description') }}
          </p>
          <ContactButton
            :text="t('partners.cta.button')"
            custom-class="cta-btn orange-accent"
            @click="contactUs"
          />
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { onMounted, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ContactButton from '@/components/common/ContactButton.vue'
// Import partner logos
import bingadsLogo from '@/assets/img/companion/bingads.png'
import googlepartnerLogo from '@/assets/img/companion/googlepartner.png'
import metabusinessLogo from '@/assets/img/companion/metabusiness.png'
import tiktokLogo from '@/assets/img/companion/tiktok.png'
import zalobusinessLogo from '@/assets/img/companion/zalobusiness.png'
import zohopartnerLogo from '@/assets/img/companion/zohopartner.png'

const { t } = useI18n()
const router = useRouter()

const partners = [
  {
    id: 2,
    name: 'Google Partner',
    logo: googlepartnerLogo
  },
  {
    id: 3,
    name: 'Meta Business',
    logo: metabusinessLogo
  },
  {
    id: 4,
    name: 'TikTok',
    logo: tiktokLogo
  },
  {
    id: 5,
    name: 'Zalo Business',
    logo: zalobusinessLogo
  }
]

// Computed property for benefits
const benefits = computed(() => {
  return [
    {
      id: 1,
      number: '1',
      title: t('partners.benefits.items.0.title'),
      description: t('partners.benefits.items.0.description')
    },
    {
      id: 2,
      number: '2',
      title: t('partners.benefits.items.1.title'),
      description: t('partners.benefits.items.1.description')
    },
    {
      id: 3,
      number: '3',
      title: t('partners.benefits.items.2.title'),
      description: t('partners.benefits.items.2.description')
    },
    {
      id: 4,
      number: '4',
      title: t('partners.benefits.items.3.title'),
      description: t('partners.benefits.items.3.description')
    },
    {
      id: 5,
      number: '5',
      title: t('partners.benefits.items.4.title'),
      description: t('partners.benefits.items.4.description')
    },
    {
      id: 6,
      number: '6',
      title: t('partners.benefits.items.5.title'),
      description: t('partners.benefits.items.5.description')
    }
  ]
})

const contactUs = () => {
  router.push('/contact')
}

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
.partner-view {
  min-height: 100vh;
  
  /* Light background for entire view */
  background: rgb(238, 245, 254);
  
  /* CSS Variables - Light Theme */
  --hero-bg: transparent;
  --hero-overlay: transparent;
  --hero-text: #03045e;
  --hero-accent: #F59E0B;  /* MarcomMate accent orange */
  --intro-bg: transparent;
  --intro-text-color: #03045e;
  --partners-bg: transparent;
  --partners-title-color: #03045e;
  --partners-subtitle-color: #03045e;
  --partner-logo-bg: #ffffff;
  --partner-logo-border: #e5e7eb;
  --tech-partners-bg: transparent;
  --tech-partner-logo-bg: #ffffff;
  --tech-partner-logo-border: #e5e7eb;
  --benefits-bg: transparent;
  --benefit-item-bg: rgba(255, 255, 255, 0.8);
  --benefit-item-border: rgba(59, 130, 246, 0.3);
  --benefit-number-bg: linear-gradient(135deg, #1E3A8A, #3B82F6);  /* MarcomMate primary colors */
  --benefit-number-color: #ffffff;
  --benefit-title-color: #03045e;
  --benefit-description-color: #03045e;
  --cta-bg: transparent;
  --cta-text: #03045e;
  --cta-btn-bg: linear-gradient(135deg, #F59E0B, #F97316);  /* MarcomMate accent orange */
  --cta-btn-hover: linear-gradient(135deg, #F97316, #EA580C);  /* MarcomMate accent orange hover */
}

/* Single Theme - No Dark/Light Mode */

/* Hero Section */
.hero-section {
  background: var(--hero-bg);
  position: relative;
  padding: var(--spacing-6xl) 0;
  min-height: 20vh;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--hero-text);
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-5xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--hero-text);
}

.hero-slogan {
  font-family: var(--font-family-accent);
  font-weight: 300;
  font-style: italic;
  font-size: var(--font-size-xl);
  color: #03045e;
  max-width: 600px;
  margin: 0 auto;
}

/* Introduction Section */
.intro-section {
  background: var(--intro-bg);
  padding: var(--spacing-5xl) 0;
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.intro-text {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  line-height: 1.8;
  color: var(--intro-text-color);
  margin-bottom: var(--spacing-md);
}

/* Partners Section */
.partners-section {
  background: var(--partners-bg);
  padding-bottom: 10vh;
}

.section-subtitle {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  color: var(--partners-subtitle-color);
  margin-top: var(--spacing-sm);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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
  background: var(--partner-logo-bg);
  border: 1px solid var(--partner-logo-border);
  border-radius: 16px;
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 350px;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.partner-image {
  height: 80px;
  width: auto;
}

/* Technology Partners Section */
.tech-partners-section {
  background: var(--tech-partners-bg);
  padding-bottom: 10vh;
}

.tech-partners-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--spacing-2xl);
}

.tech-partner-logo {
  background: var(--tech-partner-logo-bg);
  border: 1px solid var(--tech-partner-logo-border);
  border-radius: 16px;
  padding: var(--spacing-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  min-width: 250px;
  box-shadow: var(--shadow-md);
}

.tech-partner-image {
  max-width: 100%;
  max-height: 100px;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* Benefits Section */
.benefits-section {
  background: var(--benefits-bg);
  padding: var(--spacing-5xl) 0;
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--benefit-title-color);
}

/* Benefits List */
.benefits-list {
  max-width: 800px;
  margin: 0 auto;
  margin-top: var(--spacing-xl);
}

.benefit-item {
  background: var(--benefit-item-bg);
  border: 1px solid var(--benefit-item-border);
  border-radius: 16px;
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  transition: all var(--transition-normal);
}

.benefit-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-blue);
}

.benefit-number {
  background: var(--benefit-number-bg);
  color: var(--benefit-number-color);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  font-weight: 700;
  flex-shrink: 0;
}

.benefit-content {
  flex: 1;
}

.benefit-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--benefit-title-color);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
}

.benefit-description {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: var(--benefit-description-color);
  line-height: 1.6;
  margin: 0;
}

/* CTA Section */
.cta-section {
  background: var(--cta-bg);
  padding-bottom: 10vh;
  text-align: center;
  color: var(--cta-text);
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  color: var(--cta-text);
}

.cta-text {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
  color: var(--cta-text);
  opacity: 0.9;
}

.cta-btn {
  padding: var(--spacing-lg) var(--spacing-2xl);
}

/* Scroll Animation */
.fade-in-up {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-slogan {
    font-size: var(--font-size-lg);
  }
  
  .section-title {
    font-size: var(--font-size-3xl);
  }
  
  .cta-title {
    font-size: var(--font-size-3xl);
  }
  
  .benefit-item {
    padding: var(--spacing-lg);
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-md);
  }
  
  .benefit-number {
    width: 40px;
    height: 40px;
    font-size: var(--font-size-lg);
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
  
  .tech-partner-logo {
    height: 120px;
    min-width: 200px;
    padding: var(--spacing-xl);
  }
  
  .tech-partner-image {
    max-height: 80px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: var(--spacing-3xl) 0;
  }
  
  .intro-section,
  .partners-section,
  .tech-partners-section,
  .benefits-section,
  .cta-section {
    padding: var(--spacing-2xl) 0;
  }
  
  .benefit-item {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
  
  .benefit-number {
    width: 35px;
    height: 35px;
    font-size: var(--font-size-base);
  }
  
  .benefit-title {
    font-size: var(--font-size-base);
  }
  
  .benefit-description {
    font-size: var(--font-size-sm);
  }
  
  .partners-scroll {
    gap: var(--spacing-md);
  }
  
  .partner-logo {
    height: 80px;
    min-width: 120px;
    padding: var(--spacing-md);
  }
  
  .partner-image {
    max-height: 50px;
  }
  
  .tech-partner-logo {
    height: 100px;
    min-width: 150px;
    padding: var(--spacing-lg);
  }
  
  .tech-partner-image {
    max-height: 60px;
  }
}
</style>
