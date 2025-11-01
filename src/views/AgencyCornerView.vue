<template>
  <div class="agency-corner-view">
    <!-- Header Section -->
    <section class="agency-header fade-in-up">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="agency-title">{{ t('agency.hero.title') }}</h1>
            <p class="agency-subtitle">
              {{ t('agency.hero.subtitle') }}
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
            <h2 class="section-title fade-in-up">{{ t('agency.blog.title') }}</h2>
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
              elevation="2" 
              :style="{ transitionDelay: `${index * 0.1}s` }"
              @click="goToBlogDetail(post.slug)"
            >
              <img 
                :src="post.featuredImage" 
                :alt="post.title"
                height="200px" 
                class="blog-img"
              />
              
              <v-card-title class="blog-title">{{ post.title }}</v-card-title>
              
              <v-card-subtitle class="blog-meta">
                <span class="publish-date">{{ formatDate(post.publishedAt) }}</span>
                <span class="read-time">{{ post.readTime }}</span>
              </v-card-subtitle>
              
              <v-card-text class="blog-excerpt">
                {{ post.metaDescription || post.excerpt }}
              </v-card-text>
              
              <v-card-actions>
                <v-btn color="primary" variant="text">{{ t('agency.blog.readMore') }}</v-btn>
              </v-card-actions>
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
              {{ t('agency.blog.loadMore') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Newsletter Section -->
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { allBlogPosts, getBlogData } from '@/data/blog'

const router = useRouter()
const { t } = useI18n()
const email = ref('')
const isSubscribing = ref(false)

// Function to get image URL from public folder
const getImageUrl = (imageName) => {
  return `/assets/img/c0c4fb70-567c-40ad-8e0f-c1985f66063e/${imageName}`
}

const blogPosts = ref([])

// Load blog posts with full data
const loadBlogPosts = async () => {
  const posts = []
  for (const post of allBlogPosts) {
    const fullPost = await getBlogData(post.slug)
    if (fullPost) {
      posts.push({
        ...post,
        title: fullPost.title,
        metaDescription: fullPost.metaDescription,
        featuredImage: fullPost.featuredImage,
        readTime: fullPost.readTime
      })
    }
  }
  blogPosts.value = posts
}

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
      alert(t('agency.newsletter.success'))
    }, 1000)
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    isSubscribing.value = false
    alert(t('agency.newsletter.error'))
  }
}

onMounted(async () => {
  // Load blog posts first
  await loadBlogPosts()
  
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
  
  /* Light blue background for entire view */
  background: rgb(238, 245, 254);
  
  /* CSS Variables - Light Theme */
  --agency-header-bg: transparent;
  --agency-text: #03045e;
  --agency-accent: #F59E0B;  /* MarcomMate accent orange */
  --blog-posts-bg: transparent;
  --blog-card-bg: rgba(255, 255, 255, 0.9);
  --blog-card-border: rgba(3, 4, 94, 0.2);
  --blog-card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --blog-card-hover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  --text-primary: #03045e;
  --text-secondary: #1e40af;
  --text-muted: #64748b;
  --newsletter-bg: transparent;
  --newsletter-text: #03045e;
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
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(3, 4, 94, 0.2) !important;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: var(--agency-accent) !important;
}

.blog-img {
  width: 100%;
}

.blog-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  color: #03045e;
  margin-bottom: 8px;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  word-wrap: break-word !important;
  word-break: break-word !important;
}

/* Override Vuetify v-card-title styles */
.blog-card :deep(.v-card-title) {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  word-wrap: break-word !important;
  word-break: break-word !important;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #03045e;
  margin-bottom: 12px;
}

.publish-date {
  color: #03045e;
}

.read-time {
  color: #2563eb;
  font-weight: 500;
}

.blog-excerpt {
  color: #03045e !important;
  line-height: 1.6 !important;
  font-size: 0.95rem !important;
  display: -webkit-box !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  word-wrap: break-word !important;
  word-break: break-word !important;
  white-space: normal !important;
}

/* Override Vuetify v-card-text styles */
.blog-card :deep(.v-card-text) {
  display: -webkit-box !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: normal !important;
  word-break: break-word !important;
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

/* Light mode support */
:deep(.v-theme--light) .blog-card {
  background: rgba(255, 255, 255, 0.9);
}

:deep(.v-theme--light) .blog-title {
  color: #03045e;
}

:deep(.v-theme--light) .blog-meta {
  color: #03045e;
}

:deep(.v-theme--light) .blog-excerpt {
  color: #03045e;
}

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
    font-size: 1rem;
  }
  
  .blog-excerpt {
    font-size: 0.9rem;
  }
  
  .blog-meta {
    font-size: 0.8rem;
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
