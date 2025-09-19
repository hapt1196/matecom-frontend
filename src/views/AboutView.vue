<template>
  <div class="about-view">
    <!-- Hero Section với MarcomMate-inspired design -->
    <section class="hero-section">
      <!-- Hero Content -->
      <div class="hero-content">
        <p class="hero-subtitle">MATECOM - Agency Marketing sáng tạo, chuyên cung cấp giải pháp Digital Marketing toàn diện</p>
      </div>
    </section>

    <!-- Giới thiệu chính -->
    <section class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text fade-in-up">
            <h2 class="section-title">Về MATECOM</h2>
            <p class="about-description">
              MATECOM là Agency Marketing sáng tạo, chuyên cung cấp giải pháp Digital Marketing toàn diện cho doanh nghiệp. Với đội ngũ trẻ trung, giàu kinh nghiệm và tư duy chiến lược, chúng tôi không chỉ tạo ra các chiến dịch hiệu quả mà còn đồng hành cùng thương hiệu trong hành trình xây dựng hình ảnh – tăng trưởng doanh thu – bứt phá thị trường.
            </p>
            <p class="about-description">
              MATECOM cam kết mang đến giá trị thực thông qua sự kết hợp giữa chiến lược dữ liệu và ý tưởng sáng tạo, giúp doanh nghiệp dẫn đầu trong kỷ nguyên số.
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
            <h3 class="card-title">Mission</h3>
            <p class="card-content">
              "MATECOM mang đến giải pháp Marketing toàn diện kết hợp công nghệ và sáng tạo chiến lược giúp doanh nghiệp tối đa hiệu quả, cùng cam kết đồng hành như đối tác tin cậy và kết nối như người bạn tri kỷ."
            </p>
          </div>
          
          <div class="vision-card fade-in-up">
            <div class="card-image">
              <img src="@/assets/img/aboutmatecom/Vision.jpg" alt="MATECOM Vision" />
            </div>
            <h3 class="card-title">Vision</h3>
            <p class="card-content">
              "Trở thành sự lựa chọn số 1 của doanh nghiệp trong tìm kiếm giải pháp marketing toàn diện"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Đội ngũ nhân sự -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title text-center fade-in-up">Đội ngũ nhân sự MATECOM</h2>
        
        <!-- Sơ đồ tổ chức -->
        <div class="org-chart fade-in-up">
          <!-- Giám đốc điều hành -->
          <div class="ceo-level">
            <div class="ceo-card">
              <div class="ceo-avatar">
                <img src="@/assets/img/aboutmatecom/Chu Thị Quỳnh.jpg" alt="Chu Thị Quỳnh" />
              </div>
              <div class="ceo-info">
                <h3 class="ceo-name">Chu Thị Quỳnh</h3>
                <p class="ceo-position">Giám đốc điều hành</p>
                <p class="ceo-title">CEO - Chief Executive Officer</p>
              </div>
            </div>
          </div>
          
          <!-- Các phòng ban -->
          <div class="departments-level">
            <div class="department-card fade-in-up">
              <div class="department-avatar">
                <img src="@/assets/img/aboutmatecom/Nguyễn Thị Huyền My.jpg" alt="Nguyễn Thị Huyền My" />
              </div>
              <div class="department-info">
                <h4 class="department-name">Marketing</h4>
                <p class="department-head">Nguyễn Thị Huyền My</p>
                <p class="department-title">CMO - Chief Marketing Officer</p>
              </div>
            </div>
            
            <div class="department-card fade-in-up">
              <div class="department-avatar">
                <img src="@/assets/img/aboutmatecom/Khuất Duy Anh.jpg" alt="Khuất Duy Anh" />
              </div>
              <div class="department-info">
                <h4 class="department-name">Tài chính</h4>
                <p class="department-head">Khuất Duy Anh</p>
                <p class="department-title">CFO - Chief Financial Officer</p>
              </div>
            </div>
            
            <div class="department-card fade-in-up">
              <div class="department-avatar">
                <img src="@/assets/img/aboutmatecom/Đào Thị Thơm - CTO.jpg" alt="Đào Thị Thơm" />
              </div>
              <div class="department-info">
                <h4 class="department-name">Sản xuất</h4>
                <p class="department-head">Đào Thị Thơm</p>
                <p class="department-title">CTO - Chief Technology Officer</p>
              </div>
            </div>
            
            <div class="department-card fade-in-up">
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
    </section>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { MessageCircle } from 'lucide-vue-next'

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
  
  /* Gradient background for entire view */
  background: linear-gradient(180deg, 
    #060F2A 0%, 
    #072845 25%, 
    #0D4496 50%, 
    #1E3A8A 75%, 
    #0F172A 100%
  );
  
  /* CSS Variables - Dark Theme like ServiceView */
  --about-section-bg: transparent;
  --mission-vision-bg: rgba(30, 41, 59, 0.3);
  --card-bg: rgba(30, 41, 59, 0.6);
  --card-border: rgba(51, 65, 85, 0.5);
  --team-section-bg: transparent;
  --team-member-bg: rgba(30, 41, 59, 0.6);
  --team-member-border: rgba(51, 65, 85, 0.5);
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
    rgba(6, 15, 42, 0.8) 0%,
    rgba(7, 40, 69, 0.7) 25%,
    rgba(13, 68, 150, 0.6) 50%,
    rgba(30, 58, 138, 0.8) 75%,
    rgba(15, 23, 42, 0.9) 100%
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
  color: #FFFFFF;
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
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.4;
  max-width: 900px;
  margin: 0 auto;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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
  background: linear-gradient(135deg, #1E3A8A, #3B82F6) !important;  /* MarcomMate primary colors */
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4) !important;
  transition: all var(--transition-normal) !important;
}

.contact-btn:hover {
  transform: scale(1.1) !important;
  box-shadow: 0 12px 35px rgba(30, 58, 138, 0.6) !important;  /* MarcomMate primary color shadow */
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
  color: #F8FAFC;
  margin: 0 0 32px 0;
}

.about-description {
  font-family: var(--font-family-body);
  font-size: 1.125rem;
  line-height: 1.8;
  color: #CBD5E1;
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
  color: #F8FAFC;
  margin: 0 0 20px 0;
}

.card-content {
  font-family: var(--font-family-body);
  font-size: 1.125rem;
  line-height: 1.7;
  color: #CBD5E1;
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
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-blue);
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
  border: 4px solid rgba(245, 158, 11, 0.6);
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
  border-color: rgba(245, 158, 11, 0.8);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
  transform: scale(1.05);
}

.ceo-name {
  font-family: var(--font-family-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: #F8FAFC;
  margin: 0 0 8px 0;
}

.ceo-position {
  font-family: var(--font-family-body);
  font-size: 1.25rem;
  color: #F59E0B;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.ceo-title {
  font-family: var(--font-family-body);
  font-size: 1rem;
  color: #CBD5E1;
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
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-blue);
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
  color: #F8FAFC;
  margin: 0 0 8px 0;
  text-align: center;
}

.department-head {
  font-family: var(--font-family-body);
  font-size: 1rem;
  color: #CBD5E1;
  margin: 0 0 4px 0;
  font-weight: 600;
  text-align: center;
}

.department-title {
  font-family: var(--font-family-body);
  font-size: 0.875rem;
  color: #94A3B8;
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
