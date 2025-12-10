// Blog API Service
//const API_BASE_URL = 'https://localhost:7265/api/blog';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/blog`
    : 'https://api.MATECOM.org/api/blog';


/**
 * Get auth token from localStorage
 * @returns {string|null}
 */
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

/**
 * Get auth headers
 * @returns {Object}
 */
const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

/**
 * Get all blog posts with filtering and pagination
 * @param {Object} filter - Filter parameters
 * @returns {Promise<Object>}
 */
export const getBlogPosts = async (filter = {}) => {
    try {
        const params = new URLSearchParams();

        if (filter.searchTerm) params.append('searchTerm', filter.searchTerm);
        if (filter.status) params.append('status', filter.status);
        if (filter.lang) params.append('lang', filter.lang);
        if (filter.category) params.append('category', filter.category);
        if (filter.tag) params.append('tag', filter.tag);
        if (filter.isActive !== undefined) params.append('isActive', filter.isActive.toString());
        if (filter.page) params.append('page', filter.page.toString());
        if (filter.size) params.append('size', filter.size.toString());
        if (filter.sortBy) params.append('sortBy', filter.sortBy);
        if (filter.sortOrder) params.append('sortOrder', filter.sortOrder);

        const response = await fetch(`${API_BASE_URL}?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching blog posts');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
    }
};

/**
 * Get blog post by slug
 * @param {string} slug - Blog post slug
 * @param {string} lang - Language (default: 'vi')
 * @returns {Promise<Object>}
 */
export const getBlogPostBySlug = async (slug, lang = 'vi') => {
    try {
        const response = await fetch(`${API_BASE_URL}/${slug}?lang=${lang}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Blog post not found');
            }
            throw new Error('Error fetching blog post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching blog post by slug:', error);
        throw error;
    }
};

/**
 * Get blog post by ID
 * @param {string} id - Blog post ID
 * @returns {Promise<Object>}
 */
export const getBlogPostById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/id/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Blog post not found');
            }
            throw new Error('Error fetching blog post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching blog post by ID:', error);
        throw error;
    }
};

/**
 * Search blog posts
 * @param {string} searchTerm - Search term
 * @param {number} limit - Maximum results (default: 10)
 * @returns {Promise<Array>}
 */
export const searchBlogPosts = async (searchTerm, limit = 10) => {
    try {
        const params = new URLSearchParams();
        params.append('q', searchTerm);
        params.append('limit', limit.toString());

        const response = await fetch(`${API_BASE_URL}/search?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error searching blog posts');
        }

        return await response.json();
    } catch (error) {
        console.error('Error searching blog posts:', error);
        throw error;
    }
};

/**
 * Get all categories
 * @returns {Promise<Array>}
 */
export const getAllCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching categories');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

/**
 * Get all tags
 * @returns {Promise<Array>}
 */
export const getAllTags = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/tags`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching tags');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
};

/**
 * Create new blog post (Admin only)
 * @param {Object} blogPost - Blog post data
 * @returns {Promise<Object>}
 */
export const createBlogPost = async (blogPost) => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(blogPost)
        });

        if (!response.ok) {
            throw new Error('Error creating blog post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating blog post:', error);
        throw error;
    }
};

/**
 * Update blog post (Admin only)
 * @param {string} id - Blog post ID
 * @param {Object} blogPost - Updated blog post data
 * @returns {Promise<Object>}
 */
export const updateBlogPost = async (id, blogPost) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(blogPost)
        });

        if (!response.ok) {
            throw new Error('Error updating blog post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating blog post:', error);
        throw error;
    }
};

/**
 * Delete blog post (Admin only)
 * @param {string} id - Blog post ID
 * @returns {Promise<void>}
 */
export const deleteBlogPost = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Error deleting blog post');
        }
    } catch (error) {
        console.error('Error deleting blog post:', error);
        throw error;
    }
};

/**
 * Publish blog post (Admin only)
 * @param {string} id - Blog post ID
 * @returns {Promise<void>}
 */
export const publishBlogPost = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/publish`, {
            method: 'POST',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Error publishing blog post');
        }
    } catch (error) {
        console.error('Error publishing blog post:', error);
        throw error;
    }
};

/**
 * Upload image for blog post (Admin only)
 * @param {File} file - Image file to upload
 * @returns {Promise<Object>} - Upload result with image URL
 */
export const uploadBlogImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/upload-image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error uploading image');
        }

        const result = await response.json();

        // Prepend backend base URL to image path (without /api/blog)
        const backendBaseUrl = 'https://localhost:7265';
        return {
            ...result,
            url: `${backendBaseUrl}${result.url}`
        };
    } catch (error) {
        console.error('Error uploading blog image:', error);
        throw error;
    }
};

/**
 * Archive blog post (Admin only)
 * @param {string} id - Blog post ID
 * @returns {Promise<void>}
 */
export const archiveBlogPost = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/archive`, {
            method: 'POST',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Error archiving blog post');
        }
    } catch (error) {
        console.error('Error archiving blog post:', error);
        throw error;
    }
};
