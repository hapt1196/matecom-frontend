// File debug để kiểm tra format chat history
import { convertChatHistory } from './gemini.js'

// Test format chat history
export const debugChatHistory = () => {
  console.log('🔍 Debug Chat History Format')
  
  const mockMessages = [
    { text: 'Xin chào', isUser: true, timestamp: new Date() },
    { text: 'Chào bạn!', isUser: false, timestamp: new Date() },
    { text: 'Bạn khỏe không?', isUser: true, timestamp: new Date() },
    { text: 'Tôi khỏe, cảm ơn bạn!', isUser: false, timestamp: new Date() }
  ]
  
  console.log('📝 Mock Messages:', mockMessages)
  
  const converted = convertChatHistory(mockMessages)
  console.log('🔄 Converted History:', converted)
  
  // Kiểm tra format
  converted.forEach((item, index) => {
    console.log(`Item ${index}:`, {
      role: item.role,
      parts: item.parts,
      hasText: item.parts && item.parts[0] && item.parts[0].text
    })
  })
  
  return converted
}

// Test với messages thực tế
export const debugRealMessages = (messages) => {
  console.log('🔍 Debug Real Messages:', messages)
  
  const converted = convertChatHistory(messages)
  console.log('🔄 Converted Real History:', converted)
  
  return converted
}
