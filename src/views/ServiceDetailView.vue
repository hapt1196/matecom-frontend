<template>
  <div class="service-detail-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <div class="hero-content">
          <div class="breadcrumb">
            <router-link to="/services" class="breadcrumb-link">
              <v-icon>mdi-arrow-left</v-icon>
              Quay lại dịch vụ
            </router-link>
          </div>
          <div class="hero-main">
            <div class="hero-text">
              <h1 class="hero-title">{{ serviceData.title }}</h1>
              <p class="hero-subtitle">{{ serviceData.subtitle }}</p>
              <div class="service-badge" :class="serviceData.badgeClass">
                {{ serviceData.badge }}
              </div>
            </div>
            <div class="hero-image">
              <img :src="serviceData.image" :alt="serviceData.title" />
            </div>
          </div>
        </div>
      </v-container>
    </section>

    <!-- Service Content -->
    <section class="service-content-section">
      <v-container>
        <div class="content-wrapper">
          <!-- Introduction -->
          <div class="content-block">
            <h2 class="section-title">Bạn có đang...</h2>
            <ul class="service-points">
              <li v-for="point in serviceData.painPoints" :key="point">{{ point }}</li>
            </ul>
            <div class="highlight-box">
              <p>{{ serviceData.highlight }}</p>
            </div>
          </div>

          <!-- Core Value -->
          <div class="content-block">
            <h2 class="section-title">Giá trị cốt lõi</h2>
            <p class="core-value-text">{{ serviceData.coreValue }}</p>
          </div>

          <!-- What We Do -->
          <div class="content-block">
            <h2 class="section-title">Chúng tôi sẽ cùng bạn</h2>
            <div class="features-grid">
              <div v-for="feature in serviceData.features" :key="feature.title" class="feature-item">
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p class="feature-description">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <!-- Final Result -->
          <div class="content-block">
            <h2 class="section-title">Kết quả cuối cùng</h2>
            <p class="final-result-text">{{ serviceData.finalResult }}</p>
          </div>

          <!-- Additional Content for Premium Package -->
          <div v-if="serviceData.additionalContent" class="content-block">
            <div v-for="section in serviceData.additionalContent" :key="section.title" class="additional-section">
              <h2 class="section-title">{{ section.title }}</h2>
              <div v-if="section.steps" class="steps-list">
                <div v-for="(step, index) in section.steps" :key="index" class="step-item">
                  <div class="step-number">{{ index + 1 }}</div>
                  <div class="step-content">
                    <h3 class="step-title">{{ step.title }}</h3>
                    <p class="step-description">{{ step.description }}</p>
                  </div>
                </div>
              </div>
              <div v-else-if="section.deliverables" class="deliverables-list">
                <ul>
                  <li v-for="deliverable in section.deliverables" :key="deliverable">{{ deliverable }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <v-container>
        <div class="cta-content">
          <h2 class="cta-title">Sẵn sàng bắt đầu với {{ serviceData.badge }}?</h2>
          <p class="cta-text">
            Hãy để chúng tôi cùng bạn xây dựng chiến lược marketing đột phá
          </p>
          <div class="cta-button-wrapper">
            <ContactButton
              text="Liên hệ tư vấn ngay"
              custom-class="cta-btn orange-accent"
              icon="mdi-phone-outline"
            />
          </div>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ContactButton from '@/components/common/ContactButton.vue'

const route = useRoute()

// Service data based on the markdown content
const servicesData = {
  basic: {
    title: 'Tư vấn & Xây dựng chiến lược Marketing',
    subtitle: 'Điểm khởi đầu hoàn hảo cho doanh nghiệp của bạn',
    badge: 'Basic',
    badgeClass: 'badge-basic',
    image: '/assets/img/services/Basic.png',
    painPoints: [
      'Cảm thấy lạc lối giữa vô vàn chiến lược marketing trên thị trường?',
      'Đổ tiền vào quảng cáo nhưng không thấy hiệu quả rõ rệt?',
      'Muốn mở rộng thị trường nhưng chưa biết bắt đầu từ đâu?'
    ],
    highlight: 'Nếu câu trả lời là "Có", Gói 1 chính là điểm khởi đầu hoàn hảo dành cho bạn. Chúng tôi sẽ không chỉ cung cấp một bản kế hoạch, mà còn mang đến một "bản đồ" dẫn lối giúp doanh nghiệp bạn đi đúng hướng.',
    coreValue: 'Một bộ chiến lược được "đo ni đóng giày" riêng cho doanh nghiệp của bạn, giải quyết tận gốc các vấn đề, từ đó bạn có thể tự tin triển khai và tối ưu hóa mọi hoạt động marketing.',
    features: [
      {
        title: 'Lý giải thị trường & khách hàng',
        description: 'Chúng tôi sử dụng các mô hình phân tích chuyên sâu (PESTEL, 3Cs, SWOT...) để "giải phẫu" thị trường, hiểu rõ đối thủ và tìm ra điểm chạm đúng đắn với khách hàng mục tiêu của bạn.'
      },
      {
        title: 'Xây dựng "định vị" độc nhất',
        description: 'Giúp thương hiệu của bạn không chỉ tồn tại mà còn nổi bật trong tâm trí khách hàng. Chúng tôi sẽ xây dựng Tuyên ngôn giá trị (Value Proposition) mạnh mẽ, giúp bạn trả lời câu hỏi: "Tại sao khách hàng nên chọn bạn thay vì đối thủ?".'
      },
      {
        title: 'Xác định con đường tăng trưởng',
        description: 'Dựa trên phân tích, chúng tôi sẽ đề xuất chiến lược trọng tâm phù hợp nhất: tập trung vào một phân khúc hẹp đầy tiềm năng, tạo sự khác biệt bằng công nghệ, tối ưu hóa chi phí để dẫn đầu về giá, hoặc mở rộng thị trường theo mô hình Ansoff.'
      }
    ],
    finalResult: 'Bạn sẽ sở hữu một bản "Marketing Strategy Blueprint" - một tài liệu chuyên sâu, trực quan, là kim chỉ nam cho mọi quyết định marketing của bạn. Đây không chỉ là một bản kế hoạch, mà là nền tảng vững chắc cho sự phát triển bền vững.'
  },
  advanced: {
    title: 'Giải pháp Marketing Tích hợp',
    subtitle: 'Biến ý tưởng thành kết quả thực tế',
    badge: 'Advanced',
    badgeClass: 'badge-advanced',
    image: '/assets/img/services/Advanced .png',
    painPoints: [
      'Sở hữu một chiến lược tuyệt vời nhưng lại thiếu nhân sự hoặc kinh nghiệm để thực thi?',
      'Đã triển khai marketing nhưng các kênh hoạt động rời rạc, không đồng nhất?',
      'Cần một đội ngũ chuyên nghiệp, có thể đồng hành và đảm bảo mục tiêu doanh thu?'
    ],
    highlight: 'Nếu bạn đã có "bản đồ chiến lược" và cần một "đội ngũ thực chiến", Gói 2 chính là sự lựa chọn hoàn hảo. Đây là gói dịch vụ biến mọi ý tưởng và kế hoạch trên giấy thành những chiến dịch hiệu quả, đo lường được.',
    coreValue: 'Chúng tôi không chỉ cung cấp một kế hoạch, mà còn trở thành đội ngũ triển khai của bạn, đảm bảo các kênh marketing không còn hoạt động rời rạc. Mỗi chiến dịch được thực hiện đều là một phần của tổng thể lớn hơn, hướng đến mục tiêu chung: tăng trưởng doanh thu và xây dựng vị thế thương hiệu vững chắc.',
    features: [
      {
        title: 'Phân tích dữ liệu & Xây dựng Big Idea',
        description: 'Chúng tôi bắt đầu bằng việc phân tích sâu dữ liệu từ doanh nghiệp của bạn (hành vi khách hàng, lịch sử mua hàng, tương tác trên các kênh) kết hợp với dữ liệu thị trường mà chúng tôi thu thập. Từ đó, chúng tôi không chỉ xác định Key Message (thông điệp chính) mà còn tìm ra Big Idea độc đáo, là "xương sống" cho toàn bộ chiến dịch.'
      },
      {
        title: 'Triển khai các kênh đa dạng, đồng bộ',
        description: 'Chúng tôi thiết kế và triển khai một kế hoạch IMC hoàn chỉnh, bao gồm Digital Performance (SEO, Google Ads, Facebook Ads), Brand Marketing (PR, cộng đồng, Thought Leadership), và Product Marketing (Go-to-Market, Product Storytelling).'
      },
      {
        title: 'Giải pháp công nghệ chuyên sâu',
        description: 'Ứng dụng các giải pháp tiên tiến như Account-Based Marketing (ABM), Social & Creator/Expert Program, và Marketing Automation & CRM để nâng cao hiệu quả và tự động hóa các quy trình marketing.'
      }
    ],
    finalResult: 'Bạn sẽ nhận được một "Execution Roadmap" chi tiết và trực quan. Không chỉ là một bảng kế hoạch, mà là một quy trình làm việc khoa học, giúp bạn theo dõi và đánh giá hiệu quả của từng đồng chi phí, đảm bảo các mục tiêu về reach, engagement, traffic và đặc biệt là doanh thu được hiện thực hóa một cách mạnh mẽ và bền vững.'
  },
  premium: {
    title: 'Chiến Lược & Kế Hoạch Triển Khai Toàn Diện',
    subtitle: 'Giải pháp toàn diện cho sự phát triển bền vững',
    badge: 'Premium',
    badgeClass: 'badge-premium',
    image: '/assets/img/services/Premium.png',
    painPoints: [
      'Bạn đang có mục tiêu tăng trưởng đột phá nhưng chưa có một lộ trình rõ ràng để đạt được?',
      'Bạn muốn tối ưu hóa mọi nguồn lực, từ ngân sách đến nhân sự, để tạo ra hiệu quả cao nhất?',
      'Bạn cần một sự đồng hành toàn diện, từ hoạch định chiến lược đến xây dựng hệ thống đo lường hiệu quả?'
    ],
    highlight: 'Nếu bạn đang tìm kiếm một giải pháp toàn diện để đưa doanh nghiệp lên một tầm cao mới, gói Premium chính là câu trả lời. Đây không chỉ là một dịch vụ tư vấn, mà là một quy trình và hệ thống hoàn chỉnh, giúp bạn xây dựng nền tảng vững chắc cho sự phát triển dài hạn.',
    coreValue: 'Chúng tôi sẽ cung cấp cho bạn một bộ công cụ hoàn hảo: từ chiến lược tổng thể, kế hoạch hành động chi tiết đến hệ thống đo lường hiệu quả. Tất cả được xây dựng để đạt được mục tiêu doanh thu đã đặt ra, giúp bạn tự tin tăng trưởng bền vững.',
    features: [
      {
        title: 'Định vị sắc bén & Chiến lược tăng trưởng khả thi',
        description: 'Xác định đúng hướng đi, tìm ra thị trường ngách, chân dung khách hàng lý tưởng (ICP/Persona) và định vị thương hiệu mạnh mẽ. Sau đó, chúng tôi lựa chọn mô hình tăng trưởng phù hợp nhất và đề xuất chiến lược trọng tâm.'
      },
      {
        title: 'Kế hoạch hành động chi tiết',
        description: 'Chuyển hóa chiến lược thành hành động với bản kế hoạch 6–12 tháng chi tiết, biến những ý tưởng lớn thành những nhiệm vụ cụ thể. Lập ngân sách marketing khoa học và thiết lập KPI rõ ràng, đo lường theo mô hình AARRR.'
      },
      {
        title: 'Hệ thống vận hành và đo lường',
        description: 'Hỗ trợ đội ngũ nội bộ của bạn trong việc triển khai theo quy trình Agile Marketing Sprint và xây dựng một KPI Dashboard tùy chỉnh, giúp bạn theo dõi hiệu quả của chiến dịch theo thời gian thực.'
      }
    ],
    finalResult: 'Bạn sẽ nhận được một bộ hồ sơ đầy đủ, sẵn sàng để sử dụng ngay: Marketing Strategy Blueprint (PDF/Slides), 12-month Marketing Plan (Excel/Sheets), Execution Roadmap (kanban/Gantt), và Tracking & Analytics Pack.',
    additionalContent: [
      {
        title: 'Nghiên cứu & Phân tích chuyên sâu',
        steps: [
          {
            title: 'Thu thập dữ liệu',
            description: 'Phân tích dữ liệu sẵn có của bạn (GA4, CRM, ad accounts...) để tìm ra những "điểm nghẽn" và cơ hội.'
          },
          {
            title: 'Nghiên cứu chuyên sâu',
            description: 'Thực hiện phỏng vấn khách hàng/bên mua để thấu hiểu Jobs-to-be-done và xây dựng bản đồ hành trình khách hàng (Customer Journey Map) chi tiết.'
          }
        ]
      },
      {
        title: 'Kết quả cuối cùng',
        deliverables: [
          'Marketing Strategy Blueprint (PDF/Slides): Tổng quan về thị trường, khách hàng, định vị và chiến lược.',
          '12-month Marketing Plan (Excel/Sheets): Lịch trình, ngân sách và KPI chi tiết.',
          'Execution Roadmap (kanban/Gantt): Kế hoạch triển khai theo sprint.',
          'Tracking & Analytics Pack: Hướng dẫn theo dõi và đo lường hiệu quả.'
        ]
      }
    ]
  }
}

const serviceData = computed(() => {
  const serviceType = route.params.serviceType
  return servicesData[serviceType] || servicesData.basic
})

// ContactButton component handles navigation automatically
</script>

<style scoped>
.service-detail-view {
  min-height: 100vh;
  
  /* CSS Variables với giá trị mặc định (light mode) */
  --hero-bg: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #1E40AF 100%);
  --hero-overlay: rgba(0, 0, 0, 0.4);
  --hero-text: #FFFFFF;
  --hero-accent: #FCD34D;
  --content-bg: rgb(238, 245, 254);
  --content-text-color: #03045e;
  --section-bg: rgb(238, 245, 254);
  --card-bg: #ffffff;
  --card-border: #e2e8f0;
  --service-badge-basic: linear-gradient(135deg, #10B981, #059669);
  --service-badge-advanced: linear-gradient(135deg, #3B82F6, #1E40AF);
  --service-badge-premium: linear-gradient(135deg, #8B5CF6, #7C3AED);
  --service-badge-text: #ffffff;
  --title-color: #03045e;
  --text-color: #03045e;
  --highlight-bg: rgba(59, 130, 246, 0.1);
  --highlight-border: #3B82F6;
  --cta-bg: rgb(238, 245, 254);
  --cta-text: #03045e;
  --cta-btn-bg: linear-gradient(135deg, #F59E0B, #F97316);
  --cta-btn-hover: linear-gradient(135deg, #F97316, #EA580C);
}

/* Dark mode override */
:deep(.v-theme--dark) .service-detail-view,
.v-theme--dark .service-detail-view {
  --hero-bg: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%);
  --hero-overlay: rgba(0, 0, 0, 0.6);
  --hero-text: #F8FAFC;
  --hero-accent: #FCD34D;
  --content-bg: var(--background-dark);
  --content-text-color: #F8FAFC;
  --section-bg: var(--background-dark);
  --card-bg: var(--surface-dark);
  --card-border: var(--border-dark);
  --service-badge-basic: linear-gradient(135deg, #10B981, #059669);
  --service-badge-advanced: linear-gradient(135deg, #3B82F6, #1E40AF);
  --service-badge-premium: linear-gradient(135deg, #8B5CF6, #7C3AED);
  --service-badge-text: #ffffff;
  --title-color: #F8FAFC;
  --text-color: #94A3B8;
  --highlight-bg: rgba(59, 130, 246, 0.2);
  --highlight-border: #3B82F6;
  --cta-bg: linear-gradient(135deg, #1E293B 0%, #334155 100%);
  --cta-text: #F8FAFC;
  --cta-btn-bg: linear-gradient(135deg, #F59E0B, #F97316);
  --cta-btn-hover: linear-gradient(135deg, #F97316, #EA580C);
}

/* Hero Section */
.hero-section {
  background: var(--hero-bg);
  position: relative;
  padding: var(--spacing-4xl) 0;
  color: var(--hero-text);
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--hero-overlay);
}

.hero-content {
  position: relative;
  z-index: 2;
}

.breadcrumb {
  margin-bottom: var(--spacing-xl);
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--hero-text);
  text-decoration: none;
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  opacity: 0.9;
  transition: opacity var(--transition-normal);
}

.breadcrumb-link:hover {
  opacity: 1;
}

.hero-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.hero-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-5xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--hero-text);
}

.hero-subtitle {
  font-family: var(--font-family-body);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xl);
  color: var(--hero-accent);
  opacity: 0.9;
}

.service-badge {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 20px;
  color: var(--service-badge-text);
  font-family: var(--font-family-heading);
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-basic {
  background: var(--service-badge-basic);
}

.badge-advanced {
  background: var(--service-badge-advanced);
}

.badge-premium {
  background: var(--service-badge-premium);
}

.hero-image {
  text-align: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
}

/* Service Content Section */
.service-content-section {
  background: rgb(238, 245, 254);
  padding: var(--spacing-4xl) 0;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.content-block {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
  box-shadow: var(--shadow-md);
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: #03045e;
  margin-bottom: var(--spacing-lg);
}

.service-points {
  list-style: none;
  padding: 0;
  margin: var(--spacing-lg) 0;
}

.service-points li {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: #03045e;
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
  padding-left: var(--spacing-lg);
  position: relative;
}

.service-points li::before {
  content: '•';
  color: var(--primary-blue);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.highlight-box {
  background: var(--highlight-bg);
  border-left: 4px solid var(--highlight-border);
  border-radius: 0 8px 8px 0;
  padding: var(--spacing-lg);
  margin: var(--spacing-lg) 0;
}

.highlight-box p {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  color: var(--primary-blue);
  font-weight: 600;
  font-style: italic;
  margin: 0;
  text-align: justify;
}

.core-value-text,
.final-result-text {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  color: #03045e;
  line-height: 1.8;
  margin: 0;
  text-align: justify;
}

.features-grid {
  display: grid;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-lg);
}

.feature-item {
  padding: var(--spacing-lg);
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  border-left: 4px solid var(--primary-blue);
}

.feature-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: #03045e;
  margin-bottom: var(--spacing-sm);
}

.feature-description {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: #03045e;
  line-height: 1.6;
  margin: 0;
  text-align: justify;
}

.steps-list {
  margin-top: var(--spacing-lg);
}

.step-item {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  border-left: 4px solid var(--primary-blue);
}

.step-number {
  background: var(--primary-blue);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-heading);
  font-weight: 700;
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: #03045e;
  margin-bottom: var(--spacing-sm);
}

.step-description {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: #03045e;
  line-height: 1.6;
  margin: 0;
  text-align: justify;
}

.deliverables-list ul {
  list-style: none;
  padding: 0;
  margin: var(--spacing-lg) 0;
}

.deliverables-list li {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: #03045e;
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
  padding-left: var(--spacing-lg);
  position: relative;
}

.deliverables-list li::before {
  content: '✓';
  color: var(--success-green);
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* CTA Section */
.cta-section {
  background: rgb(238, 245, 254);
  padding: var(--spacing-4xl) 0;
  text-align: center;
  color: #03045e;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: #03045e;
}

.cta-text {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-2xl);
  color: #03045e;
  opacity: 0.9;
}

.cta-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cta-btn {
  background: linear-gradient(135deg, #F59E0B 0%, #F97316 100%) !important;
  border: none !important;
  color: white !important;
  font-family: var(--font-family-heading);
  font-weight: 600;
  padding: var(--spacing-lg) var(--spacing-2xl);
  border-radius: 12px;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3) !important;
}

.cta-btn:hover {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4) !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-main {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    text-align: center;
  }
  
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .section-title {
    font-size: var(--font-size-xl);
  }
  
  .cta-title {
    font-size: var(--font-size-3xl);
  }
  
  .step-item {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .step-number {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: var(--spacing-3xl) 0;
  }
  
  .service-content-section,
  .cta-section {
    padding: var(--spacing-2xl) 0;
  }
  
  .content-block {
    padding: var(--spacing-lg);
  }
}
</style>
