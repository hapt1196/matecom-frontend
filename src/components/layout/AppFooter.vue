<template>
  <v-footer class="app-footer">
    <div class="footer-background"></div>
    <v-container class="footer-content">
      <v-row class="footer-main-content">
        <!-- Logo Section -->
        <v-col cols="12" md="2" class="footer-logo-section">
          <img src="@/assets/matecom_logo_transparent.png" alt="MATECOM Logo" height="150" class="footer-logo" />
        </v-col>

        <!-- Company Description + Address Section -->
        <v-col cols="12" md="4" class="footer-description-section">
          <div class="company-description">
            {{ t('footer.company.description') }}
          </div>
          <div class="company-address">
            <div class="address-item">
              <span class="address-label">{{ t('footer.info.address') }}:</span>
              <span class="address-text">283 Khuất Duy Tiến, Hanoi, Vietnam</span>
            </div>
          </div>
        </v-col>

        <!-- Contact Information Section -->
        <v-col cols="12" md="3" class="footer-contact-section">
          <div class="contact-item">
            <Mail class="contact-icon" />
            <span class="contact-text">matecomagencymarketing@gmail.com</span>
          </div>
          <div class="contact-item">
            <Phone class="contact-icon" />
            <span class="contact-text">0339.265.203</span>
          </div>
        </v-col>

        <!-- Social Media Section -->
        <v-col cols="12" md="3" class="footer-social-section">
          <div class="social-icons">
            <v-btn icon href="https://www.facebook.com/matecommarketing" target="_blank" class="social-btn">
              <Facebook class="w-5 h-5" />
            </v-btn>
            <v-btn icon href="https://www.linkedin.com/in/matecom-agency-4b6259380/" target="_blank" class="social-btn">
              <Linkedin class="w-5 h-5" />
            </v-btn>
            <v-btn icon href="https://www.tiktok.com/@matecomeagency" target="_blank" class="social-btn">
              <span class="tiktok-icon">T</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      
      <!-- Copyright -->
      <v-row>
        <v-col cols="12" class="text-center">
          <div class="copyright">
            {{ t('footer.copyright') }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Facebook, Linkedin, Youtube, Phone, Mail } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<style scoped>
.app-footer {
  position: relative;
  border-top: 1px solid var(--footer-border);
  padding: 40px 20px 0 15px;
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

/* Footer Main Content Layout */
.footer-main-content {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  min-height: 120px;
}

/* Logo Section */
.footer-logo-section {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 15px;
  padding-top: 0;
}

/* Company Description + Address Section */
.footer-description-section {
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 0;
}

.company-description {
  color: var(--footer-text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 12px;
  text-align: left;
}

.company-address {
  margin-top: 8px;
}

.address-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.address-label {
  font-weight: 600;
  color: var(--footer-text);
  font-size: 0.85rem;
}

.address-text {
  color: var(--footer-text-secondary);
  font-size: 0.8rem;
  line-height: 1.4;
}

/* Contact Information Section */
.footer-contact-section {
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 0;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-icon {
  width: 18px;
  height: 18px;
  color: var(--footer-text);
}

.contact-text {
  color: var(--footer-text);
  font-size: 0.85rem;
  font-weight: 400;
}

/* Social Media Section */
.footer-social-section {
  padding: 0 15px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0;
}

.social-icons {
  display: flex;
  gap: 10px;
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
  margin-top: -25px;
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
  .footer-main-content {
    flex-direction: column;
    gap: 20px;
    min-height: auto;
    align-items: center;
  }
  
  .footer-logo-section,
  .footer-description-section,
  .footer-contact-section,
  .footer-social-section {
    padding: 0;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  
  .footer-logo-section {
    order: 1;
  }
  
  .footer-description-section {
    order: 2;
  }
  
  .footer-contact-section {
    order: 3;
  }
  
  .footer-social-section {
    order: 4;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .contact-item {
    justify-content: center;
  }
  
  .company-description,
  .address-item {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: 15px 0 10px;
  }
  
  .company-description {
    font-size: 0.8rem;
  }
  
  .contact-text {
    font-size: 0.8rem;
  }
  
  .address-text {
    font-size: 0.75rem;
  }
}
</style>
