<template>
  <div class="cms-pages-tab">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">Quản lý CMS Pages</h1>
        <p class="page-subtitle">Quản lý nội dung trang web và bài viết</p>
      </div>
      <div class="header-right">
        <button 
          class="btn btn-primary"
          @click="openCreateModal"
        >
          <Plus class="w-4 h-4" />
          Tạo trang mới
        </button>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="filters-section">
      <div class="filters-row">
        <div class="filter-group">
          <label class="filter-label">Tìm kiếm</label>
          <input
            v-model="filters.searchTerm"
            type="text"
            placeholder="Tìm theo tiêu đề hoặc slug..."
            class="filter-input"
            @input="debouncedSearch"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Template</label>
          <select v-model="filters.template" class="filter-select" @change="loadPages">
            <option value="">Tất cả templates</option>
            <option value="Home">Home</option>
            <option value="About">About</option>
            <option value="Services">Services</option>
            <option value="Blog">Blog</option>
            <option value="Contact">Contact</option>
            <option value="Partners">Partners</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Trạng thái</label>
          <select v-model="filters.status" class="filter-select" @change="loadPages">
            <option value="">Tất cả trạng thái</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Ngôn ngữ</label>
          <select v-model="filters.lang" class="filter-select" @change="loadPages">
            <option value="">Tất cả ngôn ngữ</option>
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">⚠️</div>
      <h3>Lỗi khi tải dữ liệu</h3>
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="loadPages">Thử lại</button>
    </div>

    <!-- Pages Table -->
    <div v-else class="pages-table-container">
      <div class="table-header">
        <div class="table-info">
          <span class="total-count">Tổng: {{ totalCount }} trang</span>
          <span class="showing-count">Hiển thị: {{ pages.length }} trang</span>
        </div>
        <div class="table-actions">
          <button 
            class="btn btn-secondary"
            @click="refreshPages"
            :disabled="loading"
          >
            <RefreshCw class="w-4 h-4" />
            Làm mới
          </button>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="pages-table">
          <thead>
            <tr>
              <th class="col-title">Tiêu đề</th>
              <th class="col-slug">Slug</th>
              <th class="col-template">Template</th>
              <th class="col-status">Trạng thái</th>
              <th class="col-lang">Ngôn ngữ</th>
              <th class="col-updated">Cập nhật</th>
              <th class="col-actions">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="page in pages" :key="page.id" class="page-row">
              <td class="col-title">
                <div class="title-cell">
                  <h4 class="page-title-text">{{ page.title }}</h4>
                  <p class="page-meta" v-if="page.metaDescription">
                    {{ page.metaDescription.substring(0, 60) }}...
                  </p>
                </div>
              </td>
              <td class="col-slug">
                <code class="slug-code">{{ page.slug }}</code>
              </td>
              <td class="col-template">
                <span class="template-badge">{{ page.template }}</span>
              </td>
              <td class="col-status">
                <span :class="['status-badge', `status-${page.status.toLowerCase()}`]">
                  {{ getStatusText(page.status) }}
                </span>
              </td>
              <td class="col-lang">
                <span class="lang-badge">{{ page.lang.toUpperCase() }}</span>
              </td>
              <td class="col-updated">
                <div class="date-cell">
                  <span class="date-text">{{ formatDate(page.updatedAt) }}</span>
                  <span class="time-text">{{ formatTime(page.updatedAt) }}</span>
                </div>
              </td>
              <td class="col-actions">
                <div class="action-buttons">
                  <button 
                    class="btn-action btn-view"
                    @click="viewPage(page)"
                    title="Xem trang"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button 
                    class="btn-action btn-edit"
                    @click="editPage(page)"
                    title="Chỉnh sửa"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button 
                    v-if="page.status === 'Draft'"
                    class="btn-action btn-publish"
                    @click="publishPage(page)"
                    title="Publish"
                  >
                    <Send class="w-4 h-4" />
                  </button>
                  <button 
                    class="btn-action btn-delete"
                    @click="deletePage(page)"
                    title="Xóa"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        
        <div class="pagination-pages">
          <button
            v-for="page in visiblePages"
            :key="page"
            :class="['pagination-page', { active: page === currentPage }]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">
            {{ editingPage ? 'Chỉnh sửa trang' : 'Tạo trang mới' }}
          </h2>
          <button class="modal-close" @click="closeModal">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="savePage" class="page-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tiêu đề *</label>
                <input
                  v-model="formData.title"
                  type="text"
                  class="form-input"
                  placeholder="Ví dụ: Trang chủ MATECOM, Giới thiệu về chúng tôi..."
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Slug *</label>
                <input
                  v-model="formData.slug"
                  type="text"
                  class="form-input"
                  placeholder="trang-chu, gioi-thieu, dich-vu..."
                  required
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Template *</label>
                <select v-model="formData.template" class="form-select" required>
                  <option value="">Chọn template</option>
                  <option value="Home">Home</option>
                  <option value="About">About</option>
                  <option value="Services">Services</option>
                  <option value="Blog">Blog</option>
                  <option value="Contact">Contact</option>
                  <option value="Partners">Partners</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Ngôn ngữ</label>
                <select v-model="formData.lang" class="form-select">
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Meta Title</label>
                <input
                  v-model="formData.metaTitle"
                  type="text"
                  class="form-input"
                  placeholder="Tiêu đề SEO cho Google (tối đa 60 ký tự)"
                />
            </div>
            
            <div class="form-group">
              <label class="form-label">Meta Description</label>
              <textarea
                v-model="formData.metaDescription"
                class="form-textarea"
                placeholder="Mô tả ngắn gọn về trang này cho Google (tối đa 160 ký tự)"
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-group full-width">
              <label class="form-label">Nội dung</label>
              <div class="content-editor-wrapper">
                <QuillEditor
                  ref="quillEditor"
                  v-model:content="formData.content"
                  content-type="html"
                  :options="quillOptions"
                  :class="['quill-editor', { uploading: isUploadingImage }]"
                  :style="{ minHeight: '800px', height: '800px' }"
                />
                <div class="editor-help">
                  <small>💡 Tip: Sử dụng thanh công cụ để định dạng nội dung. Click vào biểu tượng ảnh để upload hình ảnh (JPG, PNG, GIF - tối đa 10MB)</small>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Hủy
          </button>
          <button 
            type="submit" 
            class="btn btn-primary"
            @click="savePage"
            :disabled="saving"
          >
            <span v-if="saving" class="loading-spinner-small"></span>
            {{ saving ? 'Đang lưu...' : (editingPage ? 'Cập nhật' : 'Tạo mới') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal-content delete-modal" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">Xác nhận xóa</h2>
          <button class="modal-close" @click="closeDeleteModal">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="modal-body">
          <p>Bạn có chắc chắn muốn xóa trang <strong>"{{ deletingPage?.title }}"</strong>?</p>
          <p class="text-red-600">Hành động này không thể hoàn tác!</p>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeDeleteModal">
            Hủy
          </button>
          <button 
            type="button" 
            class="btn btn-danger"
            @click="confirmDelete"
            :disabled="deleting"
          >
            <span v-if="deleting" class="loading-spinner-small"></span>
            {{ deleting ? 'Đang xóa...' : 'Xóa' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { 
  Plus, 
  RefreshCw, 
  Eye, 
  Edit, 
  Send, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  X 
} from 'lucide-vue-next'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { 
  getPages, 
  createPage, 
  updatePage, 
  deletePage as deletePageApi, 
  publishPage as publishPageApi,
  uploadMedia
} from '@/services/cmsService'

// Reactive data
const loading = ref(false)
const error = ref(null)
const pages = ref([])
const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

// Custom image handler for Quill Editor
const customImageHandler = () => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.style.display = 'none'
  
  input.onchange = async () => {
    const file = input.files[0]
    if (!file) return
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File quá lớn! Kích thước tối đa là 10MB.')
      return
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ hỗ trợ file ảnh: JPG, PNG, GIF')
      return
    }
    
    try {
      isUploadingImage.value = true
      
      // Show loading in editor
      const range = quillEditor.value?.getSelection()
      if (range) {
        quillEditor.value?.insertText(range.index, '🔄 Đang upload ảnh...', 'user')
        quillEditor.value?.setSelection(range.index + 25)
      }
      
      // Upload file
      const response = await uploadMedia(file)
      
      // Insert image URL into editor
      if (range && response?.filePath) {
        quillEditor.value?.deleteText(range.index, 25)
        quillEditor.value?.insertEmbed(range.index, 'image', response.filePath)
        quillEditor.value?.setSelection(range.index + 1)
      }
      
    } catch (error) {
      console.error('Upload error:', error)
      alert('Lỗi khi upload ảnh: ' + (error.message || 'Không xác định'))
      
      // Remove loading text
      const range = quillEditor.value?.getSelection()
      if (range) {
        quillEditor.value?.deleteText(range.index - 25, 25)
      }
    } finally {
      isUploadingImage.value = false
    }
  }
  
  document.body.appendChild(input)
  input.click()
  document.body.removeChild(input)
}

// Quill Editor options
const quillOptions = ref({
  theme: 'snow',
  placeholder: 'Nhập nội dung...',
  modules: {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['blockquote', 'code-block'],
        ['clean']
      ],
      handlers: {
        'image': customImageHandler
      }
    }
  }
})

// Filters
const filters = ref({
  searchTerm: '',
  template: '',
  status: '',
  lang: 'vi'
})

// Modal states
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingPage = ref(null)
const deletingPage = ref(null)
const saving = ref(false)
const deleting = ref(false)

// Quill Editor ref
const quillEditor = ref(null)
const isUploadingImage = ref(false)

// Form data
const formData = ref({
  title: '',
  slug: '',
  template: '',
  lang: 'vi',
  metaTitle: '',
  metaDescription: '',
  content: ''
})

// Debounced search
let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    loadPages()
  }, 500)
}

// Computed properties
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const loadPages = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await getPages({
      ...filters.value,
      page: currentPage.value,
      size: pageSize.value
    })
    
    pages.value = response.data || []
    totalCount.value = response.totalCount || 0
  } catch (err) {
    error.value = err.message || 'Có lỗi xảy ra khi tải danh sách trang'
    console.error('Error loading pages:', err)
  } finally {
    loading.value = false
  }
}

const refreshPages = () => {
  loadPages()
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadPages()
  }
}

const openCreateModal = () => {
  editingPage.value = null
  formData.value = {
    title: '',
    slug: '',
    template: '',
    lang: 'vi',
    metaTitle: '',
    metaDescription: '',
    content: ''
  }
  showModal.value = true
}

const editPage = (page) => {
  editingPage.value = page
  formData.value = {
    title: page.title,
    slug: page.slug,
    template: page.template,
    lang: page.lang,
    metaTitle: page.metaTitle || '',
    metaDescription: page.metaDescription || '',
    content: page.content || ''
  }
  showModal.value = true
}

const viewPage = (page) => {
  // TODO: Implement view page functionality
  console.log('View page:', page)
}

const savePage = async () => {
  try {
    saving.value = true
    
    if (editingPage.value) {
      await updatePage(editingPage.value.id, formData.value)
    } else {
      await createPage(formData.value)
    }
    
    closeModal()
    loadPages()
  } catch (err) {
    error.value = err.message || 'Có lỗi xảy ra khi lưu trang'
    console.error('Error saving page:', err)
  } finally {
    saving.value = false
  }
}

const deletePage = (page) => {
  deletingPage.value = page
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    deleting.value = true
    await deletePageApi(deletingPage.value.id)
    closeDeleteModal()
    loadPages()
  } catch (err) {
    error.value = err.message || 'Có lỗi xảy ra khi xóa trang'
    console.error('Error deleting page:', err)
  } finally {
    deleting.value = false
  }
}

const publishPage = async (page) => {
  try {
    await publishPageApi(page.id)
    loadPages()
  } catch (err) {
    error.value = err.message || 'Có lỗi xảy ra khi publish trang'
    console.error('Error publishing page:', err)
  }
}

const closeModal = () => {
  showModal.value = false
  editingPage.value = null
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deletingPage.value = null
}

// Utility functions
const getStatusText = (status) => {
  const statusMap = {
    'Draft': 'Bản nháp',
    'Published': 'Đã xuất bản',
    'Archived': 'Đã lưu trữ'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Watch for filter changes
watch(filters, () => {
  currentPage.value = 1
  loadPages()
}, { deep: true })

// Components
const components = {
  QuillEditor
}

// Lifecycle
onMounted(() => {
  loadPages()
})
</script>

<style scoped>
.cms-pages-tab {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

/* Header */
.page-header {
  background: white;
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.page-subtitle {
  color: #64748b;
  margin: 0;
  font-size: 14px;
}

/* Filters */
.filters-section {
  background: white;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.filters-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-input,
.filter-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #1e3a8a;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

/* Loading & Error States */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #1e3a8a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-state h3 {
  color: #dc2626;
  margin-bottom: 8px;
}

/* Table */
.pages-table-container {
  flex: 1;
  background: white;
  margin: 0 24px 24px 24px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.table-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
}

.table-info {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #64748b;
}

.table-wrapper {
  overflow-x: auto;
}

.pages-table {
  width: 100%;
  border-collapse: collapse;
}

.pages-table th {
  background: #f8fafc;
  padding: 12px 20px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e2e8f0;
}

.pages-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: top;
}

.page-row:hover {
  background: #f8fafc;
}

.col-title {
  width: 30%;
}

.title-cell h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.title-cell p {
  margin: 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}

.col-slug {
  width: 15%;
}

.slug-code {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-family: 'Monaco', 'Menlo', monospace;
  color: #475569;
}

.col-template {
  width: 12%;
}

.template-badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.col-status {
  width: 12%;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-draft {
  background: #fef3c7;
  color: #92400e;
}

.status-published {
  background: #d1fae5;
  color: #065f46;
}

.status-archived {
  background: #f3f4f6;
  color: #374151;
}

.col-lang {
  width: 8%;
}

.lang-badge {
  background: #e0e7ff;
  color: #3730a3;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.col-updated {
  width: 12%;
}

.date-cell {
  display: flex;
  flex-direction: column;
}

.date-text {
  font-size: 12px;
  color: #374151;
  font-weight: 500;
}

.time-text {
  font-size: 11px;
  color: #64748b;
}

.col-actions {
  width: 11%;
}

.action-buttons {
  display: flex;
  gap: 4px;
}

.btn-action {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-view {
  background: #f1f5f9;
  color: #475569;
}

.btn-view:hover {
  background: #e2e8f0;
}

.btn-edit {
  background: #dbeafe;
  color: #1e40af;
}

.btn-edit:hover {
  background: #bfdbfe;
}

.btn-publish {
  background: #d1fae5;
  color: #065f46;
}

.btn-publish:hover {
  background: #a7f3d0;
}

.btn-delete {
  background: #fee2e2;
  color: #dc2626;
}

.btn-delete:hover {
  background: #fecaca;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 8px;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #1e3a8a;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: 4px;
}

.pagination-page {
  width: 36px;
  height: 36px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
}

.pagination-page:hover {
  background: #f8fafc;
  border-color: #1e3a8a;
}

.pagination-page.active {
  background: #1e3a8a;
  color: white;
  border-color: #1e3a8a;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-primary {
  background: #1e3a8a;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1e40af;
}

.btn-secondary {
  background: #f8fafc;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #f1f5f9;
}

.btn-danger {
  background: #dc2626;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #b91c1c;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 95vw;
  width: 100%;
  max-height: 98vh;
  overflow-y: auto;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: #f8fafc;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #e2e8f0;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Form */
.page-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
}

.form-input,
.form-select,
.form-textarea {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #1f2937;
  background: white;
  transition: all 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #1e3a8a;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  color: #1f2937;
  background: white;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.content-editor-wrapper {
  position: relative;
}

.content-editor {
  font-family: 'Monaco', 'Menlo', monospace;
  min-height: 400px;
  line-height: 1.5;
  width: 100%;
}

.quill-editor {
  min-height: 800px !important;
  height: 800px !important;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
}

/* Force override Quill's internal styles */
.quill-editor :deep(.ql-snow) {
  min-height: 800px !important;
  height: 800px !important;
}

.quill-editor :deep(.ql-toolbar) {
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.quill-editor :deep(.ql-container) {
  min-height: 750px !important;
  height: 750px !important;
  font-size: 14px;
  line-height: 1.5;
}

.quill-editor :deep(.ql-editor) {
  min-height: 750px !important;
  height: 750px !important;
  padding: 16px;
  color: #1f2937;
}

.quill-editor :deep(.ql-editor.ql-blank::before) {
  color: #9ca3af;
  font-style: normal;
}

/* Upload loading state */
.quill-editor :deep(.ql-editor) {
  position: relative;
}

.quill-editor.uploading :deep(.ql-toolbar) {
  opacity: 0.6;
  pointer-events: none;
}

.quill-editor.uploading :deep(.ql-editor) {
  opacity: 0.8;
}

.editor-help {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  color: #64748b;
  font-size: 12px;
}

.loading-spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Delete Modal */
.delete-modal {
  max-width: 400px;
}

.delete-modal .modal-body {
  text-align: center;
}

.delete-modal .modal-body p {
  margin: 0 0 12px 0;
  color: #374151;
}

.delete-modal .modal-body p:last-child {
  color: #dc2626;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 1024px) {
  .filters-row {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  
  .pages-table-container {
    margin: 0 16px 16px 16px;
  }
  
  .page-header {
    padding: 16px;
  }
  
  .modal-content {
    max-width: 95vw;
    margin: 10px;
    max-height: 96vh;
  }
  
  .quill-editor {
    min-height: 600px;
  }
  
  .quill-editor :deep(.ql-container) {
    min-height: 550px;
  }
}

@media (max-width: 768px) {
  .filters-row {
    grid-template-columns: 1fr;
  }
  
  .table-wrapper {
    overflow-x: auto;
  }
  
  .pages-table {
    min-width: 800px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    margin: 10px;
    max-height: calc(100vh - 20px);
    max-width: 98vw;
  }
  
  .quill-editor {
    min-height: 500px;
  }
  
  .quill-editor :deep(.ql-container) {
    min-height: 450px;
  }
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .header-right {
    width: 100%;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
