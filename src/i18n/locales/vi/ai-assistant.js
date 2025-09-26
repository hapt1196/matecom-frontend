export default {
  hero: {
    title: 'Trợ lý AI MATECOM',
    subtitle: 'Hỏi đáp thông minh, hỗ trợ 24/7 với công nghệ Google Gemini AI tiên tiến'
  },
  chat: {
    header: {
      title: 'MATECOM AI',
      status: {
        online: 'Đang hoạt động',
        offline: 'Đang khởi động...',
        notConfigured: 'API chưa được cấu hình'
      }
    },
    input: {
      placeholder: 'Nhập câu hỏi của bạn...',
      sendButton: 'Gửi tin nhắn'
    },
    buttons: {
      clearChat: 'Xóa lịch sử chat',
      testAPI: 'Test API'
    },
    messages: {
      welcome: 'Xin chào! Tôi là trợ lý AI của MATECOM. Tôi có thể giúp bạn tìm hiểu về các gói dịch vụ và tư vấn gói phù hợp với quy mô doanh nghiệp của bạn. Bạn cần hỗ trợ gì?',
      testing: '🧪 Đang kiểm tra kết nối Gemini API...',
      testSuccess: '✅ API kết nối thành công! Phản hồi:',
      testError: '❌ API kết nối thất bại:',
      apiNotConfigured: '⚠️ Vui lòng cấu hình API key Gemini trong file config/api.js hoặc tạo file .env với VITE_GEMINI_API_KEY=your_key',
      error: '❌ Lỗi:'
    }
  },
  features: {
    fastResponse: {
      title: 'Phản hồi nhanh chóng',
      description: 'Nhận câu trả lời tức thì với công nghệ Google Gemini AI'
    },
    intelligent: {
      title: 'Thông minh vượt trội',
      description: 'Gemini AI hiểu và xử lý câu hỏi phức tạp một cách thông minh'
    },
    available247: {
      title: '24/7',
      description: 'Hỗ trợ mọi lúc, mọi nơi với AI mạnh mẽ'
    }
  }
}
