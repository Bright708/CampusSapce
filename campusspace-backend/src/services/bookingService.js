import supabase from "../config/supabase.js";

// CREATE BOOKING
export const createBookingService = async (bookingData) => {
  const { user_id, room_id, booking_date, start_time, end_time, event_title } =
    bookingData;

  // CHECK EXISTING BOOKINGS
  const { data: existingBookings, error: bookingError } = await supabase
    .from("bookings")
    .select("*")
    .eq("room_id", room_id)
    .eq("booking_date", booking_date)
    .in("status", ["pending", "approved"]);

  if (bookingError) {
    throw bookingError;
  }

  // OVERLAP CHECK
  const hasOverlap = existingBookings.some((booking) => {
    return start_time < booking.end_time && end_time > booking.start_time;
  });

  if (hasOverlap) {
    throw new Error("Room already booked for this time slot");
  }

  // CREATE BOOKING
  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        user_id,
        room_id,
        booking_date,
        start_time,
        end_time,
        event_title,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
};

// GET ALL BOOKINGS
export const getAllBookingsService = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      *,
      profiles(full_name,email),
      rooms(name,building)
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
};

// UPDATE STATUS
export const updateBookingStatusService = async (id, status, admin_notes) => {
  const { data, error } = await supabase
    .from("bookings")
    .update({
      status,
      admin_notes,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// GET USER BOOKINGS
export const getUserBookingsService = async (userId) => {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      *,
      rooms(*)
    `,
    )
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
};

// CANCEL BOOKING
export const cancelBookingService = async (bookingId) => {
  const { data, error } = await supabase
    .from("bookings")
    .update({
      status: "cancelled",
    })
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
