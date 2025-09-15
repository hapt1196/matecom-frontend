import { GoogleGenerativeAI } from '@google/generative-ai'
import { API_CONFIG } from './api.js'

// Lấy API key từ config hoặc environment variable
const getApiKey = () => {
  // Ưu tiên config trước, sau đó mới đến environment variable
  if (API_CONFIG.GEMINI_API_KEY && API_CONFIG.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    return API_CONFIG.GEMINI_API_KEY
  }
  // Fallback về environment variable
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY
  }
  return null
}

// Khởi tạo Google Generative AI
const genAI = new GoogleGenerativeAI(getApiKey())

// Tạo model Gemini 2.0 Flash (model mới)
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

// Hàm gọi API Gemini
export const generateGeminiResponse = async (prompt, conversationHistory = []) => {
  try {
    // Kiểm tra API key
    const apiKey = getApiKey()
    if (!apiKey) {
      throw new Error('Vui lòng cấu hình API key Gemini trong file config/api.js')
    }

    // Tạo chat session
    const chat = geminiModel.startChat({
      history: conversationHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    })

    // Gửi prompt và nhận kết quả
    const result = await chat.sendMessage(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Lỗi khi gọi Gemini API:', error)
    
    // Xử lý lỗi cụ thể
    if (error.message.includes('API key')) {
      throw new Error('Vui lòng cấu hình API key Gemini')
    } else if (error.message.includes('quota')) {
      throw new Error('Đã hết quota API. Vui lòng thử lại sau.')
    } else if (error.message.includes('parts')) {
      throw new Error('Lỗi format dữ liệu. Vui lòng thử lại.')
    } else if (error.message.includes('404') || error.message.includes('not found')) {
      throw new Error('Model không tồn tại hoặc không được hỗ trợ. Vui lòng kiểm tra tên model.')
    } else {
      throw new Error('Không thể kết nối với AI. Vui lòng thử lại sau.')
    }
  }
}

// Hàm chuyển đổi lịch sử chat sang format Gemini
export const convertChatHistory = (messages) => {
  const history = []
  
  for (let i = 0; i < messages.length - 1; i += 2) {
    const userMessage = messages[i]
    const aiMessage = messages[i + 1]
    
    if (userMessage && aiMessage && userMessage.isUser && !aiMessage.isUser) {
      history.push({
        role: 'user',
        parts: [{ text: userMessage.text }]
      })
      history.push({
        role: 'model',
        parts: [{ text: aiMessage.text }]
      })
    }
  }
  
  return history
}
