<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <img src="@/assets/matecom_logo_transparent.png" alt="MATECOM" class="logo" />
        <h1 class="login-title">Business CRM</h1>
        <p class="login-subtitle">Đăng nhập để truy cập hệ thống</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">Tên đăng nhập</label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            class="form-input"
            :class="{ 'error': errors.username }"
            placeholder="Nhập tên đăng nhập"
            required
          />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Mật khẩu</label>
          <div class="password-input-container">
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              :class="{ 'error': errors.password }"
              placeholder="Nhập mật khẩu"
              required
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              <Eye v-if="!showPassword" class="w-4 h-4" />
              <EyeOff v-else class="w-4 h-4" />
            </button>
          </div>
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label class="checkbox-container">
            <input
              v-model="formData.rememberMe"
              type="checkbox"
              class="checkbox-input"
            />
            <span class="checkbox-label">Ghi nhớ đăng nhập</span>
          </label>
        </div>

        <button
          type="submit"
          class="login-button"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
        </button>

        <div v-if="loginError" class="error-alert">
          {{ loginError }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { login, isAuthenticated } from '@/services/authService'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  username: '',
  password: ''
})

const isLoading = ref(false)
const loginError = ref('')
const showPassword = ref(false)

onMounted(() => {
  // Kiểm tra nếu đã đăng nhập thì chuyển về trang chính
  if (isAuthenticated()) {
    router.push('/business')
  }
})

const validateForm = () => {
  errors.username = ''
  errors.password = ''
  let isValid = true

  if (!formData.username.trim()) {
    errors.username = 'Vui lòng nhập tên đăng nhập'
    isValid = false
  }

  if (!formData.password.trim()) {
    errors.password = 'Vui lòng nhập mật khẩu'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  loginError.value = ''

  try {
    const response = await login(formData.username, formData.password)
    
    if (response.success) {
      // Chuyển hướng đến trang business chính
      router.push('/business')
    } else {
      loginError.value = response.message || 'Đăng nhập thất bại'
    }
  } catch (error) {
    console.error('Login error:', error)
    loginError.value = error.message || 'Có lỗi xảy ra khi đăng nhập'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 48px;
  width: 100%;
  max-width: 480px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  height: 60px;
  width: auto;
  margin-bottom: 16px;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 8px;
  font-family: var(--font-family-heading);
}

.login-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

.login-form {
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  box-sizing: border-box;
  background: #ffffff;
  color: #000000;
}

.form-input:focus {
  outline: none;
  border-color: #1e3a8a;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  background: #ffffff;
  color: #000000;
}

.form-input.error {
  border-color: #ef4444;
  background: #ffffff;
  color: #000000;
}

.password-input-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #374151;
}

.error-message {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  accent-color: #1e3a8a;
}

.checkbox-label {
  font-size: 14px;
  color: #374151;
}

.login-button {
  width: 100%;
  padding: 14px 24px;
  background: #1e3a8a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-button:hover:not(:disabled) {
  background: #1e40af;
  transform: translateY(-1px);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-alert {
  margin-top: 16px;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  text-align: center;
}

.login-footer {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.footer-text {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.credentials {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
}

.credential-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.credential-item:last-child {
  margin-bottom: 0;
}

.credential-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.credential-value {
  font-size: 12px;
  color: #1e3a8a;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

/* Responsive Design */
@media (max-width: 640px) {
  .login-card {
    padding: 32px 24px;
    margin: 16px;
  }
  
  .login-title {
    font-size: 24px;
  }
  
  .form-input {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 24px 16px;
  }
  
  .login-title {
    font-size: 20px;
  }
  
  .credential-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
