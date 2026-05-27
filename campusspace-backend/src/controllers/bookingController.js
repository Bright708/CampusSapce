import supabase from "../config/supabase.js";
import { cancelBookingService } from "../services/bookingService.js";

// CREATE BOOKING

export const createBookingService = async(bookingData) => {
    const { user_id, room_id, booking_date, start_time, end_time } = bookingData;

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
        .insert([{
            user_id,
            room_id,
            booking_date,
            start_time,
            end_time,
            status: "pending",
        }, ])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};

// GET ALL BOOKINGS

export const getAllBookingsService = async() => {
    const { data, error } = await supabase.from("bookings").select(`
        *,
        rooms(*),
        profiles(*)
      `);

    if (error) {
        throw error;
    }

    return data;
};

// UPDATE BOOKING STATUS

export const updateBookingStatusService = async(
    bookingId,
    status,
    admin_notes,
) => {
    const { data, error } = await supabase
        .from("bookings")
        .update({
            status,
            admin_notes,
        })
        .eq("id", bookingId)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};
export const getUserBookings = async(req, res) => {
    try {
        const { userId } = req.params;

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

        res.status(200).json({
            success: true,
            bookings: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const cancelBooking = async(req, res) => {
    try {
        const booking = await cancelBookingService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Booking cancelled",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};