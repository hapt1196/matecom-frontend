<template>
  <section class="recruitment-section">
    <v-container>
      <h2 class="section-title text-center">{{ t('home.recruitment.title') }}</h2>
      <!-- <v-list lines="two" class="recruitment-list">
        <v-list-item
          v-for="job in jobs"
          :key="job.title"
          :title="job.title"
          :subtitle="job.description"
        ></v-list-item>
      </v-list> -->
      <div class="text-center mt-8">
        <v-btn 
          outlined 
          color="primary"
          @click="goToRecruitment"
        >
          {{ t('home.recruitment.viewJobs') }}
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const jobs = computed(() => [
  {
    title: t('home.recruitment.jobs.graphicDesigner.title'),
    description: t('home.recruitment.jobs.graphicDesigner.description'),
  },
  {
    title: t('home.recruitment.jobs.contentCreator.title'),
    description: t('home.recruitment.jobs.contentCreator.description'),
  },
  {
    title: t('home.recruitment.jobs.digitalMarketingExecutive.title'),
    description: t('home.recruitment.jobs.digitalMarketingExecutive.description'),
  },
  {
    title: t('home.recruitment.jobs.ctvDigitalMarketing.title'),
    description: t('home.recruitment.jobs.ctvDigitalMarketing.description'),
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
  color: #03045e;
  margin-bottom: var(--spacing-2xl);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recruitment-list {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  border: 1px solid rgba(3, 4, 94, 0.2);
  padding: var(--spacing-lg);
}

:deep(.v-list-item) {
  color: #03045e;
  border-bottom: 1px solid rgba(3, 4, 94, 0.2);
}

:deep(.v-list-item:last-child) {
  border-bottom: none;
}

:deep(.v-list-item-title) {
  color: #03045e;
  font-family: var(--font-family-heading);
}

:deep(.v-list-item-subtitle) {
  color: #03045e;
  font-family: var(--font-family-body);
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-4xl);
  }
}
</style>
