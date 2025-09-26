export default {
  hero: {
    title: 'MATECOM AI Assistant',
    subtitle: 'Smart Q&A, 24/7 support with advanced Google Gemini AI technology'
  },
  chat: {
    header: {
      title: 'MATECOM AI',
      status: {
        online: 'Online',
        offline: 'Starting up...',
        notConfigured: 'API not configured'
      }
    },
    input: {
      placeholder: 'Enter your question...',
      sendButton: 'Send message'
    },
    buttons: {
      clearChat: 'Clear chat history',
      testAPI: 'Test API'
    },
    messages: {
      welcome: 'Hello! I am MATECOM\'s AI assistant. I can help you learn about our service packages and recommend the right package for your business size. How can I assist you?',
      testing: '🧪 Testing Gemini API connection...',
      testSuccess: '✅ API connection successful! Response:',
      testError: '❌ API connection failed:',
      apiNotConfigured: '⚠️ Please configure Gemini API key in config/api.js file or create .env file with VITE_GEMINI_API_KEY=your_key',
      error: '❌ Error:'
    }
  },
  features: {
    fastResponse: {
      title: 'Fast Response',
      description: 'Get instant answers with Google Gemini AI technology'
    },
    intelligent: {
      title: 'Superior Intelligence',
      description: 'Gemini AI understands and processes complex questions intelligently'
    },
    available247: {
      title: '24/7',
      description: 'Support anytime, anywhere with powerful AI'
    }
  }
}
