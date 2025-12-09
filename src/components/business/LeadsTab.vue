<template>
  <div class="applications-tab">
    <div class="tab-header">
      <h1 class="tab-title">Quản lý ứng tuyển</h1>
      <div class="tab-actions">
        <div class="search-box">
          <label class="search-label">Tìm kiếm</label>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc vị trí..."
            class="search-input"
          />
        </div>
        <div class="filter-group">
          <div class="filter-item">
            <label class="filter-label">Trạng thái</label>
            <select v-model="statusFilter" class="filter-select">
              <option value="">Tất cả trạng thái</option>
              <option value="New">Mới</option>
              <option value="Reviewing">Đang xem xét</option>
              <option value="Interviewed">Đã phỏng vấn</option>
              <option value="Accepted">Chấp nhận</option>
              <option value="Rejected">Từ chối</option>
            </select>
          </div>
          <div class="filter-item">
            <label class="filter-label">Đã đọc</label>
            <select v-model="readFilter" class="filter-select">
              <option value="">Tất cả</option>
              <option value="true">Đã đọc</option>
              <option value="false">Chưa đọc</option>
            </select>
          </div>
        </div>
        <div class="export-section">
          <button 
            type="button" 
            class="export-btn" 
            @click="exportApplicationsList"
            :disabled="isExporting"
            aria-label="Xuất dữ liệu ứng tuyển thành file Excel"
            title="Xuất tất cả dữ liệu ứng tuyển thành file Excel"
          >
            <FileSpreadsheet class="w-4 h-4 mr-2" />
            {{ isExporting ? 'Đang xuất...' : 'Xuất Excel' }}
          </button>
        </div>
      </div>
    </div>

    <div class="applications-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Đang tải danh sách ứng tuyển...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchApplicationsList" class="retry-btn">Thử lại</button>
      </div>

      <!-- Applications List -->
      <div v-else-if="filteredApplications.length > 0" class="applications-list">
        <div class="applications-table-container">
          <div class="table-wrapper">
            <table class="applications-table">
              <thead>
                <tr>
                  <th>Ứng viên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vị trí</th>
                  <th>CV</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="app in filteredApplications" :key="app.id" :class="{ 'unread-row': !app.isRead }">
                  <td>
                    <div class="application-cell">
                      <div class="application-avatar">{{ (app.fullName || 'U').charAt(0) }}</div>
                      <div class="application-info">
                        <div class="application-name">{{ app.fullName || 'Không có tên' }}</div>
                        <div class="application-phone">{{ app.phone || 'Không có SĐT' }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="email-cell">
                      {{ app.email || 'N/A' }}
                    </div>
                  </td>
                  <td>{{ app.phone || 'N/A' }}</td>
                  <td>
                    <div class="position-cell">
                      {{ app.position || 'N/A' }}
                    </div>
                  </td>
                  <td>
                    <button 
                      v-if="app.cvFilePath"
                      @click="downloadCV(app)"
                      class="cv-download-btn"
                      title="Tải CV"
                    >
                      <Download class="w-4 h-4" />
                      {{ app.cvFileName || 'CV.pdf' }}
                    </button>
                    <span v-else class="no-cv">Không có CV</span>
                  </td>
                  <td>
                    <select 
                      :value="app.status" 
                      @change="updateApplicationStatus(app.id, $event.target.value)"
                      class="status-select"
                      :class="getStatusClass(app.status)"
                    >
                      <option value="New">Mới</option>
                      <option value="Reviewing">Đang xem xét</option>
                      <option value="Interviewed">Đã phỏng vấn</option>
                      <option value="Accepted">Chấp nhận</option>
                      <option value="Rejected">Từ chối</option>
                    </select>
                    <span v-if="!app.isRead" class="unread-indicator">●</span>
                  </td>
                  <td>{{ formatDate(app.createdAt) }}</td>
                  <td>
                    <div class="action-buttons">
                      <button 
                        v-if="!app.isRead"
                        @click="markApplicationAsRead(app.id)"
                        class="action-btn read"
                        :disabled="updatingApplication === app.id"
                        :title="updatingApplication === app.id ? 'Đang xử lý...' : 'Đánh dấu đã đọc'"
                      >
                        <Eye class="w-4 h-4" />
                      </button>
                      <button 
                        @click="deleteApplication(app.id)"
                        class="action-btn delete"
                        :disabled="updatingApplication === app.id"
                        :title="updatingApplication === app.id ? 'Đang xử lý...' : 'Xóa đơn ứng tuyển'"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button 
            @click="changePage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="pagination-btn"
          >
            Trước
          </button>
          <span class="page-info">Trang {{ currentPage }} / {{ totalPages }}</span>
          <button 
            @click="changePage(currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="pagination-btn"
          >
            Sau
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <p>Chưa có đơn ứng tuyển nào.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getJobApplications, markAsRead, updateStatus, deleteJobApplication, exportJobApplications } from '@/services/applicationService'
import { handleApiError } from '@/utils/errorHandler'
import { Eye, Trash2, FileSpreadsheet, Download } from 'lucide-vue-next'

// Reactive data
const applications = ref([])
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)
const totalPages = ref(0)
const searchQuery = ref('')
const statusFilter = ref('')
const readFilter = ref('')
const updatingApplication = ref(null)
const isExporting = ref(false)

// Computed properties
const filteredApplications = computed(() => {
  let filtered = applications.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(app => 
      (app.fullName && app.fullName.toLowerCase().includes(query)) ||
      (app.email && app.email.toLowerCase().includes(query)) ||
      (app.phone && app.phone.includes(query)) ||
      (app.position && app.position.toLowerCase().includes(query))
    )
  }

  // Filter by status
  if (statusFilter.value) {
    filtered = filtered.filter(app => app.status === statusFilter.value)
  }

  // Filter by read status
  if (readFilter.value !== '') {
    const isRead = readFilter.value === 'true'
    filtered = filtered.filter(app => app.isRead === isRead)
  }

  // Client-side pagination
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  
  return filtered.slice(start, end)
})

// Methods
const fetchApplicationsList = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Backend returns array directly, not paginated object
    const result = await getJobApplications()
    
    // Handle array response
    if (Array.isArray(result)) {
      applications.value = result
      totalCount.value = result.length
      // Client-side pagination
      totalPages.value = Math.ceil(result.length / pageSize.value)
    } else {
      // Fallback for empty or null response
      applications.value = []
      totalCount.value = 0
      totalPages.value = 0
    }
  } catch (err) {
    const errorMessage = err.message || 'Lỗi khi tải danh sách ứng tuyển'
    error.value = errorMessage
    console.error('Error fetching applications:', err)
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // No need to fetch - pagination is client-side
  }
}

const markApplicationAsRead = async (applicationId) => {
  try {
    updatingApplication.value = applicationId
    await markAsRead(applicationId)
    
    // Update local state
    const app = applications.value.find(a => a.id === applicationId)
    if (app) {
      app.isRead = true
    }
  } catch (err) {
    console.error('Error marking as read:', err)
    const errorMessage = err.message || 'Lỗi khi đánh dấu đã đọc'
    alert(`❌ ${errorMessage}`)
  } finally {
    updatingApplication.value = null
  }
}

const updateApplicationStatus = async (applicationId, newStatus) => {
  try {
    updatingApplication.value = applicationId
    await updateStatus(applicationId, newStatus)
    
    // Update local state
    const app = applications.value.find(a => a.id === applicationId)
    if (app) {
      app.status = newStatus
    }
  } catch (err) {
    console.error('Error updating status:', err)
    const errorMessage = err.message || 'Lỗi khi cập nhật trạng thái'
    alert(`❌ ${errorMessage}`)
  } finally {
    updatingApplication.value = null
  }
}

const deleteApplication = async (applicationId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa đơn ứng tuyển này?')) {
    return
  }

  try {
    updatingApplication.value = applicationId
    await deleteJobApplication(applicationId)
    
    // Remove from local state
    applications.value = applications.value.filter(a => a.id !== applicationId)
    
    alert('✅ Đã xóa đơn ứng tuyển thành công!')
  } catch (err) {
    console.error('Error deleting application:', err)
    const errorMessage = err.message || 'Lỗi khi xóa đơn ứng tuyển'
    alert(`❌ ${errorMessage}`)
  } finally {
    updatingApplication.value = null
  }
}

const downloadCV = async (application) => {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) {
      alert('❌ Bạn cần đăng nhập để tải CV')
      return
    }

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
      ? `${import.meta.env.VITE_API_BASE_URL}/api/jobapplication`
      : 'https://api.MATECOM.org/api/jobapplication'

    const response = await fetch(`${API_BASE_URL}/${application.id}/download-cv`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Không thể tải CV')
    }

    // Get filename from Content-Disposition header or use default
    const contentDisposition = response.headers.get('Content-Disposition')
    let filename = application.cvFileName || 'cv.pdf'
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, '')
      }
    }

    // Download file
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error('Error downloading CV:', error)
    alert(`❌ Lỗi khi tải CV: ${error.message}`)
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'New': return 'status-new'
    case 'Reviewing': return 'status-reviewing'
    case 'Interviewed': return 'status-interviewed'
    case 'Accepted': return 'status-accepted'
    case 'Rejected': return 'status-rejected'
    default: return 'status-new'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const exportApplicationsList = async () => {
  try {
    const confirmed = confirm('Bạn có chắc chắn muốn xuất tất cả dữ liệu ứng tuyển thành file Excel?')
    if (!confirmed) return
    
    isExporting.value = true
    
    // Create filter object from current filters
    const filter = {}
    
    if (searchQuery.value) {
      filter.fullName = searchQuery.value
    }
    
    if (statusFilter.value) {
      filter.status = statusFilter.value
    }
    
    if (readFilter.value !== '') {
      filter.isRead = readFilter.value === 'true'
    }
    
    // Export data with filter
    await exportJobApplications(filter)
    
    // Show success message
    alert('✅ Đã xuất dữ liệu thành công! File Excel đã được tải về.')
    
  } catch (error) {
    console.error('Export error:', error)
    
    const errorMessage = error.message || 'Có lỗi xảy ra khi xuất dữ liệu. Vui lòng thử lại sau.'
    alert(`❌ ${errorMessage}`)
  } finally {
    isExporting.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchApplicationsList()
})
</script>

<style scoped>
.applications-tab {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
}

.tab-header {
  margin-bottom: 24px;
}

.tab-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
}

.tab-actions {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 300px;
}

.search-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #1e293b;
}

.filter-group {
  display: flex;
  gap: 16px;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #1e293b;
}

.export-section {
  display: flex;
  align-items: flex-end;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn:hover:not(:disabled) {
  background: #059669;
}

.export-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.applications-content {
  min-height: 400px;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #64748b;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 16px;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* Table Styles */
.applications-table-container {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  margin-bottom: 24px;
}

.table-wrapper {
  overflow-x: auto;
}

.applications-table {
  width: 100%;
  border-collapse: collapse;
}

.applications-table th {
  background: #f8fafc;
  padding: 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}

.applications-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  color: #475569;
}

.applications-table tr:hover {
  background: #f8fafc;
}

.applications-table tr.unread-row {
  background: #f0f9ff;
  border-left: 4px solid #3b82f6;
}

.applications-table tr.unread-row:hover {
  background: #e0f2fe;
}

.application-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.application-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1e3a8a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.application-info {
  display: flex;
  flex-direction: column;
}

.application-name {
  font-weight: 600;
  color: #1e293b;
}

.application-phone {
  font-size: 12px;
  color: #64748b;
}

.email-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.position-cell {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cv-download-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cv-download-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.no-cv {
  font-size: 12px;
  color: #94a3b8;
  font-style: italic;
}

.status-select {
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.status-select.status-new {
  background: #dbeafe;
  color: #1e40af;
}

.status-select.status-reviewing {
  background: #fef3c7;
  color: #92400e;
}

.status-select.status-interviewed {
  background: #e0e7ff;
  color: #3730a3;
}

.status-select.status-accepted {
  background: #dcfce7;
  color: #166534;
}

.status-select.status-rejected {
  background: #fee2e2;
  color: #991b1b;
}

.status-select:focus {
  outline: none;
  border-color: #1e3a8a;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

.unread-indicator {
  color: #3b82f6;
  font-size: 16px;
  margin-left: 8px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn:hover:not(:disabled) {
  background: #f1f5f9;
}

.action-btn.read:hover:not(:disabled) {
  color: #3b82f6;
  border-color: #3b82f6;
}

.action-btn.delete:hover:not(:disabled) {
  color: #dc2626;
  border-color: #dc2626;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background: #f9fafb;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #64748b;
}

@media (max-width: 768px) {
  .applications-tab {
    padding: 16px;
  }
  
  .tab-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
  }
  
  .filter-group {
    justify-content: space-between;
    gap: 12px;
  }
  
  .filter-item {
    flex: 1;
  }
  
  .export-section {
    width: 100%;
    justify-content: center;
    margin-top: 12px;
  }
  
  .applications-table-container {
    border-radius: 8px;
  }
  
  .applications-table th,
  .applications-table td {
    padding: 12px 8px;
    font-size: 12px;
  }
  
  .application-cell {
    gap: 8px;
  }
  
  .application-avatar {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }
  
  .email-cell,
  .position-cell {
    max-width: 120px;
  }
  
  .action-buttons {
    gap: 4px;
  }
  
  .action-btn {
    width: 28px;
    height: 28px;
  }
}
</style>
