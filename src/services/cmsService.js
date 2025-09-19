// CMS API Service
const API_BASE_URL = 'https://localhost:7265/api/cms';
//const API_BASE_URL = 'https://api.MATECOM.org/api/cms';

/**
 * Lấy token từ localStorage
 * @returns {string|null} - Token hoặc null
 */
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Kiểm tra xác thực và chuyển hướng nếu cần
 */
const checkAuthAndRedirect = () => {
  const token = getAuthToken();
  if (!token) {
    window.location.href = '/login';
    return;
  }
};

/**
 * Lấy headers cho request có xác thực
 * @returns {Object} - Headers object
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Lấy trang theo slug
 * @param {string} slug - Slug của trang
 * @param {string} [lang='vi'] - Ngôn ngữ
 * @returns {Promise<Object>} - Dữ liệu trang
 */
export const getPageBySlug = async (slug, lang = 'vi') => {
  try {
    const response = await fetch(`${API_BASE_URL}/pages/${slug}?lang=${lang}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Trang không tồn tại');
      }
      throw new Error('Lỗi khi tải trang');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    throw error;
  }
};

/**
 * Lấy danh sách trang với filter
 * @param {Object} filter - Bộ lọc và phân trang
 * @param {string} [filter.searchTerm] - Tìm kiếm theo tiêu đề hoặc slug
 * @param {string} [filter.template] - Lọc theo template
 * @param {string} [filter.status] - Lọc theo trạng thái
 * @param {string} [filter.lang] - Lọc theo ngôn ngữ
 * @param {boolean} [filter.isActive] - Lọc theo trạng thái hoạt động
 * @param {number} [filter.page] - Trang hiện tại
 * @param {number} [filter.size] - Số lượng item mỗi trang
 * @returns {Promise<Object>} - Danh sách trang với phân trang
 */
export const getPages = async (filter = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filter.searchTerm) params.append('searchTerm', filter.searchTerm);
    if (filter.template) params.append('template', filter.template);
    if (filter.status) params.append('status', filter.status);
    if (filter.lang) params.append('lang', filter.lang);
    if (filter.isActive !== undefined) params.append('isActive', filter.isActive.toString());
    if (filter.page) params.append('page', filter.page.toString());
    if (filter.size) params.append('size', filter.size.toString());
    
    const response = await fetch(`${API_BASE_URL}/pages?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Lỗi khi tải danh sách trang');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }
};

/**
 * Lấy trang chủ
 * @param {string} [lang='vi'] - Ngôn ngữ
 * @returns {Promise<Object>} - Dữ liệu trang chủ
 */
export const getHomePage = async (lang = 'vi') => {
  try {
    const response = await fetch(`${API_BASE_URL}/pages/home?lang=${lang}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Trang chủ không tồn tại');
      }
      throw new Error('Lỗi khi tải trang chủ');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching home page:', error);
    throw error;
  }
};

/**
 * Lấy danh sách bài viết blog (pages với template = 'Blog')
 * @param {Object} filter - Bộ lọc
 * @returns {Promise<Object>} - Danh sách bài viết blog
 */
export const getBlogPosts = async (filter = {}) => {
  try {
    const blogFilter = {
      ...filter,
      template: 'Blog',
      status: 'Published',
      isActive: true
    };
    
    return await getPages(blogFilter);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

/**
 * Tạo trang mới (Admin only)
 * @param {Object} pageData - Dữ liệu trang
 * @returns {Promise<Object>} - Trang đã tạo
 */
export const createPage = async (pageData) => {
  try {
    checkAuthAndRedirect();
    
    const response = await fetch(`${API_BASE_URL}/pages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(pageData)
    });

    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi tạo trang');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating page:', error);
    throw error;
  }
};

/**
 * Cập nhật trang (Admin only)
 * @param {string} id - ID của trang
 * @param {Object} pageData - Dữ liệu cập nhật
 * @returns {Promise<Object>} - Trang đã cập nhật
 */
export const updatePage = async (id, pageData) => {
  try {
    checkAuthAndRedirect();
    
    const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(pageData)
    });

    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi cập nhật trang');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating page:', error);
    throw error;
  }
};

/**
 * Xóa trang (Admin only)
 * @param {string} id - ID của trang
 * @returns {Promise<void>}
 */
export const deletePage = async (id) => {
  try {
    checkAuthAndRedirect();
    
    const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi xóa trang');
    }
  } catch (error) {
    console.error('Error deleting page:', error);
    throw error;
  }
};

/**
 * Publish trang (Admin only)
 * @param {string} id - ID của trang
 * @returns {Promise<void>}
 */
export const publishPage = async (id) => {
  try {
    checkAuthAndRedirect();
    
    const response = await fetch(`${API_BASE_URL}/pages/${id}/publish`, {
      method: 'POST',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi publish trang');
    }
  } catch (error) {
    console.error('Error publishing page:', error);
    throw error;
  }
};

/**
 * Upload media file (Admin only)
 * @param {File} file - File cần upload
 * @returns {Promise<Object>} - Thông tin file đã upload
 */
export const uploadMedia = async (file) => {
  try {
    checkAuthAndRedirect();
    
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: formData
    });

    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi upload file');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};

/**
 * Lấy danh sách media (Admin only)
 * @param {Object} filter - Bộ lọc
 * @returns {Promise<Object>} - Danh sách media
 */
export const getMedia = async (filter = {}) => {
  try {
    checkAuthAndRedirect();
    
    const params = new URLSearchParams();
    
    if (filter.searchTerm) params.append('searchTerm', filter.searchTerm);
    if (filter.type) params.append('type', filter.type);
    if (filter.fileType) params.append('fileType', filter.fileType);
    if (filter.page) params.append('page', filter.page.toString());
    if (filter.size) params.append('size', filter.size.toString());
    
    const response = await fetch(`${API_BASE_URL}/media?${params}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi tải danh sách media');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    throw error;
  }
};

/**
 * Xóa media (Admin only)
 * @param {string} id - ID của media
 * @returns {Promise<void>}
 */
export const deleteMedia = async (id) => {
  try {
    checkAuthAndRedirect();
    
    const response = await fetch(`${API_BASE_URL}/media/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi xóa media');
    }
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
};
