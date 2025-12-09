// Google Analytics 4 Configuration
// Để sử dụng GA4 Data API, bạn cần:
// 1. GA4 Property ID
// 2. Service Account credentials (JSON file)
// 3. Cấp quyền "Viewer" cho service account trong GA4

export const GA_CONFIG = {
  // GA4 Property ID (format: properties/123456789)
  propertyId: import.meta.env.VITE_GA4_PROPERTY_ID || '',
  
  // API endpoint (nếu dùng backend proxy)
  apiEndpoint: import.meta.env.VITE_GA4_API_ENDPOINT || '/api/analytics',
  
  // Fallback to mock data nếu không có config
  useMockData: !import.meta.env.VITE_GA4_PROPERTY_ID
}

// Mock data cho development/testing
export const MOCK_ANALYTICS_DATA = {
  stats: {
    totalUsers: 12847,
    totalSessions: 18923,
    pageViews: 45678,
    engagementRate: 68.5,
    previousPeriod: {
      totalUsers: 11456,
      totalSessions: 17234,
      pageViews: 42134,
      engagementRate: 65.2
    }
  },
  
  // Dữ liệu cho biểu đồ (30 ngày gần nhất)
  chartData: {
    labels: generateLast30Days(),
    sessions: [
      420, 445, 380, 510, 490, 520, 480, 460, 500, 530,
      510, 490, 520, 540, 560, 580, 520, 500, 530, 550,
      570, 590, 610, 580, 600, 620, 640, 630, 650, 670
    ],
    users: [
      320, 335, 290, 410, 390, 420, 380, 360, 400, 430,
      410, 390, 420, 440, 460, 480, 420, 400, 430, 450,
      470, 490, 510, 480, 500, 520, 540, 530, 550, 570
    ],
    pageViews: [
      1250, 1320, 1180, 1580, 1520, 1620, 1480, 1420, 1550, 1650,
      1580, 1520, 1620, 1680, 1740, 1800, 1620, 1550, 1650, 1710,
      1770, 1830, 1890, 1800, 1860, 1920, 1980, 1950, 2010, 2070
    ]
  }
}

// Helper function để generate labels cho 30 ngày gần nhất
function generateLast30Days() {
  const labels = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Format: "DD/MM"
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    labels.push(`${day}/${month}`)
  }
  
  return labels
}

// Hàm fetch dữ liệu từ GA4 API
export async function fetchAnalyticsData(dateRange = 'last30Days') {
  const apiKey = import.meta.env.VITE_GA4_API_KEY
  const propertyId = import.meta.env.VITE_GA4_PROPERTY_ID
  
  // Nếu không có config, dùng mock data
  if (!apiKey || !propertyId) {
    console.log('📊 Using mock analytics data (GA4 not configured)')
    console.log('💡 To use real data, set VITE_GA4_API_KEY and VITE_GA4_PROPERTY_ID in .env')
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ANALYTICS_DATA), 500)
    })
  }
  
  try {
    console.log('🔄 Fetching data from GA4 API...')
    
    // Tính date range
    const { startDate, endDate, previousStartDate, previousEndDate } = getDateRanges(dateRange)
    
    // Gọi GA4 Data API để lấy current period data
    const currentData = await fetchGA4Report(propertyId, apiKey, startDate, endDate)
    
    // Gọi GA4 Data API để lấy previous period data (để tính % change)
    const previousData = await fetchGA4Report(propertyId, apiKey, previousStartDate, previousEndDate)
    
    // Transform data
    const transformedData = transformGA4Data(currentData, previousData)
    
    console.log('✅ Successfully fetched GA4 data')
    return transformedData
    
  } catch (error) {
    console.error('❌ Error fetching GA4 data:', error)
    console.log('📊 Falling back to mock data')
    return MOCK_ANALYTICS_DATA
  }
}

// Helper: Tính date ranges
function getDateRanges(range) {
  const today = new Date()
  const endDate = formatDate(today)
  
  let daysAgo = 30
  if (range === 'last7Days') daysAgo = 7
  if (range === 'last90Days') daysAgo = 90
  
  const startDateObj = new Date(today)
  startDateObj.setDate(startDateObj.getDate() - daysAgo)
  const startDate = formatDate(startDateObj)
  
  // Previous period (same length)
  const previousEndDateObj = new Date(startDateObj)
  previousEndDateObj.setDate(previousEndDateObj.getDate() - 1)
  const previousEndDate = formatDate(previousEndDateObj)
  
  const previousStartDateObj = new Date(previousEndDateObj)
  previousStartDateObj.setDate(previousStartDateObj.getDate() - daysAgo)
  const previousStartDate = formatDate(previousStartDateObj)
  
  return { startDate, endDate, previousStartDate, previousEndDate }
}

// Helper: Format date to YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Fetch GA4 Report
async function fetchGA4Report(propertyId, apiKey, startDate, endDate) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport?key=${apiKey}`
  
  const requestBody = {
    dateRanges: [
      {
        startDate: startDate,
        endDate: endDate
      }
    ],
    dimensions: [
      { name: 'date' }
    ],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'engagementRate' }
    ],
    orderBys: [
      {
        dimension: {
          dimensionName: 'date'
        }
      }
    ]
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GA4 API error (${response.status}): ${errorText}`)
  }
  
  return await response.json()
}

// Transform GA4 response to our format
function transformGA4Data(currentResponse, previousResponse) {
  // Extract totals from current period
  const currentTotals = extractTotals(currentResponse)
  const previousTotals = extractTotals(previousResponse)
  
  // Extract daily data for chart
  const chartData = extractChartData(currentResponse)
  
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
  }
}

// Extract totals from GA4 response
function extractTotals(response) {
  if (!response.rows || response.rows.length === 0) {
    return { users: 0, sessions: 0, pageViews: 0, engagementRate: 0 }
  }
  
  let totalUsers = 0
  let totalSessions = 0
  let totalPageViews = 0
  let totalEngagement = 0
  
  response.rows.forEach(row => {
    totalUsers += parseInt(row.metricValues[0].value) || 0
    totalSessions += parseInt(row.metricValues[1].value) || 0
    totalPageViews += parseInt(row.metricValues[2].value) || 0
    totalEngagement += parseFloat(row.metricValues[3].value) || 0
  })
  
  const avgEngagement = response.rows.length > 0 
    ? (totalEngagement / response.rows.length * 100) 
    : 0
  
  return {
    users: totalUsers,
    sessions: totalSessions,
    pageViews: totalPageViews,
    engagementRate: parseFloat(avgEngagement.toFixed(1))
  }
}

// Extract chart data from GA4 response
function extractChartData(response) {
  if (!response.rows || response.rows.length === 0) {
    return MOCK_ANALYTICS_DATA.chartData
  }
  
  const labels = []
  const sessions = []
  const users = []
  const pageViews = []
  
  response.rows.forEach(row => {
    // date format: YYYYMMDD -> DD/MM
    const dateStr = row.dimensionValues[0].value
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    labels.push(`${day}/${month}`)
    
    users.push(parseInt(row.metricValues[0].value) || 0)
    sessions.push(parseInt(row.metricValues[1].value) || 0)
    pageViews.push(parseInt(row.metricValues[2].value) || 0)
  })
  
  return { labels, sessions, users, pageViews }
}

// Hàm tính % thay đổi so với kỳ trước
export function calculateChange(current, previous) {
  if (!previous || previous === 0) return 0
  return ((current - previous) / previous * 100).toFixed(1)
}

// Hàm format số với dấu phẩy
export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num)
}
