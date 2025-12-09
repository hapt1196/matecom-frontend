/**
 * Convert File to Base64 string
 * @param {File} file - File object to convert
 * @returns {Promise<string>} Base64 encoded string
 */
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            // Remove data URL prefix (e.g., "data:application/pdf;base64,")
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Get file extension from filename
 * @param {string} filename - Filename
 * @returns {string} Extension without dot
 */
export const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
};
