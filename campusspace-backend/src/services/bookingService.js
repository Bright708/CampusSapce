import supabase from "../config/supabase.js";

export const createBookingService = async(bookingData) => {
    const { data, error } = await supabase
        .from("bookings")
        .insert([bookingData])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getAllBookingsService = async() => {
    const { data, error } = await supabase
        .from("bookings")
        .select(
            `
      *,
      profiles(full_name, email),
      rooms(name, building)
    `,
        )
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
export const updateBookingStatusService = async(id, status, admin_notes) => {
    const { data, error } = await supabase
        .from("bookings")
        .update({
            status,
            admin_notes,
        })
        .eq("id", id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};