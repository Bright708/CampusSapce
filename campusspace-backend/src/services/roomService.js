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
export const deleteRoomService = async(id) => {
    const { error } = await supabase.from("rooms").delete().eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
};
export const updateRoomService = async(id, roomData) => {
    const { data, error } = await supabase
        .from("rooms")
        .update(roomData)
        .eq("id", id)
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