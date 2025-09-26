<template>
  <div class="service-view">
    <!-- Hero Section -->
    <section class="hero-section fade-in-up">
      <v-container>
        <div class="hero-content">
          <h1 class="hero-title">{{ t('serviceView.services.title') }}</h1>
          <p class="hero-slogan">
            "{{ t('serviceView.services.subtitle') }}"
          </p>
        </div>
      </v-container>
    </section>

    <!-- Introduction Section -->
    <section class="intro-section">
      <v-container>
        <div class="intro-content fade-in-up">
          <p class="intro-text">
            {{ t('serviceView.services.intro.question1') }}
          </p>
          <p class="intro-text">
            {{ t('serviceView.services.intro.answer1') }}
          </p>
          <p class="intro-text">
            {{ t('serviceView.services.intro.answer2') }}
          </p>
          <p class="intro-text">
            {{ t('serviceView.services.intro.answer3') }}
          </p>
          <p class="intro-text">
            {{ t('serviceView.services.intro.answer4') }}
          </p>
        </div>
      </v-container>
    </section>

    <!-- Main Services Section -->
    <section class="main-services-section">
      <v-container>
        <div class="section-header fade-in-up">
          <h2 class="section-title">{{ t('serviceView.services.mainPackagesTitle') }}</h2>
        </div>
        
        <!-- Service 1 -->
        <div class="service-item fade-in-up">
          <div class="service-image">
            <img src="/src/assets/img/services/Basic.png" alt="Basic Service" />
          </div>
          <div class="service-content">
            <div class="service-badge">Basic</div>
            <h3 class="service-name">{{ t('serviceView.services.packages.basic.name') }}</h3>
            <p class="service-description">{{ t('serviceView.services.packages.basic.description') }}</p>
            
            <div class="service-features">
              <ul>
                <li>{{ t('serviceView.services.packages.basic.features.item1') }}</li>
                <li>{{ t('serviceView.services.packages.basic.features.item2') }}</li>
                <li>{{ t('serviceView.services.packages.basic.features.item3') }}</li>
              </ul>
            </div>
            
            <div class="service-actions">
              <v-btn
                color="primary"
                variant="outlined"
                class="detail-btn"
                @click="goToServiceDetail('basic')"
              >
                {{ t('common.learnMore') }}
                <ArrowRight class="w-4 h-4 ml-2" />
              </v-btn>
            </div>
          </div>
        </div>

        <!-- Service 2 -->
        <div class="service-item fade-in-up">
          <div class="service-image">
            <img src="/src/assets/img/services/Advanced .png" alt="Advanced Service" />
          </div>
          <div class="service-content">
            <div class="service-badge">Advanced</div>
            <h3 class="service-name">{{ t('serviceView.services.packages.advanced.name') }}</h3>
            <p class="service-description">{{ t('serviceView.services.packages.advanced.description') }}</p>
            
            <div class="service-features">
              <ul>
                <li>{{ t('serviceView.services.packages.advanced.features.item1') }}</li>
                <li>{{ t('serviceView.services.packages.advanced.features.item2') }}</li>
                <li>{{ t('serviceView.services.packages.advanced.features.item3') }}</li>
              </ul>
            </div>
            
            <div class="service-actions">
              <v-btn
                color="primary"
                variant="outlined"
                class="detail-btn"
                @click="goToServiceDetail('advanced')"
              >
                {{ t('common.learnMore') }}
                <ArrowRight class="w-4 h-4 ml-2" />
              </v-btn>
            </div>
          </div>
        </div>

        <!-- Service 3 -->
        <div class="service-item fade-in-up">
          <div class="service-image">
            <img src="/src/assets/img/services/Premium.png" alt="Premium Service" />
          </div>
          <div class="service-content">
            <div class="service-badge">Premium</div>
            <h3 class="service-name">{{ t('serviceView.services.packages.premium.name') }}</h3>
            <p class="service-description">{{ t('serviceView.services.packages.premium.description') }}</p>
            
            <div class="service-features">
              <ul>
                <li>{{ t('serviceView.services.packages.premium.features.item1') }}</li>
                <li>{{ t('serviceView.services.packages.premium.features.item2') }}</li>
                <li>{{ t('serviceView.services.packages.premium.features.item3') }}</li>
              </ul>
            </div>
            
            <div class="service-actions">
              <v-btn
                color="primary"
                variant="outlined"
                class="detail-btn"
                @click="goToServiceDetail('premium')"
              >
                {{ t('common.learnMore') }}
                <ArrowRight class="w-4 h-4 ml-2" />
              </v-btn>
            </div>
          </div>
        </div>
      </v-container>
    </section>

    <!-- Add-ons Section -->
    <section class="addons-section">
      <v-container>
        <div class="section-header fade-in-up">
          <h2 class="section-title">{{ t('serviceView.services.addons.title') }}</h2>
          <p class="section-subtitle">
            {{ t('serviceView.services.addons.subtitle') }}
          </p>
        </div>
        
        <div class="addons-list">
          <div 
            v-for="(addon, index) in addonsItems" 
            :key="index"
            class="addon-item fade-in-up"
          >
            <h3 class="addon-title">{{ addon.title }}</h3>
            <p class="addon-description">
              {{ addon.description }}
            </p>
            <div class="addon-benefits">
              <h4>{{ addon.benefits.title }}</h4>
              <ul>
                <li v-for="(benefit, benefitIndex) in addon.benefits.items" :key="benefitIndex">
                  <strong>{{ benefit }}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="addons-conclusion fade-in-up">
          <p>{{ t('serviceView.services.addons.conclusion') }}</p>
        </div>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <v-container>
        <div class="cta-content fade-in-up">
          <h2 class="cta-title">{{ t('serviceView.services.cta.title') }}</h2>
          <p class="cta-text">
            {{ t('serviceView.services.cta.description') }}
          </p>
          <ContactButton
            :text="t('serviceView.services.cta.contactButton')"
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
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowRight } from 'lucide-vue-next'
import ContactButton from '@/components/common/ContactButton.vue'

const router = useRouter()
const { t } = useI18n()

// Computed property for addons items
const addonsItems = computed(() => {
  return [
    {
      title: t('serviceView.services.addons.items.0.title'),
      description: t('serviceView.services.addons.items.0.description'),
      benefits: {
        title: t('serviceView.services.addons.items.0.benefits.title'),
        items: [
          t('serviceView.services.addons.items.0.benefits.items.0'),
          t('serviceView.services.addons.items.0.benefits.items.1'),
          t('serviceView.services.addons.items.0.benefits.items.2')
        ]
      }
    },
    {
      title: t('serviceView.services.addons.items.1.title'),
      description: t('serviceView.services.addons.items.1.description'),
      benefits: {
        title: t('serviceView.services.addons.items.1.benefits.title'),
        items: [
          t('serviceView.services.addons.items.1.benefits.items.0'),
          t('serviceView.services.addons.items.1.benefits.items.1'),
          t('serviceView.services.addons.items.1.benefits.items.2')
        ]
      }
    },
    {
      title: t('serviceView.services.addons.items.2.title'),
      description: t('serviceView.services.addons.items.2.description'),
      benefits: {
        title: t('serviceView.services.addons.items.2.benefits.title'),
        items: [
          t('serviceView.services.addons.items.2.benefits.items.0'),
          t('serviceView.services.addons.items.2.benefits.items.1'),
          t('serviceView.services.addons.items.2.benefits.items.2')
        ]
      }
    }
  ]
})

const contactUs = () => {
  router.push('/contact')
}

const goToServiceDetail = (serviceType) => {
  router.push(`/services/${serviceType}`)
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
.service-view {
  min-height: 100vh;
  
  /* Updated background color as requested */
  background: rgb(238, 245, 254);
  
  /* CSS Variables - Updated Theme */
  --hero-bg: transparent;
  --hero-overlay: transparent;
  --hero-text: #03045e;
  --hero-accent: #F59E0B;  /* MarcomMate accent orange */
  --intro-bg: transparent;
  --intro-text-color: #03045e;
  --main-services-bg: transparent;
  --service-item-bg: rgba(255, 255, 255, 0.9);
  --service-item-border: rgba(3, 4, 94, 0.2);
  --service-header-bg: rgba(255, 255, 255, 0.9);
  --service-badge-basic: #90e0ef;
  --service-badge-advanced: #00b4d8;
  --service-badge-premium: #0077b6;
  --service-badge-text: #03045e;
  --service-title-color: #03045e;
  --service-subtitle-color: #03045e;
  --service-text-color: #03045e;
  --addons-bg: transparent;
  --addon-item-bg: rgba(255, 255, 255, 0.9);
  --addon-item-border: rgba(3, 4, 94, 0.2);
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
  color: var(--hero-accent);
  max-width: 800px;
  margin: 0 auto;
}

/* Introduction Section */
.intro-section {
  background: var(--intro-bg);
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
}

.intro-content {
  margin: 0 auto;
}

.intro-text {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  line-height: 1.8;
  color: var(--intro-text-color);
  margin-bottom: var(--spacing-md);
  text-align: justify;
}

/* Main Services Section */
.main-services-section {
  background: var(--main-services-bg);
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
  color: var(--service-title-color);
  margin-bottom: var(--spacing-md);
}

.section-subtitle {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  color: var(--service-subtitle-color);
  margin: 0 auto;
  text-align: justify;
}

/* Service Items */
.service-item {
  background: var(--service-item-bg);
  border: 1px solid var(--service-item-border);
  border-radius: 20px;
  margin-bottom: var(--spacing-3xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  min-height: 400px;
}

.service-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.service-image {
  flex: 0 0 60%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(3, 4, 94, 0.05);
  overflow: hidden;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0;
  box-shadow: none;
  transition: transform var(--transition-normal);
}

.service-image img:hover {
  transform: scale(1.05);
}

.service-content {
  flex: 0 0 40%;
  padding: var(--spacing-md) var(--spacing-xl);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}

.service-badge {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 20px;
  color: #ffff;
  font-family: var(--font-family-heading);
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 120px;
  text-align: center;
  display: inline-block;
  margin-bottom: var(--spacing-sm);
  top: var(--spacing-md);
  right: var(--spacing-xl);
}

.service-item:nth-child(1) .service-badge {
  background: #90e0ef;
}

.service-item:nth-child(2) .service-badge {
  background: #00b4d8;
}

.service-item:nth-child(3) .service-badge {
  background: #0077b6;
}

.service-name {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--service-title-color);
  margin: var(--spacing-lg) 0 var(--spacing-xs) 0;
  line-height: 1.2;
}

.service-description {
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  color: var(--service-text-color);
  line-height: 1.4;
  margin-bottom: var(--spacing-sm);
}

.service-intro h4,
.service-details h4 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--service-title-color);
  margin: var(--spacing-xs) 0 var(--spacing-xs);
}

.service-points,
.service-features {
  list-style: none;
  padding: 0;
  margin: var(--spacing-xs) 0;
}

.service-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-points li,
.service-features li {
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  color: var(--service-text-color);
  line-height: 1.4;
  margin-bottom: var(--spacing-xs);
  padding-left: var(--spacing-md);
  position: relative;
}

.service-points li::before,
.service-features li::before {
  content: '';
  color: #03045e;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.service-highlight {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  color: #03045e;
  font-weight: 600;
  font-style: italic;
  margin: var(--spacing-md) 0;
  padding: var(--spacing-md);
  background: rgba(3, 4, 94, 0.1);
  border-left: 4px solid #03045e;
  border-radius: 0 8px 8px 0;
}

.service-steps {
  list-style: none;
  padding: 0;
  counter-reset: step-counter;
}

.service-steps li {
  counter-increment: step-counter;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: rgba(3, 4, 94, 0.05);
  border-radius: 12px;
  border-left: 4px solid #03045e;
}

.service-steps li::before {
  content: counter(step-counter);
  background: #03045e;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-heading);
  font-weight: 700;
  font-size: var(--font-size-sm);
  margin-right: var(--spacing-md);
}

.service-steps strong {
  font-family: var(--font-family-heading);
  font-weight: 700;
  color: var(--service-title-color);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.service-steps p {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: var(--service-text-color);
  line-height: 1.6;
  margin: 0;
}

.service-actions {
  margin-top: var(--spacing-sm);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.detail-btn {
  font-family: var(--font-family-heading);
  font-weight: 600;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  min-width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
}

.cta-btn {
  padding: var(--spacing-lg) var(--spacing-2xl);
  margin: 0 auto;
  display: block;
}

.detail-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-lg);
  animation: bounce 0.6s ease-in-out;
}

/* Bounce animation for detail button */
@keyframes bounce {
  0% {
    transform: translateY(-4px) scale(1.02);
  }
  50% {
    transform: translateY(-8px) scale(1.05);
  }
  100% {
    transform: translateY(-4px) scale(1.02);
  }
}

/* Add-ons Section */
.addons-section {
  background: var(--addons-bg);
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
}

.addons-list {
  margin-top: var(--spacing-xl);
}

.addon-item {
  background: var(--addon-item-bg);
  border: 1px solid var(--addon-item-border);
  border-radius: 16px;
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  transition: all var(--transition-normal);
}

.addon-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.addon-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--service-title-color);
  margin-bottom: var(--spacing-sm);
}

.addon-description {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: var(--service-text-color);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.addon-benefits h4 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--service-title-color);
  margin: var(--spacing-md) 0 var(--spacing-sm);
}

.addon-benefits ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.addon-benefits li {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: var(--service-text-color);
  line-height: 1.6;
  margin-bottom: var(--spacing-xs);
  padding-left: var(--spacing-md);
  position: relative;
}

.addon-benefits li::before {
  content: '✓';
  color: var(--success-green);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.addons-conclusion {
  margin-top: var(--spacing-2xl);
  text-align: center;
}

.addons-conclusion p {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  color: var(--service-text-color);
  line-height: 1.6;
  font-style: italic;
  max-width: 800px;
  margin: 0 auto;
}

/* CTA Section */
.cta-section {
  background: var(--cta-bg);
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
  text-align: center;
  color: var(--cta-text);
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
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

/* CTA button styling handled by ContactButton component */

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

/* Staggered animation for service items */
.service-item.fade-in-up {
  transition-delay: 0.1s;
}

.service-item:nth-child(1).fade-in-up { transition-delay: 0.1s; }
.service-item:nth-child(2).fade-in-up { transition-delay: 0.2s; }
.service-item:nth-child(3).fade-in-up { transition-delay: 0.3s; }

/* Staggered animation for addon items */
.addon-item.fade-in-up {
  transition-delay: 0.1s;
}

.addon-item:nth-child(1).fade-in-up { transition-delay: 0.1s; }
.addon-item:nth-child(2).fade-in-up { transition-delay: 0.2s; }
.addon-item:nth-child(3).fade-in-up { transition-delay: 0.3s; }

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
  
  /* Mobile: Stack layout vertically */
  .service-item {
    flex-direction: column !important;
    min-height: auto;
  }
  
  .service-image {
    padding: var(--spacing-lg);
    order: 1;
  }
  
  .service-content {
    padding: var(--spacing-xl);
    order: 2;
  }
  
  .service-name {
    font-size: var(--font-size-2xl);
  }
  
  .service-description {
    font-size: var(--font-size-base);
  }
  
  .service-actions {
    justify-content: center;
  }
  
  .detail-btn {
    min-width: 150px;
    width: 100%;
    max-width: 250px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: var(--spacing-3xl) 0;
  }
  
  .intro-section,
  .main-services-section,
  .addons-section,
  .cta-section {
    padding: var(--spacing-2xl) 0;
  }
  
  .service-content {
    padding: var(--spacing-lg);
  }
  
  .addon-item {
    padding: var(--spacing-lg);
  }
  
  .service-image img {
    width: 100%;
  }
  
  .detail-btn {
    min-width: 100px;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-sm);
  }
}
</style>
