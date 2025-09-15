<template>
  <div class="service-view">
    <!-- Hero Section -->
    <section class="hero-section fade-in-up">
      <v-container>
        <div class="hero-content">
          <h1 class="hero-title">Dịch Vụ Marketing</h1>
          <p class="hero-slogan">
            "Giải pháp marketing toàn diện, được thiết kế để trở thành 'bộ não' và 'cánh tay nối dài' của đội ngũ bạn"
          </p>
        </div>
      </v-container>
    </section>

    <!-- Introduction Section -->
    <section class="intro-section">
      <v-container>
        <div class="intro-content fade-in-up">
          <p class="intro-text">
            Bạn đang trăn trở về việc làm thế nào để thương hiệu của mình nổi bật giữa thị trường cạnh tranh? Bạn khao khát có một chiến lược marketing vững chắc, nhưng không biết bắt đầu từ đâu? Hay bạn đã có ý tưởng, nhưng thiếu một đội ngũ chuyên nghiệp để biến chúng thành kết quả đột phá?
          </p>
          <p class="intro-text">
            Nếu những câu hỏi này vang vọng trong tâm trí bạn, bạn đã đến đúng nơi.
          </p>
          <p class="intro-text">
            Chúng tôi hiểu rằng mỗi doanh nghiệp là một câu chuyện độc đáo với những thách thức và mục tiêu riêng biệt. Đó là lý do tại sao chúng tôi không cung cấp những gói dịch vụ rập khuôn. Thay vào đó, chúng tôi mang đến một hệ thống giải pháp marketing toàn diện, được thiết kế để trở thành "bộ não" và "cánh tay nối dài" của đội ngũ bạn.
          </p>
          <p class="intro-text">
            Với kinh nghiệm sâu rộng trong việc tư vấn và triển khai cho đa dạng các ngành hàng, chúng tôi tự tin đồng hành cùng bạn từ những bước đi đầu tiên của chiến lược đến việc triển khai những chiến dịch phức phá cuối cùng. Chúng tôi không chỉ giúp bạn tìm ra con đường ngắn nhất để đạt được mục tiêu, mà còn đảm bảo mỗi đồng ngân sách bạn chi ra đều mang lại hiệu quả tối đa.
          </p>
          <p class="intro-text">
            Hãy để chúng tôi giúp bạn xây dựng một nền tảng marketing vững chắc, tạo ra những chiến dịch lan tỏa và biến mục tiêu doanh thu thành hiện thực. Khám phá các gói dịch vụ của chúng tôi ngay dưới đây để tìm ra giải pháp phù hợp nhất cho doanh nghiệp của bạn.
          </p>
        </div>
      </v-container>
    </section>

    <!-- Main Services Section -->
    <section class="main-services-section">
      <v-container>
        <div class="section-header fade-in-up">
          <h2 class="section-title">Các Gói Dịch Vụ Chính</h2>
        </div>
        
        <!-- Service 1 -->
        <div class="service-item fade-in-up">
          <div class="service-header">
            <h3 class="service-name">Gói 1: Tư vấn & Xây dựng chiến lược Marketing (Basic)</h3>
            <div class="service-badge">Basic</div>
          </div>
          <div class="service-image">
            <img src="/src/assets/img/services/Basic.png" alt="Basic Service" />
          </div>
          
          <div class="service-content">
            <div class="service-intro">
              <h4>Bạn có đang...</h4>
              <ul class="service-points">
                <li>Cảm thấy lạc lối giữa vô vàn chiến lược marketing trên thị trường?</li>
                <li>Đổ tiền vào quảng cáo nhưng không thấy hiệu quả rõ rệt?</li>
                <li>Muốn mở rộng thị trường nhưng chưa biết bắt đầu từ đâu?</li>
              </ul>
              <p class="service-highlight">
                Nếu câu trả lời là "Có", Gói 1 chính là điểm khởi đầu hoàn hảo dành cho bạn.
              </p>
            </div>
            
            <div class="service-details">
              <h4>Giá trị cốt lõi:</h4>
              <p>Một bộ chiến lược được "đo ni đóng giày" riêng cho doanh nghiệp của bạn, giải quyết tận gốc các vấn đề, từ đó bạn có thể tự tin triển khai và tối ưu hóa mọi hoạt động marketing.</p>
              
              <h4>Chúng tôi sẽ cùng bạn:</h4>
              <ul class="service-features">
                <li><strong>Lý giải thị trường & khách hàng:</strong> Sử dụng các mô hình phân tích chuyên sâu (PESTEL, 3Cs, SWOT...) để "giải phẫu" thị trường, hiểu rõ đối thủ và tìm ra điểm chạm đúng đắn với khách hàng mục tiêu của bạn.</li>
                <li><strong>Xây dựng "định vị" độc nhất:</strong> Giúp thương hiệu của bạn không chỉ tồn tại mà còn nổi bật trong tâm trí khách hàng. Chúng tôi sẽ xây dựng Tuyên ngôn giá trị (Value Proposition) mạnh mẽ.</li>
                <li><strong>Xác định con đường tăng trưởng:</strong> Dựa trên phân tích, chúng tôi sẽ đề xuất chiến lược trọng tâm phù hợp nhất.</li>
              </ul>
              
              <h4>Kết quả cuối cùng:</h4>
              <p>Bạn sẽ sở hữu một bản "Marketing Strategy Blueprint" - một tài liệu chuyên sâu, trực quan, là kim chỉ nam cho mọi quyết định marketing của bạn.</p>
            </div>
            
            <div class="service-actions">
              <v-btn
                color="primary"
                variant="outlined"
                class="detail-btn"
                @click="goToServiceDetail('basic')"
              >
                Xem chi tiết
              </v-btn>
            </div>
          </div>
        </div>

        <!-- Service 2 -->
        <div class="service-item fade-in-up">
          <div class="service-header">
            <h3 class="service-name">Gói 2: Giải pháp Marketing Tích hợp (Advanced)</h3>
            <div class="service-badge">Advanced</div>
          </div>
          <div class="service-image">
            <img src="/src/assets/img/services/Advanced .png" alt="Advanced Service" />
          </div>
          
          <div class="service-content">
            <div class="service-intro">
              <h4>Bạn đang...</h4>
              <ul class="service-points">
                <li>Sở hữu một chiến lược tuyệt vời nhưng lại thiếu nhân sự hoặc kinh nghiệm để thực thi?</li>
                <li>Đã triển khai marketing nhưng các kênh hoạt động rời rạc, không đồng nhất?</li>
                <li>Cần một đội ngũ chuyên nghiệp, có thể đồng hành và đảm bảo mục tiêu doanh thu?</li>
              </ul>
            </div>
            
            <div class="service-details">
              <h4>Phù hợp với:</h4>
              <p>Các doanh nghiệp đã có chiến lược nền tảng và cần một "bộ máy" tinh gọn, chuyên nghiệp để biến chúng thành kết quả thực tế.</p>
              
              <h4>Giá trị cốt lõi:</h4>
              <p>Chúng tôi không chỉ cung cấp một kế hoạch, mà còn trở thành đội ngũ triển khai của bạn, đảm bảo các kênh marketing không còn hoạt động rời rạc.</p>
              
              <h4>Dưới đây là cách chúng tôi hiện thực hóa chiến lược của bạn:</h4>
              <ul class="service-features">
                <li><strong>Phân tích dữ liệu & Xây dựng Big Idea:</strong> Phân tích sâu dữ liệu từ doanh nghiệp của bạn kết hợp với dữ liệu thị trường.</li>
                <li><strong>Triển khai các kênh đa dạng, đồng bộ:</strong> Thiết kế và triển khai một kế hoạch IMC hoàn chỉnh.</li>
                <li><strong>Giải pháp công nghệ chuyên sâu:</strong> Ứng dụng các giải pháp tiên tiến như ABM, Social & Creator Program, Marketing Automation & CRM.</li>
              </ul>
            </div>
            
            <div class="service-actions">
              <v-btn
                color="primary"
                variant="outlined"
                class="detail-btn"
                @click="goToServiceDetail('advanced')"
              >
                Xem chi tiết
              </v-btn>
            </div>
          </div>
        </div>

        <!-- Service 3 -->
        <div class="service-item fade-in-up">
          <div class="service-header">
            <h3 class="service-name">Gói 3: Chiến Lược & Kế Hoạch Triển Khai Toàn Diện (Premium)</h3>
            <div class="service-badge">Premium</div>
          </div>
          <div class="service-image">
            <img src="/src/assets/img/services/Premium.png" alt="Premium Service" />
          </div>
          
          <div class="service-content">
            <div class="service-intro">
              <h4>Đây có phải là bạn?</h4>
              <ul class="service-points">
                <li>Bạn đang có mục tiêu tăng trưởng đột phá nhưng chưa có một lộ trình rõ ràng để đạt được?</li>
                <li>Bạn muốn tối ưu hóa mọi nguồn lực, từ ngân sách đến nhân sự, để tạo ra hiệu quả cao nhất?</li>
                <li>Bạn cần một sự đồng hành toàn diện, từ hoạch định chiến lược đến xây dựng hệ thống đo lường hiệu quả?</li>
              </ul>
            </div>
            
            <div class="service-details">
              <h4>Phù hợp với:</h4>
              <p>Các doanh nghiệp muốn đạt được những mục tiêu lớn, cần một lộ trình phát triển rõ ràng từ 4-12 tháng.</p>
              
              <h4>Chúng tôi sẽ cùng bạn tạo ra:</h4>
              <ol class="service-steps">
                <li>
                  <strong>Định vị sắc bén & Chiến lược tăng trưởng khả thi</strong>
                  <p>Xác định đúng hướng đi, tìm ra thị trường ngách, chân dung khách hàng lý tưởng và định vị thương hiệu mạnh mẽ.</p>
                </li>
                <li>
                  <strong>Kế hoạch hành động chi tiết</strong>
                  <p>Chuyển hóa chiến lược thành hành động với bản kế hoạch 6–12 tháng chi tiết, biến những ý tưởng lớn thành những nhiệm vụ cụ thể.</p>
                </li>
                <li>
                  <strong>Hệ thống vận hành và đo lường</strong>
                  <p>Hỗ trợ vận hành theo quy trình Agile Marketing Sprint và thiết lập Dashboard theo dõi KPI theo thời gian thực.</p>
                </li>
              </ol>
            </div>
            
            <div class="service-actions">
              <v-btn
                color="primary"
                variant="outlined"
                class="detail-btn"
                @click="goToServiceDetail('premium')"
              >
                Xem chi tiết
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
          <h2 class="section-title">Các Gói Dịch Vụ Mở Rộng (Add-ons)</h2>
          <p class="section-subtitle">
            Những giải pháp linh hoạt, được thiết kế để lấp đầy những khoảng trống và tối ưu hóa nguồn lực cho doanh nghiệp của bạn.
          </p>
        </div>
        
        <div class="addons-list">
          <div class="addon-item fade-in-up">
            <h3 class="addon-title">1. CMO-as-a-Service: Giám đốc Marketing thuê ngoài</h3>
            <p class="addon-description">
              Bạn cần một tầm nhìn chiến lược và sự dẫn dắt của một Giám đốc Marketing (CMO) dày dạn kinh nghiệm, nhưng chưa sẵn sàng cho chi phí và cam kết của một vị trí toàn thời gian?
            </p>
            <div class="addon-benefits">
              <h4>Giá trị bạn nhận được:</h4>
              <ul>
                <li><strong>Tư duy chiến lược cao cấp:</strong> Đảm bảo mọi hoạt động marketing đều nhất quán và hướng tới mục tiêu kinh doanh tổng thể.</li>
                <li><strong>Tiết kiệm chi phí:</strong> Có được kinh nghiệm của một CMO mà không tốn chi phí tuyển dụng và lương thưởng của một nhân sự cấp cao.</li>
                <li><strong>Hệ thống hóa quy trình:</strong> Hỗ trợ xây dựng quy trình làm việc khoa học, giúp đội ngũ của bạn làm việc hiệu quả hơn.</li>
              </ul>
            </div>
          </div>

          <div class="addon-item fade-in-up">
            <h3 class="addon-title">2. Market Entry & Localization: Chinh phục thị trường mới</h3>
            <p class="addon-description">
              Bạn đang có kế hoạch mở rộng sang một thị trường mới, nhưng lo lắng về sự khác biệt về văn hóa, ngôn ngữ và thói quen tiêu dùng?
            </p>
            <div class="addon-benefits">
              <h4>Giá trị bạn nhận được:</h4>
              <ul>
                <li><strong>Giảm thiểu rủi ro:</strong> Tránh được những sai lầm tốn kém khi thâm nhập vào thị trường mới.</li>
                <li><strong>Tối ưu hóa hiệu quả:</strong> Đảm bảo thông điệp của bạn "chạm" đến đúng đối tượng, tạo ra hiệu ứng mạnh mẽ ngay từ ban đầu.</li>
                <li><strong>Lợi thế cạnh tranh:</strong> Có được sự am hiểu sâu sắc về thị trường để tạo ra các chiến dịch mang tính đột phá.</li>
              </ul>
            </div>
          </div>

          <div class="addon-item fade-in-up">
            <h3 class="addon-title">3. Training In-house: Nâng cao năng lực đội ngũ</h3>
            <p class="addon-description">
              Đội ngũ marketing nội bộ của bạn cần được trang bị những kiến thức và kỹ năng mới nhất?
            </p>
            <div class="addon-benefits">
              <h4>Các khóa học bao gồm:</h4>
              <ul>
                <li><strong>SEO & Content:</strong> Cách xây dựng cụm chủ đề, tối ưu hóa on-page/off-page, và lập kế hoạch nội dung hiệu quả.</li>
                <li><strong>Performance Marketing:</strong> Vận hành và tối ưu hóa các chiến dịch quảng cáo trên Google/Meta, phân tích chỉ số CAC, ROAS...</li>
                <li><strong>GA4 & Data Analytics:</strong> Sử dụng Google Analytics 4 để đo lường, phân tích hành vi người dùng và đưa ra các quyết định dựa trên dữ liệu.</li>
                <li><strong>CRM & Marketing Automation:</strong> Cách xây dựng phễu khách hàng, quản lý tương tác và tự động hóa các quy trình marketing.</li>
              </ul>
            </div>
          </div>
        </div>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <v-container>
        <div class="cta-content fade-in-up">
          <h2 class="cta-title">Sẵn sàng bắt đầu?</h2>
          <p class="cta-text">
            Hãy để chúng tôi cùng bạn xây dựng chiến lược marketing đột phá
          </p>
          <v-btn
            color="primary"
            size="large"
            class="cta-btn"
            @click="contactUs"
          >
            Liên hệ tư vấn
          </v-btn>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const contactUs = () => {
  // TODO: Implement contact form or navigation
  console.log('Contact us clicked')
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
  
  /* Gradient background for entire view */
  background: linear-gradient(180deg, 
    #060F2A 0%, 
    #072845 25%, 
    #0D4496 50%, 
    #1E3A8A 75%, 
    #0F172A 100%
  );
  
  /* CSS Variables - Dark Theme like PartnerView */
  --hero-bg: transparent;
  --hero-overlay: transparent;
  --hero-text: #F8FAFC;
  --hero-accent: #F59E0B;  /* MarcomMate accent orange */
  --intro-bg: transparent;
  --intro-text-color: #F8FAFC;
  --main-services-bg: transparent;
  --service-item-bg: rgba(30, 41, 59, 0.6);
  --service-item-border: rgba(51, 65, 85, 0.5);
  --service-header-bg: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%);
  --service-badge-basic: linear-gradient(135deg, #10B981, #059669);
  --service-badge-advanced: linear-gradient(135deg, #3B82F6, #1E40AF);
  --service-badge-premium: linear-gradient(135deg, #8B5CF6, #7C3AED);
  --service-badge-text: #ffffff;
  --service-title-color: #F8FAFC;
  --service-subtitle-color: #CBD5E1;
  --service-text-color: #94A3B8;
  --addons-bg: transparent;
  --addon-item-bg: rgba(30, 41, 59, 0.6);
  --addon-item-border: rgba(51, 65, 85, 0.5);
  --cta-bg: transparent;
  --cta-text: #F8FAFC;
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
  max-width: 900px;
  margin: 0 auto;
}

.intro-text {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  line-height: 1.8;
  color: var(--intro-text-color);
  margin-bottom: var(--spacing-md);
}

/* Main Services Section */
.main-services-section {
  background: var(--main-services-bg);
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
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
  max-width: 700px;
  margin: 0 auto;
}

/* Service Items - List Style */
.service-item {
  background: var(--service-item-bg);
  border: 1px solid var(--service-item-border);
  border-radius: 16px;
  margin-bottom: var(--spacing-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.service-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.service-header {
  background: var(--service-header-bg);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-bottom: 1px solid var(--service-item-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.service-name {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--service-title-color);
  margin: 0;
  flex: 1;
  min-width: 300px;
}

.service-badge {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 20px;
  color: var(--service-badge-text);
  font-family: var(--font-family-heading);
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.service-item:nth-child(1) .service-badge {
  background: var(--service-badge-basic);
}

.service-item:nth-child(2) .service-badge {
  background: var(--service-badge-advanced);
}

.service-item:nth-child(3) .service-badge {
  background: var(--service-badge-premium);
}

.service-image {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-2xl);
  background: rgba(59, 130, 246, 0.05);
}

.service-image img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-normal);
}

.service-image img:hover {
  transform: scale(1.05);
}

.service-content {
  padding: var(--spacing-xl);
}

.service-intro h4,
.service-details h4 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--service-title-color);
  margin: var(--spacing-md) 0 var(--spacing-sm);
}

.service-points,
.service-features {
  list-style: none;
  padding: 0;
  margin: var(--spacing-sm) 0;
}

.service-points li,
.service-features li {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: var(--service-text-color);
  line-height: 1.6;
  margin-bottom: var(--spacing-xs);
  padding-left: var(--spacing-md);
  position: relative;
}

.service-points li::before,
.service-features li::before {
  content: '•';
  color: var(--primary-blue);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.service-highlight {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  color: #FFFFFF;
  font-weight: 600;
  font-style: italic;
  margin: var(--spacing-md) 0;
  padding: var(--spacing-md);
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid var(--primary-blue);
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
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  border-left: 4px solid var(--primary-blue);
}

.service-steps li::before {
  content: counter(step-counter);
  background: var(--primary-blue);
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
  margin-top: var(--spacing-lg);
  text-align: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--service-item-border);
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-btn {
  font-family: var(--font-family-heading);
  font-weight: 600;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: 8px;
  transition: all var(--transition-normal);
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
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

.cta-btn {
  background: var(--cta-btn-bg) !important;
  border: none !important;
  color: white !important;
  font-family: var(--font-family-heading);
  font-weight: 600;
  border-radius: 12px;
  transition: all var(--transition-normal);
  min-width: 200px;
}

.cta-btn:hover {
  background: var(--cta-btn-hover) !important;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
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
  
  .service-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }
  
  .service-name {
    min-width: auto;
    font-size: var(--font-size-xl);
  }
  
  .service-content {
    padding: var(--spacing-xl);
  }
  
  .service-image {
    padding: var(--spacing-lg);
  }
  
  .service-image img {
    width: 100%;
  }
  
  .service-actions {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .detail-btn {
    min-width: 120px;
    width: 100%;
    max-width: 200px;
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
