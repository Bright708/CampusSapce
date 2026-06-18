import supabase from "../config/supabase.js";

export const getEvents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        rooms(*),
        profiles(*)
      `,
      )
      .eq("booking_type", "event")
      .eq("status", "approved")
      .order("booking_date", {
        ascending: true,
      });

    if (error) throw error;

    res.status(200).json({
      success: true,
      events: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
