import { GoogleGenerativeAI } from '@google/generative-ai'
import { API_CONFIG } from './api.js'
import { getSystemPrompt } from './company-context.js'

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

// Tạo model Gemini 2.5 Flash (model mới nhất, tốt nhất về giá/hiệu suất)
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

// Hàm delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Hàm retry với exponential backoff
const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 2000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      // Kiểm tra nếu là lỗi 429 (Too Many Requests)
      const is429Error = error.message?.includes('429') ||
        error.message?.includes('Too Many Requests') ||
        error.message?.includes('RESOURCE_EXHAUSTED') ||
        error.status === 429

      // Nếu là lỗi 429 và còn retry, thì retry
      if (is429Error && i < maxRetries - 1) {
        const waitTime = baseDelay * Math.pow(2, i) // Exponential backoff: 2s, 4s, 8s
        console.log(`⏳ Lỗi 429 - Đợi ${waitTime / 1000}s trước khi thử lại (lần ${i + 1}/${maxRetries})...`)
        await delay(waitTime)
        continue
      }

      // Nếu không phải lỗi 429 hoặc hết retry, throw error
      throw error
    }
  }
}

// Hàm gọi API Gemini
export const generateGeminiResponse = async (prompt, conversationHistory = []) => {
  try {
    // Kiểm tra API key
    const apiKey = getApiKey()
    if (!apiKey) {
      throw new Error('Vui lòng cấu hình API key Gemini trong file config/api.js')
    }

    // Tạo system prompt với context công ty
    const systemPrompt = getSystemPrompt()

    // Hàm gọi API (sẽ được retry nếu gặp lỗi 429)
    const callApi = async () => {
      // Tạo chat session với system prompt
      const chat = geminiModel.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          },
          {
            role: 'model',
            parts: [{ text: 'Tôi đã hiểu rõ thông tin về MATECOM và sẵn sàng hỗ trợ khách hàng. Tôi sẽ trả lời các câu hỏi về sản phẩm, dịch vụ và tư vấn gói phù hợp.' }]
          },
          ...conversationHistory
        ],
        generationConfig: {
          maxOutputTokens: 1500,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      })

      // Gửi prompt và nhận kết quả
      const result = await chat.sendMessage(prompt)
      const response = await result.response

      // Log thông tin về usage (nếu có)
      if (result.response?.usageMetadata) {
        console.log('📊 Token usage:', {
          promptTokens: result.response.usageMetadata.promptTokenCount,
          responseTokens: result.response.usageMetadata.candidatesTokenCount,
          totalTokens: result.response.usageMetadata.totalTokenCount
        })
      }

      return response.text()
    }

    // Gọi API với retry logic
    const responseText = await retryWithBackoff(callApi)

    console.log('✅ API call thành công')
    return responseText

  } catch (error) {
    console.error('❌ Lỗi khi gọi Gemini API:', error)

    // Xử lý lỗi cụ thể
    if (error.message?.includes('API key') || error.message?.includes('API_KEY_INVALID')) {
      throw new Error('Vui lòng cấu hình API key Gemini hợp lệ')
    } else if (error.message?.includes('429') || error.message?.includes('Too Many Requests') || error.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('⚠️ Quá nhiều yêu cầu! Vui lòng đợi 1-2 phút rồi thử lại. API Gemini có giới hạn số request.')
    } else if (error.message?.includes('quota')) {
      throw new Error('Đã hết quota API. Vui lòng kiểm tra giới hạn API key của bạn.')
    } else if (error.message?.includes('parts')) {
      throw new Error('Lỗi format dữ liệu. Vui lòng thử lại.')
    } else if (error.message?.includes('404') || error.message?.includes('not found')) {
      throw new Error('Model không tồn tại hoặc không được hỗ trợ. Vui lòng kiểm tra tên model.')
    } else {
      throw new Error(`Không thể kết nối với AI: ${error.message || 'Vui lòng thử lại sau.'}`)
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
