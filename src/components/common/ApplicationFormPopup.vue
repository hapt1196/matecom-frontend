<template>
  <v-dialog
    v-model="isOpen"
    max-width="600"
    persistent
    scrollable
  >
    <v-card class="application-form-card">
      <!-- Header -->
      <v-card-title class="form-header">
        <h2 class="form-title">{{ t('recruitment.application.title') }}</h2>
      </v-card-title>

      <!-- Form Content -->
      <v-card-text class="form-content">
        <v-form @submit.prevent="submitApplication" class="application-form">
          <!-- Personal Information -->
          <div class="form-row">
            <v-text-field
              v-model="formData.fullName"
              :placeholder="t('recruitment.application.form.fullName')"
              variant="outlined"
              class="form-field"
              :rules="[v => !!v || t('recruitment.application.form.validation.required')]"
              required
            />
          </div>
          
          <div class="form-row">
            <v-text-field
              v-model="formData.email"
              :placeholder="t('recruitment.application.form.email')"
              type="email"
              variant="outlined"
              class="form-field"
              :rules="[
                v => !!v || t('recruitment.application.form.validation.required'),
                v => /.+@.+\..+/.test(v) || t('recruitment.application.form.validation.email')
              ]"
              required
            />
          </div>
          
          <div class="form-row">
            <v-text-field
              v-model="formData.phone"
              :placeholder="t('recruitment.application.form.phone')"
              variant="outlined"
              class="form-field"
              :rules="[
                v => !!v || t('recruitment.application.form.validation.required'),
                v => /^[0-9+\-\s()]+$/.test(v) || t('recruitment.application.form.validation.phone')
              ]"
              required
            />
          </div>
          
          <div class="form-row">
            <v-select
              v-model="formData.position"
              :items="positionOptions"
              :label="t('recruitment.application.form.position')"
              variant="outlined"
              :rules="[v => !!v || t('recruitment.application.form.validation.required')]"
              required
            />
          </div>
          
          <!-- Cover Letter -->
          <div class="form-row">
            <v-textarea
              v-model="formData.coverLetter"
              :placeholder="t('recruitment.application.form.coverLetter')"
              variant="outlined"
              rows="4"
              class="form-field"
              hide-details
              required
            />
          </div>
          
          <!-- File Upload -->
          <div class="form-row">
            <v-file-input
              v-model="formData.cvFile"
              :label="t('recruitment.application.form.cvUpload')"
              variant="outlined"
              accept=".pdf,.doc,.docx"
              show-size
              :rules="[v => !!v || t('recruitment.application.form.validation.required')]"
              required
              :prepend-icon="null"
              :prepend-inner-icon="null"
            />
          </div>
        </v-form>
      </v-card-text>

      <!-- Actions -->
      <div class="form-actions">
        <v-btn
          @click="submitApplication"
          class="submit-btn"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          {{ t('recruitment.application.form.submit') }}
        </v-btn>
        <v-btn
          variant="text"
          @click="closeDialog"
          class="cancel-btn"
        >
          {{ t('common.cancel') }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'submitted'])

const { t, locale } = useI18n()

// Dialog state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Form data
const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  position: props.position || '',
  coverLetter: '',
  cvFile: null
})

const isSubmitting = ref(false)

// Position options for dropdown
const positionOptions = computed(() => {
  if (locale.value === 'vi') {
    return [
      'CTV GRAPHIC DESIGN (THIẾT KẾ ĐỒ HỌA)',
      'CTV TRUYỀN THÔNG',
      'ĐẠI SỨ TRUYỀN THÔNG DỰ ÁN',
      'CTV DIGITAL MARKETING'
    ]
  } else {
    return [
      'FREELANCE GRAPHIC DESIGNER',
      'FREELANCE COMMUNICATION',
      'PROJECT COMMUNICATION AMBASSADOR',
      'FREELANCE DIGITAL MARKETING'
    ]
  }
})

// Watch for position prop changes
watch(() => props.position, (newPosition) => {
  if (newPosition) {
    formData.value.position = newPosition
  }
})

// Methods
const closeDialog = () => {
  isOpen.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    fullName: '',
    email: '',
    phone: '',
    position: props.position || '',
    coverLetter: '',
    cvFile: null
  }
}

const submitApplication = async () => {
  // Validate required fields
  if (!formData.value.fullName?.trim()) {
    alert('Vui lòng nhập đầy đủ các thông tin trên đơn ứng tuyển')
    return
  }
  
  if (!formData.value.email?.trim()) {
    alert('Vui lòng nhập đầy đủ các thông tin trên đơn ứng tuyển')
    return
  }
  
  if (!formData.value.phone?.trim()) {
    alert('Vui lòng nhập đầy đủ các thông tin trên đơn ứng tuyển')
    return
  }
  
  if (!formData.value.position?.trim()) {
    alert('Vui lòng nhập đầy đủ các thông tin trên đơn ứng tuyển')
    return
  }
  
  if (!formData.value.coverLetter?.trim()) {
    alert('Vui lòng nhập đầy đủ các thông tin trên đơn ứng tuyển')
    return
  }
  
  if (!formData.value.cvFile) {
    alert('Vui lòng nhập đầy đủ các thông tin trên đơn ứng tuyển')
    return
  }
  
  // Validate email format
  if (!/.+@.+\..+/.test(formData.value.email)) {
    alert('Vui lòng nhập đúng định dạng email')
    return
  }
  
  // Validate phone format
  if (!/^[0-9+\-\s()]+$/.test(formData.value.phone)) {
    alert('Vui lòng nhập đúng định dạng số điện thoại')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // TODO: Implement actual form submission
    console.log('Submitting application:', formData.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Emit success event
    emit('submitted', formData.value)
    
    // Close dialog and reset form
    closeDialog()
    
    // Show success message
    alert(t('recruitment.application.form.success'))
  } catch (error) {
    console.error('Error submitting application:', error)
    alert(t('recruitment.application.form.error'))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.application-form-card {
  border-radius: 0 !important;
  overflow: hidden;
  background: #1E3A8A !important;
}

.form-header {
  background: #1E3A8A;
  color: white;
  padding: 2rem 2rem 1rem;
  text-align: center;
  position: relative;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
}

.close-btn {
  color: white !important;
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.form-content {
  padding: 2rem;
  background: #1E3A8A;
}

.application-form {
  width: 100%;
}

.form-row {
  margin-bottom: 1.5rem;
}

.form-field {
  width: 100%;
}

.form-field :deep(.v-field) {
  background-color: transparent !important;
  border: 2px solid #FFFFFF !important;
  border-radius: 8px !important;
}

.form-field :deep(.v-field--error) {
  border-color: #F59E0B !important;
}

.form-field :deep(.v-messages) {
  color: #F59E0B !important;
  font-size: 0.875rem !important;
  margin-top: 0.5rem !important;
}

.form-field :deep(.v-field__input) {
  color: #FFFFFF !important;
  padding: 12px 16px !important;
}

.form-field :deep(.v-field__input::placeholder) {
  color: #FFFFFF !important;
  opacity: 0.8 !important;
}

.form-field :deep(.v-label) {
  color: #FFFFFF !important;
  font-weight: 500 !important;
}

.form-field :deep(.v-field__outline) {
  color: #FFFFFF !important;
}

.form-field :deep(.v-field--focused .v-field__outline) {
  color: #F59E0B !important;
}

/* v-select specific styling */
.form-field :deep(.v-select .v-field) {
  background-color: transparent !important;
  border: 2px solid #FFFFFF !important;
  border-radius: 8px !important;
}

.form-field :deep(.v-select .v-field--error) {
  border-color: #F59E0B !important;
}

.form-field :deep(.v-select .v-field__input) {
  color: #FFFFFF !important;
  padding: 12px 16px !important;
}

.form-field :deep(.v-select .v-label) {
  color: #FFFFFF !important;
  font-weight: 500 !important;
}

.form-field :deep(.v-select .v-field__outline) {
  color: #FFFFFF !important;
}

.form-field :deep(.v-select .v-field--focused .v-field__outline) {
  color: #F59E0B !important;
}

/* Dropdown menu styling */
.form-field :deep(.v-list) {
  background-color: #1E3A8A !important;
  border: 2px solid #FFFFFF !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3) !important;
}

.form-field :deep(.v-list-item) {
  color: #FFFFFF !important;
}

.form-field :deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.form-field :deep(.v-list-item--active) {
  background-color: #F59E0B !important;
  color: #1E3A8A !important;
}

/* Hide file input prepend icon */
.form-field :deep(.v-input__prepend) {
  display: none !important;
}

.form-actions {
  padding: 1rem 2rem 2rem;
  background: #1E3A8A;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
}

.cancel-btn {
  color: #FFFFFF !important;
  font-weight: 500 !important;
  text-transform: uppercase !important;
  border: 2px solid #FFFFFF !important;
  background: transparent !important;
  border-radius: 8px !important;
  width: 200px !important;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.submit-btn {
  background: linear-gradient(135deg, #F59E0B 0%, #F97316 100%) !important;
  color: white !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3) !important;
  transition: all 0.3s ease !important;
  letter-spacing: 1px !important;
  width: 200px !important;
 
}

.submit-btn:hover {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4) !important;
}

.submit-btn:disabled {
  background: #9CA3AF !important;
  transform: none !important;
  box-shadow: none !important;
}

/* Dark theme support - keep the same blue theme */
:deep(.v-theme--dark) .application-form-card {
  background: #1E3A8A !important;
}

:deep(.v-theme--dark) .form-header {
  background: #1E3A8A !important;
}

:deep(.v-theme--dark) .form-content {
  background: #1E3A8A !important;
}

:deep(.v-theme--dark) .form-actions {
  background: #1E3A8A !important;
}

:deep(.v-theme--dark) .form-field :deep(.v-field) {
  background-color: transparent !important;
  border-color: #FFFFFF !important;
}

:deep(.v-theme--dark) .form-field :deep(.v-field__input) {
  color: #FFFFFF !important;
}

:deep(.v-theme--dark) .form-field :deep(.v-field__input::placeholder) {
  color: #FFFFFF !important;
  opacity: 0.8 !important;
}

:deep(.v-theme--dark) .form-field :deep(.v-label) {
  color: #FFFFFF !important;
}

:deep(.v-theme--dark) .form-field :deep(.v-list) {
  background-color: #1E3A8A !important;
  border-color: #FFFFFF !important;
}

:deep(.v-theme--dark) .form-field :deep(.v-list-item) {
  color: #FFFFFF !important;
}

:deep(.v-theme--dark) .form-field :deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .form-header {
    padding: 1rem 1.5rem;
  }
  
  .form-title {
    font-size: 1.25rem;
  }
  
  .form-content {
    padding: 1.5rem;
  }
  
  .form-actions {
    padding: 1rem 1.5rem 1.5rem;
  }
  
  .submit-btn,
  .cancel-btn {
    width: 150px !important;
    padding: 0.75rem 1rem !important;
  }
}

@media (max-width: 480px) {
  .form-header {
    padding: 1rem;
  }
  
  .form-content {
    padding: 1rem;
  }
  
  .form-actions {
    padding: 1rem;
  }
}
</style>
