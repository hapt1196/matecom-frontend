<template>
  <div class="dashboard-tab">
    <!-- Dashboard Header -->
    <div class="dashboard-header">
      <h1 class="dashboard-title">Dashboard</h1>
      <p class="dashboard-subtitle">Tổng quan hoạt động kinh doanh</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <Users class="w-8 h-8 text-blue-600" />
        </div>
        <div class="stat-content">
          <div class="stat-value">1,234</div>
          <div class="stat-label">Total Leads</div>
          <div class="stat-change positive">+12% from last month</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <DollarSign class="w-8 h-8 text-green-600" />
        </div>
        <div class="stat-content">
          <div class="stat-value">$45,678</div>
          <div class="stat-label">Revenue</div>
          <div class="stat-change positive">+8% from last month</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <FolderOpen class="w-8 h-8 text-purple-600" />
        </div>
        <div class="stat-content">
          <div class="stat-value">89</div>
          <div class="stat-label">Active Projects</div>
          <div class="stat-change negative">-3% from last month</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <TrendingUp class="w-8 h-8 text-orange-600" />
        </div>
        <div class="stat-content">
          <div class="stat-value">23.5%</div>
          <div class="stat-label">Conversion Rate</div>
          <div class="stat-change positive">+2.1% from last month</div>
        </div>
      </div>
    </div>

    <!-- Charts and Tables -->
    <div class="dashboard-content">
      <!-- Revenue Chart -->
      <div class="chart-section">
        <div class="section-header">
          <h3 class="section-title">Revenue Trend</h3>
          <div class="section-actions">
            <button class="action-btn">Last 30 days</button>
          </div>
        </div>
        <div class="chart-container">
          <div class="chart-placeholder">
            <BarChart3 class="w-16 h-16 text-gray-400" />
            <p>Revenue Chart</p>
          </div>
        </div>
      </div>

      <!-- Recent Leads -->
      <div class="leads-section">
        <div class="section-header">
          <h3 class="section-title">Recent Leads</h3>
          <button class="action-btn">View All</button>
        </div>
        <div class="leads-table">
          <div class="table-header">
            <div class="table-cell">Name</div>
            <div class="table-cell">Email</div>
            <div class="table-cell">Status</div>
            <div class="table-cell">Date</div>
          </div>
          <div class="table-body">
            <div v-for="lead in recentLeads" :key="lead.id" class="table-row">
              <div class="table-cell">
                <div class="lead-info">
                  <div class="lead-avatar">{{ lead.name.charAt(0) }}</div>
                  <span>{{ lead.name }}</span>
                </div>
              </div>
              <div class="table-cell">{{ lead.email }}</div>
              <div class="table-cell">
                <span :class="['status-badge', lead.status.toLowerCase()]">
                  {{ lead.status }}
                </span>
              </div>
              <div class="table-cell">{{ lead.date }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Users, 
  DollarSign, 
  FolderOpen, 
  TrendingUp, 
  BarChart3 
} from 'lucide-vue-next'

const recentLeads = ref([
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', status: 'New', date: '2024-01-15' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', status: 'Contacted', date: '2024-01-14' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', status: 'Qualified', date: '2024-01-13' },
  { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', status: 'Won', date: '2024-01-12' },
  { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@email.com', status: 'Lost', date: '2024-01-11' }
])
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

.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.chart-section,
.leads-section {
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

.action-btn {
  padding: 8px 16px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #e2e8f0;
  color: #334155;
}

.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #94a3b8;
}

.leads-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f1f5f9;
  align-items: center;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  font-size: 14px;
  color: #475569;
}

.lead-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lead-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1e3a8a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.new {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.contacted {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.qualified {
  background: #d1fae5;
  color: #059669;
}

.status-badge.won {
  background: #d1fae5;
  color: #059669;
}

.status-badge.lost {
  background: #fee2e2;
  color: #dc2626;
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
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .table-cell {
    padding: 4px 0;
  }
}
</style>
