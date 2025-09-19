<template>
  <v-footer class="app-footer">
    <div class="footer-background"></div>
    <v-container class="footer-content">
      <v-row>
        <!-- Left Column - Company Information -->
        <v-col cols="12" md="4" class="footer-left">
          <div class="company-info">
            <div class="logo-section">
              <img src="@/assets/matecom_logo_transparent.png" alt="MATECOM Logo" height="160" class="footer-logo" />
              <div class="company-name">MATECOM Agency</div>
            </div>
            <p class="company-description">
              MATECOM Agency chuyên cung cấp dịch vụ marketing toàn diện cho các doanh nghiệp về lĩnh vực công nghệ
            </p>
            <div class="social-icons">
              <v-btn icon href="https://www.facebook.com/matecommarketing" target="_blank" class="social-btn">
                <Facebook class="w-5 h-5" />
              </v-btn>
              <v-btn icon href="https://www.linkedin.com/in/matecom-agency" target="_blank" class="social-btn">
                <Linkedin class="w-5 h-5" />
              </v-btn>
              <v-btn icon href="https://www.tiktok.com/@matecomeagency" target="_blank" class="social-btn">
                <span class="tiktok-icon">T</span>
              </v-btn>
            </div>
          </div>
        </v-col>

        <!-- Middle Column - Services (Empty for now) -->
        <v-col cols="12" md="4" class="footer-center">
          <!-- Temporarily empty as requested -->
        </v-col>

        <!-- Right Column - Contact Information -->
        <v-col cols="12" md="4" class="footer-right">
          <div class="contact-info-wrapper">
            <div class="contact-info">
              <h3 class="contact-title">Liên hệ</h3>
              <div class="contact-item">
                <span class="contact-label">Hotline:</span>
                <span class="contact-value">0339265203</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">Email:</span>
                <span class="contact-value">MATECOMagencymarketing@gmail.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">Địa chỉ:</span>
                <span class="contact-address">283 Khuất Duy Tiến, Hanoi, Vietnam</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      
      <!-- Copyright -->
      <v-row>
        <v-col cols="12" class="text-center">
          <div class="copyright">
            &copy; {{ new Date().getFullYear() }} MATECOM Agency. All Rights Reserved.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { Facebook, Linkedin, Youtube, Phone, Mail } from 'lucide-vue-next'
</script>

<style scoped>
.app-footer {
  position: relative;
  border-top: 1px solid var(--footer-border);
  padding: 20px 0 15px;
  margin-top: auto;
  color: var(--footer-text);
  overflow: hidden;
}

.footer-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/img/footer.1d355062.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 0;
}

.footer-content {
  position: relative;
  z-index: 1;
}

/* CSS Variables - Dark Mode Only */
.app-footer {
  --footer-border: #334155;
  --footer-text: #FFFFFF;
  --footer-text-secondary: #CBD5E1;
  --footer-accent: #F59E0B;
}

/* Dark Theme - Default Theme */
:deep(.v-theme--dark) .app-footer {
  --footer-border: #334155;
  --footer-text: #FFFFFF;
  --footer-text-secondary: #CBD5E1;
  --footer-accent: #F59E0B;
}

/* Left Column - Company Info */
.footer-left {
  padding-right: 24px;
  display: flex;
  align-items: flex-start;
}

.company-info {
  max-width: 100%;
  margin-top: 0;
}

.logo-section {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 10px;
}

.company-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.company-description {
  color: var(--footer-text-secondary);
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 15px;
}

.social-icons {
  display: flex;
  gap: 8px;
}

.social-btn {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: #FFFFFF !important;
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.social-btn:hover {
  background-color: var(--footer-accent) !important;
  color: #FFFFFF !important;
  transform: translateY(-2px);
  border-color: var(--footer-accent) !important;
}

.tiktok-icon {
  font-weight: bold;
  font-size: 1.1rem;
}

/* Right Column - Contact Info */
.footer-right {
  padding-left: 24px;
  display: flex;
  align-items: flex-start;
}

.contact-info-wrapper {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-top: 10%;
}

.contact-info {
  max-width: 100%;
  margin-top: 0;
}

.contact-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--footer-text);
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.contact-item {
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.contact-label {
  font-weight: 500;
  color: var(--footer-text);
  font-size: 0.9rem;
  min-width: 60px;
}

.contact-value {
  color: var(--footer-text);
  font-weight: 400;
  font-size: 0.95rem;
}

.contact-address {
  color: var(--footer-text);
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: 400;
}

.call-btn {
  margin-top: 15px;
  background: linear-gradient(135deg, var(--footer-accent), #1d4ed8) !important;
  color: white !important;
  font-weight: 600;
  text-transform: none;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  transition: all 0.3s ease;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
}

.call-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}


/* Footer logo styling */
.footer-logo {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transition: transform 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

/* Dark theme footer logo */
:deep(.v-theme--dark) .footer-logo {
  filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.1));
}

:deep(.v-theme--dark) .footer-logo:hover {
  filter: drop-shadow(0 4px 8px rgba(255, 255, 255, 0.15));
}

/* Copyright */
.copyright {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid var(--footer-border);
  color: var(--footer-text-secondary);
  font-size: 0.8rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-left,
  .footer-right {
    padding: 0;
    margin-bottom: 30px;
    display: block;
  }
  
  .contact-info-wrapper {
    display: block;
  }
  
  .logo-section {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .company-name {
    font-size: 1.3rem;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .contact-item {
    text-align: center;
  }
  
  .call-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: 15px 0 10px;
  }
  
  .company-description {
    font-size: 0.8rem;
  }
  
  .contact-title {
    font-size: 1rem;
  }
}
</style>
