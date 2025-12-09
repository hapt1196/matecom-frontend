<template>
  <div class="contacts-tab">
    <div class="tab-header">
      <h1 class="tab-title">Khách hàng tiềm năng</h1>
      <div class="tab-actions">
        <div class="search-box">
          <label class="search-label">Tìm kiếm</label>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Tìm kiếm theo tên, số điện thoại, email hoặc công ty..."
            class="search-input"
          />
        </div>
        <div class="filter-group">
          <div class="filter-item">
            <label class="filter-label">Trạng thái</label>
            <select v-model="statusFilter" class="filter-select">
              <option value="">Tất cả trạng thái</option>
              <option value="New">Mới</option>
              <option value="Read">Đã đọc</option>
              <option value="Replied">Đã trả lời</option>
              <option value="Archived">Đã lưu trữ</option>
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
            @click="exportContactsList"
            :disabled="isExporting"
            aria-label="Xuất dữ liệu liên hệ thành file Excel"
            title="Xuất tất cả dữ liệu liên hệ thành file Excel"
          >
            <FileSpreadsheet class="w-4 h-4 mr-2" />
            {{ isExporting ? 'Đang xuất...' : 'Xuất Excel' }}
          </button>
        </div>
      </div>
    </div>

    <div class="contacts-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Đang tải danh sách khách hàng...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchContactsList" class="retry-btn">Thử lại</button>
      </div>

            <!-- Contacts List -->
      <div v-else-if="contacts.length > 0" class="contacts-list">
        <div class="contacts-table-container">
          <div class="table-wrapper">
            <table class="contacts-table">
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Công ty</th>
                  <th>Lời nhắn</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="contact in filteredContacts" :key="contact.id" :class="{ 'unread-row': !contact.isRead }">
                  <td>
                    <div class="contact-cell">
                      <div class="contact-avatar">{{ (contact.fullName || 'K').charAt(0) }}</div>
                      <div class="contact-info">
                        <div class="contact-name">{{ contact.fullName || 'Không có tên' }}</div>
                        <div class="contact-phone">{{ contact.phoneNumber || 'Không có số điện thoại' }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ contact.phoneNumber || 'N/A' }}</td>
                  <td>
                    <div class="email-cell">
                      {{ contact.email || 'N/A' }}
                    </div>
                  </td>
                  <td>
                    <div class="company-cell">
                      {{ contact.company || 'N/A' }}
                    </div>
                  </td>
                  <td>
                    <div class="message-cell">
                      {{ contact.message || 'Không có lời nhắn' }}
                    </div>
                  </td>
                  <td>
                    <span class="status-badge" :class="getStatusClass(contact.status)">
                      {{ getStatusText(contact.status) }}
                    </span>
                    <span v-if="!contact.isRead" class="unread-indicator">●</span>
                  </td>
                  <td>{{ formatDate(contact.createdAt) }}</td>
                  <td>
                    <div class="action-buttons">
                      <button 
                        v-if="!contact.isRead"
                        @click="markContactAsRead(contact.id)"
                        class="action-btn read"
                        :disabled="updatingContact === contact.id"
                        :title="updatingContact === contact.id ? 'Đang xử lý...' : 'Đánh dấu đã đọc'"
                      >
                        <Eye class="w-4 h-4" />
                      </button>
                      <button 
                        @click="updateContactStatus(contact.id, 'Replied')"
                        class="action-btn reply"
                        :disabled="updatingContact === contact.id"
                        :title="updatingContact === contact.id ? 'Đang xử lý...' : 'Đã trả lời'"
                      >
                        <MessageSquare class="w-4 h-4" />
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
        <p>Chưa có khách hàng tiềm năng nào.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getContacts, markAsRead, updateStatus, exportContacts } from '@/services/contactService'
import { handleApiError } from '@/utils/errorHandler'
import { Eye, MessageSquare, FileSpreadsheet } from 'lucide-vue-next'

// Reactive data
const contacts = ref([])
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)
const totalPages = ref(0)
const searchQuery = ref('')
const statusFilter = ref('')
const readFilter = ref('')
const updatingContact = ref(null)
const isExporting = ref(false)

// Computed properties
const filteredContacts = computed(() => {
  let filtered = contacts.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(contact => 
      (contact.fullName && contact.fullName.toLowerCase().includes(query)) ||
      (contact.phoneNumber && contact.phoneNumber.includes(query)) ||
      (contact.email && contact.email.toLowerCase().includes(query)) ||
      (contact.company && contact.company.toLowerCase().includes(query))
    )
  }

  // Filter by status
  if (statusFilter.value) {
    filtered = filtered.filter(contact => contact.status === statusFilter.value)
  }

  // Filter by read status
  if (readFilter.value !== '') {
    const isRead = readFilter.value === 'true'
    filtered = filtered.filter(contact => contact.isRead === isRead)
  }

  return filtered
})

// Methods
const fetchContactsList = async () => {
  try {
    loading.value = true
    error.value = null
    
    const filter = {
      page: currentPage.value,
      pageSize: pageSize.value
    }
    
    const result = await getContacts(filter)
    contacts.value = result.data
    totalCount.value = result.totalCount
    totalPages.value = result.totalPages
  } catch (err) {
    // Hiển thị thông báo lỗi chi tiết hơn
    const errorMessage = err.message || 'Lỗi khi tải danh sách khách hàng'
    error.value = errorMessage
    console.error('Error fetching contacts:', err)
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchContactsList()
  }
}

const markContactAsRead = async (contactId) => {
  try {
    updatingContact.value = contactId
    await markAsRead(contactId)
    
    // Update local state
    const contact = contacts.value.find(c => c.id === contactId)
    if (contact) {
      contact.isRead = true
    }
  } catch (err) {
    console.error('Error marking as read:', err)
    // Hiển thị thông báo lỗi chi tiết
    const errorMessage = err.message || 'Lỗi khi đánh dấu đã đọc'
    alert(`❌ ${errorMessage}`)
  } finally {
    updatingContact.value = null
  }
}

const updateContactStatus = async (contactId, newStatus) => {
  try {
    updatingContact.value = contactId
    await updateStatus(contactId, newStatus)
    
    // Update local state
    const contact = contacts.value.find(c => c.id === contactId)
    if (contact) {
      contact.status = newStatus
    }
  } catch (err) {
    console.error('Error updating status:', err)
    // Hiển thị thông báo lỗi chi tiết
    const errorMessage = err.message || 'Lỗi khi cập nhật trạng thái'
    alert(`❌ ${errorMessage}`)
  } finally {
    updatingContact.value = null
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'New': return 'status-new'
    case 'Read': return 'status-read'
    case 'Replied': return 'status-replied'
    case 'Archived': return 'status-archived'
    default: return 'status-new'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'New': return 'Mới'
    case 'Read': return 'Đã đọc'
    case 'Replied': return 'Đã trả lời'
    case 'Archived': return 'Đã lưu trữ'
    default: return 'Mới'
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

const exportContactsList = async () => {
  try {
    // Xác nhận trước khi xuất
    const confirmed = confirm('Bạn có chắc chắn muốn xuất tất cả dữ liệu liên hệ thành file Excel?')
    if (!confirmed) return
    
    isExporting.value = true
    
    // Tạo filter object từ các filter hiện tại
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
    
    // Xuất dữ liệu contact với filter
    await exportContacts(filter)
    
    // Show success message
    alert('✅ Đã xuất dữ liệu thành công! File Excel đã được tải về.')
    
  } catch (error) {
    console.error('Export error:', error)
    
    // Sử dụng error message từ service (đã được xử lý bởi errorHandler)
    const errorMessage = error.message || 'Có lỗi xảy ra khi xuất dữ liệu. Vui lòng thử lại sau.'
    alert(`❌ ${errorMessage}`)
  } finally {
    isExporting.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchContactsList()
})
</script>

<style scoped>
.contacts-tab {
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

.contacts-content {
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
.contacts-table-container {
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

.contacts-table {
  width: 100%;
  border-collapse: collapse;
}

.contacts-table th {
  background: #f8fafc;
  padding: 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}

.contacts-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  color: #475569;
}

.contacts-table tr:hover {
  background: #f8fafc;
}

.contacts-table tr.unread-row {
  background: #f0f9ff;
  border-left: 4px solid #3b82f6;
}

.contacts-table tr.unread-row:hover {
  background: #e0f2fe;
}

.contact-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-avatar {
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

.contact-info {
  display: flex;
  flex-direction: column;
}

.contact-name {
  font-weight: 600;
  color: #1e293b;
}

.contact-phone {
  font-size: 12px;
  color: #64748b;
}

.email-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.company-cell {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-cell {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  margin-right: 8px;
}

.status-new {
  background: #dbeafe;
  color: #1e40af;
}

.status-read {
  background: #f3f4f6;
  color: #374151;
}

.status-replied {
  background: #dcfce7;
  color: #166534;
}

.status-archived {
  background: #fef3c7;
  color: #92400e;
}

.unread-indicator {
  color: #3b82f6;
  font-size: 16px;
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

.action-btn.reply:hover:not(:disabled) {
  color: #10b981;
  border-color: #10b981;
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
  .contacts-tab {
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
  
  .contacts-table-container {
    border-radius: 8px;
  }
  
  .contacts-table th,
  .contacts-table td {
    padding: 12px 8px;
    font-size: 12px;
  }
  
  .contact-cell {
    gap: 8px;
  }
  
  .contact-avatar {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }
  
  .message-cell {
    max-width: 120px;
  }
  
  .email-cell {
    max-width: 120px;
  }
  
  .company-cell {
    max-width: 100px;
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
