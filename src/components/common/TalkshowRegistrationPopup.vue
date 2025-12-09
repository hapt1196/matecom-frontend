<template>
  <v-dialog
    v-model="isOpen"
    max-width="600"
    persistent
    scrollable
  >
    <v-card class="registration-form-card">
      <!-- Header -->
      <v-card-title class="form-header">
        <h2 class="form-title">{{ t('home.hero.talkshow') }}</h2>
      </v-card-title>

      <!-- Form Content -->
      <v-card-text class="form-content">
        <v-form @submit.prevent="submitRegistration" class="registration-form">
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
        </v-form>
      </v-card-text>

      <!-- Actions -->
      <div class="form-actions">
        <v-btn
          @click="submitRegistration"
          class="submit-btn"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          {{ t('common.register') }}
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { createContact } from '@/services/contactService'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'submitted'])

const { t } = useI18n()

// Dialog state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Form data
const formData = ref({
  fullName: '',
  email: '',
  phone: ''
})

const isSubmitting = ref(false)

// Methods
const closeDialog = () => {
  isOpen.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    fullName: '',
    email: '',
    phone: ''
  }
}

const submitRegistration = async () => {
  // Validate required fields
  if (!formData.value.fullName?.trim() || !formData.value.email?.trim() || !formData.value.phone?.trim()) {
    alert('Vui lòng nhập đầy đủ thông tin.')
    return
  }
  
  // Validate email format
  if (!/.+@.+\..+/.test(formData.value.email)) {
    alert('Vui lòng nhập đúng định dạng email.')
    return
  }
  
  // Validate phone format
  if (!/^[0-9+\-\s()]+$/.test(formData.value.phone)) {
    alert('Vui lòng nhập đúng định dạng số điện thoại.')
    return
  }
  
  isSubmitting.value = true
  
  try {
    const contactData = {
      fullName: formData.value.fullName,
      email: formData.value.email,
      phoneNumber: formData.value.phone,
      message: "Đăng ký tham gia talkshow"
    };

    await createContact(contactData);
    
    // Emit success event
    emit('submitted', formData.value)
    
    // Close dialog and reset form
    closeDialog()
    
    // Show success message
    alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.')
  } catch (error) {
    console.error('Error submitting registration:', error)
    alert('Đã có lỗi xảy ra. Vui lòng thử lại.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.registration-form-card {
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

.form-content {
  padding: 2rem;
  background: #1E3A8A;
}

.registration-form {
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
</style>
