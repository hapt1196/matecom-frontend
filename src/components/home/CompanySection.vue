<template>
  <section class="company-section">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="section-title text-center">{{ t('home.company.title') }}</h2>
        </v-col>
      </v-row>
    
    <!-- Mission và Vision cùng 1 row -->
    <v-row>
      <v-col cols="12" md="6">
        <div class="mission-section">
          <div class="card-image">
            <img src="@/assets/img/aboutmatecom/Mission.jpg" alt="MATECOM Mission" />
          </div>
          <h3 class="text-h5 mb-3 text-primary">{{ t('home.company.mission') }}</h3>
          <p class="mission-text">
            "{{ t('home.company.missionText') }}"
          </p>
        </div>
      </v-col>
      
      <v-col cols="12" md="6">
        <div class="vision-section">
          <div class="card-image">
            <img src="@/assets/img/aboutmatecom/Vision.jpg" alt="MATECOM Vision" />
          </div>
          <h3 class="text-h5 mb-3 text-primary">{{ t('home.company.vision') }}</h3>
          <p class="vision-text">
            "{{ t('home.company.visionText') }}"
          </p>
        </div>
      </v-col>
    </v-row>
    
    <!-- Đội Ngũ nhân sự riêng 1 row -->
    <v-row>
      <v-col cols="12">
        <div class="team-section">
          <h3 class="team-title text-center">{{ t('home.company.subtitle') }}</h3>
          
          <!-- Organizational Chart -->
          <div class="org-chart">
            <!-- CEO Level -->
            <div class="ceo-level">
              <div class="ceo-card">
                <div class="ceo-avatar">
                  <img src="@/assets/img/aboutmatecom/Khuất Duy Anh.jpg" :alt="t('home.company.team.ceo.name') || 'Khuất Duy Anh'" />
                </div>
                <div class="ceo-info">
                  <h4 class="ceo-name">{{ t('home.company.team.ceo.name') }}</h4>
                  <p class="ceo-position">{{ t('home.company.team.ceo.position') }}</p>
                  <p class="ceo-title">{{ t('home.company.team.ceo.title') }}</p>
                </div>
              </div>
            </div>
            
            <!-- Departments Level -->
            <div class="departments-level">
              <div class="department-card">
                <div class="department-avatar">
                  <img src="@/assets/img/aboutmatecom/Chu Thị Quỳnh.jpg" :alt="t('home.company.team.cfo.name') || 'Chu Thị Quỳnh'" />
                </div>
                <div class="department-info">
                  <h4 class="department-name">{{ t('home.company.team.cfo.name') }}</h4>
                  <p class="department-head">{{ t('home.company.team.cfo.position') }}</p>
                  <p class="department-title">{{ t('home.company.team.cfo.title') }}</p>
                </div>
              </div>
              
              <div class="department-card">
                <div class="department-avatar">
                  <img src="@/assets/img/aboutmatecom/Đào Thị Thơm - CTO.jpg" :alt="t('home.company.team.cto.name') || 'Đào Thị Thơm'" />
                </div>
                <div class="department-info">
                  <h4 class="department-name">{{ t('home.company.team.cto.name') }}</h4>
                  <p class="department-head">{{ t('home.company.team.cto.position') }}</p>
                  <p class="department-title">{{ t('home.company.team.cto.title') }}</p>
                </div>
              </div>
              
              <div class="department-card">
                <div class="department-avatar">
                  <img src="@/assets/img/aboutmatecom/Nguyễn Ngọc Quỳnh.JPG" :alt="t('home.company.team.coo.name') || 'Nguyễn Ngọc Quỳnh'" />
                </div>
                <div class="department-info">
                  <h4 class="department-name">{{ t('home.company.team.coo.name') }}</h4>
                  <p class="department-head">{{ t('home.company.team.coo.position') }}</p>
                  <p class="department-title">{{ t('home.company.team.coo.title') }}</p>
                </div>
              </div>
              
              <div class="department-card">
                <div class="department-avatar">
                  <img src="@/assets/img/aboutmatecom/Nguyễn Thị Huyền My.jpg" :alt="t('home.company.team.cmo.name') || 'Nguyễn Thị Huyền My'" />
                </div>
                <div class="department-info">
                  <h4 class="department-name">{{ t('home.company.team.cmo.name') }}</h4>
                  <p class="department-head">{{ t('home.company.team.cmo.position') }}</p>
                  <p class="department-title">{{ t('home.company.team.cmo.title') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.company-section {
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
  background: transparent;
}

.company-section .v-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-5xl);
  font-weight: 900;
  color: #03045e;
  margin-bottom: var(--spacing-2xl);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
}

.team-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: 900;
  color: #03045e;
  margin-bottom: var(--spacing-xl);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mission-section, .vision-section {
  padding: var(--spacing-xl);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #F59E0B;
  border-left: 4px solid #F59E0B;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center center;
}

.card-image {
  width: 100%;
  height: 220px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.mission-section:hover, .vision-section:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
  border-color: #F59E0B;
  z-index: 10;
}

.mission-text, .vision-text {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  color: #03045e;
  font-style: italic;
}

.team-section {
  padding: var(--spacing-xl) 0;
}

/* Organizational Chart Styles */
.org-chart {
  max-width: 1200px;
  margin: 0;
}

.ceo-level {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.ceo-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 280px;
  margin: 0 auto;
  border: 2px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.ceo-card:hover {
  transform: translateY(-8px) scale(1.05);
  border-color: #3B82F6;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.ceo-avatar {
  width: 150px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  border: 3px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.ceo-avatar:hover {
  transform: scale(1.1);
}

.ceo-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.ceo-info {
  text-align: center;
}

.ceo-name {
  font-family: var(--font-family-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: #03045e;
  margin-bottom: 6px;
}

.ceo-position {
  font-family: var(--font-family-body);
  font-size: 1rem;
  color: #3B82F6;
  margin-bottom: 4px;
  font-weight: 600;
}

.ceo-title {
  font-family: var(--font-family-body);
  font-size: 0.875rem;
  color: #03045e;
  font-style: italic;
}


.departments-level {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  max-width: 100%;
  margin: 0 auto;
}

.department-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 280px;
  margin: 0;
  border: 2px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.department-card:hover {
  transform: translateY(-8px) scale(1.05);
  border-color: #3B82F6;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.department-avatar {
  width: 150px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  border: 3px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.department-avatar:hover {
  transform: scale(1.1);
}

.department-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.department-info {
  text-align: center;
}

.department-name {
  font-family: var(--font-family-heading);
  font-size: 1.125rem;
  font-weight: 700;
  color: #03045e;
  margin-bottom: 6px;
}

.department-head {
  font-family: var(--font-family-body);
  font-size: 0.9rem;
  color: #3B82F6;
  margin-bottom: 4px;
  font-weight: 600;
}

.department-title {
  font-family: var(--font-family-body);
  font-size: 0.8rem;
  color: #03045e;
  font-style: italic;
}

/* Single Theme - No Dark/Light Mode */

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-4xl);
  }
  
  .team-title {
    font-size: var(--font-size-3xl);
  }
  
  .mission-section, .vision-section {
    padding: 16px;
    margin-bottom: 20px;
  }
  
  .mission-text, .vision-text {
    font-size: 1rem;
  }
  
  .card-image {
    height: 150px;
  }
  
  /* Organizational Chart Responsive */
  .org-chart {
    padding: var(--spacing-md);
  }
  
  .ceo-card {
    padding: 20px;
    max-width: 240px;
  }
  
  .department-card {
    padding: 16px;
    max-width: 180px;
  }
  
  .ceo-avatar {
    width: 100px;
    height: 120px;
  }
  
  .department-avatar {
    width: 80px;
    height: 100px;
  }
  
  .ceo-name {
    font-size: 1.125rem;
  }
  
  .department-name {
    font-size: 1rem;
  }
  
  .ceo-position, .department-head {
    font-size: 0.9rem;
  }
  
  .ceo-title, .department-title {
    font-size: 0.8rem;
  }
  
  .departments-level {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .ceo-card {
    padding: 16px;
    max-width: 200px;
  }
  
  .department-card {
    padding: 12px;
    max-width: 160px;
  }
  
  .ceo-avatar {
    width: 80px;
    height: 100px;
  }
  
  .department-avatar {
    width: 60px;
    height: 80px;
  }
  
  .ceo-name {
    font-size: 1rem;
  }
  
  .department-name {
    font-size: 0.9rem;
  }
  
  .ceo-position, .department-head {
    font-size: 0.8rem;
  }
  
  .ceo-title, .department-title {
    font-size: 0.75rem;
  }
  
  .departments-level {
    grid-template-columns: 1fr;
  }
}
</style>
