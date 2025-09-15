<template>
  <div class="recruitment-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="hero-overlay"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-subtitle">Cơ hội nghề nghiệp</span>
          <h1 class="hero-title">Trở thành mảnh ghép của MATECOM</h1>
          <v-btn 
            class="hero-cta-btn"
            size="large"
            @click="scrollToPositions"
          >
            ỨNG TUYỂN NGAY
          </v-btn>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="10">
            <div class="values-header">
              <h2 class="values-title">Giá trị bạn nhận được tại MATECOM Agency</h2>
              <div class="values-divider"></div>
            </div>
            
            <div class="values-content">
              <!-- Value Item 1 -->
              <div class="value-item">
                <div class="value-content-left">
                  <div class="value-number">01</div>
                  <div class="value-text">
                    <h3 class="value-subtitle">Cơ hội học hỏi và phát triển không giới hạn</h3>
                    <div class="value-description">
                      <p>Tại Matecom, bạn được làm việc trong môi trường Digital Marketing năng động, nơi tri thức luôn mở rộng và cơ hội học hỏi không bao giờ dừng lại. Với đồng hành động của đội ngũ luôn nhiệt huyết, chúng tôi không chỉ tạo ra các kết quả chiến dịch dịch vụ mà còn giúp bạn phát triển bản thân toàn diện.</p>
                      <p>Matecom tin rằng sự phát triển của con người chính là nền tảng cho sức mạnh lớn nhất của tổ chức, vì vậy chúng tôi luôn ưu tiên đào tạo và hỗ trợ nhân sự phát triển lâu dài.</p>
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
                    <h3 class="value-subtitle">Thử luyện để trở thành phiên bản tốt nhất</h3>
                    <div class="value-description">
                      <p>Làm việc tại một agency trẻ như Matecom đồng nghĩa với việc bạn sẽ phải đối mặt với những thử thách thực tế đòi hỏi sự hoạt động. Chúng tôi tìm kiếm những bạn trẻ có tinh thần cầu tiến, kỷ luật và bùng nổ từ vùng an toàn, để không ngừng hoàn thiện kỹ năng và nâng cao chất lượng công việc.</p>
                      <p>Tại Matecom, chúng tôi đề nghị cao sự tập trung, chi tiết và đòi hỏi sự chất lượng, bởi mỗi dự án đều là cơ hội để bạn chứng minh bản lĩnh vực và sáng tạo.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Value Item 3 -->
              <div class="value-item">
                <div class="value-content-left">
                  <div class="value-number">03</div>
                  <div class="value-text">
                    <h3 class="value-subtitle">Môi trường khuyến khích sáng tạo, chủ động và linh hoạt</h3>
                    <div class="value-description">
                      <p>Matecom tin rằng ý tưởng đột phá chính là sức mạnh của Marketing hiện đại. Vì vậy, chúng tôi khuyến khích bạn tự động đưa ra quan điểm, chủ động trong công việc và luôn sẵn sàng đưa ra giải pháp mới.</p>
                      <p>Tại đây, mỗi cá nhân đều được trao quyền để làm chủ công việc, đồng thời cam kết trách nhiệm về những gì mình tạo ra. Sáng tạo, trách nhiệm và tinh thần đồng đội là những cốt lõi giá trị giúp Matecom khác biệt và phát triển bền vững.</p>
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
              <h2 class="section-title">Các vị trí tuyển dụng</h2>
              <div class="section-divider"></div>
            </div>
            
            <div class="positions-grid">
              <!-- Position 1: Graphic Design -->
              <div class="position-card">
                <div class="position-header">
                  <h3 class="company-title">MATECOM TUYỂN DỤNG</h3>
                </div>
                <div class="position-content">
                  <h4 class="job-title">CTV GRAPHIC DESIGN (THIẾT KẾ ĐỒ HỌA)</h4>
                </div>
                <div class="position-footer">
                  <v-btn 
                    class="apply-btn"
                    variant="elevated"
                    @click="showJobDetails('graphic-design')"
                  >
                    <span class="btn-text">THÔNG TIN ỨNG TUYỂN</span>
                    <v-icon class="btn-icon">mdi-file-edit-outline</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Position 2: Truyền thông -->
              <div class="position-card">
                <div class="position-header">
                  <h3 class="company-title">MATECOM TUYỂN DỤNG</h3>
                </div>
                <div class="position-content">
                  <h4 class="job-title">CTV TRUYỀN THÔNG</h4>
                </div>
                <div class="position-footer">
                  <v-btn 
                    class="apply-btn"
                    variant="elevated"
                    @click="showJobDetails('truyen-thong')"
                  >
                    <span class="btn-text">THÔNG TIN ỨNG TUYỂN</span>
                    <v-icon class="btn-icon">mdi-file-edit-outline</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Position 3: Đại sứ truyền thông -->
              <div class="position-card">
                <div class="position-header">
                  <h3 class="company-title">MATECOM TUYỂN DỤNG</h3>
                </div>
                <div class="position-content">
                  <h4 class="job-title">ĐẠI SỨ TRUYỀN THÔNG DỰ ÁN</h4>
                </div>
                <div class="position-footer">
                  <v-btn 
                    class="apply-btn"
                    variant="elevated"
                    @click="showJobDetails('dai-su-truyen-thong')"
                  >
                    <span class="btn-text">THÔNG TIN ỨNG TUYỂN</span>
                    <v-icon class="btn-icon">mdi-file-edit-outline</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Position 4: Digital Marketing -->
              <div class="position-card">
                <div class="position-header">
                  <h3 class="company-title">MATECOM TUYỂN DỤNG</h3>
                </div>
                <div class="position-content">
                  <h4 class="job-title">CTV DIGITAL MARKETING</h4>
                </div>
                <div class="position-footer">
                  <v-btn 
                    class="apply-btn"
                    variant="elevated"
                    @click="showJobDetails('digital-marketing')"
                  >
                    <span class="btn-text">THÔNG TIN ỨNG TUYỂN</span>
                    <v-icon class="btn-icon">mdi-file-edit-outline</v-icon>
                  </v-btn>
                </div>
              </div>

            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Application Form Section -->
    <section class="application-form-section">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="8">
            <div class="form-container">
              <h2 class="form-title">NỘP ĐƠN ỨNG TUYỂN</h2>
              
              <v-form @submit.prevent="submitApplication" class="application-form">
                <!-- Personal Information -->
                <div class="form-row">
                  <v-text-field
                    v-model="formData.fullName"
                    placeholder="Họ Tên"
                    variant="outlined"
                    class="form-field"
                    hide-details
                    required
                  />
                </div>
                
                <div class="form-row">
                  <v-text-field
                    v-model="formData.email"
                    placeholder="Email"
                    type="email"
                    variant="outlined"
                    class="form-field"
                    hide-details
                    required
                  />
                </div>
                
                <div class="form-row">
                  <v-text-field
                    v-model="formData.phone"
                    placeholder="Số Điện Thoại"
                    variant="outlined"
                    class="form-field"
                    hide-details
                    required
                  />
                </div>
                
                <div class="form-row">
                  <v-select
                    v-model="formData.position"
                    :items="positionOptions"
                    placeholder="---"
                    variant="outlined"
                    class="form-field"
                    hide-details
                    required
                  />
                </div>
                
                <!-- Cover Letter -->
                <div class="form-row">
                  <v-textarea
                    v-model="formData.coverLetter"
                    placeholder="Thư ứng tuyển"
                    variant="outlined"
                    rows="6"
                    class="form-field"
                    hide-details
                    required
                  />
                </div>
                
                <!-- File Upload -->
                <div class="form-row">
                  <div class="file-upload-section">
                    <v-file-input
                      v-model="formData.cvFile"
                      placeholder="Chọn tệp"
                      variant="outlined"
                      class="file-input"
                      accept=".pdf,.doc,.docx"
                      show-size
                      hide-details
                    />
                    <div class="upload-hint">
                      <v-icon class="cloud-icon">mdi-cloud-upload</v-icon>
                      <span>Tải lên cv ứng tuyển của bạn</span>
                    </div>
                  </div>
                </div>
                
                <!-- Submit Button -->
                <div class="form-row">
                  <v-btn
                    type="submit"
                    class="submit-btn"
                    size="large"
                    block
                    :loading="isSubmitting"
                  >
                    GỬI ĐƠN ỨNG TUYỂN
                  </v-btn>
                </div>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
  // TODO: Implement job details modal or navigation
  console.log('Show job details for:', jobType)
  // Có thể mở modal hoặc chuyển đến trang chi tiết
}

// Form data
const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  position: '',
  coverLetter: '',
  cvFile: null
})

const isSubmitting = ref(false)

// Position options for dropdown
const positionOptions = [
  'CTV GRAPHIC DESIGN (THIẾT KẾ ĐỒ HỌA)',
  'CTV TRUYỀN THÔNG',
  'ĐẠI SỨ TRUYỀN THÔNG DỰ ÁN',
  'CTV DIGITAL MARKETING'
]

// Submit application
const submitApplication = async () => {
  isSubmitting.value = true
  
  try {
    // TODO: Implement actual form submission
    console.log('Submitting application:', formData.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form after successful submission
    formData.value = {
      fullName: '',
      email: '',
      phone: '',
      position: '',
      coverLetter: '',
      cvFile: null
    }
    
    alert('Đơn ứng tuyển đã được gửi thành công!')
  } catch (error) {
    console.error('Error submitting application:', error)
    alert('Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* CSS Variables */
:root {
  --hero-overlay-gradient: linear-gradient(
    135deg,
    rgba(30, 58, 138, 0.8) 0%,
    rgba(59, 130, 246, 0.6) 50%,
    rgba(245, 158, 11, 0.4) 100%
  );
  --values-section-bg: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
  --value-item-bg: #FFFFFF;
  --value-item-border: rgba(226, 232, 240, 0.5);
  --value-item-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --value-item-hover-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  --value-item-hover-border: rgba(59, 130, 246, 0.2);
  --text-dark: #1F2937;
  --text-light: #6B7280;
  --positions-section-bg: #F8FAFC;
}

.recruitment-view {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
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
  background: var(--hero-overlay-gradient);
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
  background: linear-gradient(135deg, #EC4899 0%, #F97316 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: 8px !important;
  text-transform: none !important;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4) !important;
  transition: all 0.3s ease !important;
  text-align: center !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.hero-cta-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.6) !important;
}

/* Values Section */
.values-section {
  padding: 6rem 0;
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
}

.values-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  line-height: 1.2;
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
}

.value-item {
  display: flex;
  gap: 3rem;
  padding: 3rem;
  background: var(--value-item-bg);
  border-radius: 20px;
  box-shadow: var(--value-item-shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--value-item-border);
  align-items: center;
  margin-bottom: 4rem;
}

.value-item:hover {
  transform: translateY(-4px);
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
  color: #1E3A8A;
  line-height: 1;
  min-width: 80px;
  text-align: center;
  background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.value-text {
  flex: 1;
}

.value-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.value-description {
  color: var(--text-light);
  line-height: 1.7;
}

.value-description p {
  margin-bottom: 1rem;
  font-size: 1.0625rem;
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
  color: var(--text-dark);
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
  color: #1F2937;
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

/* Dark Theme Support */
:deep(.v-theme--dark) {
  --hero-overlay-gradient: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.9) 0%,
    rgba(30, 58, 138, 0.8) 50%,
    rgba(59, 130, 246, 0.6) 100%
  );
  --values-section-bg: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  --value-item-bg: #1E293B;
  --value-item-border: rgba(51, 65, 85, 0.5);
  --value-item-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  --value-item-hover-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  --value-item-hover-border: rgba(59, 130, 246, 0.4);
  --text-dark: #F8FAFC;
  --text-light: #CBD5E1;
  --positions-section-bg: #0F172A;
}

/* Ensure hero title stays white in dark mode */
:deep(.v-theme--dark) .hero-title {
  color: #FFFFFF !important;
}

/* Alternative dark mode selector */
.v-theme--dark .recruitment-view {
  --hero-overlay-gradient: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.9) 0%,
    rgba(30, 58, 138, 0.8) 50%,
    rgba(59, 130, 246, 0.6) 100%
  );
  --values-section-bg: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  --value-item-bg: #1E293B;
  --value-item-border: rgba(51, 65, 85, 0.5);
  --value-item-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  --value-item-hover-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  --value-item-hover-border: rgba(59, 130, 246, 0.4);
  --text-dark: #F8FAFC;
  --text-light: #CBD5E1;
  --positions-section-bg: #0F172A;
}

/* Ensure hero title stays white in alternative dark mode */
.v-theme--dark .recruitment-view .hero-title {
  color: #FFFFFF !important;
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

/* Application Form Section */
.application-form-section {
  padding: 5rem 0;
  background: #1E3A8A;
  position: relative;
}

.form-container {
  background: #1E3A8A;
  padding: 3rem;
  border-radius: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.application-form {
  width: 100%;
}

.form-row {
  margin-bottom: 1.5rem;
}

.form-field {
  width: 100%;
}

.form-field :deep(.v-field) {
  background-color: transparent !important;
  border: 2px solid #FFFFFF !important;
  border-radius: 8px !important;
}

.form-field :deep(.v-field__input) {
  color: #FFFFFF !important;
  padding: 12px 16px !important;
}

.form-field :deep(.v-field__input::placeholder) {
  color: #FFFFFF !important;
  opacity: 0.8 !important;
}

.form-field :deep(.v-label) {
  color: #FFFFFF !important;
  font-weight: 500 !important;
}

.form-field :deep(.v-field__outline) {
  color: #FFFFFF !important;
}

.form-field :deep(.v-field--focused .v-field__outline) {
  color: #F59E0B !important;
}

.file-upload-section {
  width: 100%;
}

.file-input :deep(.v-field) {
  background-color: transparent !important;
  border: 2px solid #FFFFFF !important;
  border-radius: 8px !important;
}

.file-input :deep(.v-field__input) {
  color: #FFFFFF !important;
}

.file-input :deep(.v-field__input::placeholder) {
  color: #FFFFFF !important;
  opacity: 0.8 !important;
}

.file-input :deep(.v-label) {
  color: #FFFFFF !important;
  font-weight: 500 !important;
}

.upload-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: #FFFFFF;
  font-size: 0.875rem;
  opacity: 0.8;
}

.cloud-icon {
  color: #FFFFFF !important;
  font-size: 1.25rem !important;
}

.submit-btn {
  background: #F59E0B !important;
  color: #FFFFFF !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  padding: 1rem 2rem !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3) !important;
  transition: all 0.3s ease !important;
  margin-top: 1rem !important;
}

.submit-btn:hover {
  background: #D97706 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4) !important;
}

/* Dark theme form styling */
:deep(.v-theme--dark) .application-form-section {
  background: #0F172A;
}

:deep(.v-theme--dark) .form-container {
  background: #0F172A;
}

/* Responsive form design */
@media (max-width: 768px) {
  .form-container {
    padding: 2rem 1.5rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .form-row {
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .application-form-section {
    padding: 3rem 0;
  }
  
  .form-container {
    padding: 1.5rem 1rem;
  }
  
  .form-title {
    font-size: 1.25rem;
  }
}
</style>
