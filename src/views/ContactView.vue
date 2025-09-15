<template>
  <div class="contact-view">
    <!-- Hero Banner -->
    <section class="contact-hero">
      <div class="hero-content">
        <h1 class="hero-title">LIÊN HỆ VỚI</h1>
        <h1 class="hero-title">CHÚNG TÔI</h1>
      </div>
    </section>
    
    <!-- Contact Form Section -->
    <section class="contact-form-section">
      <div class="form-container">
        <div class="form-header">
          <h2 class="form-title">MUỐN THƯƠNG HIỆU CỦA BẠN TẠO SỨC HÚT BÙNG NỔ?</h2>
          <h3 class="form-subtitle">HÃY ĐỂ LẠI THÔNG TIN!</h3>
        </div>
        
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="fullName" class="form-label">Họ và tên *</label>
            <input
              type="text"
              id="fullName"
              v-model="formData.fullName"
              class="form-input"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="phone" class="form-label">Số điện thoại *</label>
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              class="form-input"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">Email *</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="form-input"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="company" class="form-label">Tên công ty</label>
            <input
              type="text"
              id="company"
              v-model="formData.company"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="message" class="form-label">Ghi chú</label>
            <textarea
              id="message"
              v-model="formData.message"
              class="form-textarea"
              rows="4"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="submit-btn"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Đang gửi...' : 'Gửi thông tin' }}
            </button>
          </div>
        </form>
      </div>
      
      <!-- Google Map Section -->
      <div class="map-section">
        <h3 class="map-title">Vị trí của chúng tôi</h3>
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.740313308014!2d105.79040657575226!3d21.00304428866029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acaf92155555%3A0xdaf2cc1c7ff480de!2zMjgzIEtodeG6pXQgRHV5IFRp4bq_biwgVGjEg25nIExvbmcgTnVtYmVyIE9uZSwgVGhhbmggWHXDom4sIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1757698952245!5m2!1sen!2s" 
            width="100%" 
            height="450" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
      
      <!-- Phone Icon -->
      <div class="phone-icon">
        <div class="phone-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.03996 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" fill="white"/>
          </svg>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { createContact } from '@/services/contactService'

const formData = reactive({
  fullName: '',
  phone: '',
  email: '',
  company: '',
  message: ''
})

const isLoading = ref(false)

const submitForm = async () => {
  try {
    isLoading.value = true
    
    // Gọi API tạo liên hệ
    const contactData = {
      fullName: formData.fullName,
      phoneNumber: formData.phone, // Map phone -> phoneNumber theo API
      email: formData.email,
      company: formData.company,
      message: formData.message
    }
    
    await createContact(contactData)
    
    // Reset form sau khi thành công
    formData.fullName = ''
    formData.phone = ''
    formData.email = ''
    formData.company = ''
    formData.message = ''
    
    // Show success message
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.')
    
  } catch (error) {
    console.error('Submit error:', error)
    alert('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.contact-view {
  min-height: 100vh;
  background: var(--contact-bg);
  color: var(--contact-text);
  
  /* CSS Variables với giá trị mặc định (light mode) */
  --contact-bg: #ffffff;
  --contact-text: #333333;
  --contact-title: #1e293b;
  --contact-label: #1e293b;
  --contact-text-color: #64748b;
  --form-bg: #f8fafc;
  --form-border: #e2e8f0;
  --form-input-bg: #ffffff;
  --form-input-border: #cbd5e1;
  --form-input-focus: #3b82f6;
  --submit-btn: #64748b;
  --submit-btn-hover: #475569;
}

/* Contact Hero Banner */
.contact-hero {
  position: relative;
  height: 60vh;
  min-height: 400px;
  background-image: url('@/assets/img/agency_life_header_background.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.contact-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #ffffff;
}

.hero-title {
  font-family: var(--font-family-heading);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  color: #ffffff;
  text-shadow: 0 3px 15px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.05em;
  word-spacing: 0.1em;
}

/* Dark mode override */
:deep(.v-theme--dark) .contact-view,
.v-theme--dark .contact-view {
  --contact-bg: #000000;
  --contact-text: #ffffff;
  --contact-title: #ffffff;
  --contact-label: #ffffff;
  --contact-text-color: #cbd5e1;
  --form-bg: #000000;
  --form-border: #334155;
  --form-input-bg: #000000;
  --form-input-border: #475569;
  --form-input-focus: #3b82f6;
  --submit-btn: #cbd5e1;
  --submit-btn-hover: #f1f5f9;
}

/* Contact Form Section */
.contact-form-section {
  width: 100%;
  min-height: 100vh;
  padding: 80px 20px;
  background: #F8FAFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-container {
  max-width: 900px;
  width: 100%;
}

.form-header {
  text-align: center;
  margin-bottom: 60px;
}

.form-title {
  font-family: 'Arial', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #1E3A8A;
  margin: 0 0 10px 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.form-subtitle {
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #1E3A8A;
  margin: 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  color: #1E3A8A;
  font-weight: 600;
  text-align: left;
  margin: 0;
}

.form-input,
.form-textarea {
  background: transparent;
  border: none;
  border-bottom: 1px solid #D1D5DB;
  padding: 12px 0;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  color: #1E3A8A;
  outline: none;
  width: 100%;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  border-bottom-color: #1E3A8A;
}

.form-textarea {
  resize: vertical;
  min-height: 60px;
  line-height: 1.5;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
}

.submit-btn {
  background: #1E3A8A;
  border: none;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 14px 32px;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(30, 58, 138, 0.2);
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.submit-btn:hover {
  background: #3B82F6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(30, 58, 138, 0.2);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 2px 4px rgba(30, 58, 138, 0.2);
}

.submit-btn:disabled:hover {
  background: #1E3A8A;
  transform: none;
  box-shadow: 0 2px 4px rgba(30, 58, 138, 0.2);
}

.submit-btn:disabled::before {
  display: none;
}

/* Google Map Section */
.map-section {
  margin-top: 60px;
  width: 100%;
  max-width: 100%;
}

.map-title {
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #1E3A8A;
  text-align: center;
  margin: 0 0 30px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.map-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: #ffffff;
}

.map-container iframe {
  width: 100%;
  height: 450px;
  border: none;
  display: block;
}

/* Phone Icon */
.phone-icon {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 1000;
}

.phone-circle {
  width: 60px;
  height: 60px;
  background: #E5E7EB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.phone-circle:hover {
  background: #1E3A8A;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .contact-hero {
    height: 50vh;
    min-height: 350px;
  }
  
  .contact-form-section {
    padding: 60px 20px;
  }
  
  .form-container {
    max-width: 700px;
  }
  
  .map-section {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .contact-hero {
    height: 40vh;
    min-height: 300px;
  }
  
  .contact-form-section {
    padding: 50px 20px;
  }
  
  .form-container {
    max-width: 100%;
  }
  
  .form-title {
    font-size: 24px;
    white-space: normal;
    line-height: 1.3;
  }
  
  .form-subtitle {
    font-size: 20px;
    white-space: normal;
    line-height: 1.3;
  }
  
  .contact-form {
    gap: 25px;
  }
  
  .form-group {
    gap: 6px;
  }
  
  .form-actions {
    justify-content: center;
  }
  
  .submit-btn {
    width: 100%;
    text-align: center;
  }
  
  .map-section {
    margin-top: 40px;
  }
  
  .map-title {
    font-size: 20px;
  }
  
  .map-container iframe {
    height: 350px;
  }
}

@media (max-width: 480px) {
  .contact-hero {
    height: 35vh;
    min-height: 250px;
  }
  
  .contact-form-section {
    padding: 40px 15px;
  }
  
  .form-container {
    max-width: 100%;
  }
  
  .form-title {
    font-size: 20px;
    white-space: normal;
    line-height: 1.3;
  }
  
  .form-subtitle {
    font-size: 18px;
    white-space: normal;
    line-height: 1.3;
  }
  
  .phone-icon {
    bottom: 20px;
    left: 20px;
  }
  
  .phone-circle {
    width: 50px;
    height: 50px;
  }
  
  .map-section {
    margin-top: 30px;
  }
  
  .map-title {
    font-size: 18px;
  }
  
  .map-container iframe {
    height: 300px;
  }
}
</style>
