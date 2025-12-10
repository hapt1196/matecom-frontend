<template>
  <div class="blog-posts-tab">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">Quản lý Blog Posts</h1>
        <p class="page-subtitle">Quản lý bài viết blog động</p>
      </div>
      <div class="header-right">
        <button 
          class="btn btn-primary"
          @click="openCreateModal"
        >
          <Plus class="w-4 h-4" />
          Tạo bài viết mới
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
            placeholder="Tìm theo tiêu đề, slug hoặc nội dung..."
            class="filter-input"
            @input="debouncedSearch"
          />
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
      <button class="btn btn-primary" @click="loadPosts">Thử lại</button>
    </div>

    <!-- Posts Table -->
    <div v-else class="posts-table-container">
      <div class="table-header">
        <div class="table-info">
          <span class="total-count">Tổng: {{ totalCount }} bài viết</span>
          <span class="showing-count">Hiển thị: {{ posts.length }} bài viết</span>
        </div>
        <div class="table-actions">
          <button 
            class="btn btn-secondary"
            @click="refreshPosts"
            :disabled="loading"
          >
            <RefreshCw class="w-4 h-4" />
            Làm mới
          </button>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="posts-table">
          <thead>
            <tr>
              <th class="col-image">Ảnh</th>
              <th class="col-title">Tiêu đề</th>
              <th class="col-excerpt">Tóm tắt</th>
              <th class="col-date">Ngày xuất bản</th>
              <th class="col-actions">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id" class="post-row">
              <td class="col-image">
                <img 
                  v-if="post.featuredImage" 
                  :src="post.featuredImage" 
                  :alt="post.title"
                  class="featured-image"
                />
                <div v-else class="no-image">No Image</div>
              </td>
              <td class="col-title">
                <div class="title-cell">
                  <h4 class="post-title-text">{{ post.title }}</h4>
                  <code class="slug-code">{{ post.slug }}</code>
                  <p class="post-excerpt" v-if="post.excerpt">
                    {{ post.excerpt.substring(0, 80) }}...
                  </p>
                  <div class="post-meta">
                    <span v-if="post.readTime" class="read-time">⏱️ {{ post.readTime }}</span>
                    <span v-if="post.viewCount" class="view-count">👁️ {{ post.viewCount }} views</span>
                  </div>
                </div>
              </td>
              <td class="col-excerpt">
                <p class="excerpt-text" v-if="post.excerpt">
                  {{ post.excerpt.substring(0, 150) }}{{ post.excerpt.length > 150 ? '...' : '' }}
                </p>
                <p class="excerpt-text text-muted" v-else>
                  Chưa có tóm tắt
                </p>
              </td>
              <td class="col-date">
                <div class="date-cell">
                  <span class="date-text">{{ formatDate(post.publishedAt) }}</span>
                  <span class="time-text">{{ formatTime(post.updatedAt) }}</span>
                </div>
              </td>
              <td class="col-actions">
                <div class="action-buttons">
                  <button 
                    class="btn-action btn-view"
                    @click="viewPost(post)"
                    title="Xem bài viết"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button 
                    class="btn-action btn-edit"
                    @click="editPost(post)"
                    title="Chỉnh sửa"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button 
                    v-if="post.status === 'Draft'"
                    class="btn-action btn-publish"
                    @click="publishPost(post)"
                    title="Publish"
                  >
                    <Send class="w-4 h-4" />
                  </button>
                  <button 
                    class="btn-action btn-delete"
                    @click="deletePost(post)"
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
            {{ editingPost ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới' }}
          </h2>
          <button class="modal-close" @click="closeModal">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="savePost" class="post-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tiêu đề *</label>
                <input
                  v-model="formData.title"
                  type="text"
                  class="form-input"
                  placeholder="Ví dụ: Marketing 2026 - Xu hướng mới"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Slug *</label>
                <input
                  v-model="formData.slug"
                  type="text"
                  class="form-input"
                  placeholder="marketing-2026-xu-huong-moi"
                  required
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Featured Image</label>
                <div class="featured-image-upload">
                  <input
                    ref="featuredImageInput"
                    type="file"
                    accept="image/*"
                    style="display: none"
                    @change="handleFeaturedImageUpload"
                  />
                  <div v-if="formData.featuredImage" class="image-preview">
                    <img :src="formData.featuredImage" alt="Featured image preview" />
                    <button 
                      type="button" 
                      class="btn-remove-image"
                      @click="removeFeaturedImage"
                    >
                      ✕
                    </button>
                  </div>
                  <button 
                    v-else
                    type="button"
                    class="btn btn-secondary"
                    @click="$refs.featuredImageInput.click()"
                    :disabled="uploadingFeaturedImage"
                  >
                    <span v-if="uploadingFeaturedImage" class="loading-spinner-small"></span>
                    {{ uploadingFeaturedImage ? 'Đang upload...' : '📷 Chọn ảnh' }}
                  </button>
                  <small class="help-text">Hoặc nhập URL:</small>
                  <input
                    v-model="formData.featuredImage"
                    type="text"
                    class="form-input"
                    placeholder="/assets/img/blog/image.png"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Read Time</label>
                <input
                  v-model="formData.readTime"
                  type="text"
                  class="form-input"
                  placeholder="5 phút đọc"
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Ngôn ngữ</label>
                <select v-model="formData.lang" class="form-select">
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Ngày xuất bản</label>
                <input
                  v-model="formData.publishedAt"
                  type="datetime-local"
                  class="form-input"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Meta Title</label>
              <input
                v-model="formData.metaTitle"
                type="text"
                class="form-input"
                placeholder="Tiêu đề SEO (tối đa 60 ký tự)"
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Meta Description</label>
              <textarea
                v-model="formData.metaDescription"
                class="form-textarea"
                placeholder="Mô tả SEO (tối đa 160 ký tự)"
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Excerpt (Tóm tắt)</label>
              <textarea
                v-model="formData.excerpt"
                class="form-textarea"
                placeholder="Tóm tắt ngắn gọn về bài viết"
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-group full-width">
              <label class="form-label">Nội dung</label>
              <div class="content-editor-wrapper">
                <div v-if="!quillLoaded" class="editor-loading">
                  <div class="loading-spinner"></div>
                  <p>Đang tải editor...</p>
                </div>
                <component
                  v-else-if="QuillEditor"
                  :is="QuillEditor"
                  ref="quillEditor"
                  v-model:content="formData.content"
                  content-type="html"
                  :options="quillOptions"
                  :class="['quill-editor', { uploading: isUploadingImage }]"
                  :style="{ minHeight: '800px', height: '800px' }"
                />
                <div class="editor-help">
                  <small>💡 Tip: Sử dụng thanh công cụ để định dạng nội dung</small>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Categories (phân cách bằng dấu phẩy)</label>
              <input
                v-model="formData.categoriesText"
                type="text"
                class="form-input"
                placeholder="Marketing, SEO, Digital"
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Tags (phân cách bằng dấu phẩy)</label>
              <input
                v-model="formData.tagsText"
                type="text"
                class="form-input"
                placeholder="digital-marketing, content, strategy"
              />
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
            @click="savePost"
            :disabled="saving"
          >
            <span v-if="saving" class="loading-spinner-small"></span>
            {{ saving ? 'Đang lưu...' : (editingPost ? 'Cập nhật' : 'Tạo mới') }}
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
          <p>Bạn có chắc chắn muốn xóa bài viết <strong>"{{ deletingPost?.title }}"</strong>?</p>
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
import { ref, onMounted, computed, shallowRef, nextTick } from 'vue'
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
import { 
  getBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost as deleteBlogPostApi, 
  publishBlogPost as publishBlogPostApi
} from '@/services/blogService'

// Reactive data
const loading = ref(false)
const error = ref(null)
const posts = ref([])
const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

// Filters
const filters = ref({
  searchTerm: ''
})

// Modal states
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingPost = ref(null)
const deletingPost = ref(null)
const saving = ref(false)
const deleting = ref(false)


// Quill Editor
const QuillEditor = shallowRef(null)
const quillEditor = ref(null)
const isUploadingImage = ref(false)
const quillLoaded = ref(false)

// Quill image handler (must be defined before quillOptions)
const handleQuillImageUpload = () => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.click()
  
  input.onchange = async () => {
    const file = input.files[0]
    if (!file) return
    
    try {
      isUploadingImage.value = true
      const { uploadBlogImage } = await import('@/services/blogService')
      const result = await uploadBlogImage(file)
      
      // Insert image into Quill editor
      const quill = quillEditor.value?.getQuill()
      if (quill) {
        const range = quill.getSelection(true)
        quill.insertEmbed(range.index, 'image', result.url)
        quill.setSelection(range.index + 1)
      }
    } catch (err) {
      error.value = err.message || 'Lỗi khi upload ảnh'
      console.error('Error uploading image to Quill:', err)
    } finally {
      isUploadingImage.value = false
    }
  }
}

const quillOptions = ref({
  theme: 'snow',
  placeholder: 'Nhập nội dung bài viết...',
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
        image: handleQuillImageUpload
      }
    }
  }
})

// Form data
const formData = ref({
  title: '',
  slug: '',
  metaTitle: '',
  metaDescription: '',
  featuredImage: '',
  content: '',
  excerpt: '',
  readTime: '',
  lang: 'vi',
  publishedAt: '',
  categoriesText: '',
  tagsText: ''
})

// Upload states
const uploadingFeaturedImage = ref(false)
const featuredImageInput = ref(null)

// Image upload handlers
const handleFeaturedImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  try {
    uploadingFeaturedImage.value = true
    const { uploadBlogImage } = await import('@/services/blogService')
    const result = await uploadBlogImage(file)
    formData.value.featuredImage = result.url
  } catch (err) {
    error.value = err.message || 'Lỗi khi upload ảnh'
    console.error('Error uploading featured image:', err)
  } finally {
    uploadingFeaturedImage.value = false
    event.target.value = '' // Reset input
  }
}

const removeFeaturedImage = () => {
  formData.value.featuredImage = ''
}

// Debounced search
let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    loadPosts()
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
const loadPosts = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await getBlogPosts({
      ...filters.value,
      page: currentPage.value,
      size: pageSize.value,
      sortBy: 'publishedAt',
      sortOrder: 'desc'
    })
    
    posts.value = response.data || []
    totalCount.value = response.totalCount || 0
  } catch (err) {
    error.value = err.message || 'Có lỗi xảy ra khi tải danh sách bài viết'
    console.error('Error loading posts:', err)
  } finally {
    loading.value = false
  }
}

const refreshPosts = () => {
  loadPosts()
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadPosts()
  }
}

const openCreateModal = () => {
  editingPost.value = null
  formData.value = {
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    featuredImage: '',
    content: '',
    excerpt: '',
    readTime: '',
    lang: 'vi',
    publishedAt: '',
    categoriesText: '',
    tagsText: ''
  }
  showModal.value = true
}

const editPost = (post) => {
  editingPost.value = post
  formData.value = {
    title: post.title,
    slug: post.slug,
    metaTitle: post.metaTitle || '',
    metaDescription: post.metaDescription || '',
    featuredImage: post.featuredImage || '',
    content: '',
    excerpt: post.excerpt || '',
    readTime: post.readTime || '',
    lang: post.lang,
    publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : '',
    categoriesText: post.categories?.map(c => c.name).join(', ') || '',
    tagsText: post.tags?.map(t => t.name).join(', ') || ''
  }
  showModal.value = true
  
  // Wait for Quill editor to be ready, then set content
  nextTick(() => {
    setTimeout(() => {
      const quill = quillEditor.value?.getQuill()
      if (quill && post.content) {
        // Clear editor first
        quill.setText('')
        
        // Use clipboard API to properly insert HTML
        const delta = quill.clipboard.convert(post.content)
        quill.setContents(delta)
        
        // Update formData
        formData.value.content = post.content
      }
    }, 100)
  })
}

const viewPost = (post) => {
  window.open(`/blog/${post.slug}`, '_blank')
}

const savePost = async () => {
  try {
    saving.value = true
    
    const postData = {
      slug: formData.value.slug,
      title: formData.value.title,
      metaTitle: formData.value.metaTitle,
      metaDescription: formData.value.metaDescription,
      featuredImage: formData.value.featuredImage,
      content: formData.value.content,
      excerpt: formData.value.excerpt,
      readTime: formData.value.readTime,
      lang: formData.value.lang,
      publishedAt: formData.value.publishedAt ? new Date(formData.value.publishedAt).toISOString() : null,
      categoryNames: formData.value.categoriesText ? formData.value.categoriesText.split(',').map(c => c.trim()) : [],
      tagNames: formData.value.tagsText ? formData.value.tagsText.split(',').map(t => t.trim()) : []
    }
    
    if (editingPost.value) {
      await updateBlogPost(editingPost.value.id, postData)
    } else {
      await createBlogPost(postData)
    }
    
    closeModal()
    loadPosts()
  } catch (err) {
    error.value = err.message || 'Có lỗi xảy ra khi lưu bài viết'
    console.error('Error saving post:', err)
  } finally {
    saving.value = false
  }
}

const deletePost = (post) => {
  deletingPost.value = post
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    deleting.value = true
    await deleteBlogPostApi(deletingPost.value.id)
    closeDeleteModal()
    loadPosts()
  } catch (err) {
    error.value = err.message || 'Có lỗi xảy ra khi xóa bài viết'
    console.error('Error deleting post:', err)
  } finally {
    deleting.value = false
  }
}

const publishPost = async (post) => {
  try {
    await publishBlogPostApi(post.id)
    loadPosts()
  } catch (err) {
    error.value = err.message || 'Có lỗi xảy ra khi publish bài viết'
    console.error('Error publishing post:', err)
  }
}

const closeModal = () => {
  showModal.value = false
  editingPost.value = null
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deletingPost.value = null
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
  if (!dateString) return 'Chưa xuất bản'
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const formatTime = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Lifecycle
onMounted(async () => {
  // Load Quill editor
  if (typeof window !== 'undefined') {
    try {
      const quillModule = await import('@vueup/vue-quill')
      await import('@vueup/vue-quill/dist/vue-quill.snow.css')
      QuillEditor.value = quillModule.QuillEditor
      quillLoaded.value = true
    } catch (error) {
      console.error('Failed to load Quill editor:', error)
    }
  }
  
  loadPosts()
})
</script>

<style scoped>
/* Base Styles */
.blog-posts-tab {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.header-right {
  display: flex;
  gap: 12px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #1e3a8a;
  color: #ffffff;
}

.btn-primary:hover {
  background: #1e40af;
}

.btn-secondary {
  background: #f1f5f9;
  color: #475569;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

.btn-danger {
  background: #ef4444;
  color: #ffffff;
}

.btn-danger:hover {
  background: #dc2626;
}

/* Filters */
.filters-section {
  padding: 16px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.filters-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-input,
.filter-select {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  color: #1e293b;
  background: #ffffff;
  transition: border-color 0.2s ease;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #1e3a8a;
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
  border-top-color: #1e3a8a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

/* Table */
.posts-table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.table-info {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #64748b;
}

.total-count {
  font-weight: 600;
  color: #1e293b;
}

.table-wrapper {
  flex: 1;
  overflow: auto;
}

.posts-table {
  width: 100%;
  border-collapse: collapse;
}

.posts-table thead {
  position: sticky;
  top: 0;
  background: #f8fafc;
  z-index: 10;
}

.posts-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e2e8f0;
}

.posts-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.post-row:hover {
  background: #f8fafc;
}

.title-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.post-title-text {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.slug-code {
  font-size: 11px;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}

.status-badge {
  display: inline-block;
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
  background: #e5e7eb;
  color: #374151;
}

.lang-badge {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 6px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
}

.date-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.date-text {
  font-size: 13px;
  color: #1e293b;
}

.time-text {
  font-size: 11px;
  color: #94a3b8;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-action {
  padding: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
}

.btn-view {
  color: #3b82f6;
}

.btn-view:hover {
  background: #dbeafe;
}

.btn-edit {
  color: #8b5cf6;
}

.btn-edit:hover {
  background: #f3e8ff;
}

.btn-publish {
  color: #10b981;
}

.btn-publish:hover {
  background: #d1fae5;
}

.btn-delete {
  color: #ef4444;
}

.btn-delete:hover {
  background: #fee2e2;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
}

.pagination-btn {
  padding: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #f1f5f9;
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
  min-width: 36px;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #ffffff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.pagination-page:hover {
  background: #f1f5f9;
}

.pagination-page.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
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
  background: #ffffff;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.modal-close {
  padding: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s ease;
}

.modal-close:hover {
  color: #1e293b;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
}

/* Form */
.post-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  color: #1e293b;
  background: #ffffff;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #1e3a8a;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

/* Featured Image Upload */
.featured-image-upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image-preview {
  position: relative;
  width: 200px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove-image {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-remove-image:hover {
  background: rgba(220, 38, 38, 1);
}

.help-text {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

/* Blog-specific styles */
.featured-image {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.no-image {
  width: 80px;
  height: 60px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 10px;
  color: #94a3b8;
}

.post-excerpt {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  line-height: 1.4;
}

.post-meta {
  display: flex;
  gap: 12px;
  margin-top: 6px;
  font-size: 11px;
  color: #64748b;
}

.stats-cell {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.categories, .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.category-badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
}

.tag-badge {
  background: #f3e8ff;
  color: #7c3aed;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
}

.col-image {
  width: 100px;
}

.col-title {
  width: 250px;
  max-width: 250px;
}

.col-excerpt {
  width: 400px;
  max-width: 400px;
}

.excerpt-text {
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.text-muted {
  color: #94a3b8;
  font-style: italic;
}

.col-stats {
  width: 200px;
}

.col-date {
  width: 150px;
}

.col-actions {
  width: 140px;
}

.loading-spinner-small {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
</style>
