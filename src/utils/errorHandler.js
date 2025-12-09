/**
 * Error Handler Utility
 * Xử lý lỗi API thống nhất và tự động logout khi gặp 401
 */

import { logout } from '@/services/authService'

/**
 * Xử lý lỗi 401 - Tự động logout
 */
export const handle401Error = () => {
    console.warn('⚠️ Session hết hạn (401) - Đang đăng xuất...')
    logout()
}

/**
 * Mapping mã lỗi HTTP sang thông báo tiếng Việt
 */
const ERROR_MESSAGES = {
    400: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
    401: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    403: 'Bạn không có quyền thực hiện thao tác này.',
    404: 'Không tìm thấy dữ liệu.',
    409: 'Dữ liệu đã tồn tại hoặc xung đột.',
    422: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
    429: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
    500: 'Lỗi hệ thống. Vui lòng thử lại sau.',
    502: 'Lỗi kết nối server. Vui lòng thử lại sau.',
    503: 'Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.',
    504: 'Timeout kết nối. Vui lòng thử lại sau.'
}

/**
 * Xử lý lỗi API và trả về thông báo phù hợp
 * @param {Error} error - Error object
 * @param {Response} response - Fetch response object (optional)
 * @returns {string} - Thông báo lỗi
 */
export const handleApiError = (error, response = null) => {
    // Xử lý lỗi 401 - Tự động logout
    if (response?.status === 401 || error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        handle401Error()
        return ERROR_MESSAGES[401]
    }

    // Xử lý lỗi network
    if (error.message?.includes('Failed to fetch') || error.message?.includes('Network') || error.message?.includes('network')) {
        return 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.'
    }

    // Xử lý lỗi theo status code
    if (response?.status) {
        return ERROR_MESSAGES[response.status] || `Lỗi không xác định (${response.status})`
    }

    // Xử lý lỗi có message cụ thể
    if (error.message) {
        // Kiểm tra các lỗi đặc biệt
        if (error.message.includes('quyền')) {
            return error.message
        }
        if (error.message.includes('quota') || error.message.includes('limit')) {
            return 'Đã vượt quá giới hạn. Vui lòng thử lại sau.'
        }

        // Trả về message gốc nếu là lỗi business logic
        return error.message
    }

    // Lỗi mặc định
    return 'Có lỗi xảy ra. Vui lòng thử lại sau.'
}

/**
 * Wrapper cho fetch API với xử lý lỗi tự động
 * @param {string} url - URL endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
export const fetchWithErrorHandling = async (url, options = {}) => {
    try {
        const response = await fetch(url, options)

        // Xử lý lỗi 401
        if (response.status === 401) {
            handle401Error()
            throw new Error(ERROR_MESSAGES[401])
        }

        // Xử lý các lỗi HTTP khác
        if (!response.ok) {
            const errorMessage = ERROR_MESSAGES[response.status] || `HTTP Error ${response.status}`
            throw new Error(errorMessage)
        }

        return await response.json()
    } catch (error) {
        // Nếu đã là Error object, throw lại
        if (error instanceof Error) {
            throw error
        }

        // Xử lý lỗi network hoặc lỗi khác
        throw new Error(handleApiError(error))
    }
}

/**
 * Hiển thị thông báo lỗi cho user
 * @param {string} message - Thông báo lỗi
 * @param {string} type - Loại thông báo: 'error' | 'warning' | 'info'
 */
export const showErrorMessage = (message, type = 'error') => {
    // Sử dụng alert đơn giản (có thể thay bằng toast/snackbar sau)
    if (type === 'error') {
        alert(`❌ ${message}`)
    } else if (type === 'warning') {
        alert(`⚠️ ${message}`)
    } else {
        alert(`ℹ️ ${message}`)
    }
}
