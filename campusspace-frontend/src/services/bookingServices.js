import axios from "axios";

const API = "http://localhost:3000/api/bookings";

// CREATE BOOKING
export const createBooking = async(bookingData) => {
    const response = await axios.post(API, bookingData);

    return response.data;
};

// GET USER BOOKINGS
export const getUserBookings = async(userId) => {
    const response = await axios.get(`${API}/user/${userId}`);

    return response.data;
};
// CANCEL BOOKING
export const cancelBooking = async(bookingId) => {
    const response = await axios.put(`${API}/cancel/${bookingId}`);

    return response.data;
};