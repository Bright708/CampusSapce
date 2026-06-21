import supabase from "../config/supabase.js";

export const createRoomService = async (roomData) => {
  const { data, error } = await supabase
    .from("rooms")
    .insert([roomData])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getAllRoomsService = async () => {
  const { data, error } = await supabase
    .from("rooms")
    .select(
      `*
            ,
      bookings (
          id,
          booking_date,
          start_time,
          end_time,
          status
      )
  `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const now = new Date();

  const roomsWithStatus = data.map((room) => {
    let availability = "available";

    // Current booking
    const activeBooking =
      room.bookings &&
      room.bookings.find((booking) => {
        if (booking.status !== "approved") return false;

        const start = new Date(`${booking.booking_date}T${booking.start_time}`);

        const end = new Date(`${booking.booking_date}T${booking.end_time}`);

        return now >= start && now <= end;
      });

    // Upcoming booking
    const upcomingBooking =
      room.bookings &&
      room.bookings
        .filter((booking) => {
          if (booking.status !== "approved") return false;

          const start = new Date(
            `${booking.booking_date}T${booking.start_time}`,
          );

          return start > now;
        })
        .sort(
          (a, b) =>
            new Date(`${a.booking_date}T${a.start_time}`) -
            new Date(`${b.booking_date}T${b.start_time}`),
        )[0];

    if (activeBooking) {
      availability = "occupied";
    } else if (upcomingBooking) {
      availability = "upcoming";
    }

    return {
      ...room,
      availability,
      activeBooking,
      upcomingBooking,
    };
  });

  return roomsWithStatus;
};
export const deleteRoomService = async (roomId) => {
  const { error } = await supabase.from("rooms").delete().eq("id", roomId);

  if (error) {
    throw new Error(error.message);
  }
  return true;
};
export const updateRoomService = async (roomId, roomData) => {
  const { data, error } = await supabase
    .from("rooms")
    .update(roomData)
    .eq("id", roomId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

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
