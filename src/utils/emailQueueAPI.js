/**
 * Email Queue API Service
 * This service makes HTTP calls to Cloud Functions API endpoints
 * Use this when you need backend access or API integration
 */

// Note: Update this with your actual Cloud Function URL after deployment
// Format: https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net
const CLOUD_FUNCTIONS_BASE_URL = import.meta.env.REACT_APP_CLOUD_FUNCTIONS_URL || '';

/**
 * Add email via API endpoint
 * @param {string} email - Email to add
 * @returns {Promise<{success: boolean, id?: string, message: string}>}
 */
export const addEmailViaAPI = async (email) => {
  try {
    if (!CLOUD_FUNCTIONS_BASE_URL) {
      throw new Error('Cloud Functions URL not configured');
    }

    const response = await fetch(`${CLOUD_FUNCTIONS_BASE_URL}/addEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to add email' };
    }

    return data;
  } catch (error) {
    console.error('Error adding email via API:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Get all emails via API endpoint
 * @param {number} limit - Maximum number of emails to retrieve
 * @returns {Promise<{success: boolean, emails?: Array, count?: number, message: string}>}
 */
export const getEmailsViaAPI = async (limit = 1000) => {
  try {
    if (!CLOUD_FUNCTIONS_BASE_URL) {
      throw new Error('Cloud Functions URL not configured');
    }

    const response = await fetch(
      `${CLOUD_FUNCTIONS_BASE_URL}/getEmails?limit=${limit}`
    );

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to retrieve emails' };
    }

    return data;
  } catch (error) {
    console.error('Error retrieving emails via API:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Get email count via API endpoint
 * @returns {Promise<{success: boolean, count?: number, message: string}>}
 */
export const getEmailCountViaAPI = async () => {
  try {
    if (!CLOUD_FUNCTIONS_BASE_URL) {
      throw new Error('Cloud Functions URL not configured');
    }

    const response = await fetch(
      `${CLOUD_FUNCTIONS_BASE_URL}/getEmailCount`
    );

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to get count' };
    }

    return data;
  } catch (error) {
    console.error('Error getting email count via API:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Check if email exists via API endpoint
 * @param {string} email - Email to check
 * @returns {Promise<{success: boolean, exists: boolean, data?: object, message: string}>}
 */
export const checkEmailViaAPI = async (email) => {
  try {
    if (!CLOUD_FUNCTIONS_BASE_URL) {
      throw new Error('Cloud Functions URL not configured');
    }

    const response = await fetch(
      `${CLOUD_FUNCTIONS_BASE_URL}/checkEmail`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, exists: false, message: data.message || 'Failed to check email' };
    }

    return data;
  } catch (error) {
    console.error('Error checking email via API:', error);
    return { success: false, exists: false, message: error.message };
  }
};
