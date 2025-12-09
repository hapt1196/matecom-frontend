<template>
  <div class="dashboard-tab">
    <!-- Dashboard Header -->
    <div class="dashboard-header">
      <h1 class="dashboard-title">Dashboard</h1>
      <p class="dashboard-subtitle">Tổng quan hoạt động kinh doanh từ Google Analytics</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Đang tải dữ liệu từ Google Analytics...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">⚠️</div>
      <h3>Lỗi khi tải dữ liệu</h3>
      <p>{{ error }}</p>
      <button class="btn-retry" @click="loadAnalyticsData">Thử lại</button>
    </div>

    <!-- Dashboard Content -->
    <template v-else>
      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <Users class="w-8 h-8 text-blue-600" />
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ formatNumber(stats.totalUsers) }}</div>
            <div class="stat-label">Total Users</div>
            <div :class="['stat-change', getChangeClass(stats.usersChange)]">
              {{ stats.usersChange > 0 ? '+' : '' }}{{ stats.usersChange }}% from last period
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <Activity class="w-8 h-8 text-green-600" />
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ formatNumber(stats.totalSessions) }}</div>
            <div class="stat-label">Sessions</div>
            <div :class="['stat-change', getChangeClass(stats.sessionsChange)]">
              {{ stats.sessionsChange > 0 ? '+' : '' }}{{ stats.sessionsChange }}% from last period
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <FileText class="w-8 h-8 text-purple-600" />
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ formatNumber(stats.pageViews) }}</div>
            <div class="stat-label">Page Views</div>
            <div :class="['stat-change', getChangeClass(stats.pageViewsChange)]">
              {{ stats.pageViewsChange > 0 ? '+' : '' }}{{ stats.pageViewsChange }}% from last period
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <TrendingUp class="w-8 h-8 text-orange-600" />
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.engagementRate }}%</div>
            <div class="stat-label">Engagement Rate</div>
            <div :class="['stat-change', getChangeClass(stats.engagementChange)]">
              {{ stats.engagementChange > 0 ? '+' : '' }}{{ stats.engagementChange }}% from last period
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Tables -->
      <div class="dashboard-content">
        <!-- Analytics Chart -->
        <div class="chart-section">
          <div class="section-header">
            <h3 class="section-title">Analytics Trend (Last 30 Days)</h3>
            <div class="chart-legend">
              <span class="legend-item">
                <span class="legend-dot sessions"></span>
                Sessions
              </span>
              <span class="legend-item">
                <span class="legend-dot users"></span>
                Users
              </span>
            </div>
          </div>
          <div class="chart-container">
            <Line :data="chartData" :options="chartOptions" />
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="quick-stats-section">
          <div class="section-header">
            <h3 class="section-title">Quick Stats</h3>
          </div>
          <div class="quick-stats-list">
            <div class="quick-stat-item">
              <div class="quick-stat-icon">
                <Eye class="w-5 h-5 text-blue-500" />
              </div>
              <div class="quick-stat-content">
                <div class="quick-stat-label">Avg. Session Duration</div>
                <div class="quick-stat-value">3m 24s</div>
              </div>
            </div>
            
            <div class="quick-stat-item">
              <div class="quick-stat-icon">
                <MousePointer class="w-5 h-5 text-green-500" />
              </div>
              <div class="quick-stat-content">
                <div class="quick-stat-label">Pages per Session</div>
                <div class="quick-stat-value">2.4</div>
              </div>
            </div>
            
            <div class="quick-stat-item">
              <div class="quick-stat-icon">
                <UserCheck class="w-5 h-5 text-purple-500" />
              </div>
              <div class="quick-stat-content">
                <div class="quick-stat-label">New Users</div>
                <div class="quick-stat-value">{{ formatNumber(Math.round(stats.totalUsers * 0.42)) }}</div>
              </div>
            </div>
            
            <div class="quick-stat-item">
              <div class="quick-stat-icon">
                <BarChart3 class="w-5 h-5 text-orange-500" />
              </div>
              <div class="quick-stat-content">
                <div class="quick-stat-label">Bounce Rate</div>
                <div class="quick-stat-value">{{ (100 - stats.engagementRate).toFixed(1) }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { 
  Users, 
  Activity,
  FileText,
  TrendingUp, 
  Eye,
  MousePointer,
  UserCheck,
  BarChart3
} from 'lucide-vue-next'
import { fetchAnalyticsData, calculateChange, formatNumber } from '@/config/analytics.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// State
const loading = ref(true)
const error = ref(null)
const analyticsData = ref(null)

// Computed stats
const stats = computed(() => {
  if (!analyticsData.value) return {}
  
  const current = analyticsData.value.stats
  const previous = analyticsData.value.stats.previousPeriod
  
  return {
    totalUsers: current.totalUsers,
    totalSessions: current.totalSessions,
    pageViews: current.pageViews,
    engagementRate: current.engagementRate,
    usersChange: calculateChange(current.totalUsers, previous.totalUsers),
    sessionsChange: calculateChange(current.totalSessions, previous.totalSessions),
    pageViewsChange: calculateChange(current.pageViews, previous.pageViews),
    engagementChange: calculateChange(current.engagementRate, previous.engagementRate)
  }
})

// Chart data
const chartData = computed(() => {
  if (!analyticsData.value) return { labels: [], datasets: [] }
  
  const data = analyticsData.value.chartData
  
  return {
    labels: data.labels,
    datasets: [
      {
        label: 'Sessions',
        data: data.sessions,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Users',
        data: data.users,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  }
})

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 13,
        weight: '600'
      },
      bodyFont: {
        size: 12
      },
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      displayColors: true,
      callbacks: {
        label: function(context) {
          return context.dataset.label + ': ' + formatNumber(context.parsed.y)
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        },
        maxRotation: 0,
        autoSkipPadding: 20
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          size: 11
        },
        callback: function(value) {
          return formatNumber(value)
        }
      }
    }
  }
}

// Methods
const loadAnalyticsData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const data = await fetchAnalyticsData()
    analyticsData.value = data
  } catch (err) {
    error.value = err.message || 'Không thể tải dữ liệu analytics'
    console.error('Error loading analytics:', err)
  } finally {
    loading.value = false
  }
}

const getChangeClass = (change) => {
  return change >= 0 ? 'positive' : 'negative'
}

// Load data on mount
onMounted(() => {
  loadAnalyticsData()
})
</script>

<style scoped>
.dashboard-tab {
  height: 100%;
  overflow-y: auto;
}

.dashboard-header {
  margin-bottom: 32px;
}

.dashboard-title {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.dashboard-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: #64748b;
  font-size: 14px;
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 16px;
  text-align: center;
}

.error-icon {
  font-size: 48px;
}

.error-state h3 {
  font-size: 20px;
  font-weight: 600;
  color: #dc2626;
  margin: 0;
}

.error-state p {
  color: #64748b;
  font-size: 14px;
  margin: 0;
}

.btn-retry {
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-retry:hover {
  background: #2563eb;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
}

.stat-change {
  font-size: 12px;
  font-weight: 500;
}

.stat-change.positive {
  color: #059669;
}

.stat-change.negative {
  color: #dc2626;
}

/* Dashboard Content */
.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.chart-section,
.quick-stats-section {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

/* Chart Legend */
.chart-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748b;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-dot.sessions {
  background: #3b82f6;
}

.legend-dot.users {
  background: #10b981;
}

/* Chart Container */
.chart-container {
  height: 320px;
  position: relative;
}

/* Quick Stats */
.quick-stats-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.quick-stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.quick-stat-item:hover {
  background: #f1f5f9;
}

.quick-stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.quick-stat-content {
  flex: 1;
}

.quick-stat-label {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 4px;
}

.quick-stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    height: 250px;
  }
}
</style>
