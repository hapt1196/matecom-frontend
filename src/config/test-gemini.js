// File test đơn giản cho Gemini API
import { generateGeminiResponse } from './gemini.js'

// Test API với prompt đơn giản
export const testGeminiAPI = async () => {
  try {
    console.log('🧪 Đang test Gemini API...')
    const response = await generateGeminiResponse('Xin chào, bạn có thể giới thiệu về bản thân không?')
    console.log('✅ API hoạt động tốt!')
    console.log('📝 Phản hồi:', response)
    return true
  } catch (error) {
    console.error('❌ Lỗi khi test API:', error.message)
    return false
  }
}

// Test format chat history
export const testChatHistory = () => {
  const mockMessages = [
    { text: 'Xin chào', isUser: true, timestamp: new Date() },
    { text: 'Chào bạn!', isUser: false, timestamp: new Date() },
    { text: 'Bạn khỏe không?', isUser: true, timestamp: new Date() },
    { text: 'Tôi khỏe, cảm ơn bạn!', isUser: false, timestamp: new Date() }
  ]
  
  console.log('📋 Mock messages:', mockMessages)
  return mockMessages
}
