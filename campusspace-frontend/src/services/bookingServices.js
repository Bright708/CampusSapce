import axios from "axios";
import { supabase } from "../lib/supabase";
import useAuthStore from "../store/authstore";
const API = "http://localhost:3000/api/bookings";
// CREATE BOOKING
export const createBooking = async (bookingData) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const token = session.access_token;

  const response = await axios.post(API, bookingData, {
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

  const response = await axios.get(`${API}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}; // CANCEL BOOKING
export const cancelBooking = async (bookingId) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const response = await axios.put(
    `${API}/cancel/${bookingId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    },
  );

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
  roomData,
  admin_notes = "",
) => {
  const authState = useAuthStore.getState();
  const token = authState.session ? authState.session.access_token : null;

  const response = await axios.patch(
    `${API}/${bookingId}/status`,
    {
      status,
      admin_notes,
      roomData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getBookingById = async (id) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  return response.data.booking;
};
