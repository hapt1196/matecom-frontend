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
          
          <div class="team-list">
            <div class="team-member mb-3">
              <div class="member-avatar">
                <img src="@/assets/img/aboutmatecom/Khuất Duy Anh.jpg" alt="Khuất Duy Anh" />
              </div>
              <div class="member-info">
                <div class="member-name font-weight-bold">Khuất Duy Anh</div>
                <div class="member-position text-grey">CFO - Chief Financial Officer</div>
              </div>
            </div>
            
            <div class="team-member mb-3">
              <div class="member-avatar">
                <img src="@/assets/img/aboutmatecom/Chu Thị Quỳnh.jpg" alt="Chu Thị Quỳnh" />
              </div>
              <div class="member-info">
                <div class="member-name font-weight-bold">Chu Thị Quỳnh</div>
                <div class="member-position text-grey">CEO - Chief Executive Officer</div>
              </div>
            </div>
            
            <div class="team-member mb-3">
              <div class="member-avatar">
                <img src="@/assets/img/aboutmatecom/Đào Thị Thơm - CTO.jpg" alt="Đào Thị Thơm" />
              </div>
              <div class="member-info">
                <div class="member-name font-weight-bold">Đào Thị Thơm</div>
                <div class="member-position text-grey">CTO - Chief Technology Officer</div>
              </div>
            </div>
            
            <div class="team-member mb-3">
              <div class="member-avatar">
                <img src="@/assets/img/aboutmatecom/Nguyễn Ngọc Quỳnh.JPG" alt="Nguyễn Ngọc Quỳnh" />
              </div>
              <div class="member-info">
                <div class="member-name font-weight-bold">Nguyễn Ngọc Quỳnh</div>
                <div class="member-position text-grey">COO - Chief Operating Officer</div>
              </div>
            </div>
            
            <div class="team-member mb-3">
              <div class="member-avatar">
                <img src="@/assets/img/aboutmatecom/Nguyễn Thị Huyền My.jpg" alt="Nguyễn Thị Huyền My" />
              </div>
              <div class="member-info">
                <div class="member-name font-weight-bold">Nguyễn Thị Huyền My</div>
                <div class="member-position text-grey">CMO - Chief Marketing Officer</div>
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
  height: 200px;
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

.team-list {
  background: rgba(30, 41, 59, 0.6);
  padding: var(--spacing-lg);
  border-radius: 16px;
  border: 1px solid rgba(51, 65, 85, 0.5);
  max-width: 600px;
  margin: 0 auto;
}

.team-member {
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.team-member:last-child {
  border-bottom: none;
}

.member-avatar {
  width: 160px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.member-info {
  flex: 1;
}

.member-name {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  color: #F8FAFC;
  margin-bottom: var(--spacing-xs);
}

.member-position {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: #94A3B8;
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
  
  .team-list {
    padding: var(--spacing-md);
    max-width: 100%;
  }
  
  .mission-text, .vision-text {
    font-size: 1rem;
  }
  
  .card-image {
    height: 150px;
  }
  
  .team-member {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-md);
  }
  
  .member-avatar {
    width: 70px;
    height: 90px;
  }
}
</style>
