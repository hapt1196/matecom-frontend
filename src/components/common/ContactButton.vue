<template>
  <v-btn
    :color="color"
    :size="size"
    :variant="variant"
    :class="buttonClass"
    :style="buttonStyle"
    @click="handleClick"
  >
    <v-icon v-if="icon" :class="iconClass">{{ icon }}</v-icon>
    <span v-if="showText" class="btn-text">{{ buttonText }}</span>
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const props = defineProps({
  // Button appearance
  color: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'large'
  },
  variant: {
    type: String,
    default: 'elevated'
  },
  // Text and icon
  text: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'mdi-email-outline'
  },
  showText: {
    type: Boolean,
    default: true
  },
  // Styling
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object,
    default: () => ({})
  },
  // Behavior
  route: {
    type: String,
    default: '/contact'
  },
  external: {
    type: Boolean,
    default: false
  },
  externalUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const { t } = useI18n()
const router = useRouter()

// Computed properties
const buttonText = computed(() => {
  return props.text || t('common.contactButton')
})

const buttonClass = computed(() => {
  const baseClass = 'contact-btn'
  return props.customClass ? `${baseClass} ${props.customClass}` : baseClass
})

const buttonStyle = computed(() => {
  return {
    ...props.customStyle
  }
})

const iconClass = computed(() => {
  return 'btn-icon'
})

// Methods
const handleClick = () => {
  emit('click')
  
  if (props.external && props.externalUrl) {
    window.open(props.externalUrl, '_blank')
  } else {
    router.push(props.route)
  }
}
</script>

<style scoped>
.contact-btn {
  font-family: var(--font-family-heading, 'Inter', sans-serif) !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border-radius: 12px !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.5rem !important;
  letter-spacing: 0.5px !important;
}

.contact-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.btn-text {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-icon {
  font-size: 1.125rem !important;
}

/* Default primary styling */
.contact-btn.v-btn--variant-elevated {
  background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%) !important;
  color: white !important;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3) !important;
}

.contact-btn.v-btn--variant-elevated:hover {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%) !important;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4) !important;
}

/* Orange accent variant */
.contact-btn.orange-accent {
  background: linear-gradient(135deg, #F59E0B 0%, #F97316 100%) !important;
  color: white !important;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3) !important;
}

.contact-btn.orange-accent:hover {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%) !important;
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4) !important;
}

/* Pink gradient variant */
.contact-btn.pink-gradient {
  background: linear-gradient(135deg, #EC4899 0%, #F97316 100%) !important;
  color: white !important;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4) !important;
}

.contact-btn.pink-gradient:hover {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%) !important;
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.6) !important;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-btn {
    font-size: 0.875rem !important;
    padding: 0.75rem 1.5rem !important;
  }
}

@media (max-width: 480px) {
  .contact-btn {
    font-size: 0.75rem !important;
    padding: 0.625rem 1.25rem !important;
  }
  
  .btn-text {
    font-size: 0.75rem;
  }
}
</style>
