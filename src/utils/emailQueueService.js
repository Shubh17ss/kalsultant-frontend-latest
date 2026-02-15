// Email Queue Service - handles all email queue operations
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const EMAILS_COLLECTION = 'email_queue';

/**
 * Add email to the queue (unique storage)
 * @param {string} email - Email address to store
 * @returns {Promise<{success: boolean, id?: string, message: string}>}
 */
export const addEmailToQueue = async (email) => {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Invalid email format' };
    }

    // Check if email already exists
    const emailsRef = collection(db, EMAILS_COLLECTION);
    const q = query(emailsRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: false, message: 'Email already registered' };
    }

    // Add email to Firestore with timestamp
    const docRef = await addDoc(emailsRef, {
      email: email.toLowerCase(),
      createdAt: serverTimestamp(),
      status: 'active'
    });

    return { success: true, id: docRef.id, message: 'Email registered successfully' };
  } catch (error) {
    console.error('Error adding email to queue:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Get all emails from the queue
 * @returns {Promise<{success: boolean, emails?: Array, message: string}>}
 */
export const getAllEmails = async () => {
  try {
    const emailsRef = collection(db, EMAILS_COLLECTION);
    const querySnapshot = await getDocs(emailsRef);
    const emails = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { success: true, emails, message: 'Emails retrieved successfully' };
  } catch (error) {
    console.error('Error retrieving emails:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Check if email exists in queue
 * @param {string} email - Email to check
 * @returns {Promise<{exists: boolean, data?: object}>}
 */
export const checkEmailExists = async (email) => {
  try {
    const emailsRef = collection(db, EMAILS_COLLECTION);
    const q = query(emailsRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { exists: true, data: querySnapshot.docs[0].data() };
    }
    return { exists: false };
  } catch (error) {
    console.error('Error checking email:', error);
    return { exists: false };
  }
};

/**
 * Count total emails in queue
 * @returns {Promise<{success: boolean, count?: number, message: string}>}
 */
export const getEmailCount = async () => {
  try {
    const emailsRef = collection(db, EMAILS_COLLECTION);
    const querySnapshot = await getDocs(emailsRef);
    return { success: true, count: querySnapshot.size, message: 'Count retrieved successfully' };
  } catch (error) {
    console.error('Error counting emails:', error);
    return { success: false, message: error.message };
  }
};
