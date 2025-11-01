<template>
  <div class="blog-detail-view">
    <!-- Blog Header -->
    <div class="blog-header">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="8">
            <div class="blog-header-content">
              <h1 class="blog-title">{{ page.title }}</h1>
              <div class="blog-meta">
                <span class="publish-date">{{ formatDate(page.publishedAt) }}</span>
                <span class="author">Bởi MATECOM Team</span>
                <span class="read-time">15 phút đọc</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Blog Content -->
    <div class="blog-content-section">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="8">
            <div class="blog-content" v-html="page.content"></div>
            
            <!-- Social Share -->
            <div class="social-share">
              <h3>Chia sẻ bài viết</h3>
              <div class="share-buttons">
                <v-btn 
                  @click="shareOnFacebook"
                  class="share-btn facebook"
                >
                  Facebook
                </v-btn>
                <v-btn 
                  @click="shareOnLinkedIn"
                  class="share-btn linkedin"
                >
                  LinkedIn
                </v-btn>
              </div>
            </div>

            <!-- Related Posts -->
            <div class="related-posts">
              <h3>Bài viết liên quan</h3>
              <v-row>
                <v-col 
                  v-for="post in relatedPosts" 
                  :key="post.id" 
                  cols="12" 
                  md="6"
                >
                  <v-card 
                    class="related-post-card" 
                    elevation="2"
                    @click="goToBlogDetail(post.slug)"
                  >
                    <img 
                      :src="post.featuredImage" 
                      :alt="post.title"
                      height="auto" 
                      class="related-post-img"
                    />
                    
                    <v-card-title class="related-post-title">{{ post.title }}</v-card-title>
                    
                    <v-card-subtitle class="related-post-meta">
                      <span class="read-time">15 phút đọc</span>
                    </v-card-subtitle>
                    
                    <v-card-text class="related-post-excerpt">
                      {{ post.excerpt }}
                    </v-card-text>
                    
                    <v-card-actions>
                      <v-btn color="primary" variant="text">Đọc thêm</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBlogData } from '@/data/blog'

const route = useRoute()
const router = useRouter()

// Function to get image URL from public folder
const getImageUrl = (imageName) => {
  return `/assets/img/c0c4fb70-567c-40ad-8e0f-c1985f66063e/${imageName}`
}


const page = ref({
  title: 'Làm việc nhóm trong môi trường Agency: Không giỏi teamwork có bị đào thải?',
  content: '',
  metaDescription: 'Trong môi trường agency, teamwork không chỉ là kỹ năng mềm mà là điều kiện bắt buộc. Không giỏi teamwork, bạn có nguy cơ tự đào thải chính mình.',
  publishedAt: new Date('2025-12-20')
})

const relatedPosts = ref([
  {
    id: 1,
    title: 'Marketing 2026 – Xu hướng mới định hình tương lai thương hiệu',
    excerpt: 'Khám phá 6 xu hướng Marketing 2026 quan trọng: Hyper-Personalization, AI Content, Video ngắn, Social Commerce và hơn thế nữa.',
    slug: 'marketing-2026-xu-huong-moi-dinh-hinh-tuong-lai-thuong-hieu',
    featuredImage: '/assets/img/c0c4fb70-567c-40ad-8e0f-c1985f66063e/image.png',
    publishedAt: new Date('2026-01-01')
  },
  {
    id: 2,
    title: 'Digital Marketing Trends 2025',
    excerpt: 'Những xu hướng Digital Marketing nổi bật trong năm 2025',
    slug: 'digital-marketing-trends-2025',
    featuredImage: '/assets/img/c0c4fb70-567c-40ad-8e0f-c1985f66063e/image3.png',
    publishedAt: new Date('2025-12-15')
  }
])

const formatDate = (date) => {
  if (!date) return 'Chưa có ngày'
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return 'Ngày không hợp lệ'
  
  return dateObj.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(page.value.title)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(page.value.title)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(page.value.title)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank')
}

const goToBlogDetail = (slug) => {
  router.push(`/blog/${slug}`)
}

const loadBlogData = async (slug) => {
  try {
    const blogData = await getBlogData(slug)
    if (blogData) {
      page.value = {
        title: blogData.title,
        content: blogData.content,
        metaDescription: blogData.metaDescription,
        publishedAt: blogData.publishedAt
      }
      relatedPosts.value = blogData.relatedPosts || []
    } else {
      // Fallback cho các bài viết chưa có data file
      console.warn(`Blog post with slug "${slug}" not found in data files`)
    }
  } catch (error) {
    console.error('Error loading blog data:', error)
  }
}

onMounted(async () => {
  // Load blog data từ resource files
  const slug = route.params.slug
  await loadBlogData(slug)
})

// Watch for route changes
watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    await loadBlogData(newSlug)
  }
})
</script>

<style scoped>
/* CSS Variables */
:root {
  --blog-header-bg: rgb(238, 245, 254);
  --blog-content-bg: rgb(238, 245, 254);
  --blog-text-dark: #03045e;
  --blog-text-light: #03045e;
  --blog-border: #90e0ef;
  --blog-shadow: 0 4px 6px -1px rgba(3, 4, 94, 0.1);
}

/* Force background color for the entire view */
.blog-detail-view {
  min-height: 100vh;
  background: rgb(238, 245, 254) !important;
}

/* Override body background when this view is active */
body:has(.blog-detail-view) {
  background: rgb(238, 245, 254) !important;
}

/* Override any global styles that might affect the background */
.blog-detail-view * {
  background-color: transparent !important;
}

/* Ensure blog-header uses consistent colors */
.blog-detail-view .blog-header,
.blog-detail-view .blog-header * {
  color: #03045e !important;
  background-color: rgb(238, 245, 254) !important;
}

/* Override Vuetify theme */
.blog-detail-view .v-theme--light,
.blog-detail-view .v-theme--dark {
  background: rgb(238, 245, 254) !important;
}

.blog-detail-view .v-container {
  background: transparent !important;
}

.blog-detail-view .v-row {
  background: transparent !important;
}

.blog-detail-view .v-col {
  background: transparent !important;
}

.blog-detail-view .blog-content-section {
  background: rgb(238, 245, 254) !important;
}

/* Blog Header */
.blog-header {
  background: rgb(238, 245, 254) !important;
  color: #03045e !important;
  padding: 4rem 0 0 0;
  text-align: center;
}

.blog-header-content {
  max-width: 800px;
  margin: 0 auto;
}

.blog-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: #03045e !important;
  text-align: justify;
}

.blog-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  opacity: 1;
  color: #03045e !important;
}

.blog-excerpt {
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 1;
  color: #03045e !important;
}

.blog-excerpt p {
  color: #03045e !important;
}

/* Blog Content Section */
.blog-content-section {
  padding: 0 0;
  background: rgb(238, 245, 254) !important;
}

.blog-content {
  line-height: 1.8;
  font-size: 1.125rem;
  color: var(--blog-text-dark);
  margin-bottom: 3rem;
  max-width: 100%;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Global styles for HTML content rendered via v-html */
.blog-content :deep(p) {
  color: #03045e !important;
  margin-bottom: 1.5rem;
  line-height: 1.8;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: justify;
}

/* Ensure all elements respect container width */
.blog-content :deep(*) {
  max-width: 100% !important;
  box-sizing: border-box !important;
}

.blog-content :deep(h1) {
  color: #03045e !important;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.blog-content :deep(h2) {
  color: #023e8a !important;
  font-size: 1.875rem;
  font-weight: 600;
  margin: 2.5rem 0 1rem 0;
  border-left: 4px solid #023e8a;
  padding-left: 1rem;
}

.blog-content :deep(h3) {
  color: #0077b6 !important;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
}

.blog-content :deep(strong) {
  color: #023e8a !important;
  font-weight: 700;
}

.blog-content :deep(ul), .blog-content :deep(ol) {
  color: #03045e !important;
  margin: 1rem 0;
  padding-left: 2rem;
}

.blog-content :deep(li) {
  color: #03045e !important;
  margin-bottom: 0.5rem;
}

/* Images in blog content */
.blog-content :deep(.blog-image) {
  margin: 2rem 0;
  text-align: center;
  width: auto;
  display: block;
  max-width: 100%;
  overflow: hidden;
}

.blog-content :deep(.blog-image img) {
  max-width: 100%;
  width: 100% !important;
  height: auto;
  max-height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: block;
  margin: 0 auto;
}

.blog-content :deep(.blog-image img:hover) {
  transform: scale(1.02);
}

.blog-content :deep(.image-caption) {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--blog-text-light);
  font-style: italic;
  text-align: center;
  font-weight: 500;
  width: 100%;
  display: block;
}

/* Ensure all images in content respect container width */
.blog-content :deep(img) {
  max-width: 100% !important;
  width: 100% !important;
  height: auto !important;
  display: block !important;
  margin: 0 auto !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
}

/* Specific styling for blog-image containers */
.blog-content :deep(.blog-image) {
  margin: 2rem 0 !important;
  text-align: center !important;
  width: auto !important;
  max-width: 100% !important;
  overflow: hidden !important;
  display: block !important;
}

/* Higher specificity for blog-image img */
.blog-content :deep(.blog-image img) {
  max-width: 100% !important;
  width: 100% !important;
  height: auto !important;
  display: block !important;
  margin: 0 auto !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
}

/* Force width 100% for all images in blog content */
.blog-content :deep(.blog-image img),
.blog-content :deep(img) {
  width: 100% !important;
  max-width: 100% !important;
}

/* Legacy styles - keeping for compatibility */
.blog-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #03045e;
}

.blog-content h2 {
  font-size: 1.875rem;
  font-weight: 600;
  margin: 2.5rem 0 1rem 0;
  color: #023e8a;
  border-left: 4px solid #023e8a;
  padding-left: 1rem;
}

.blog-content h3 {
  color: #0077b6;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
}

.blog-content p {
  color: #03045e;
  margin-bottom: 1.5rem;
  line-height: 1.8;
  text-align: justify;
}

.blog-content strong {
  color: #023e8a;
  font-weight: 700;
}

.blog-content ul, .blog-content ol {
  color: #03045e;
  margin: 1rem 0;
  padding-left: 2rem;
}

.blog-content li {
  color: #03045e;
  margin-bottom: 0.5rem;
}

/* Social Share */
.social-share {
  margin: 3rem 0;
  padding: 2rem;
  background: #FFFFFF !important;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #90e0ef;
}

.social-share h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #03045e !important;
  font-weight: 600;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.share-btn {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  color: white !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s ease !important;
}

.share-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.share-btn.facebook {
  background: #4285f4 !important;
  background-color: #4285f4 !important;
}

.share-btn.facebook:hover {
  background: #3367d6 !important;
  background-color: #3367d6 !important;
}

.share-btn.linkedin {
  background: #3367d6 !important;
  background-color: #3367d6 !important;
}

.share-btn.linkedin:hover {
  background: #2c5aa0 !important;
  background-color: #2c5aa0 !important;
}

/* Related Posts */
.related-posts {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--blog-border);
}

.related-posts h3 {
  font-size: 1.875rem;
  margin-bottom: 2rem;
  color: #03045e;
  text-align: center;
}

.related-post-card {
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  background: #FFFFFF !important;
  background-color: #FFFFFF !important;
  border: 1px solid rgba(3, 4, 94, 0.2) !important;
  border-radius: 16px !important;
}

/* Force white background with maximum specificity */
:deep(.related-post-card),
:deep(.v-card.related-post-card),
:deep(.v-card.related-post-card.v-card) {
  background: #FFFFFF !important;
  background-color: #FFFFFF !important;
}

/* Override Vuetify card background */
:deep(.v-card.related-post-card .v-card__text),
:deep(.v-card.related-post-card .v-card__title),
:deep(.v-card.related-post-card .v-card__subtitle),
:deep(.v-card.related-post-card .v-card__actions) {
  background: transparent !important;
  background-color: transparent !important;
}

.related-post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: #F59E0B !important;
}

.related-post-img {
  width: 100%;
  object-fit: cover;
}

.related-post-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  color: #03045e;
  margin-bottom: 12px;
}

.related-post-meta {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.9rem;
  color: #03045e;
  margin-bottom: 16px;
}


.related-post-meta .read-time {
  color: #2563eb;
  font-weight: 500;
}

.related-post-excerpt {
  color: #03045e;
  line-height: 1.6;
  font-size: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
}

/* Dark Theme Support */
:deep(.v-theme--dark) {
  --blog-content-bg: rgb(238, 245, 254);
  --blog-text-dark: #03045e;
  --blog-text-light: #023e8a;
  --blog-border: #90e0ef;
}

:deep(.v-theme--dark) .blog-content {
  color: var(--blog-text-dark);
}

:deep(.v-theme--dark) .blog-content h1,
:deep(.v-theme--dark) .blog-content h2 {
  color: var(--blog-text-dark);
}

:deep(.v-theme--dark) .social-share {
  background: #e0f2fe;
  border: 1px solid #90e0ef;
}

:deep(.v-theme--dark) .related-post-card {
  background: #FFFFFF !important;
  border: 1px solid rgba(3, 4, 94, 0.2) !important;
}

:deep(.v-theme--dark) .related-post-title {
  color: #03045e;
}

:deep(.v-theme--dark) .related-post-meta {
  color: #03045e;
}

:deep(.v-theme--dark) .related-post-excerpt {
  color: #03045e;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-title {
    font-size: 2rem;
  }
  
  .blog-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .blog-content {
    font-size: 1rem;
  }
  
  .blog-content h1,
  .blog-content :deep(h1) {
    font-size: 2rem;
  }
  
  .blog-content h2,
  .blog-content :deep(h2) {
    font-size: 1.5rem;
  }
  
  .blog-content h3,
  .blog-content :deep(h3) {
    font-size: 1.25rem;
  }
  
  .share-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .related-post-card {
    margin-bottom: 1rem;
  }
  
  .blog-image img,
  .blog-content :deep(.blog-image img) {
    width: 100% !important;
    max-width: 100%;
    height: auto;
  }
}

/* Blog Images */
.blog-image {
  margin: 2rem 0;
  text-align: center;
  width: auto;
  display: block;
  overflow: hidden;
}

.blog-image img {
  max-width: 100%;
  width: 100% !important;
  height: auto;
  max-height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: block;
  margin: 0 auto;
}

.blog-image img:hover {
  transform: scale(1.02);
}

.image-caption {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--blog-text-light);
  font-style: italic;
  text-align: center;
  font-weight: 500;
  width: 100%;
  display: block;
}
</style>

<style>
/* Global styles to override any theme */
.blog-detail-view {
  background: rgb(238, 245, 254) !important;
}

.blog-detail-view .v-container,
.blog-detail-view .v-row,
.blog-detail-view .v-col {
  background: transparent !important;
}

/* Override Vuetify theme globally for this view */
.v-application .blog-detail-view {
  background: rgb(238, 245, 254) !important;
}

/* Force white background for related post cards with highest priority */
.blog-detail-view .related-post-card,
.v-application .blog-detail-view .related-post-card,
.v-card.related-post-card {
  background: #FFFFFF !important;
  background-color: #FFFFFF !important;
}

/* Override any Vuetify card background */
.v-card.related-post-card .v-card__text,
.v-card.related-post-card .v-card__title,
.v-card.related-post-card .v-card__subtitle,
.v-card.related-post-card .v-card__actions {
  background: transparent !important;
  background-color: transparent !important;
}

/* Ensure blog-header uses consistent colors globally */
.blog-detail-view .blog-header {
  background: rgb(238, 245, 254) !important;
  color: #03045e !important;
}

.blog-detail-view .blog-header * {
  color: #03045e !important;
}

.blog-detail-view .blog-title {
  color: #03045e !important;
}

.blog-detail-view .blog-meta {
  color: #03045e !important;
}

.blog-detail-view .blog-excerpt {
  color: #03045e !important;
}

.blog-detail-view .blog-excerpt p {
  color: #03045e !important;
}

/* Ensure social share text is visible */
.blog-detail-view .social-share h3 {
  color: #03045e !important;
  font-weight: 600 !important;
}

/* Ensure share buttons have correct colors */
.blog-detail-view .share-btn.facebook {
  background: #4285f4 !important;
  background-color: #4285f4 !important;
  color: white !important;
}

.blog-detail-view .share-btn.linkedin {
  background: #3367d6 !important;
  background-color: #3367d6 !important;
  color: white !important;
}

.blog-detail-view .share-btn.facebook:hover {
  background: #3367d6 !important;
  background-color: #3367d6 !important;
}

.blog-detail-view .share-btn.linkedin:hover {
  background: #2c5aa0 !important;
  background-color: #2c5aa0 !important;
}
</style>
