<template>
  <section class="recruitment-section">
    <v-container>
      <h2 class="section-title text-center">Tuyển Dụng</h2>
      <v-list lines="two" class="recruitment-list">
        <v-list-item
          v-for="job in jobs"
          :key="job.title"
          :title="job.title"
          :subtitle="job.description"
        ></v-list-item>
      </v-list>
      <div class="text-center mt-8">
        <v-btn 
          outlined 
          color="primary"
          @click="goToRecruitment"
        >
          Xem tất cả vị trí
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const jobs = ref([
  {
    title: 'Graphic Designer',
    description: 'Sáng tạo các sản phẩm visual cho các chiến dịch marketing.',
  },
  {
    title: 'Content Creator',
    description: 'Viết và sản xuất nội dung chất lượng cao cho website và mạng xã hội.',
  },
  {
    title: 'Digital Marketing Executive',
    description: 'Lập kế hoạch và thực thi các chiến dịch marketing số.',
  },
  {
    title: 'CTV DIGITAL MARKETING',
    description: 'MATECOM TUYỂN DỤNG - Cộng tác viên Digital Marketing.',
  },
])

const goToRecruitment = () => {
  // Chuyển đến trang RecruitmentView
  router.push('/recruitment')
}
</script>

<style scoped>
.recruitment-section {
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

.recruitment-list {
  background: rgba(30, 41, 59, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: var(--spacing-lg);
}

:deep(.v-list-item) {
  color: #F8FAFC;
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
}

:deep(.v-list-item:last-child) {
  border-bottom: none;
}

:deep(.v-list-item-title) {
  color: #F8FAFC;
  font-family: var(--font-family-heading);
}

:deep(.v-list-item-subtitle) {
  color: #94A3B8;
  font-family: var(--font-family-body);
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-4xl);
  }
}
</style>
