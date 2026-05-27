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
