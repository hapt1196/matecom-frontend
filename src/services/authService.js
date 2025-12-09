const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/auth`
    : 'https://api.MATECOM.org/api/auth';
/**
 * Đăng nhập vào hệ thống
 * @param {string} username - Tên đăng nhập
 * @param {string} password - Mật khẩu
 * @returns {Promise<Object>} - Response từ API
 */
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Lỗi đăng nhập');
    }

    // Lưu token và thông tin user vào localStorage
    if (data.success && data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
    }

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

/**
 * Kiểm tra tính hợp lệ của token
 * @param {string} token - Token cần kiểm tra
 * @returns {Promise<Object>} - Response từ API
 */
export const validateToken = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error validating token:', error);
    throw error;
  }
};

/**
 * Đăng xuất
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userInfo');
  window.location.href = '/business/login';
};

/**
 * Lấy token hiện tại
 * @returns {string|null} - Token hoặc null
 */
export const getToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Lấy thông tin user hiện tại
 * @returns {Object|null} - Thông tin user hoặc null
 */
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
};

/**
 * Kiểm tra xem user đã đăng nhập chưa
 * @returns {boolean} - True nếu đã đăng nhập
 */
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

/**
 * Kiểm tra và refresh token nếu cần
 * @returns {Promise<boolean>} - True nếu token hợp lệ
 */
export const checkAuthStatus = async () => {
  const token = getToken();
  
  if (!token) {
    return false;
  }

  try {
    const result = await validateToken(token);
    return result.isValid;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};
