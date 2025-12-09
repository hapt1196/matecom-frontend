<template>
  <section class="blog-section">
    <v-container>
      <h2 class="section-title text-center">{{ t('home.blog.title') }}</h2>
    <v-row>
      <v-col 
        v-for="post in featuredPosts" 
        :key="post.id" 
        cols="12" 
        md="4"
      >
        <v-card 
          class="blog-card" 
          elevation="2"
          @click="goToBlogDetail(post.slug)"
        >
          <img 
            :src="post.featuredImage" 
            :alt="post.title"
            height="200px" 
            class="blog-img"
          ></img>
          
          <v-card-title class="blog-title">{{ post.title }}</v-card-title>
          
          <v-card-subtitle class="blog-meta">
            <span class="publish-date">{{ formatDate(post.publishedAt) }}</span>
            <span class="read-time">{{ post.readTime }}</span>
          </v-card-subtitle>
          
          <v-card-text class="blog-excerpt">
            {{ post.excerpt }}
          </v-card-text>
          
          <v-card-actions>
            <v-btn color="primary" variant="text">{{ t('home.blog.readMore') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <div class="text-center mt-8">
      <v-btn 
        outlined 
        color="primary"
        @click="goToAgencyCorner"
      >
        {{ t('home.blog.viewAll') }}
      </v-btn>
    </div>
    </v-container>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { allBlogPosts } from '@/data/blog'

const router = useRouter()
const { t } = useI18n()

// Function to get image URL from public folder
const getImageUrl = (imageName) => {
  return `/assets/img/c0c4fb70-567c-40ad-8e0f-c1985f66063e/${imageName}`
}

// Dữ liệu blog posts từ data files
const blogPosts = ref(allBlogPosts)

// Chỉ hiển thị 3 bài viết mới nhất
const featuredPosts = computed(() => {
  return blogPosts.value.slice(1, 4)
})

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

const goToAgencyCorner = () => {
  router.push('/agency')
}
</script>

<style scoped>
.blog-section {
  padding: var(--spacing-5xl) 0;
  padding-bottom: 10vh;
  background: transparent;
}


.section-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-5xl);
  font-weight: 900;
  color: #03045e;
  margin-bottom: var(--spacing-2xl);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.blog-card {
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(3, 4, 94, 0.2) !important;
  border-radius: 16px !important;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: #F59E0B !important;
}

.blog-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  color: #03045e;
  margin-bottom: 8px;
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
  color: #03045e;
  line-height: 1.6;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-img{
  width: 100%;
}

/* Dark mode support */
:deep(.v-theme--dark) .blog-card {
  background: rgba(255, 255, 255, 0.9);
}

:deep(.v-theme--dark) .blog-title {
  color: #03045e;
}

:deep(.v-theme--dark) .blog-meta {
  color: #03045e;
}

:deep(.v-theme--dark) .blog-excerpt {
  color: #03045e;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-4xl);
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
}
</style>
