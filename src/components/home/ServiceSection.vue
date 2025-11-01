<template>
  <section class="service-section">
    <v-container>
      <div class="section-header text-center">
        <h2 class="section-title fade-in">{{ t('home.services.title') }}</h2>
        <p class="section-subtitle slide-up">
          {{ t('home.services.subtitle') }}
        </p>
      </div>
      
      <v-row class="services-grid">
        <v-col 
          v-for="(service, index) in services" 
          :key="service.id"
          cols="12" 
          md="6" 
          lg="4"
          class="service-col"
        >
          <div 
            class="service-card scale-in"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="service-header">
              <div class="service-badge" :class="service.badge.toLowerCase()">{{ service.badge }}</div>
            </div>
            
            <h3 class="service-name">{{ service.name }}</h3>
            <p class="service-description">{{ service.description }}</p>
            
            <div class="service-features">
              <div 
                v-for="feature in service.features" 
                :key="feature"
                class="service-feature"
              >
                <CheckCircle class="feature-check-icon mr-2 text-success" />
                <span>{{ feature }}</span>
              </div>
            </div>
            
            <v-btn
              variant="outlined"
              color="primary"
              class="service-btn"
              @click="learnMore(service)"
            >
              {{ t('common.learnMore') }}
              <ArrowRight class="w-4 h-4 ml-1" />
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { onMounted, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
  CheckCircle,
  ArrowRight
} from 'lucide-vue-next'

const router = useRouter()
const { t } = useI18n()

const services = computed(() => [
  {
    id: 1,
    name: t('home.services.basic.title'),
    description: t('home.services.basic.description'),
    badge: 'Basic',
    features: [
      t('home.services.basic.features[0]'),
      t('home.services.basic.features[1]'),
      t('home.services.basic.features[2]')
    ]
  },
  {
    id: 2,
    name: t('home.services.advanced.title'),
    description: t('home.services.advanced.description'),
    badge: 'Advanced',
    features: [
      t('home.services.advanced.features[0]'),
      t('home.services.advanced.features[1]'),
      t('home.services.advanced.features[2]')
    ]
  },
  {
    id: 3,
    name: t('home.services.premium.title'),
    description: t('home.services.premium.description'),
    badge: 'Premium',
    features: [
      t('home.services.premium.features[0]'),
      t('home.services.premium.features[1]'),
      t('home.services.premium.features[2]')
    ]
  }
])

const learnMore = (service) => {
  // Chuyển đến trang ServiceView
  router.push('/services')
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
  document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.service-section {
  padding: var(--spacing-5xl) 0;
  background: transparent;
  
  /* CSS Variables - MarcomMate Inspired Dark Theme */
  --service-section-bg: transparent;
  --service-card-bg: rgba(255, 255, 255, 0.9);
  --service-card-border: rgba(3, 4, 94, 0.2);
  --service-icon-bg: rgba(30, 41, 59, 0.8);
  --service-title-color: #03045e;
  --service-description-color: #03045e;
  --service-feature-color: #03045e;
}

.section-header {
  margin-bottom: var(--spacing-1xl);
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-5xl);
  font-weight: 900;
  color: #03045e;
  margin-bottom: var(--spacing-lg);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-subtitle {
  font-size: var(--font-size-xl);
  color: #03045e;
  max-width: 600px;
  margin: 0 auto;
}


.service-col {
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-md);
}

.service-card {
  background: var(--service-card-bg);
  border-radius: 20px;
  padding: var(--spacing-2xl);
  height: 100%;
  box-shadow: var(--shadow-md);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1px solid var(--service-card-border);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform-origin: center center;
  transform: scale(0.9);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-blue), var(--accent-orange));
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}

.service-card:hover {
  transform: translateY(-12px) scale(1.0);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 10;
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  position: relative;
}

.service-badge {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 20px;
  color: white;
  font-family: var(--font-family-heading);
  font-weight: 600;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 120px;
  text-align: center;
  display: inline-block;
}

.service-badge.basic {
  background: #90e0ef;
}

.service-badge.advanced {
  background: #00b4d8;
}

.service-badge.premium {
  background: #0077b6;
}


.service-name {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--service-title-color);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.service-description {
  font-size: var(--font-size-base);
  color: var(--service-description-color);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.service-features {
  margin-bottom: var(--spacing-xl);
}

.service-feature {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--service-feature-color);
}

.feature-check {
  margin-right: var(--spacing-sm);
  flex-shrink: 0;
}

.feature-check-icon {
  width: 24px;
  height: 24px;
  color: #03045e;
  flex-shrink: 0;
  margin-top: 2px;
}

.service-btn {
  width: 100%;
  border-radius: 12px;
  font-weight: 600;
  text-transform: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  margin-top: auto;
}

.service-btn:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: bounce 0.6s ease-in-out;
}

.service-btn:active {
  transform: translateY(-4px) scale(1.02);
  transition: all 0.1s ease;
  animation: none;
}

/* Bounce animation keyframes */
@keyframes bounce {
  0% {
    transform: translateY(-8px) scale(1.05);
  }
  50% {
    transform: translateY(-12px) scale(1.08);
  }
  100% {
    transform: translateY(-8px) scale(1.05);
  }
}

/* Animation delays for staggered entrance */
.service-card:nth-child(1) { animation-delay: 0.1s; }
.service-card:nth-child(2) { animation-delay: 0.2s; }
.service-card:nth-child(3) { animation-delay: 0.3s; }
.service-card:nth-child(4) { animation-delay: 0.4s; }
.service-card:nth-child(5) { animation-delay: 0.5s; }
.service-card:nth-child(6) { animation-delay: 0.6s; }

/* Dark Theme - Default Theme */
:deep(.v-theme--dark) .service-section {
  --service-section-bg: var(--background-dark);
  --service-card-bg: var(--surface-dark);
  --service-card-border: var(--border-dark);
  --service-icon-bg: var(--surface-dark);
  --service-title-color: var(--text-dark);
  --service-description-color: var(--text-light);
  --service-feature-color: var(--text-light);
}

/* Responsive Design */
@media (max-width: 768px) {
  .service-section {
    padding: var(--spacing-2xl) 0;
  }
  
  .section-title {
    font-size: var(--font-size-3xl);
  }
  
  .section-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .service-card {
    padding: var(--spacing-xl);
  }
}

@media (max-width: 480px) {
  .service-card {
    padding: var(--spacing-lg);
  }
  
  .service-name {
    font-size: var(--font-size-xl);
  }
}
</style>
