<template>
   <section class="hero-section">
    <div class="hero-background">
      <div class="hero-overlay"></div>
    </div>
    
    <v-container fluid class="hero-content">
      <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" md="8" lg="6" class="text-center">
          <div class="hero-text-content">
            <h1 class="hero-title fade-in">
              MATECOM
              <span class="text-accent">Marketing Agency</span>
            </h1>
            
            <p class="hero-subtitle slide-up">
              Your trusted partner in digital growth. We transform brands through innovative marketing strategies and creative solutions.
            </p>
            
            <div class="hero-cta slide-up">
              <button
                class="hero-btn primary-btn"
                @click="scrollToServices"
              >
                <Rocket class="w-5 h-5 btn-icon" />
                <span>Bắt đầu ngay</span>
              </button>
              
              <button
                class="hero-btn secondary-btn"
                @click="scrollToAbout"
              >
                <Info class="w-5 h-5 btn-icon" />
                <span>Về chúng tôi</span>
              </button>
            </div>
            
            <div class="hero-stats slide-up">
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">Happy Clients</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">1000+</div>
                <div class="stat-label">Projects Completed</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">98%</div>
                <div class="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    
    <div class="scroll-indicator">
      <div class="scroll-arrow"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { Rocket, Info } from 'lucide-vue-next'

const scrollToServices = () => {
  const servicesSection = document.querySelector('.service-section')
  if (servicesSection) {
    servicesSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToAbout = () => {
  const aboutSection = document.querySelector('.company-section')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' })
  }
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
  document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  /* CSS Variables - MarcomMate Inspired Single Theme */
  --hero-bg: transparent;
  --hero-overlay: transparent;
  --hero-text: #FFFFFF;
  --hero-accent: #F59E0B;  /* MarcomMate accent orange */
  --hero-btn-primary: linear-gradient(135deg, #F59E0B, #F97316);
  --hero-btn-primary-hover: linear-gradient(135deg, #F97316, #EA580C);
  --hero-btn-secondary: transparent;
  --hero-btn-secondary-border: #FFFFFF;
  --hero-btn-secondary-hover-bg: rgba(255, 255, 255, 0.1);
  --hero-btn-secondary-hover-color: #F59E0B;  /* MarcomMate accent orange */
  --hero-btn-secondary-hover-border: #F59E0B;  /* MarcomMate accent orange */
  --hero-stats-number: #F59E0B;  /* MarcomMate accent orange */
  --hero-stats-label: #FFFFFF;
  --scroll-arrow: #FFFFFF;
}

/* Single Theme - No Dark/Light Mode */

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/background.gif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--hero-overlay);
  z-index: 2;
}


.hero-content {
  position: relative;
  z-index: 3;
  padding: var(--spacing-3xl) var(--spacing-lg);
}

.hero-text-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  color: var(--hero-text);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-title .text-accent {
  color: var(--hero-accent);
  display: block;
  margin-top: var(--spacing-sm);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: var(--spacing-2xl);
  color: var(--hero-text);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-cta {
  margin-bottom: var(--spacing-3xl);
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
}

/* Button Base Styles */
.hero-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  min-height: 56px;
  min-width: 200px;
  border-radius: 12px;
  border: none;
  font-size: var(--font-size-lg);
  font-weight: 600;
  text-transform: none;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
  outline: none;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.hero-btn:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

.hero-btn .btn-icon {
  font-size: 24px;
  flex-shrink: 0;
}

/* Button Variants */
.primary-btn {
  background: var(--hero-btn-primary);
  color: var(--hero-text);
  font-weight: 700;
}

.primary-btn:hover {
  background: var(--hero-btn-primary-hover);
}

.secondary-btn {
  background: var(--hero-btn-secondary);
  color: var(--hero-text);
  border: 3px solid var(--hero-btn-secondary-border);
  font-weight: 600;
}

.secondary-btn:hover {
  background: var(--hero-btn-secondary-hover-bg);
  border-color: var(--hero-btn-secondary-hover-border);
  color: var(--hero-btn-secondary-hover-color);
}

/* Stats Section */
.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-2xl);
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  color: var(--hero-stats-label);
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--hero-stats-number);
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--hero-stats-label);
  margin-top: var(--spacing-xs);
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: var(--spacing-xl);
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 3px;
  height: 40px;
  background: var(--scroll-arrow);
  position: relative;
  border-radius: 2px;
}

.scroll-arrow::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -6px;
  width: 15px;
  height: 15px;
  border-right: 3px solid var(--scroll-arrow);
  border-bottom: 3px solid var(--scroll-arrow);
  transform: rotate(45deg);
}

/* Animations */

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    padding: var(--spacing-2xl) var(--spacing-md);
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-btn {
    width: 100%;
    max-width: 300px;
    min-height: 52px;
  }
  
  .hero-stats {
    gap: var(--spacing-xl);
  }
  
  .stat-item {
    flex: 1;
    min-width: 120px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-btn {
    min-height: 48px;
    font-size: var(--font-size-base);
    min-width: 180px;
  }
  
  .hero-btn .btn-icon {
    font-size: 20px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  
  .stat-number {
    font-size: var(--font-size-2xl);
  }
}
</style>
