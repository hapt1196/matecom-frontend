<template>
  <div class="floating-contact-container">
    <!-- Main Toggle Button (Always visible) -->
    <div class="contact-item toggle-btn" @click="toggleMenu">
      <v-btn
        icon
        size="large"
        :color="isOpen ? 'grey-lighten-2' : 'deep-purple-accent-1'"
        elevation="4"
        class="floating-btn"
      >
        <component :is="isOpen ? X : ChevronDown" :size="24" :color="isOpen ? '#666' : 'white'" />
        <v-badge
          v-if="!isOpen"
          color="error"
          content="1"
          floating
          offset-x="0"
          offset-y="0"
          class="notification-badge"
        ></v-badge>
      </v-btn>
    </div>

    <!-- Contact Buttons (Visible when open) -->
    <transition-group name="slide-fade" tag="div" class="buttons-wrapper">
      <div v-if="isOpen" key="link2" class="contact-item">
        <v-btn
          icon
          size="large"
          color="#8B5CF6"
          elevation="4"
          class="floating-btn"
          href="#"
          target="_blank"
        >
          <Link :size="24" color="white" />
        </v-btn>
      </div>

      <div v-if="isOpen" key="link1" class="contact-item">
        <v-btn
          icon
          size="large"
          color="#3B82F6"
          elevation="4"
          class="floating-btn"
          href="#"
          target="_blank"
        >
          <Link :size="24" color="white" />
        </v-btn>
      </div>

      <div v-if="isOpen" key="email" class="contact-item">
        <v-btn
          icon
          size="large"
          color="#EF4444"
          elevation="4"
          class="floating-btn"
          href="mailto:matecomagencymarketing@gmail.com"
        >
          <Mail :size="24" color="white" />
        </v-btn>
      </div>

      <div v-if="isOpen" key="messenger" class="contact-item">
        <v-btn
          icon
          size="large"
          color="#0EA5E9"
          elevation="4"
          class="floating-btn"
          href="https://www.facebook.com/matecommarketing"
          target="_blank"
        >
          <MessageCircle :size="24" color="white" />
        </v-btn>
      </div>

      <div v-if="isOpen" key="phone" class="contact-item">
        <v-btn
          icon
          size="large"
          color="#10B981"
          elevation="4"
          class="floating-btn"
          href="tel:0339265203"
        >
          <Phone :size="24" color="white" />
        </v-btn>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Phone, MessageCircle, Mail, Link, X, ChevronDown } from 'lucide-vue-next'

const isOpen = ref(true)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.floating-contact-container {
  position: fixed;
  right: 24px;
  bottom: 100px; /* Adjusted to be slightly above bottom */
  z-index: 9999;
  display: flex;
  flex-direction: column-reverse; /* Stack upwards */
  align-items: center;
  gap: 16px;
}

.buttons-wrapper {
  display: flex;
  flex-direction: column-reverse;
  gap: 16px;
  align-items: center;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-btn {
  border-radius: 50% !important;
  width: 56px !important;
  height: 56px !important;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.floating-btn:hover {
  transform: scale(1.1);
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
