# Hướng dẫn tích hợp Google Gemini API

## Bước 1: Lấy API Key
1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Đăng nhập bằng tài khoản Google
3. Tạo API key mới
4. Sao chép API key

## Bước 2: Cấu hình API Key

### ⚠️ QUAN TRỌNG: Sửa lỗi import.meta.env không hoạt động

**Vấn đề:** `import.meta.env.VITE_GEMINI_API_KEY` có thể không hoạt động trong một số trường hợp.

**Giải pháp:** Sử dụng file config trực tiếp (đã được cấu hình sẵn)

### Cách 1: Cập nhật file config (Đã hoạt động)
File `src/config/api.js` đã được cấu hình sẵn:
```javascript
export const API_CONFIG = {
  GEMINI_API_KEY: 'AIzaSyDRbmB1j6idm_H4RzUxi3F3JsbA-wgJjdw',
  // ...
}
```

### Cách 2: Sử dụng file .env (Nếu muốn)
Tạo file `.env` trong thư mục gốc của dự án:
```bash
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Lưu ý:** File config sẽ được ưu tiên hơn environment variable.

## Bước 3: Kiểm tra cài đặt
1. Khởi động lại development server
2. Truy cập trang AI Assistant
3. Kiểm tra trạng thái "Đang hoạt động"
4. Mở Console để xem log cấu hình

## ⚠️ QUAN TRỌNG: Model Name

**Model mới:** `gemini-2.0-flash` (thay vì `gemini-pro` cũ)

**Lý do:** Google đã cập nhật API và model cũ không còn được hỗ trợ.

**Cấu hình hiện tại:**
```javascript
// Trong src/config/gemini.js
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
```

## Xử lý lỗi thường gặp

### ❌ "API chưa được cấu hình"
**Nguyên nhân:** API key chưa được cấu hình đúng
**Giải pháp:** 
- Kiểm tra file `src/config/api.js`
- Đảm bảo API key không phải là `'your_gemini_api_key_here'`

### ❌ "Model không tồn tại hoặc không được hỗ trợ"
**Nguyên nhân:** Sử dụng model cũ `gemini-pro`
**Giải pháp:** 
- Đã được sửa thành `gemini-2.0-flash`
- Khởi động lại dev server

### ❌ "import.meta.env không hoạt động"
**Nguyên nhân:** Vite environment variables không được load
**Giải pháp:** 
- Sử dụng file config trực tiếp (đã được cấu hình)
- Hoặc khởi động lại dev server

### ❌ "Đã hết quota"
**Nguyên nhân:** API key đã hết quota
**Giải pháp:** 
- Đợi reset quota (thường là hàng tháng)
- Hoặc nâng cấp tài khoản Google AI

## Kiểm tra cấu hình
Mở Console (F12) và xem log:
```javascript
// Import file test để kiểm tra
import './config/test-config.js'
```

## Test API
Sử dụng file `test-api.html` để test API trực tiếp:
1. Mở file trong browser
2. Click nút "Test API"
3. Kiểm tra kết quả

## Tính năng
- Chat thông minh với Google Gemini 2.0 Flash
- Lưu trữ lịch sử hội thoại
- Xử lý lỗi thân thiện
- Giao diện responsive
- Hỗ trợ dark theme

## Lưu ý bảo mật
- API key đã được cấu hình trong code (chỉ dùng cho development)
- Cho production, sử dụng environment variables
- Không commit API key thật vào git




Sửa giao diện, chuẩn hoá nội dung trang chủ theo các yêu cầu sau:
- màu background là màu rgb(238 245 254`)
- màu chữ là màu #03045e
- phần servicesection sửa lại màu nền của các gói dịch vụ: basic = #90e0ef, advanced = #00b4d8 , premium #0077b6  
- Hiệu ứng khi hover vào ô dịch vụ: ô dịch vụ được hover vào sẽ phóng to lên 
- font chữ dùng chung  "Inter"


"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif