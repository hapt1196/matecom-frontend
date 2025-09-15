// Contact API Service
//const API_BASE_URL = 'https://localhost:7265/api/contact';
const API_BASE_URL = 'https://api.MATECOM.org/api/contact';

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
    window.location.href = '/business/login';
    throw new Error('Unauthorized');
  }
};

/**
 * Tạo headers với token xác thực
 * @returns {Object} - Headers object
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    checkAuthAndRedirect();
  }
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Tạo liên hệ mới
 * @param {Object} contactData - Dữ liệu liên hệ
 * @param {string} [contactData.fullName] - Họ và tên
 * @param {string} [contactData.phoneNumber] - Số điện thoại  
 * @param {string} [contactData.message] - Lời nhắn
 * @returns {Promise<Object>} - Response từ API
 */
export const createContact = async (contactData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(contactData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

/**
 * Lấy danh sách liên hệ với filter và phân trang
 * @param {Object} filter - Bộ lọc và phân trang
 * @param {string} [filter.fullName] - Tìm kiếm theo tên
 * @param {string} [filter.phoneNumber] - Tìm kiếm theo số điện thoại
 * @param {boolean} [filter.isRead] - Lọc theo trạng thái đã đọc
 * @param {string} [filter.status] - Lọc theo trạng thái
 * @param {string} [filter.fromDate] - Lọc từ ngày
 * @param {string} [filter.toDate] - Lọc đến ngày
 * @param {number} [filter.page] - Trang hiện tại
 * @param {number} [filter.pageSize] - Số lượng item mỗi trang
 * @returns {Promise<Object>} - Response từ API
 */
export const getContacts = async (filter = {}) => {
  try {
    checkAuthAndRedirect();
    
    const params = new URLSearchParams();
    
    if (filter.fullName) params.append('fullName', filter.fullName);
    if (filter.phoneNumber) params.append('phoneNumber', filter.phoneNumber);
    if (filter.isRead !== undefined) params.append('isRead', filter.isRead.toString());
    if (filter.status) params.append('status', filter.status);
    if (filter.fromDate) params.append('fromDate', filter.fromDate);
    if (filter.toDate) params.append('toDate', filter.toDate);
    if (filter.page) params.append('page', filter.page.toString());
    if (filter.pageSize) params.append('pageSize', filter.pageSize.toString());
    
    const response = await fetch(`${API_BASE_URL}?${params}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi lấy danh sách liên hệ');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

/**
 * Đánh dấu liên hệ đã đọc
 * @param {number} id - ID của liên hệ
 * @returns {Promise<void>}
 */
export const markAsRead = async (id) => {
  try {
    checkAuthAndRedirect();
    
    const response = await fetch(`${API_BASE_URL}/${id}/mark-as-read`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi đánh dấu đã đọc');
    }
  } catch (error) {
    console.error('Error marking as read:', error);
    throw error;
  }
};

/**
 * Cập nhật trạng thái liên hệ
 * @param {number} id - ID của liên hệ
 * @param {string} status - Trạng thái mới
 * @returns {Promise<void>}
 */
export const updateStatus = async (id, status) => {
  try {
    checkAuthAndRedirect();
    
    const response = await fetch(`${API_BASE_URL}/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi cập nhật trạng thái');
    }
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

/**
 * Kiểm tra quyền xuất Excel
 * @returns {boolean} - True nếu có quyền xuất
 */
const hasExportPermission = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) return false;
    
    const user = JSON.parse(userInfo);
    
    // Kiểm tra role hoặc permissions
    if (user.role === 'Admin' || user.role === 'Manager') {
      return true;
    }
    
    // Kiểm tra permissions array nếu có
    if (user.permissions && Array.isArray(user.permissions)) {
      return user.permissions.includes('crm.read');
    }
    
    return false;
  } catch (error) {
    console.error('Error checking export permission:', error);
    return false;
  }
};

/**
 * Xuất dữ liệu liên hệ thành file Excel
 * @param {Object} filter - Bộ lọc dữ liệu
 * @param {string} [filter.fullName] - Tìm kiếm theo tên
 * @param {string} [filter.phoneNumber] - Tìm kiếm theo số điện thoại
 * @param {boolean} [filter.isRead] - Lọc theo trạng thái đã đọc
 * @param {string} [filter.status] - Lọc theo trạng thái
 * @param {string} [filter.fromDate] - Lọc từ ngày
 * @param {string} [filter.toDate] - Lọc đến ngày
 * @returns {Promise<void>}
 */
export const exportContacts = async (filter = {}) => {
  try {
    checkAuthAndRedirect();
    
    // Kiểm tra quyền xuất Excel
    if (!hasExportPermission()) {
      throw new Error('Bạn không có quyền xuất dữ liệu Excel');
    }
    
    const params = new URLSearchParams();
    
    if (filter.fullName) params.append('fullName', filter.fullName);
    if (filter.phoneNumber) params.append('phoneNumber', filter.phoneNumber);
    if (filter.isRead !== undefined) params.append('isRead', filter.isRead.toString());
    if (filter.status) params.append('status', filter.status);
    if (filter.fromDate) params.append('fromDate', filter.fromDate);
    if (filter.toDate) params.append('toDate', filter.toDate);
    
    const response = await fetch(`${API_BASE_URL}/export?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        checkAuthAndRedirect();
      }
      throw new Error('Lỗi khi xuất dữ liệu Excel');
    }
    
    // Tạo blob từ response
    const blob = await response.blob();
    
    // Tạo URL để download
    const url = window.URL.createObjectURL(blob);
    
    // Tạo element <a> để download
    const a = document.createElement('a');
    a.href = url;
    
    // Lấy tên file từ header hoặc tạo tên mặc định
    const contentDisposition = response.headers.get('content-disposition');
    let filename = 'contacts_export.xlsx';
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, '');
      }
    }
    
    // Nếu không có tên file từ server, tạo tên file với timestamp
    if (filename === 'contacts_export.xlsx') {
      const now = new Date();
      const timestamp = now.toISOString().slice(0, 10).replace(/-/g, '') + '_' + 
                       now.getHours().toString().padStart(2, '0') + 
                       now.getMinutes().toString().padStart(2, '0');
      filename = `contacts_export_${timestamp}.xlsx`;
    }
    
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
  } catch (error) {
    console.error('Error exporting contacts:', error);
    throw error;
  }
};
