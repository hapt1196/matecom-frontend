<template>
  <div class="ai-assistant-view fade-in-up" ref="rootEl">
    <v-container fluid class="pa-0">
      <!-- Header Section -->
      <div class="ai-header fade-in-up">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" md="8" class="text-center">
              <h1 class="ai-title fade-in-up">{{ t('aiAssistant.hero.title') }}</h1>
              <p class="ai-subtitle fade-in-up">
                {{ t('aiAssistant.hero.subtitle') }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- Chat Interface -->
      <v-container class="chat-container">
        <v-row justify="center">
          <v-col cols="12" lg="10" xl="8">
            <v-card class="chat-card fade-in-up" elevation="8">
              <!-- Chat Header -->
              <div class="chat-header">
                <div class="chat-header-content">
                  <div class="ai-avatar">
                    <img src="@/assets/img/Mascot.png" alt="MATECOM AI" class="ai-avatar-img" />
                  </div>
                  <div class="ai-info">
                    <h3 class="ai-name">{{ t('aiAssistant.chat.header.title') }}</h3>
                    <span class="ai-status" :class="{ 'online': isOnline && isApiConfigured, 'offline': !isOnline || !isApiConfigured }">
                      {{ getStatusText() }}
                    </span>
                  </div>
                </div>
                <v-btn 
                  icon 
                  @click="clearChat"
                  class="clear-btn"
                  :title="t('aiAssistant.chat.buttons.clearChat')"
                >
                  <Trash2 class="w-5 h-5" />
                </v-btn>
              </div>

              <!-- Chat Messages -->
              <div class="chat-messages" ref="chatContainer">
                <div 
                  v-for="(message, index) in messages" 
                  :key="index"
                  class="message-wrapper"
                  :class="{ 'user-message': message.isUser, 'ai-message': !message.isUser }"
                >
                  <div class="message-content">
                    <div class="message-avatar">
                      <User v-if="message.isUser" class="w-6 h-6 text-primary" />
                      <img v-else src="@/assets/img/Mascot.png" alt="MATECOM AI" class="message-avatar-img" />
                    </div>
                    <div class="message-bubble" :class="{ 'error': message.isError, 'warning': message.isWarning }">
                      <div class="message-text" v-html="formatMessage(message.text)"></div>
                      <div class="message-time">
                        {{ formatTime(message.timestamp) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Typing Indicator -->
                <div v-if="isTyping" class="message-wrapper ai-message">
                  <div class="message-content">
                    <div class="message-avatar">
                      <img src="@/assets/img/Mascot.png" alt="MATECOM AI" class="message-avatar-img" />
                    </div>
                    <div class="message-bubble">
                      <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Chat Input -->
              <div class="chat-input-container">
                <v-form @submit.prevent="sendMessage" class="chat-form">
                  <v-row align="center" no-gutters>
                    <v-col>
                      <v-text-field
                        v-model="newMessage"
                        :placeholder="t('aiAssistant.chat.input.placeholder')"
                        variant="outlined"
                        density="compact"
                        hide-details
                        class="chat-input"
                        :disabled="!isOnline"
                        @keyup.enter="sendMessage"
                      />
                    </v-col>
                    <v-col cols="auto" class="ml-2">
                      <v-btn
                        color="primary"
                        icon
                        type="submit"
                        :disabled="!newMessage.trim() || !isOnline"
                        :loading="isTyping"
                        class="send-btn"
                        :title="t('aiAssistant.chat.input.sendButton')"
                      >
                        <Send class="w-5 h-5" />
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Features Section -->
      <div class="features-section">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-card class="feature-card fade-in-up" elevation="4">
                <div class="feature-icon">
                  <Zap class="w-12 h-12 text-primary" />
                </div>
                <h3 class="feature-title">{{ t('aiAssistant.features.fastResponse.title') }}</h3>
                <p class="feature-description">
                  {{ t('aiAssistant.features.fastResponse.description') }}
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="feature-card fade-in-up" elevation="4">
                <div class="feature-icon">
                  <Brain class="w-12 h-12 text-success" />
                </div>
                <h3 class="feature-title">{{ t('aiAssistant.features.intelligent.title') }}</h3>
                <p class="feature-description">
                  {{ t('aiAssistant.features.intelligent.description') }}
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="feature-card fade-in-up" elevation="4">
                <div class="feature-icon">
                  <Clock class="w-12 h-12 text-info" />
                </div>
                <h3 class="feature-title">{{ t('aiAssistant.features.available247.title') }}</h3>
                <p class="feature-description">
                  {{ t('aiAssistant.features.available247.description') }}
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { generateGeminiResponse, convertChatHistory } from '@/config/gemini.js'
import { API_CONFIG } from '@/config/api.js'
import { debugChatHistory, debugRealMessages } from '@/config/debug.js'
import { 
  Bot, 
  User, 
  Trash2, 
  TestTube, 
  Send, 
  Zap, 
  Brain, 
  Clock 
} from 'lucide-vue-next'

const { t } = useI18n()

const messages = ref([])

const newMessage = ref('')
const isTyping = ref(false)
const isOnline = ref(true)
const chatContainer = ref(null)
const isApiConfigured = ref(false)
const rootEl = ref(null)
let intersectionObserver

const sendMessage = async () => {
  if (!newMessage.value.trim() || !isOnline.value) return

  const userMessage = {
    text: newMessage.value.trim(),
    isUser: true,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  newMessage.value = ''
  
  // Scroll to bottom
  await nextTick()
  scrollToBottom()

  // Gọi Gemini API
  isTyping.value = true
  try {
    // Debug chat history
    console.log('🔍 Current messages:', messages.value)
    
    // Chuyển đổi lịch sử chat
    const chatHistory = convertChatHistory(messages.value.slice(0, -1))
    console.log('🔄 Chat history for Gemini:', chatHistory)
    
    // Gọi API Gemini
    const aiResponse = await generateGeminiResponse(userMessage.text, chatHistory)
    
    messages.value.push({
      text: aiResponse,
      isUser: false,
      timestamp: new Date()
    })
  } catch (error) {
    console.error('❌ Lỗi khi gọi Gemini API:', error)
    
    // Hiển thị lỗi cho người dùng
    messages.value.push({
      text: `${t('aiAssistant.chat.messages.error')} ${error.message}`,
      isUser: false,
      timestamp: new Date(),
      isError: true
    })
  } finally {
    isTyping.value = false
    
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const clearChat = () => {
  messages.value = [{
    text: t('aiAssistant.chat.messages.welcome'),
    isUser: false,
    timestamp: new Date()
  }]
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const formatMessage = (text) => {
  let formattedText = text
  
  // Convert markdown bold **text** to <strong>text</strong>
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // Convert markdown italic *text* to <em>text</em>
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // Convert markdown lists with - to HTML lists
  formattedText = formattedText.replace(/^-\s(.+)$/gm, '<li>$1</li>')
  
  // Wrap consecutive <li> elements in <ul>
  formattedText = formattedText.replace(/(<li>.*<\/li>)/gs, (match) => {
    return `<ul>${match}</ul>`
  })
  
  // Convert line breaks to <br> tags
  formattedText = formattedText.replace(/\n/g, '<br>')
  
  // Convert URLs to clickable links
  formattedText = formattedText.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" class="message-link">$1</a>'
  )
  
  return formattedText
}

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp)
}

const checkApiConfiguration = () => {
  // Kiểm tra xem API key đã được cấu hình chưa
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || API_CONFIG.GEMINI_API_KEY;
  isApiConfigured.value = apiKey && apiKey !== 'your_gemini_api_key_here';
  
  if (!isApiConfigured.value) {
    messages.value.push({
      text: t('aiAssistant.chat.messages.apiNotConfigured'),
      isUser: false,
      timestamp: new Date(),
      isWarning: true
    })
  }
}

const getStatusText = () => {
  if (!isApiConfigured.value) {
    return t('aiAssistant.chat.header.status.notConfigured')
  }
  if (!isOnline.value) {
    return t('aiAssistant.chat.header.status.offline')
  }
  return t('aiAssistant.chat.header.status.online')
}

const testAPI = async () => {
  messages.value.push({
    text: t('aiAssistant.chat.messages.testing'),
    isUser: false,
    timestamp: new Date()
  })
  await nextTick()
  scrollToBottom()

  try {
    // Test với prompt đơn giản
    const response = await generateGeminiResponse('Xin chào, hãy trả lời ngắn gọn: "API hoạt động tốt!"')
    
    messages.value.push({
      text: `${t('aiAssistant.chat.messages.testSuccess')} ${response}`,
      isUser: false,
      timestamp: new Date()
    })
  } catch (error) {
    messages.value.push({
      text: `${t('aiAssistant.chat.messages.testError')} ${error.message}`,
      isUser: false,
      timestamp: new Date(),
      isError: true
    })
  } finally {
    await nextTick()
    scrollToBottom()
  }
}

onMounted(() => {
  // Thêm welcome message
  messages.value.push({
    text: t('aiAssistant.chat.messages.welcome'),
    isUser: false,
    timestamp: new Date()
  })
  
  // Kiểm tra cấu hình API
  checkApiConfiguration()
  
  // Simulate connection delay
  setTimeout(() => {
    isOnline.value = isApiConfigured.value
  }, 1000)
  
  scrollToBottom()

  // Kích hoạt hiệu ứng fade-in cho toàn bộ view
  nextTick(() => {
    if (rootEl.value) {
      rootEl.value.classList.add('visible')
    }
  })

  // IntersectionObserver cho các phần tử con
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        intersectionObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const animatedChildren = rootEl.value?.querySelectorAll('.fade-in-up') || []
  animatedChildren.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 80, 600)}ms`
    intersectionObserver.observe(el)
  })
})

watch(messages, () => {
  nextTick(() => {
    scrollToBottom()
  })
})
</script>

<style scoped>
.ai-assistant-view {
  min-height: 100vh;
  width: 100%;
  background-image: url('@/assets/img/AIbackground.JPG');
  background-size: cover;
  background-repeat: repeat;
  background-attachment: fixed;
}

/* Fade-in animation reused from About page */
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

.ai-header {
  background: transparent;
  color: #FFFFFF;
  padding: 80px 0 60px;
  text-align: center;
}

.ai-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #FFFFFF !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.ai-subtitle {
  font-size: 1.25rem;
  color: #FFFFFF !important;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.chat-container {
  margin-top: -40px;
  margin-bottom: 60px;
}

.chat-card {
  border-radius: 20px;
  overflow: hidden;
  background: #FFFFFF;
}

.chat-header {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.ai-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.ai-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.ai-info h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
}

.ai-status {
  font-size: 0.875rem;
  opacity: 0.8;
}

.ai-status.online {
  color: #10b981;
}

.ai-status.offline {
  color: #ef4444;
}

.clear-btn {
  color: rgba(255, 255, 255, 0.8) !important;
  background: rgba(255, 255, 255, 0.1) !important;
  margin-left: 8px !important;
}

.clear-btn:hover {
  color: #FFFFFF !important;
  background: rgba(255, 255, 255, 0.2) !important;
}

.test-btn {
  color: rgba(255, 255, 255, 0.8) !important;
  background: rgba(255, 255, 255, 0.1) !important;
  margin-left: 8px !important;
}

.test-btn:hover {
  color: #FFFFFF !important;
  background: rgba(255, 255, 255, 0.2) !important;
}

.chat-messages {
  height: 500px;
  overflow-y: auto;
  padding: 24px;
  background: rgb(238, 245, 254);
}

.message-wrapper {
  margin-bottom: 20px;
}

.message-content {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.user-message .message-content {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background: #1E3A8A;
}

.message-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.message-bubble {
  max-width: 70%;
  background: #FFFFFF;
  padding: 12px 16px;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  color: #03045e;
}

.user-message .message-bubble {
  background: #1E3A8A;
  color: #FFFFFF;
}

.user-message .message-text {
  color: #FFFFFF !important;
}

.user-message .message-time {
  color: #FFFFFF !important;
}

/* Tin nhắn lỗi */
.message-bubble.error {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.message-bubble.error .message-text {
  color: #dc2626;
}

.message-bubble.error .message-time {
  color: #dc2626;
  opacity: 0.8;
}

/* Tin nhắn cảnh báo */
.message-bubble.warning {
  background: #fef3c7;
  color: #d97706;
  border: 1px solid #fed7aa;
}

.message-bubble.warning .message-text {
  color: #d97706;
}

.message-bubble.warning .message-time {
  color: #d97706;
  opacity: 0.8;
}

.message-text {
  line-height: 1.5;
  margin-bottom: 4px;
  color: #03045e;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
  text-align: right;
  color: #03045e;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #94a3b8;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.chat-input-container {
  padding: 24px;
  background: #FFFFFF;
  border-top: 1px solid #e2e8f0;
}

.chat-form {
  width: 100%;
}

.chat-input {
  border-radius: 25px;
}

.chat-input :deep(.v-field__input) {
  color: #03045e !important;
}

.chat-input :deep(.v-field__outline) {
  color: #1E3A8A !important;
}

.send-btn {
  border-radius: 50%;
  width: 48px;
  height: 48px;
}

.features-section {
  padding: 80px 0;
  background: transparent;
}

.feature-card {
  text-align: center;
  padding: 40px 24px;
  border-radius: 16px;
  height: 100%;
  transition: all 0.3s ease;
  background: #FFFFFF;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.feature-icon {
  margin-bottom: 24px;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #03045e;
}

.feature-description {
  color: #03045e;
  line-height: 1.6;
}

.message-link {
  color: inherit;
  text-decoration: underline;
}

.message-link:hover {
  opacity: 0.8;
}

/* Message formatting styles */
.message-text ul {
  margin: 8px 0;
  padding-left: 20px;
}

.message-text li {
  margin: 4px 0;
  line-height: 1.5;
}

.message-text strong {
  font-weight: 600;
  color: inherit;
}

.message-text em {
  font-style: italic;
  color: inherit;
}


/* Responsive Design */
@media (max-width: 768px) {
  .ai-title {
    font-size: 2rem;
  }
  
  .ai-subtitle {
    font-size: 1rem;
  }
  
  .chat-messages {
    height: 400px;
  }
  
  .message-bubble {
    max-width: 85%;
  }
}
</style>
