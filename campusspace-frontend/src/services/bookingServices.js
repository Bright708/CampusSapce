import axios from "axios";
import { supabase } from "../lib/supabase";
import useAuthStore from "../store/authstore";
const API = "http://localhost:3000/api/bookings";
// CREATE BOOKING
export const createBooking = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const token = session.access_token;
  const response = await axios.post(`${API}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// GET USER BOOKINGS
export const getUserBookings = async (userId) => {
  const authState = useAuthStore.getState();
  const token = authState.session ? authState.session.access_token : null;
  console.log(authState);
  console.log(token);
  const response = await axios.get(`${API}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}; // CANCEL BOOKING
export const cancelBooking = async (bookingId) => {
  const response = await axios.put(`${API}/cancel/${bookingId}`);

  return response.data;
};
export const getAllBookings = async () => {
  const authState = useAuthStore.getState();
  const token = authState.session ? authState.session.access_token : null;

  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateBookingStatus = async (
  bookingId,
  status,
  admin_notes = "",
) => {
  const authState = useAuthStore.getState();
  const token = authState.session ? authState.session.access_token : null;

  const response = await axios.patch(
    `${API}/${bookingId}/status`,
    {
      status,
      admin_notes,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
