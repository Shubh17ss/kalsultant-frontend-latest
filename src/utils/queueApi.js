// Thin fetch wrapper for the new queue/booking backend.
// Base URL comes from NEXT_PUBLIC_QUEUE_API_URL (see .env).
const BASE = (process.env.NEXT_PUBLIC_QUEUE_API_URL || '').replace(/\/$/, '');

const request = async (path, options = {}) => {
    const res = await fetch(BASE + path, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    let data = {};
    try {
        data = await res.json();
    } catch (_) {
        // non-JSON response
    }
    return { ok: res.ok, status: res.status, data };
};

// ---- Queue ----
export const joinQueue = (email, name) =>
    request('/api/queue/signup', { method: 'POST', body: JSON.stringify({ email, name }) });

export const verifyOtp = (email, otp) =>
    request('/api/queue/verify-otp', { method: 'POST', body: JSON.stringify({ email, otp }) });

export const resendOtp = (email) =>
    request('/api/queue/resend-otp', { method: 'POST', body: JSON.stringify({ email }) });

export const getQueueStatus = (email) =>
    request(`/api/queue/status?email=${encodeURIComponent(email)}`);

// ---- Newsletter ----
export const subscribeNewsletter = (name, email, zodiac) =>
    request('/api/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ name, email, zodiac }),
    });

// ---- Invite / booking ----
export const getInvite = (token) => request(`/api/invite/${encodeURIComponent(token)}`);

export const selectSlot = (token, payload) =>
    request(`/api/invite/${encodeURIComponent(token)}/select-slot`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });

export const confirmPayment = (bookingId, paymentIntentId) =>
    request('/api/payment/confirm', {
        method: 'POST',
        body: JSON.stringify({ bookingId, paymentIntentId }),
    });

export const getBooking = (bookingId) =>
    request(`/api/payment/booking/${encodeURIComponent(bookingId)}`);
