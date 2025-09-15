// File test để kiểm tra cấu hình API
import { API_CONFIG } from './api.js'

console.log('=== KIỂM TRA CẤU HÌNH API ===')
console.log('API_CONFIG.GEMINI_API_KEY:', API_CONFIG.GEMINI_API_KEY)
console.log('API key có hợp lệ:', API_CONFIG.GEMINI_API_KEY && API_CONFIG.GEMINI_API_KEY !== 'your_gemini_api_key_here')
console.log('Environment VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY)
console.log('================================')
