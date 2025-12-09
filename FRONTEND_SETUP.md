# Frontend Environment Setup Guide

## 🔧 Cấu hình API URL

### 1. Tạo file `.env` từ template

```bash
cd matecom-frontend
cp .env.example .env
```

### 2. Cấu hình cho Development (Local)

Mở file `.env` và set:

```bash
# API Configuration - Local Development
VITE_API_BASE_URL=http://localhost:5000

# Google Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Cấu hình cho Production

Tạo file `.env.production`:

```bash
# API Configuration - Production
VITE_API_BASE_URL=https://api.MATECOM.org

# Google Gemini AI Configuration
VITE_GEMINI_API_KEY=your_production_gemini_api_key
```

---

## 📝 Cách hoạt động

Service sẽ tự động sử dụng đúng URL:

```javascript
// applicationService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api/jobapplication`
  : 'https://api.MATECOM.org/api/jobapplication';
```

**Logic**:
- Nếu có `VITE_API_BASE_URL` → dùng URL đó + `/api/jobapplication`
- Nếu không có → fallback về production URL

---

## 🚀 Chạy Frontend

### Development Mode
```bash
npm run dev
# API sẽ gọi đến: http://localhost:5000/api/jobapplication
```

### Production Build
```bash
npm run build
# API sẽ gọi đến: https://api.MATECOM.org/api/jobapplication
```

---

## ✅ Test API Connection

### 1. Start Backend (Local)
```bash
cd MateCom.Backend/MateCom.Backend
dotnet run
# Backend chạy tại: http://localhost:5000
```

### 2. Start Frontend
```bash
cd matecom-frontend
npm run dev
# Frontend chạy tại: http://localhost:5173
```

### 3. Test Form Submit
1. Mở browser: `http://localhost:5173`
2. Navigate to recruitment page
3. Click "Ứng tuyển ngay"
4. Fill form và upload CV
5. Submit

**Expected**:
- Request gửi đến: `http://localhost:5000/api/jobapplication`
- Response: 201 Created với job application data

---

## 🔍 Debug

### Check API URL đang dùng
Mở browser console:
```javascript
console.log(import.meta.env.VITE_API_BASE_URL)
// Development: "http://localhost:5000"
// Production: undefined (fallback to https://api.MATECOM.org)
```

### Network Tab
- Mở DevTools → Network
- Submit form
- Check request URL và response

---

## 📦 Environment Variables Summary

| Variable | Development | Production |
|----------|-------------|------------|
| `VITE_API_BASE_URL` | `http://localhost:5000` | `https://api.MATECOM.org` |
| `VITE_GEMINI_API_KEY` | Your dev key | Your prod key |

---

## ⚠️ Important Notes

1. **File `.env` không commit lên Git** (đã có trong `.gitignore`)
2. **Mỗi dev tự tạo `.env` local** từ `.env.example`
3. **Production env** set trên server hoặc CI/CD
4. **Restart dev server** sau khi thay đổi `.env`
