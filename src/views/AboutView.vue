<template>
  <div class="about-view">
    <!-- Hero Section với MarcomMate-inspired design -->
    <section class="hero-section">
      <!-- Hero Content -->
      <div class="hero-content">
        <p class="hero-subtitle">{{ t('about.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Giới thiệu chính -->
    <section class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text fade-in-up">
            <h2 class="section-title">{{ t('about.hero.title') }}</h2>
            <p class="about-description">
              {{ t('about.story.content') }}
            </p>
          </div>
          <div class="about-image fade-in-up">
            <img src="@/assets/img/aboutmatecom/MatecomAll.jpg" alt="MATECOM Team" />
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="mission-vision-section">
      <div class="container">
        <div class="mission-vision-grid">
          <div class="mission-card fade-in-up">
            <div class="card-image">
              <img src="@/assets/img/aboutmatecom/Mission.jpg" alt="MATECOM Mission" />
            </div>
            <h3 class="card-title">{{ t('about.values.mission.title') }}</h3>
            <p class="card-content">
              "{{ t('about.values.mission.description') }}"
            </p>
          </div>
          
          <div class="vision-card fade-in-up">
            <div class="card-image">
              <img src="@/assets/img/aboutmatecom/Vision.jpg" alt="MATECOM Vision" />
            </div>
            <h3 class="card-title">{{ t('about.values.vision.title') }}</h3>
            <p class="card-content">
              "{{ t('about.values.vision.description') }}"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Đội ngũ nhân sự -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title text-center fade-in-up">{{ t('about.team.title') }}</h2>
        
        <!-- Sơ đồ tổ chức -->
        <div class="org-chart fade-in-up">
          <!-- Giám đốc điều hành -->
          <div class="ceo-level">
            <div class="ceo-card">
              <div class="ceo-avatar">
                <img src="@/assets/img/aboutmatecom/Chu Thị Quỳnh.jpg" :alt="t('about.team.ceo.name')" />
              </div>
              <div class="ceo-info">
                <h3 class="ceo-name">{{ t('about.team.ceo.name') }}</h3>
                <p class="ceo-position">{{ t('about.team.ceo.position') }}</p>
                <p class="ceo-title">{{ t('about.team.ceo.title') }}</p>
              </div>
            </div>
          </div>
          
          <!-- Các phòng ban -->
          <div class="departments-level">
            <div class="department-card fade-in-up">
              <div class="department-avatar">
                <img src="@/assets/img/aboutmatecom/Khuất Duy Anh.jpg" :alt="t('about.team.cfo.name')" />
              </div>
              <div class="department-info">
                <p class="department-head">{{ t('about.team.cfo.name') }}</p>
                <p class="department-position">{{ t('about.team.cfo.position') }}</p>
                <p class="department-title">{{ t('about.team.cfo.title') }}</p>
              </div>
            </div>

            <div class="department-card fade-in-up">
              <div class="department-avatar">
                <img src="@/assets/img/aboutmatecom/Đào Thị Thơm - CTO.jpg" :alt="t('about.team.cto.name')" />
              </div>
              <div class="department-info">
                <p class="department-head">{{ t('about.team.cto.name') }}</p>
                <p class="department-position">{{ t('about.team.cto.position') }}</p>
                <p class="department-title">{{ t('about.team.cto.title') }}</p>
              </div>
            </div>

            <div class="department-card fade-in-up">
              <div class="department-avatar">
                <img src="@/assets/img/aboutmatecom/Nguyễn Ngọc Quỳnh.JPG" :alt="t('about.team.coo.name')" />
              </div>
              <div class="department-info">
                <p class="department-head">{{ t('about.team.coo.name') }}</p>
                <p class="department-position">{{ t('about.team.coo.position') }}</p>
                <p class="department-title">{{ t('about.team.coo.title') }}</p>
              </div>
            </div>

            <div class="department-card fade-in-up">
              <div class="department-avatar">
                <img src="@/assets/img/aboutmatecom/Nguyễn Thị Huyền My.jpg" :alt="t('about.team.cmo.name')" />
              </div>
              <div class="department-info">
                <p class="department-head">{{ t('about.team.cmo.name') }}</p>
                <p class="department-position">{{ t('about.team.cmo.position') }}</p>
                <p class="department-title">{{ t('about.team.cmo.title') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { MessageCircle } from 'lucide-vue-next'

const { t } = useI18n()

const scrollToContact = () => {
  // TODO: Implement scroll to contact section
  console.log('Scroll to contact')
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
.about-view {
  min-height: 100vh;
  
  /* Light background matching home page */
  background: rgb(238, 245, 254);
  
  /* CSS Variables - Light Theme matching home page */
  --about-section-bg: transparent;
  --mission-vision-bg: rgba(255, 255, 255, 0.8);
  --card-bg: #FFFFFF;
  --card-border: rgba(3, 4, 94, 0.1);
  --team-section-bg: transparent;
  --team-member-bg: #FFFFFF;
  --team-member-border: rgba(3, 4, 94, 0.1);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section - MarcomMate Inspired */
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  /* Background image with overlay */
  background-image: url('@/assets/img/aboutmatecom/aboutmatecomhero.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(3, 4, 94, 0.3) 0%,
    rgba(3, 4, 94, 0.2) 25%,
    rgba(3, 4, 94, 0.1) 50%,
    rgba(3, 4, 94, 0.2) 75%,
    rgba(3, 4, 94, 0.3) 100%
  );
  z-index: 1;
}

/* Network animations removed - file deleted */

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 3;
  max-width: 1000px;
  padding: 0 24px;
}

.hero-title {
  font-family: var(--font-family-heading);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  margin: 0 0 40px 0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.hero-title .highlight {
  background: linear-gradient(135deg, #F59E0B, #F97316);  /* MarcomMate orange gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: inline-block;
  animation: textGlow 3s ease-in-out infinite alternate;
}

.hero-title .normal {
  color: #03045e;
  display: inline-block;
}

@keyframes textGlow {
  0% { 
    filter: brightness(1);
  }
  100% { 
    filter: brightness(1.2);
  }
}

.hero-subtitle {
  font-family: var(--font-family-heading);
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 800;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.4;
  max-width: 900px;
  margin: 0 auto;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Floating Contact Button */
.floating-contact {
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 1000;
}

.contact-btn {
  width: 56px !important;
  height: 56px !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, #03045e, #3B82F6) !important;  /* Updated primary colors */
  box-shadow: 0 8px 25px rgba(3, 4, 94, 0.4) !important;
  transition: all var(--transition-normal) !important;
}

.contact-btn:hover {
  transform: scale(1.1) !important;
  box-shadow: 0 12px 35px rgba(3, 4, 94, 0.6) !important;  /* Updated primary color shadow */
}

/* About Section */
.about-section {
  padding: 80px 0;
  background: var(--about-section-bg);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-text {
  padding-right: 40px;
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: #03045e;
  margin: 0 0 32px 0;
}

.about-description {
  font-family: var(--font-family-body);
  font-size: 1.125rem;
  line-height: 1.8;
  color: #03045e;
  margin: 0 0 24px 0;
}

.about-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Mission & Vision Section */
.mission-vision-section {
  padding: 80px 0;
  background: var(--mission-vision-bg);
}

.mission-vision-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.mission-card,
.vision-card {
  background: var(--card-bg);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid var(--card-border);
}

.mission-card:hover,
.vision-card:hover {
  transform: translateY(-8px);
}

.card-image {
  width: 100%;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.card-title {
  font-family: var(--font-family-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: #03045e;
  margin: 0 0 20px 0;
}

.card-content {
  font-family: var(--font-family-body);
  font-size: 1.125rem;
  line-height: 1.7;
  color: #03045e;
  margin: 0;
  font-style: italic;
}

/* Team Section */
.team-section {
  padding: 80px 0;
  background: var(--team-section-bg);
}

.team-section .section-title {
  margin-bottom: 60px;
}

/* Sơ đồ tổ chức */
.org-chart {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

/* CEO Level */
.ceo-level {
  margin-bottom: 40px;
}

.ceo-card {
  background: var(--team-member-bg);
  padding: 40px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 32px;
  transition: all 0.3s ease;
  border: 1px solid var(--team-member-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.ceo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(3, 4, 94, 0.15);
  border-color: #03045e;
}

.ceo-avatar {
  width: 200px;
  height: 260px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  border: 3px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.ceo-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 16px;
}

.ceo-avatar:hover {
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transform: scale(1.05);
}

.ceo-name {
  font-family: var(--font-family-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: #03045e;
  margin: 0 0 8px 0;
}

.ceo-position {
  font-family: var(--font-family-body);
  font-size: 1.25rem;
  color: #3B82F6;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.ceo-title {
  font-family: var(--font-family-body);
  font-size: 1rem;
  color: #03045e;
  margin: 0;
  font-weight: 500;
}

/* Connection Line */
.connection-line {
  width: 4px;
  height: 20px;
  background: linear-gradient(to bottom, #F59E0B, #3B82F6);
  margin: 0 auto 40px;
  border-radius: 2px;
  position: relative;
}

.connection-line::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #3B82F6;
}

/* Departments Level */
.departments-level {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  align-items: start;
}

.department-card {
  background: var(--team-member-bg);
  padding: 24px;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid var(--team-member-border);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.department-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(3, 4, 94, 0.15);
  border-color: #03045e;
}

.department-avatar {
  width: 180px;
  height: 240px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  overflow: hidden;
  border: 3px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.department-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 12px;
}

.department-avatar:hover {
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
  transform: scale(1.05);
}

.department-name {
  font-family: var(--font-family-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: #03045e;
  margin: 0 0 8px 0;
  text-align: center;
}

.department-head {
  font-family: var(--font-family-body);
  font-size: 1rem;
  color: #03045e;
  margin: 0 0 4px 0;
  font-weight: 600;
  text-align: center;
}

.department-position {
  font-family: var(--font-family-body);
  font-size: 0.9rem;
  color: #3B82F6;
  margin: 0 0 4px 0;
  font-weight: 600;
  text-align: center;
}

.department-title {
  font-family: var(--font-family-body);
  font-size: 0.875rem;
  color: #03045e;
  margin: 0;
  font-weight: 500;
  text-align: center;
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

/* Staggered animation for team members */
.team-member.fade-in-up {
  transition-delay: 0.1s;
}

.team-member:nth-child(1).fade-in-up { transition-delay: 0.1s; }
.team-member:nth-child(2).fade-in-up { transition-delay: 0.2s; }
.team-member:nth-child(3).fade-in-up { transition-delay: 0.3s; }
.team-member:nth-child(4).fade-in-up { transition-delay: 0.4s; }
.team-member:nth-child(5).fade-in-up { transition-delay: 0.5s; }

/* Single Theme - No Dark/Light Mode */

/* Responsive Design */
@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .about-text {
    padding-right: 0;
  }
  
  .mission-vision-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 100vh;
    min-height: 500px;
  }
  
  .hero-content {
    padding: 0 16px;
  }
  
  .hero-title {
    font-size: clamp(1.75rem, 8vw, 2.5rem);
    margin-bottom: 24px;
  }
  
  .hero-subtitle {
    font-size: clamp(1rem, 4vw, 1.25rem);
  }
  
  .floating-contact {
    bottom: 24px;
    left: 24px;
  }
  
  .contact-btn {
    width: 48px !important;
    height: 48px !important;
  }
  
  .about-section,
  .mission-vision-section,
  .team-section {
    padding: 60px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .about-description {
    font-size: 1rem;
  }
  
  .card-content {
    font-size: 1rem;
  }
  
  .org-chart {
    max-width: 100%;
  }
  
  .ceo-card {
    padding: 32px;
    gap: 24px;
  }
  
  .ceo-avatar {
    width: 160px;
    height: 200px;
  }
  
  .ceo-name {
    font-size: 1.5rem;
  }
  
  .ceo-position {
    font-size: 1.125rem;
  }
  
  .departments-level {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .department-card {
    padding: 20px;
  }
  
  .department-avatar {
    width: 100px;
    height: 120px;
  }
  
  .department-name {
    font-size: 1.125rem;
  }
  
  .department-head {
    font-size: 0.9rem;
  }
  
  .department-title {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 100vh;
    min-height: 400px;
  }
  
  .hero-title {
    font-size: clamp(1.5rem, 10vw, 2rem);
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: clamp(0.875rem, 5vw, 1.125rem);
  }
  
  .floating-contact {
    bottom: 20px;
    left: 20px;
  }
  
  .contact-btn {
    width: 44px !important;
    height: 44px !important;
  }
  
  .about-section,
  .mission-vision-section,
  .team-section {
    padding: 40px 0;
  }
  
  .mission-card,
  .vision-card {
    padding: 24px;
  }
  
  .team-member {
    padding: 20px;
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .member-avatar {
    width: 120px;
    height: 160px;
  }
  
  .member-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  
  .member-name {
    font-size: 1.25rem;
  }
  
  .member-position {
    font-size: 1rem;
  }
}
</style>
