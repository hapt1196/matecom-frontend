# Hướng dẫn Config Google Analytics 4 - Lấy Dữ Liệu Thật

## 📋 Tổng quan

Bạn sẽ config GA4 để Dashboard hiển thị dữ liệu thật thay vì mock data. Quá trình gồm 3 bước chính:

1. ✅ Tạo API Key từ Google Cloud
2. ✅ Lấy Property ID từ Google Analytics  
3. ✅ Config Frontend (.env file)

**Thời gian ước tính**: 10-15 phút

---

## Bước 1: Tạo Google Cloud Project & API Key

### 1.1. Tạo/Chọn Project

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Đăng nhập bằng tài khoản Google có quyền truy cập GA4
3. Click vào dropdown project ở top bar
4. Chọn project hiện có HOẶC click **"New Project"**
   - Nếu tạo mới: Đặt tên project (vd: "MateCom Analytics")
   - Click **Create**

### 1.2. Enable Google Analytics Data API

1. Vào **APIs & Services** → **Library** (menu bên trái)
2. Tìm kiếm: **"Google Analytics Data API"**
3. Click vào **Google Analytics Data API**
4. Click nút **ENABLE** (màu xanh)
5. Đợi vài giây cho API được enable

### 1.3. Tạo API Key

1. Vào **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** (ở top)
3. Chọn **API key**
4. API key sẽ được tạo → Copy và lưu lại (dạng: `AIzaSy...`)

### 1.4. Restrict API Key (Bảo mật)

1. Click **Edit API key** (icon bút chì bên cạnh API key vừa tạo)
2. Trong mục **API restrictions**:
   - Chọn **Restrict key**
   - Tìm và tick chọn: **Google Analytics Data API**
3. Click **SAVE**

✅ **Xong bước 1!** Bạn đã có API Key.

---

## Bước 2: Lấy GA4 Property ID

### 2.1. Vào Google Analytics

1. Vào [Google Analytics](https://analytics.google.com/)
2. Đăng nhập (cùng tài khoản với Google Cloud)
3. Chọn **Property** của website MateCom

### 2.2. Lấy Property ID

1. Click vào icon **⚙️ Admin** (góc dưới bên trái)
2. Trong cột **Property**, click **Property Settings**
3. Tìm **Property ID** (dạng số: `123456789`)
4. Copy Property ID này

✅ **Xong bước 2!** Bạn đã có Property ID.

---

## Bước 3: Config Frontend

### 3.1. Tạo file .env

Trong thư mục project `/Users/admin/Desktop/MateCom/matecom-frontend/`, tạo file `.env`:

```bash
# Google Analytics 4 Configuration
VITE_GA4_PROPERTY_ID=123456789
VITE_GA4_API_KEY=AIzaSy...your-api-key-here

# Google Gemini AI Configuration (giữ nguyên)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Thay thế:**
- `123456789` → Property ID của bạn (bước 2)
- `AIzaSy...your-api-key-here` → API Key của bạn (bước 1)

### 3.2. Restart Dev Server

```bash
# Stop server hiện tại (Ctrl+C)
# Restart
npm run dev
```

### 3.3. Test Dashboard

1. Mở browser: `http://localhost:5173/business`
2. Login vào business portal
3. Vào tab **Dashboard**
4. Mở **Console** (F12) để xem logs

**Kết quả mong đợi:**
- Console log: `🔄 Fetching data from GA4 API...`
- Console log: `✅ Successfully fetched GA4 data`
- Dashboard hiển thị dữ liệu thật từ GA4
- Chart hiển thị trend 30 ngày gần nhất
- Stats cards hiển thị số liệu thực tế

---

## ❌ Troubleshooting

### Lỗi: "API key not valid"

**Nguyên nhân**: API key chưa được restrict đúng hoặc chưa enable API

**Giải pháp**:
1. Vào Google Cloud Console → Credentials
2. Edit API key
3. Đảm bảo **Google Analytics Data API** được chọn trong API restrictions
4. Đợi 1-2 phút rồi thử lại

### Lỗi: "User does not have sufficient permissions"

**Nguyên nhân**: Tài khoản Google Cloud khác với tài khoản GA4

**Giải pháp**:
1. Đảm bảo dùng cùng 1 tài khoản Google cho cả Cloud Console và GA4
2. Hoặc thêm service account vào GA4:
   - GA4 → Admin → Property Access Management
   - Add user với role **Viewer**

### Lỗi: "Property not found"

**Nguyên nhân**: Property ID sai

**Giải pháp**:
1. Kiểm tra lại Property ID trong GA4
2. Đảm bảo không có khoảng trắng trong `.env`
3. Format đúng: `VITE_GA4_PROPERTY_ID=123456789` (chỉ số, không có `properties/`)

### Dashboard vẫn hiển thị mock data

**Nguyên nhân**: `.env` chưa được load

**Giải pháp**:
1. Kiểm tra file `.env` ở đúng thư mục root project
2. Restart dev server (Ctrl+C rồi `npm run dev`)
3. Hard refresh browser (Ctrl+Shift+R)

---

## 📊 Dữ liệu được hiển thị

Dashboard sẽ hiển thị:

### Stats Cards
- **Total Users**: Tổng active users (30 ngày)
- **Sessions**: Tổng sessions (30 ngày)
- **Page Views**: Tổng page views (30 ngày)
- **Engagement Rate**: Tỷ lệ engagement trung bình

### Chart
- **Line chart**: Sessions và Users theo từng ngày (30 ngày gần nhất)
- **X-axis**: Ngày (DD/MM)
- **Y-axis**: Số lượng

### Quick Stats
- Avg. Session Duration: 3m 24s (hardcoded - cần thêm metric nếu muốn real)
- Pages per Session: 2.4 (hardcoded)
- New Users: 42% của total users
- Bounce Rate: 100 - engagement rate

---

## 🎯 Next Steps (Tùy chọn)

### Thêm metrics khác

Nếu muốn thêm metrics như Session Duration, Bounce Rate thật, edit file `analytics.js`:

```javascript
metrics: [
  { name: 'activeUsers' },
  { name: 'sessions' },
  { name: 'screenPageViews' },
  { name: 'engagementRate' },
  { name: 'averageSessionDuration' },  // Thêm dòng này
  { name: 'bounceRate' }                // Thêm dòng này
]
```

### Thay đổi date range

Hiện tại mặc định là 30 ngày. Để thay đổi, edit `DashboardTab.vue`:

```javascript
// Trong onMounted
loadAnalyticsData('last7Days')   // 7 ngày
loadAnalyticsData('last90Days')  // 90 ngày
```

---

## ✅ Checklist Hoàn thành

- [ ] Tạo Google Cloud Project
- [ ] Enable Google Analytics Data API
- [ ] Tạo API Key
- [ ] Restrict API Key
- [ ] Lấy GA4 Property ID
- [ ] Tạo file `.env` với credentials
- [ ] Restart dev server
- [ ] Test dashboard hiển thị dữ liệu thật
- [ ] Verify console logs không có errors

---

**Hoàn thành!** 🎉 Dashboard của bạn giờ đã hiển thị dữ liệu thật từ Google Analytics 4.
