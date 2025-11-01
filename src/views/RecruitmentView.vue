<template>
  <div class="recruitment-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="hero-overlay"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-subtitle">{{ t('recruitment.hero.subtitle') }}</span>
          <h1 class="hero-title">{{ t('recruitment.hero.title') }}</h1>
          <v-btn
            class="hero-cta-btn"
            variant="elevated"
            size="large"
            @click="openApplicationForm"
          >
            {{ t('recruitment.hero.ctaButton') }}
          </v-btn>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <v-container>
        <v-row>
          <v-col cols="12" lg="10">
            <div class="values-header">
              <h2 class="values-title">{{ t('recruitment.values.title') }}</h2>
              <div class="values-divider"></div>
            </div>
            
            <div class="values-content">
              <!-- Value Item 1 -->
              <div class="value-item">
                <div class="value-content-left">
                  <div class="value-number">01</div>
                  <div class="value-text">
                    <h3 class="value-subtitle">{{ t('recruitment.values.item1.title') }}</h3>
                    <div class="value-description">
                      <p>{{ value1Description1 }}</p>
                      <p>{{ value1Description2 }}</p>
                    </div>
                  </div>
                </div>
                <div class="value-image-right">
                  <img src="@/assets/img/recruitment/c7eab71e0fcd9a637b2b90d995f06e8e.jpg" alt="Cơ hội học hỏi và phát triển" class="value-img" />
                </div>
              </div>

              <!-- Value Item 2 -->
              <div class="value-item">
                <div class="value-image-left">
                  <img src="@/assets/img/recruitment/155c2f3da1434b0b0ad7303fe8709d8a.jpg" alt="Thử luyện để trở thành phiên bản tốt nhất" class="value-img" />
                </div>
                <div class="value-content-right">
                  <div class="value-number">02</div>
                  <div class="value-text">
                    <h3 class="value-subtitle">{{ t('recruitment.values.item2.title') }}</h3>
                    <div class="value-description">
                      <p>{{ value2Description1 }}</p>
                      <p>{{ value2Description2 }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Value Item 3 -->
              <div class="value-item">
                <div class="value-content-left">
                  <div class="value-number">03</div>
                  <div class="value-text">
                    <h3 class="value-subtitle">{{ t('recruitment.values.item3.title') }}</h3>
                    <div class="value-description">
                      <p>{{ value3Description1 }}</p>
                      <p>{{ value3Description2 }}</p>
                    </div>
                  </div>
                </div>
                <div class="value-image-right">
                  <img src="@/assets/img/recruitment/6fc22f1a34f55b187f9a908c0dfe5f5e.jpg" alt="Môi trường khuyến khích sáng tạo" class="value-img" />
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Positions Section -->
    <section id="positions" class="positions-section">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="10">
            <div class="positions-header">
              <h2 class="section-title">{{ t('recruitment.positions.title') }}</h2>
              <div class="section-divider"></div>
            </div>
            
            <div class="positions-grid">
              <!-- Position 1: Graphic Design -->
              <div class="position-card">
                <div class="position-header">
                  <h3 class="company-title">{{ t('recruitment.positions.companyTitle') }}</h3>
                </div>
                <div class="position-content">
                  <h4 class="job-title">{{ t('recruitment.positions.jobs.graphicDesign.title') }}</h4>
                </div>
                <div class="position-footer">
                  <v-btn 
                    class="apply-btn"
                    variant="elevated"
                    @click="showJobDetails('graphic-design')"
                  >
                    <span class="btn-text">{{ t('recruitment.positions.jobs.graphicDesign.button') }}</span>
                    <v-icon class="btn-icon">mdi-file-edit-outline</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Position 2: Communication -->
              <div class="position-card">
                <div class="position-header">
                  <h3 class="company-title">{{ t('recruitment.positions.companyTitle') }}</h3>
                </div>
                <div class="position-content">
                  <h4 class="job-title">{{ t('recruitment.positions.jobs.communication.title') }}</h4>
                </div>
                <div class="position-footer">
                  <v-btn 
                    class="apply-btn"
                    variant="elevated"
                    @click="showJobDetails('communication')"
                  >
                    <span class="btn-text">{{ t('recruitment.positions.jobs.communication.button') }}</span>
                    <v-icon class="btn-icon">mdi-file-edit-outline</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Position 3: Ambassador -->
              <div class="position-card">
                <div class="position-header">
                  <h3 class="company-title">{{ t('recruitment.positions.companyTitle') }}</h3>
                </div>
                <div class="position-content">
                  <h4 class="job-title">{{ t('recruitment.positions.jobs.ambassador.title') }}</h4>
                </div>
                <div class="position-footer">
                  <v-btn 
                    class="apply-btn"
                    variant="elevated"
                    @click="showJobDetails('ambassador')"
                  >
                    <span class="btn-text">{{ t('recruitment.positions.jobs.ambassador.button') }}</span>
                    <v-icon class="btn-icon">mdi-file-edit-outline</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Position 4: Digital Marketing -->
              <div class="position-card">
                <div class="position-header">
                  <h3 class="company-title">{{ t('recruitment.positions.companyTitle') }}</h3>
                </div>
                <div class="position-content">
                  <h4 class="job-title">{{ t('recruitment.positions.jobs.digitalMarketing.title') }}</h4>
                </div>
                <div class="position-footer">
                  <v-btn 
                    class="apply-btn"
                    variant="elevated"
                    @click="showJobDetails('digital-marketing')"
                  >
                    <span class="btn-text">{{ t('recruitment.positions.jobs.digitalMarketing.button') }}</span>
                    <v-icon class="btn-icon">mdi-file-edit-outline</v-icon>
                  </v-btn>
                </div>
              </div>

            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>


    <!-- Application Form Popup -->
      <ApplicationFormPopup
        v-model="showApplicationForm"
        :position="selectedPosition"
        @submitted="onApplicationSubmitted"
      />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ApplicationFormPopup from '@/components/common/ApplicationFormPopup.vue'

const { t, locale } = useI18n()

// Computed properties for value descriptions
const value1Description1 = computed(() => t('recruitment.values.item1.description1'))
const value1Description2 = computed(() => t('recruitment.values.item1.description2'))
const value2Description1 = computed(() => t('recruitment.values.item2.description1'))
const value2Description2 = computed(() => t('recruitment.values.item2.description2'))
const value3Description1 = computed(() => t('recruitment.values.item3.description1'))
const value3Description2 = computed(() => t('recruitment.values.item3.description2'))

// Application form popup state
const showApplicationForm = ref(false)
const selectedPosition = ref('')

const scrollToPositions = () => {
  const positionsSection = document.getElementById('positions')
  if (positionsSection) {
    positionsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const showJobDetails = (jobType) => {
  // Set selected position and open form
  selectedPosition.value = getPositionName(jobType)
  openApplicationForm()
}

const getPositionName = (jobType) => {
  const positionMap = {
    'graphic-design': locale.value === 'vi' ? 'CTV GRAPHIC DESIGN (THIẾT KẾ ĐỒ HỌA)' : 'FREELANCE GRAPHIC DESIGNER',
    'communication': locale.value === 'vi' ? 'CTV TRUYỀN THÔNG' : 'FREELANCE COMMUNICATION',
    'ambassador': locale.value === 'vi' ? 'ĐẠI SỨ TRUYỀN THÔNG DỰ ÁN' : 'PROJECT COMMUNICATION AMBASSADOR',
    'digital-marketing': locale.value === 'vi' ? 'CTV DIGITAL MARKETING' : 'FREELANCE DIGITAL MARKETING'
  }
  return positionMap[jobType] || ''
}

const openApplicationForm = () => {
  selectedPosition.value = '' // Không pre-fill position khi click từ hero
  showApplicationForm.value = true
}

const onApplicationSubmitted = (formData) => {
  console.log('Application submitted:', formData)
  // Handle successful submission
  showApplicationForm.value = false
  selectedPosition.value = ''
}
</script>

<style scoped>
/* CSS Variables */
:root {
  --hero-overlay-gradient: linear-gradient(
    135deg,
    rgba(30, 58, 138, 0.9) 0%,
    rgba(30, 58, 138, 0.8) 50%,
    rgba(30, 58, 138, 0.7) 100%
  );
  --values-section-bg: rgb(238, 245, 254);
  --value-item-bg: rgb(30, 41, 59);
  --value-item-border: rgba(71, 85, 105, 0.3);
  --value-item-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  --value-item-hover-shadow: 0 15px 50px rgba(0, 0, 0, 0.7);
  --value-item-hover-border: rgba(71, 85, 105, 0.5);
  --text-dark: #03045e;
  --text-light: #6B7280;
  --positions-section-bg: rgb(238, 245, 254);
}

.recruitment-view {
  min-height: 100vh;
  background: rgb(238, 245, 254);
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: transparent;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/recruitment/f7ae0695df5658e5bc70ccf04a2cba79.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(15, 23, 42, .9) 0%, rgba(30, 58, 138, .8) 50%, rgba(59, 130, 246, .6) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-text {
  color: white;
}

.hero-subtitle {
  display: block;
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: #FFFFFF !important;
  white-space: nowrap;
  overflow: break-word;
  text-overflow: ellipsis;
}

.hero-cta-btn {
  background: #3B82F6 !important;
  color: white !important;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
}

.hero-cta-btn:hover {
  background: #2563EB !important;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6) !important;
}

/* Values Section */
.values-section {
  padding: 6rem 0 0 0;
  background: var(--values-section-bg);
  position: relative;
}

.values-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #E2E8F0 50%, transparent 100%);
}

.values-header {
  text-align: center;
  margin-bottom: 4rem;
  width: 1200px;
}

.values-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #03045e;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-align: center;
}

.values-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #1E3A8A 0%, #3B82F6 50%, #F59E0B 100%);
  margin: 0 auto;
  border-radius: 2px;
}

.values-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 1200px;
}

.value-item {
  display: flex;
  gap: 3rem;
  padding: 3rem;
  background: #05113b !important;
  border-radius: 20px;
  box-shadow: var(--value-item-shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--value-item-border);
  align-items: center;
  margin-bottom: 4rem;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  z-index: 1;
}


.value-item:hover {
  transform: translateY(-6px);
  box-shadow: var(--value-item-hover-shadow);
  border-color: var(--value-item-hover-border);
}

.value-content-left,
.value-content-right {
  flex: 1;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.value-image-left,
.value-image-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.value-img {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.value-img:hover {
  transform: scale(1.02);
}

.value-number {
  font-size: 3rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1;
  min-width: 80px;
  text-align: center;
}

.value-text {
  flex: 1;
}

.value-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.value-description {
  color: #FFFFFF;
  line-height: 1.7;
}

.value-description p {
  margin-bottom: 1rem;
  font-size: 1.0625rem;
  color: #FFFFFF;
  text-align: justify;
}

.value-description p:last-child {
  margin-bottom: 0;
}

/* Positions Section */
.positions-section {
  padding: 5rem 0;
  background: var(--positions-section-bg);
}

.positions-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #03045e;
  text-align: center;
  margin-bottom: 1rem;
}

.section-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #1E3A8A 0%, #3B82F6 50%, #F59E0B 100%);
  margin: 0 auto;
  border-radius: 2px;
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.position-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
}

.position-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--value-item-hover-shadow);
  border-color: var(--value-item-hover-border);
}

.position-header {
  margin-bottom: 1rem;
}

.company-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6B7280;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.position-content {
  flex: 1;
  margin-bottom: 1.5rem;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #03045e;
  margin: 0;
  line-height: 1.3;
}

.position-footer {
  margin-top: auto;
}

.apply-btn {
  width: 100% !important;
  background: #1E3A8A !important;
  color: white !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  padding: 0.875rem 1.5rem !important;
  border-radius: 8px !important;
  text-transform: none !important;
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3) !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.75rem !important;
  letter-spacing: 0.5px !important;
  font-family: 'Inter', sans-serif !important;
}

.apply-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(30, 58, 138, 0.4) !important;
  background: #1E40AF !important;
}

.btn-text {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-icon {
  font-size: 1.125rem !important;
  color: white !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
    white-space: normal;
    line-height: 1.2;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .hero-text {
    text-align: center;
    max-width: 100%;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .values-title {
    font-size: 2rem;
  }
  
  .value-item {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }
  
  .value-content-left,
  .value-content-right {
    flex-direction: column;
    gap: 1rem;
  }
  
  .value-image-left,
  .value-image-right {
    order: -1;
  }
  
  .value-number {
    font-size: 2.5rem;
    min-width: auto;
  }
  
  .value-subtitle {
    font-size: 1.25rem;
    text-align: justify;
  }
  
  .value-img {
    max-width: 100%;
  }
  
  .positions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .position-card {
    padding: 1.5rem;
    min-height: 180px;
  }
  
  .job-title {
    font-size: 1.125rem;
  }
}

@media (max-width: 600px) {
  .positions-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
    white-space: normal;
    line-height: 1.3;
  }
  
  .hero-cta-btn {
    font-size: 0.75rem !important;
    padding: 0.625rem 1.25rem !important;
  }
}

/* Animation Classes */
.hero-text {
  animation: fadeInUp 1s ease-out;
}

.hero-cta-btn {
  animation: fadeInUp 1s ease-out 0.3s both;
}

.values-title {
  animation: fadeInUp 1s ease-out 0.5s both;
}

.value-item {
  animation: fadeInUp 1s ease-out;
}

.value-item:nth-child(1) {
  animation-delay: 0.7s;
}

.value-item:nth-child(2) {
  animation-delay: 0.9s;
}

.value-item:nth-child(3) {
  animation-delay: 1.1s;
}

.section-title {
  animation: fadeInUp 1s ease-out 0.3s both;
}

.position-card {
  animation: fadeInUp 1s ease-out;
}

.position-card:nth-child(1) {
  animation-delay: 0.5s;
}

.position-card:nth-child(2) {
  animation-delay: 0.7s;
}

.position-card:nth-child(3) {
  animation-delay: 0.9s;
}

.position-card:nth-child(4) {
  animation-delay: 1.1s;
}


@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
