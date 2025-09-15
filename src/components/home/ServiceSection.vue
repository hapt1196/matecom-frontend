<template>
  <section class="service-section">
    <v-container>
      <div class="section-header text-center">
        <h2 class="section-title fade-in">Dịch Vụ Marketing</h2>
        <p class="section-subtitle slide-up">
          Giải pháp marketing toàn diện, được thiết kế để trở thành 'bộ não' và 'cánh tay nối dài' của đội ngũ bạn
        </p>
      </div>
      
      <v-row class="services-grid">
        <v-col 
          v-for="(service, index) in services" 
          :key="service.id"
          cols="12" 
          md="6" 
          lg="4"
          class="service-col"
        >
          <div 
            class="service-card scale-in"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="service-header">
              <div class="service-badge" :class="service.badge.toLowerCase()">{{ service.badge }}</div>
            </div>
            
            <h3 class="service-name">{{ service.name }}</h3>
            <p class="service-description">{{ service.description }}</p>
            
            <div class="service-features">
              <div 
                v-for="feature in service.features" 
                :key="feature"
                class="service-feature"
              >
                <CheckCircle class="w-4 h-4 text-success" />
                <span>{{ feature }}</span>
              </div>
            </div>
            
            <v-btn
              variant="outlined"
              color="primary"
              class="service-btn"
              @click="learnMore(service)"
            >
              Tìm hiểu thêm
              <ArrowRight class="w-4 h-4 ml-1" />
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { 
  CheckCircle,
  ArrowRight
} from 'lucide-vue-next'

const router = useRouter()

const services = [
  {
    id: 1,
    name: 'Gói 1: Tư vấn & Xây dựng chiến lược Marketing',
    description: 'Một bộ chiến lược được "đo ni đóng giày" riêng cho doanh nghiệp của bạn, giải quyết tận gốc các vấn đề.',
    badge: 'Basic',
    features: ['Lý giải thị trường & khách hàng', 'Xây dựng định vị độc nhất', 'Xác định con đường tăng trưởng', 'Marketing Strategy Blueprint']
  },
  {
    id: 2,
    name: 'Gói 2: Giải pháp Marketing Tích hợp',
    description: 'Chúng tôi trở thành đội ngũ triển khai của bạn, đảm bảo các kênh marketing không còn hoạt động rời rạc.',
    badge: 'Advanced',
    features: ['Phân tích dữ liệu & Big Idea', 'Triển khai kênh đa dạng', 'Giải pháp công nghệ chuyên sâu', 'IMC hoàn chỉnh']
  },
  {
    id: 3,
    name: 'Gói 3: Chiến Lược & Triển Khai Toàn Diện',
    description: 'Đồng hành toàn diện từ hoạch định chiến lược đến xây dựng hệ thống đo lường hiệu quả.',
    badge: 'Premium',
    features: ['Định vị sắc bén & Chiến lược tăng trưởng', 'Kế hoạch hành động chi tiết', 'Hệ thống vận hành và đo lường', 'Dashboard KPI thời gian thực']
  }
]

const learnMore = (service) => {
  // Chuyển đến trang ServiceView
  router.push('/services')
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
  document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.service-section {
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
  background: transparent;
  
  /* CSS Variables - MarcomMate Inspired Dark Theme */
  --service-section-bg: transparent;
  --service-card-bg: rgba(30, 41, 59, 0.6);
  --service-card-border: rgba(51, 65, 85, 0.5);
  --service-icon-bg: rgba(30, 41, 59, 0.8);
  --service-title-color: #F8FAFC;
  --service-description-color: #CBD5E1;
  --service-feature-color: #94A3B8;
}

.section-header {
  margin-bottom: var(--spacing-3xl);
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-5xl);
  font-weight: 900;
  color: #FFFFFF;
  margin-bottom: var(--spacing-lg);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.section-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.services-grid {
  margin-top: var(--spacing-2xl);
}

.service-col {
  margin-bottom: var(--spacing-xl);
}

.service-card {
  background: var(--service-card-bg);
  border-radius: 20px;
  padding: var(--spacing-2xl);
  height: 100%;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  border: 1px solid var(--service-card-border);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-blue), var(--accent-orange));
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  position: relative;
}

.service-badge {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 20px;
  color: white;
  font-family: var(--font-family-heading);
  font-weight: 600;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.service-badge.basic {
  background: linear-gradient(135deg, #10B981, #059669);
}

.service-badge.advanced {
  background: linear-gradient(135deg, #3B82F6, #1E40AF);
}

.service-badge.premium {
  background: linear-gradient(135deg, #8B5CF6, #7C3AED);
}

.service-name {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--service-title-color);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.service-description {
  font-size: var(--font-size-base);
  color: var(--service-description-color);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.service-features {
  margin-bottom: var(--spacing-xl);
}

.service-feature {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--service-feature-color);
}

.feature-check {
  margin-right: var(--spacing-sm);
  flex-shrink: 0;
}

.service-btn {
  width: 100%;
  border-radius: 12px;
  font-weight: 600;
  text-transform: none;
  transition: all var(--transition-normal);
  margin-top: auto;
}

.service-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Animation delays for staggered entrance */
.service-card:nth-child(1) { animation-delay: 0.1s; }
.service-card:nth-child(2) { animation-delay: 0.2s; }
.service-card:nth-child(3) { animation-delay: 0.3s; }
.service-card:nth-child(4) { animation-delay: 0.4s; }
.service-card:nth-child(5) { animation-delay: 0.5s; }
.service-card:nth-child(6) { animation-delay: 0.6s; }

/* Dark Theme - Default Theme */
:deep(.v-theme--dark) .service-section {
  --service-section-bg: var(--background-dark);
  --service-card-bg: var(--surface-dark);
  --service-card-border: var(--border-dark);
  --service-icon-bg: var(--surface-dark);
  --service-title-color: var(--text-dark);
  --service-description-color: var(--text-light);
  --service-feature-color: var(--text-light);
}

/* Responsive Design */
@media (max-width: 768px) {
  .service-section {
    padding: var(--spacing-2xl) 0;
  }
  
  .section-title {
    font-size: var(--font-size-3xl);
  }
  
  .section-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .service-card {
    padding: var(--spacing-xl);
  }
}

@media (max-width: 480px) {
  .service-card {
    padding: var(--spacing-lg);
  }
  
  .service-name {
    font-size: var(--font-size-xl);
  }
}
</style>
