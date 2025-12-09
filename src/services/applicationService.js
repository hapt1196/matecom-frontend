// Job Application API Service
import { fileToBase64 } from '@/utils/fileUtils';
import { handle401Error, handleApiError } from '@/utils/errorHandler';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/jobapplication`
    : 'https://api.MATECOM.org/api/jobapplication';

/**
 * Get auth token from localStorage
 * @returns {string|null} - Token or null
 */
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

/**
 * Create headers with auth token
 * @returns {Object} - Headers object
 */
const getAuthHeaders = () => {
    const token = getAuthToken();
    if (!token) {
        handle401Error();
        throw new Error('Unauthorized');
    }

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `
    };
};

/**
 * Check auth and redirect if needed
 */
const checkAuthAndRedirect = () => {
    const token = getAuthToken();
    if (!token) {
        handle401Error();
        throw new Error('Unauthorized');
    }
};

/**
 * Submit job application with CV file (Public endpoint)
 * @param {Object} applicationData - Application form data
 * @param {string} applicationData.fullName - Full name
 * @param {string} applicationData.email - Email address
 * @param {string} applicationData.phone - Phone number
 * @param {string} applicationData.position - Position applying for
 * @param {string} applicationData.coverLetter - Cover letter
 * @param {File} cvFile - CV file
 * @returns {Promise<Object>} - Response from API
 */
export const submitApplication = async (applicationData, cvFile) => {
    try {
        // Convert file to base64
        const cvFileBase64 = await fileToBase64(cvFile);

        // Prepare JSON payload
        const payload = {
            fullName: applicationData.fullName,
            email: applicationData.email,
            phone: applicationData.phone,
            position: applicationData.position,
            coverLetter: applicationData.coverLetter,
            cvFileBase64: cvFileBase64,
            cvFileName: cvFile.name,
            cvFileSize: cvFile.size
        };

        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Lỗi khi gửi đơn ứng tuyển');
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting application:', error);
        throw error;
    }
};

/**
 * Get job applications list with filters and pagination (Admin)
 * @param {Object} filter - Filter and pagination options
 * @param {string} [filter.fullName] - Search by name
 * @param {string} [filter.email] - Search by email
 * @param {string} [filter.phone] - Search by phone
 * @param {string} [filter.position] - Filter by position
 * @param {boolean} [filter.isRead] - Filter by read status
 * @param {string} [filter.status] - Filter by status
 * @param {number} [filter.page] - Current page
 * @param {number} [filter.pageSize] - Items per page
 * @returns {Promise<Object>} - Response from API
 */
export const getJobApplications = async (filter = {}) => {
    try {
        const params = new URLSearchParams();

        if (filter.fullName) params.append('fullName', filter.fullName);
        if (filter.email) params.append('email', filter.email);
        if (filter.phone) params.append('phone', filter.phone);
        if (filter.position) params.append('position', filter.position);
        if (filter.isRead !== undefined) params.append('isRead', filter.isRead.toString());
        if (filter.status) params.append('status', filter.status);
        if (filter.page) params.append('page', filter.page.toString());
        if (filter.pageSize) params.append('pageSize', filter.pageSize.toString());

        const response = await fetch(`${API_BASE_URL}?${params}`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                handle401Error();
            }
            const errorMessage = handleApiError(new Error('Lỗi khi lấy danh sách ứng tuyển'), response);
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching job applications:', error);
        throw error;
    }
};

/**
 * Mark job application as read (Admin)
 * @param {string} id - Application ID
 * @returns {Promise<void>}
 */
export const markAsRead = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/read`, {
            method: 'PATCH',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                handle401Error();
            }
            const errorMessage = handleApiError(new Error('Lỗi khi đánh dấu đã đọc'), response);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error marking as read:', error);
        throw error;
    }
};

/**
 * Update job application status (Admin)
 * @param {string} id - Application ID
 * @param {string} status - New status
 * @returns {Promise<void>}
 */
export const updateStatus = async (id, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            if (response.status === 401) {
                handle401Error();
            }
            const errorMessage = handleApiError(new Error('Lỗi khi cập nhật trạng thái'), response);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error updating status:', error);
        throw error;
    }
};

/**
 * Delete job application (Admin)
 * @param {string} id - Application ID
 * @returns {Promise<void>}
 */
export const deleteJobApplication = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                handle401Error();
            }
            const errorMessage = handleApiError(new Error('Lỗi khi xóa đơn ứng tuyển'), response);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error deleting job application:', error);
        throw error;
    }
};

/**
 * Check export permission
 * @returns {boolean} - True if has export permission
 */
const hasExportPermission = () => {
    try {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) return false;

        const user = JSON.parse(userInfo);

        // Check role or permissions
        if (user.role === 'Admin' || user.role === 'Manager') {
            return true;
        }

        // Check permissions array if exists
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
 * Export job applications to Excel (Admin)
 * @param {Object} filter - Filter options
 * @param {string} [filter.fullName] - Search by name
 * @param {string} [filter.email] - Search by email
 * @param {string} [filter.position] - Filter by position
 * @param {boolean} [filter.isRead] - Filter by read status
 * @param {string} [filter.status] - Filter by status
 * @returns {Promise<void>}
 */
export const exportJobApplications = async (filter = {}) => {
    try {
        checkAuthAndRedirect();

        // Check export permission
        if (!hasExportPermission()) {
            throw new Error('Bạn không có quyền xuất dữ liệu Excel');
        }

        const params = new URLSearchParams();

        if (filter.fullName) params.append('fullName', filter.fullName);
        if (filter.email) params.append('email', filter.email);
        if (filter.position) params.append('position', filter.position);
        if (filter.isRead !== undefined) params.append('isRead', filter.isRead.toString());
        if (filter.status) params.append('status', filter.status);

        const response = await fetch(`${API_BASE_URL}/export?${params}`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            if (response.status === 401) {
                handle401Error();
            }
            const errorMessage = handleApiError(new Error('Lỗi khi xuất dữ liệu'), response);
            throw new Error(errorMessage);
        }

        // Get filename from Content-Disposition header
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'job_applications.xlsx';
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1].replace(/['"]/g, '');
            }
        }

        // Download file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error exporting job applications:', error);
        throw error;
    }
};
