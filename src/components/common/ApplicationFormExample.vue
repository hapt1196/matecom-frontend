<template>
  <div class="application-form-example">
    <h2>Ví dụ sử dụng ApplicationFormPopup</h2>
    
    <div class="example-buttons">
      <v-btn
        color="primary"
        @click="openFormWithPosition('graphic-design')"
      >
        Ứng tuyển Graphic Design
      </v-btn>
      
      <v-btn
        color="secondary"
        @click="openFormWithPosition('communication')"
      >
        Ứng tuyển Communication
      </v-btn>
      
      <v-btn
        color="success"
        @click="openFormWithoutPosition"
      >
        Ứng tuyển chung
      </v-btn>
    </div>

    <!-- Application Form Popup -->
    <ApplicationFormPopup
      v-model="showForm"
      :position="selectedPosition"
      @submitted="onApplicationSubmitted"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApplicationFormPopup from './ApplicationFormPopup.vue'

const showForm = ref(false)
const selectedPosition = ref('')

const openFormWithPosition = (position) => {
  selectedPosition.value = position
  showForm.value = true
}

const openFormWithoutPosition = () => {
  selectedPosition.value = ''
  showForm.value = true
}

const onApplicationSubmitted = (formData) => {
  console.log('Application submitted:', formData)
  showForm.value = false
  selectedPosition.value = ''
}
</script>

<style scoped>
.application-form-example {
  padding: 2rem;
  text-align: center;
}

.example-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .example-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
