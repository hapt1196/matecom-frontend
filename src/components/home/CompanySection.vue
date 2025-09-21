<template>
  <section class="company-section">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="section-title text-center">Về MATECOM</h2>
        </v-col>
      </v-row>
    
    <!-- Mission và Vision cùng 1 row -->
    <v-row>
      <v-col cols="12" md="6">
        <div class="mission-section">
          <div class="card-image">
            <img src="@/assets/img/aboutmatecom/Mission.jpg" alt="MATECOM Mission" />
          </div>
          <h3 class="text-h5 mb-3 text-primary">Mission</h3>
          <p class="mission-text">
            "MATECOM mang đến giải pháp Marketing toàn diện kết hợp công nghệ và sáng tạo chiến lược giúp doanh nghiệp tối đa hiệu quả, cùng cam kết đồng hành như đối tác tin cậy và kết nối như người bạn tri kỷ."
          </p>
        </div>
      </v-col>
      
      <v-col cols="12" md="6">
        <div class="vision-section">
          <div class="card-image">
            <img src="@/assets/img/aboutmatecom/Vision.jpg" alt="MATECOM Vision" />
          </div>
          <h3 class="text-h5 mb-3 text-primary">Vision</h3>
          <p class="vision-text">
            "Trở thành sự lựa chọn số 1 của doanh nghiệp trong tìm kiếm giải pháp marketing toàn diện"
          </p>
        </div>
      </v-col>
    </v-row>
    
    <!-- Đội Ngũ nhân sự riêng 1 row -->
    <v-row>
      <v-col cols="12">
        <div class="team-section">
          <h3 class="team-title text-center">Đội Ngũ nhân sự của MATECOM</h3>
          
          <!-- Organizational Chart -->
          <div class="org-chart">
            <!-- CEO Level -->
            <div class="ceo-level">
              <div class="ceo-card">
                <div class="ceo-avatar">
                  <img src="@/assets/img/aboutmatecom/Chu Thị Quỳnh.jpg" alt="Chu Thị Quỳnh" />
                </div>
                <div class="ceo-info">
                  <h4 class="ceo-name">Chu Thị Quỳnh</h4>
                  <p class="ceo-position">CEO - Chief Executive Officer</p>
                  <p class="ceo-title">Giám đốc điều hành</p>
                </div>
              </div>
            </div>
            
            <!-- Departments Level -->
            <div class="departments-level">
              <div class="department-card">
                <div class="department-avatar">
                  <img src="@/assets/img/aboutmatecom/Nguyễn Thị Huyền My.jpg" alt="Nguyễn Thị Huyền My" />
                </div>
                <div class="department-info">
                  <h4 class="department-name">Marketing</h4>
                  <p class="department-head">Nguyễn Thị Huyền My</p>
                  <p class="department-title">CMO - Chief Marketing Officer</p>
                </div>
              </div>
              
              <div class="department-card">
                <div class="department-avatar">
                  <img src="@/assets/img/aboutmatecom/Khuất Duy Anh.jpg" alt="Khuất Duy Anh" />
                </div>
                <div class="department-info">
                  <h4 class="department-name">Tài chính</h4>
                  <p class="department-head">Khuất Duy Anh</p>
                  <p class="department-title">CFO - Chief Financial Officer</p>
                </div>
              </div>
              
              <div class="department-card">
                <div class="department-avatar">
                  <img src="@/assets/img/aboutmatecom/Đào Thị Thơm - CTO.jpg" alt="Đào Thị Thơm" />
                </div>
                <div class="department-info">
                  <h4 class="department-name">Sản xuất</h4>
                  <p class="department-head">Đào Thị Thơm</p>
                  <p class="department-title">CTO - Chief Technology Officer</p>
                </div>
              </div>
              
              <div class="department-card">
                <div class="department-avatar">
                  <img src="@/assets/img/aboutmatecom/Nguyễn Ngọc Quỳnh.JPG" alt="Nguyễn Ngọc Quỳnh" />
                </div>
                <div class="department-info">
                  <h4 class="department-name">Nhân sự</h4>
                  <p class="department-head">Nguyễn Ngọc Quỳnh</p>
                  <p class="department-title">COO - Chief Operating Officer</p>
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
// Script logic will go here
</script>

<style scoped>
.company-section {
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
  background: transparent;
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-5xl);
  font-weight: 900;
  color: #FFFFFF;
  margin-bottom: var(--spacing-2xl);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.team-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: 900;
  color: #FFFFFF;
  margin-bottom: var(--spacing-xl);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.mission-section, .vision-section {
  padding: var(--spacing-xl);
  border-radius: 16px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-left: 4px solid #F59E0B;
  height: 100%;
  transition: all 0.3s ease;
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
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: #F59E0B;
}

.mission-text, .vision-text {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  color: #CBD5E1;
  font-style: italic;
}

.team-section {
  padding: var(--spacing-xl) 0;
}

/* Organizational Chart Styles */
.org-chart {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.ceo-level {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.ceo-card {
  background: rgba(30, 41, 59, 0.8);
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 280px;
  margin: 0 auto;
  border: 2px solid rgba(245, 158, 11, 0.6);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.ceo-card:hover {
  transform: translateY(-4px);
}

.ceo-avatar {
  width: 150px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  border: 3px solid rgba(245, 158, 11, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  color: #FFFFFF;
  margin-bottom: 6px;
}

.ceo-position {
  font-family: var(--font-family-body);
  font-size: 1rem;
  color: #F59E0B;
  margin-bottom: 4px;
  font-weight: 600;
}

.ceo-title {
  font-family: var(--font-family-body);
  font-size: 0.875rem;
  color: #CBD5E1;
  font-style: italic;
}

.connection-line {
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, #F59E0B, #3B82F6);
  margin: 0 auto var(--spacing-lg);
  border-radius: 1px;
}

.departments-level {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  max-width: 1000px;
  margin: 0 auto;
}

.department-card {
  background: rgba(30, 41, 59, 0.8);
  padding: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 220px;
  margin: 0 auto;
  border: 2px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.department-card:hover {
  transform: translateY(-4px);
  border-color: #3B82F6;
}

.department-avatar {
  width: 150px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  border: 3px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  color: #FFFFFF;
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
  color: #CBD5E1;
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
