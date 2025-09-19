<template>
  <div class="agency-corner-view">
    <!-- Header Section -->
    <section class="agency-header fade-in-up">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="agency-title">Góc Agency</h1>
            <p class="agency-subtitle">
              Những insights, xu hướng và chia sẻ từ đội ngũ MATECOM
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Blog Posts Section -->
    <section class="blog-posts-section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 class="section-title fade-in-up">Bài viết mới nhất</h2>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col 
            v-for="(post, index) in blogPosts" 
            :key="post.id" 
            cols="12" 
            md="6" 
            lg="4"
            class="mb-4"
          >
            <v-card 
              class="blog-card fade-in-up" 
              elevation="4" 
              :style="{ transitionDelay: `${index * 0.1}s` }"
              @click="goToBlogDetail(post.slug)"
            >
              <div class="blog-image">
                <img :src="post.featuredImage" :alt="post.title" />
                <div class="blog-overlay">
                  <v-btn 
                    color="primary" 
                    variant="elevated"
                    class="read-more-btn"
                  >
                    Đọc thêm
                  </v-btn>
                </div>
              </div>
              
              <v-card-text class="blog-content">
                <h3 class="blog-title">{{ post.title }}</h3>
                <p class="blog-excerpt">{{ post.excerpt }}</p>
                <div class="blog-meta">
                  <span class="publish-date">{{ formatDate(post.publishedAt) }}</span>
                  <span class="read-time">{{ post.readTime }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Load More Button -->
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <v-btn 
              color="primary" 
              size="large" 
              variant="outlined"
              class="load-more-btn fade-in-up"
              @click="loadMorePosts"
            >
              Xem thêm bài viết
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="newsletter-title fade-in-up">Đăng ký nhận insights mới nhất</h2>
            <p class="newsletter-subtitle fade-in-up">
              Nhận những bài viết, xu hướng và tips marketing mới nhất từ MATECOM
            </p>
            
            <v-form @submit.prevent="subscribeNewsletter" class="newsletter-form fade-in-up">
              <div class="newsletter-input-group">
                <v-text-field
                  v-model="email"
                  placeholder="Nhập email của bạn"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="newsletter-input"
                />
                <v-btn 
                  color="primary" 
                  type="submit"
                  class="newsletter-btn"
                  :loading="isSubscribing"
                >
                  Đăng ký
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const isSubscribing = ref(false)

// Function to get image URL from public folder
const getImageUrl = (imageName) => {
  return `/assets/img/c0c4fb70-567c-40ad-8e0f-c1985f66063e/${imageName}`
}

const blogPosts = ref([
  {
    id: 1,
    title: 'Marketing 2026 – Xu hướng mới định hình tương lai thương hiệu',
    excerpt: 'Khám phá 6 xu hướng Marketing 2026 quan trọng: Hyper-Personalization, AI Content, Video ngắn, Social Commerce và hơn thế nữa. Năm 2026 sẽ mở ra một giai đoạn hoàn toàn mới cho ngành Marketing.',
    slug: 'marketing-2026-xu-huong-moi-dinh-hinh-tuong-lai-thuong-hieu',
    featuredImage: getImageUrl('image.png'),
    publishedAt: new Date('2026-01-01'),
    readTime: '15 phút đọc'
  },
  {
    id: 2,
    title: 'Digital Marketing Trends 2025: Những gì đã thay đổi',
    excerpt: 'Tổng hợp những xu hướng Digital Marketing nổi bật trong năm 2025 và cách các thương hiệu đã thích ứng với những thay đổi này.',
    slug: 'digital-marketing-trends-2025',
    featuredImage: getImageUrl('image1.png'),
    publishedAt: new Date('2025-12-15'),
    readTime: '12 phút đọc'
  },
  {
    id: 3,
    title: 'AI trong Marketing: Từ Trend đến Reality',
    excerpt: 'Cách AI đang thay đổi ngành Marketing hiện đại và những ứng dụng thực tế mà các thương hiệu đang triển khai.',
    slug: 'ai-marketing-trend-reality',
    featuredImage: getImageUrl('image2.png'),
    publishedAt: new Date('2025-11-20'),
    readTime: '10 phút đọc'
  },
  {
    id: 4,
    title: 'Social Commerce: Khi mua sắm hòa cùng giải trí',
    excerpt: 'Khám phá xu hướng Social Commerce và cách các thương hiệu đang tận dụng mạng xã hội để tăng doanh số.',
    slug: 'social-commerce-mua-sam-giai-tri',
    featuredImage: getImageUrl('image3.png'),
    publishedAt: new Date('2025-10-30'),
    readTime: '8 phút đọc'
  },
  {
    id: 5,
    title: 'SEO 2025: Những thay đổi quan trọng cần biết',
    excerpt: 'Cập nhật những thay đổi mới nhất trong thuật toán Google và cách tối ưu SEO cho năm 2025.',
    slug: 'seo-2025-nhung-thay-doi-quan-trong',
    featuredImage: getImageUrl('image4.png'),
    publishedAt: new Date('2025-09-15'),
    readTime: '14 phút đọc'
  },
  {
    id: 6,
    title: 'Content Marketing: Nghệ thuật kể chuyện thương hiệu',
    excerpt: 'Làm thế nào để tạo ra những nội dung thu hút và xây dựng mối quan hệ bền vững với khách hàng.',
    slug: 'content-marketing-nghe-thuat-ke-chuyen',
    featuredImage: getImageUrl('image5.png'),
    publishedAt: new Date('2025-08-25'),
    readTime: '11 phút đọc'
  }
])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const goToBlogDetail = (slug) => {
  router.push(`/blog/${slug}`)
}

const loadMorePosts = () => {
  // TODO: Implement load more functionality
  console.log('Load more posts')
}

const subscribeNewsletter = async () => {
  if (!email.value) return
  
  isSubscribing.value = true
  
  try {
    // TODO: Implement newsletter subscription
    console.log('Subscribe to newsletter:', email.value)
    
    // Mock success
    setTimeout(() => {
      isSubscribing.value = false
      email.value = ''
      // Show success message
    }, 1000)
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    isSubscribing.value = false
  }
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
.agency-corner-view {
  min-height: 100vh;
  
  /* Gradient background for entire view */
  background: linear-gradient(180deg, 
    #060F2A 0%, 
    #072845 25%, 
    #0D4496 50%, 
    #1E3A8A 75%, 
    #0F172A 100%
  );
  
  /* CSS Variables - MarcomMate Inspired Dark Theme */
  --agency-header-bg: transparent;
  --agency-text: #F8FAFC;
  --agency-accent: #F59E0B;  /* MarcomMate accent orange */
  --blog-posts-bg: transparent;
  --blog-card-bg: rgba(30, 41, 59, 0.6);
  --blog-card-border: rgba(51, 65, 85, 0.5);
  --blog-card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --blog-card-hover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  --newsletter-bg: transparent;
  --newsletter-text: #F8FAFC;
  --newsletter-accent: #F59E0B;  /* MarcomMate accent orange */
}

/* Agency Header */
.agency-header {
  background: var(--agency-header-bg);
  color: var(--agency-text);
  padding: var(--spacing-6xl) 0;
  min-height: 20vh;
  display: flex;
  align-items: center;
  text-align: center;
}

.agency-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-5xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
  color: var(--agency-text);
}

.agency-subtitle {
  font-family: var(--font-family-body);
  font-size: var(--font-size-xl);
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  color: var(--agency-text);
}

/* Blog Posts Section */
.blog-posts-section {
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
  background: var(--blog-posts-bg);
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: 700;
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  color: var(--text-primary);
}

/* Blog Card */
.blog-card {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  background: var(--blog-card-bg) !important;
  border: 1px solid var(--blog-card-border);
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--blog-card-hover-shadow) !important;
  border-color: var(--agency-accent);
}

.blog-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 58, 138, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.blog-card:hover .blog-overlay {
  opacity: 1;
}

.read-more-btn {
  color: white !important;
  background: transparent !important;
  border: 2px solid white !important;
}

.read-more-btn:hover {
  background: var(--agency-accent) !important;
  color: white !important;
  border-color: var(--agency-accent) !important;
}

.blog-content {
  padding: var(--spacing-xl);
}

.blog-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-excerpt {
  font-family: var(--font-family-body);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  font-family: var(--font-family-body);
}

/* Load More Button */
.load-more-btn {
  margin: var(--spacing-2xl) auto 0 auto !important;
  padding: var(--spacing-md) var(--spacing-2xl) !important;
  font-weight: 600 !important;
  font-family: var(--font-family-heading) !important;
  border-color: var(--agency-accent) !important;
  color: var(--agency-accent) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.load-more-btn:hover {
  background: var(--agency-accent) !important;
  color: white !important;
}

/* Newsletter Section */
.newsletter-section {
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
  background: var(--newsletter-bg);
}

.newsletter-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  color: var(--newsletter-text);
}

.newsletter-subtitle {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
}

.newsletter-form {
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-input-group {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.newsletter-input {
  border-radius: 8px;
  flex: 1;
}

:deep(.newsletter-input .v-field) {
  background: rgba(30, 41, 59, 0.6) !important;
  border: 1px solid rgba(51, 65, 85, 0.5) !important;
  color: var(--text-primary) !important;
}

:deep(.newsletter-input .v-field__input) {
  color: var(--text-primary) !important;
}

:deep(.newsletter-input .v-field__outline) {
  color: var(--agency-accent) !important;
}

.newsletter-btn {
  padding: 0 !important;
  font-weight: 600 !important;
  font-family: var(--font-family-heading) !important;
  border-radius: 0 !important;
  background: linear-gradient(135deg, var(--agency-accent), #F97316) !important;
  color: white !important;
  white-space: nowrap;
  height: 40px;
  min-width: 100px;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.newsletter-btn:hover {
  background: linear-gradient(135deg, #F97316, #EA580C) !important;
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

/* Staggered animation for blog cards */
.blog-card.fade-in-up {
  transition-delay: 0.1s;
}

.blog-card:nth-child(1).fade-in-up { transition-delay: 0.1s; }
.blog-card:nth-child(2).fade-in-up { transition-delay: 0.2s; }
.blog-card:nth-child(3).fade-in-up { transition-delay: 0.3s; }
.blog-card:nth-child(4).fade-in-up { transition-delay: 0.4s; }
.blog-card:nth-child(5).fade-in-up { transition-delay: 0.5s; }
.blog-card:nth-child(6).fade-in-up { transition-delay: 0.6s; }

/* Single Theme - No Dark/Light Mode */

/* Responsive Design */
@media (max-width: 768px) {
  .agency-title {
    font-size: 2rem;
  }
  
  .agency-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .newsletter-title {
    font-size: 1.5rem;
  }
  
  .blog-title {
    font-size: 1.125rem;
  }
  
  .newsletter-input-group {
    flex-direction: column;
    gap: 12px;
  }
  
  .newsletter-btn {
    width: 100%;
  }
}
</style>
