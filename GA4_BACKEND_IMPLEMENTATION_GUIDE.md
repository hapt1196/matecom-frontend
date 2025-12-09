# Hướng dẫn Implement GA4 Data API trong Backend

## 📋 Tổng quan

Hướng dẫn này sẽ giúp bạn tạo API endpoint trong backend để lấy dữ liệu thật từ Google Analytics 4.

**Thời gian ước tính**: 30-45 phút

**Yêu cầu**:
- Backend đã có (MateCom.Backend)
- Tài khoản Google Cloud
- Quyền Admin trên GA4 property

---

## Bước 1: Setup Google Cloud Service Account

### 1.1. Tạo Service Account

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project (hoặc tạo mới)
3. Vào **IAM & Admin** → **Service Accounts**
4. Click **+ CREATE SERVICE ACCOUNT**
5. Điền thông tin:
   - **Name**: `ga4-data-reader`
   - **Description**: `Service account for reading GA4 data`
6. Click **CREATE AND CONTINUE**
7. **Grant access**: Không cần role, click **CONTINUE**
8. Click **DONE**

### 1.2. Tạo JSON Key

1. Click vào service account vừa tạo
2. Tab **KEYS** → **ADD KEY** → **Create new key**
3. Chọn **JSON**
4. Click **CREATE**
5. File JSON sẽ được download → **Lưu file này an toàn**

### 1.3. Enable GA4 Data API

1. Vào **APIs & Services** → **Library**
2. Tìm "**Google Analytics Data API**"
3. Click **ENABLE**

### 1.4. Cấp quyền cho Service Account trong GA4

1. Vào [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (⚙️)
3. Trong cột **Property**, click **Property Access Management**
4. Click **+** (Add users)
5. Nhập **email của service account** (dạng: `ga4-data-reader@project-id.iam.gserviceaccount.com`)
6. Role: Chọn **Viewer**
7. Click **Add**

✅ **Xong bước 1!** Service Account đã có quyền đọc GA4.

---

## Bước 2: Lấy Property ID

1. Vào [Google Analytics](https://analytics.google.com/)
2. Nhìn vào URL: `https://analytics.google.com/analytics/web/#/pXXXXXXXXX/...`
3. Số sau `/p` là **Property ID** (ví dụ: `228467592`)
4. Lưu lại Property ID này

---

## Bước 3: Implement Backend API

### 3.1. Cài đặt Google Analytics Data Client

**Nếu backend là Node.js:**

```bash
cd /Users/admin/Desktop/MateCom/MateCom.Backend
npm install @google-analytics/data
```

**Nếu backend là .NET/C#:**

```bash
dotnet add package Google.Analytics.Data.V1Beta
```

**Nếu backend là Python:**

```bash
pip install google-analytics-data
```

### 3.2. Tạo API Endpoint

#### **Node.js/Express Example:**

Tạo file `routes/analytics.js`:

```javascript
const express = require('express');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const router = express.Router();

// Initialize GA4 client với service account JSON
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: './path/to/service-account-key.json'
});

const PROPERTY_ID = '228467592'; // Thay bằng Property ID của bạn

router.get('/analytics', async (req, res) => {
  try {
    const dateRange = req.query.range || 'last30Days';
    
    // Tính date ranges
    const { startDate, endDate, previousStartDate, previousEndDate } = 
      calculateDateRanges(dateRange);
    
    // Fetch current period data
    const [currentResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: endDate,
        },
      ],
      dimensions: [
        { name: 'date' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'engagementRate' },
      ],
      orderBys: [
        {
          dimension: {
            dimensionName: 'date'
          }
        }
      ]
    });
    
    // Fetch previous period data
    const [previousResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: previousStartDate,
          endDate: previousEndDate,
        },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'engagementRate' },
      ],
    });
    
    // Transform data
    const transformedData = transformGA4Data(currentResponse, previousResponse);
    
    res.json(transformedData);
    
  } catch (error) {
    console.error('Error fetching GA4 data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch analytics data',
      message: error.message 
    });
  }
});

// Helper functions
function calculateDateRanges(range) {
  const today = new Date();
  const endDate = formatDate(today);
  
  let daysAgo = 30;
  if (range === 'last7Days') daysAgo = 7;
  if (range === 'last90Days') daysAgo = 90;
  
  const startDateObj = new Date(today);
  startDateObj.setDate(startDateObj.getDate() - daysAgo);
  const startDate = formatDate(startDateObj);
  
  const previousEndDateObj = new Date(startDateObj);
  previousEndDateObj.setDate(previousEndDateObj.getDate() - 1);
  const previousEndDate = formatDate(previousEndDateObj);
  
  const previousStartDateObj = new Date(previousEndDateObj);
  previousStartDateObj.setDate(previousStartDateObj.getDate() - daysAgo);
  const previousStartDate = formatDate(previousStartDateObj);
  
  return { startDate, endDate, previousStartDate, previousEndDate };
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function transformGA4Data(currentResponse, previousResponse) {
  // Extract totals
  const currentTotals = extractTotals(currentResponse);
  const previousTotals = extractTotals(previousResponse);
  
  // Extract chart data
  const chartData = extractChartData(currentResponse);
  
  return {
    stats: {
      totalUsers: currentTotals.users,
      totalSessions: currentTotals.sessions,
      pageViews: currentTotals.pageViews,
      engagementRate: currentTotals.engagementRate,
      previousPeriod: {
        totalUsers: previousTotals.users,
        totalSessions: previousTotals.sessions,
        pageViews: previousTotals.pageViews,
        engagementRate: previousTotals.engagementRate
      }
    },
    chartData: chartData
  };
}

function extractTotals(response) {
  if (!response.rows || response.rows.length === 0) {
    return { users: 0, sessions: 0, pageViews: 0, engagementRate: 0 };
  }
  
  let totalUsers = 0;
  let totalSessions = 0;
  let totalPageViews = 0;
  let totalEngagement = 0;
  
  response.rows.forEach(row => {
    totalUsers += parseInt(row.metricValues[0].value) || 0;
    totalSessions += parseInt(row.metricValues[1].value) || 0;
    totalPageViews += parseInt(row.metricValues[2].value) || 0;
    totalEngagement += parseFloat(row.metricValues[3].value) || 0;
  });
  
  const avgEngagement = response.rows.length > 0 
    ? (totalEngagement / response.rows.length * 100) 
    : 0;
  
  return {
    users: totalUsers,
    sessions: totalSessions,
    pageViews: totalPageViews,
    engagementRate: parseFloat(avgEngagement.toFixed(1))
  };
}

function extractChartData(response) {
  if (!response.rows || response.rows.length === 0) {
    return { labels: [], sessions: [], users: [], pageViews: [] };
  }
  
  const labels = [];
  const sessions = [];
  const users = [];
  const pageViews = [];
  
  response.rows.forEach(row => {
    // date format: YYYYMMDD -> DD/MM
    const dateStr = row.dimensionValues[0].value;
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    labels.push(`${day}/${month}`);
    
    users.push(parseInt(row.metricValues[0].value) || 0);
    sessions.push(parseInt(row.metricValues[1].value) || 0);
    pageViews.push(parseInt(row.metricValues[2].value) || 0);
  });
  
  return { labels, sessions, users, pageViews };
}

module.exports = router;
```

#### **C#/.NET Example:**

Tạo file `Controllers/AnalyticsController.cs`:

```csharp
using Google.Analytics.Data.V1Beta;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private const string PropertyId = "228467592"; // Thay bằng Property ID
    private readonly BetaAnalyticsDataClient _analyticsClient;

    public AnalyticsController()
    {
        // Initialize với service account JSON
        var credential = GoogleCredential.FromFile("path/to/service-account-key.json");
        _analyticsClient = new BetaAnalyticsDataClientBuilder
        {
            Credential = credential
        }.Build();
    }

    [HttpGet]
    public async Task<IActionResult> GetAnalytics([FromQuery] string range = "last30Days")
    {
        try
        {
            var (startDate, endDate, prevStartDate, prevEndDate) = CalculateDateRanges(range);

            // Fetch current period
            var currentRequest = new RunReportRequest
            {
                Property = $"properties/{PropertyId}",
                DateRanges = { new DateRange { StartDate = startDate, EndDate = endDate } },
                Dimensions = { new Dimension { Name = "date" } },
                Metrics = {
                    new Metric { Name = "activeUsers" },
                    new Metric { Name = "sessions" },
                    new Metric { Name = "screenPageViews" },
                    new Metric { Name = "engagementRate" }
                }
            };

            var currentResponse = await _analyticsClient.RunReportAsync(currentRequest);
            
            // Transform và return data
            var result = TransformData(currentResponse);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    // Helper methods tương tự như Node.js example
}
```

### 3.3. Register Route

**Node.js/Express:**

Trong `app.js` hoặc `server.js`:

```javascript
const analyticsRouter = require('./routes/analytics');
app.use('/api', analyticsRouter);
```

**C#/.NET:**

Controller tự động được register.

---

## Bước 4: Cấu hình Frontend

### 4.1. Update `.env`

```bash
# Uncomment và update endpoint
VITE_GA4_API_ENDPOINT=http://localhost:3000/api/analytics

# Xóa hoặc comment API Key (không cần nữa)
# VITE_GA4_API_KEY=...
# VITE_GA4_PROPERTY_ID=...
```

### 4.2. Update `analytics.js`

Sửa hàm `fetchAnalyticsData`:

```javascript
export async function fetchAnalyticsData(dateRange = 'last30Days') {
  const apiEndpoint = import.meta.env.VITE_GA4_API_ENDPOINT
  
  // Nếu không có backend endpoint, dùng mock data
  if (!apiEndpoint) {
    console.log('📊 Using mock analytics data (Backend not configured)')
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ANALYTICS_DATA), 500)
    })
  }
  
  try {
    console.log('🔄 Fetching data from backend API...')
    
    const response = await fetch(`${apiEndpoint}?range=${dateRange}`)
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('✅ Successfully fetched GA4 data from backend')
    return data
    
  } catch (error) {
    console.error('❌ Error fetching from backend:', error)
    console.log('📊 Falling back to mock data')
    return MOCK_ANALYTICS_DATA
  }
}
```

---

## Bước 5: Test & Deploy

### 5.1. Test Local

1. **Start backend**:
```bash
cd /Users/admin/Desktop/MateCom/MateCom.Backend
npm start  # hoặc dotnet run
```

2. **Start frontend**:
```bash
cd /Users/admin/Desktop/MateCom/matecom-frontend
npm run dev
```

3. **Test Dashboard**:
- Vào `http://localhost:5173/business`
- Login và vào Dashboard
- Mở Console (F12)
- Verify logs: `✅ Successfully fetched GA4 data from backend`

### 5.2. Verify Data

Check Console logs:
- ✅ No errors
- ✅ Stats cards hiển thị số liệu thật
- ✅ Chart hiển thị dữ liệu 30 ngày

### 5.3. Deploy

**Backend:**
- Upload service account JSON lên server (an toàn)
- Set environment variable cho JSON path
- Deploy backend

**Frontend:**
- Update `VITE_GA4_API_ENDPOINT` với production URL
- Build và deploy

---

## 🔒 Security Best Practices

### 1. Bảo vệ Service Account JSON

**KHÔNG commit JSON file vào Git!**

```bash
# Add to .gitignore
service-account-key.json
*.json
```

**Dùng environment variables:**

```javascript
// Node.js
const keyFilename = process.env.GA4_SERVICE_ACCOUNT_PATH || './service-account-key.json';

// .NET
var keyPath = Environment.GetEnvironmentVariable("GA4_SERVICE_ACCOUNT_PATH");
```

### 2. CORS Configuration

Backend cần enable CORS cho frontend:

```javascript
// Node.js/Express
const cors = require('cors');
app.use(cors({
  origin: 'https://matecom.vn'  // Production domain
}));
```

### 3. Rate Limiting

Thêm rate limiting để tránh abuse:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/analytics', limiter);
```

---

## ❌ Troubleshooting

### Lỗi: "Permission denied"

**Nguyên nhân**: Service account chưa có quyền trong GA4

**Giải pháp**:
1. Vào GA4 → Admin → Property Access Management
2. Verify service account email đã được add với role Viewer

### Lỗi: "Property not found"

**Nguyên nhân**: Property ID sai

**Giải pháp**:
1. Kiểm tra Property ID trong GA4 URL
2. Verify format: chỉ số, không có `properties/` prefix

### Lỗi: "CORS blocked"

**Nguyên nhân**: Backend chưa enable CORS

**Giải pháp**:
1. Install cors package: `npm install cors`
2. Enable CORS trong backend

---

## 📊 Metrics Available

GA4 Data API hỗ trợ nhiều metrics:

**User Metrics:**
- `activeUsers` - Active users
- `newUsers` - New users
- `totalUsers` - Total users

**Session Metrics:**
- `sessions` - Total sessions
- `averageSessionDuration` - Avg session duration
- `bounceRate` - Bounce rate
- `engagementRate` - Engagement rate

**Page Metrics:**
- `screenPageViews` - Page views
- `screenPageViewsPerSession` - Pages per session

**Event Metrics:**
- `eventCount` - Total events
- `conversions` - Conversions

Xem full list: https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema

---

## ✅ Checklist Hoàn thành

- [ ] Tạo Service Account trong Google Cloud
- [ ] Download JSON key file
- [ ] Enable GA4 Data API
- [ ] Cấp quyền Viewer cho service account trong GA4
- [ ] Lấy Property ID
- [ ] Cài đặt GA4 client library trong backend
- [ ] Tạo API endpoint `/api/analytics`
- [ ] Test endpoint với Postman/curl
- [ ] Update frontend `.env` với backend URL
- [ ] Update `analytics.js` để gọi backend
- [ ] Test Dashboard hiển thị dữ liệu thật
- [ ] Add security (CORS, rate limiting)
- [ ] Deploy backend và frontend

---

## 🎯 Kết luận

Sau khi hoàn thành, Dashboard sẽ:
- ✅ Hiển thị dữ liệu thật từ GA4
- ✅ Tự động cập nhật mỗi khi reload
- ✅ Bảo mật với Service Account
- ✅ Scalable và production-ready

**Thời gian implement**: 30-45 phút (nếu đã quen)

Nếu gặp khó khăn, hãy dùng mock data trước, sau này có thể implement backend sau!
