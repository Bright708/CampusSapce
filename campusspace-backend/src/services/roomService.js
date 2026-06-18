import supabase from "../config/supabase.js";

export const createRoomService = async(roomData) => {
    const { data, error } = await supabase
        .from("rooms")
        .insert([roomData])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getAllRoomsService = async() => {
    const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
export const deleteRoomService = async(roomId) => {
    const { error } = await supabase.from("rooms").delete().eq("id", roomId);

    if (error) {
        throw new Error(error.message);
    }
    return true;
};
export const updateRoomService = async(roomId, roomData) => {
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

async(bookingId) => {
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