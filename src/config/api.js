// Cấu hình API
export const API_CONFIG = {
  // Thay thế bằng API key thực của bạn
  GEMINI_API_KEY: 'AIzaSyDRbmB1j6idm_H4RzUxi3F3JsbA-wgJjdw',
  
  // URL API (nếu cần)
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
}

// Hướng dẫn: 
// 1. Lấy API key từ https://makersuite.google.com/app/apikey
// 2. Thay thế 'your_gemini_api_key_here' bằng API key thực
// 3. Hoặc tạo file .env với VITE_GEMINI_API_KEY=your_key
