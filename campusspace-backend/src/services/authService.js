import supabase from "../config/supabase.js";

export const signUpUser = async(userData) => {
    const { email, password, full_name, role, department } = userData;

    // Create auth user
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (error) {
        throw new Error(error.message);
    }

    const user = data.user;

    // Create profile
    const { error: profileError } = await supabase.from("profiles").insert([{
        id: user.id,
        email,
        full_name,
        role,
        department,
    }, ]);

    if (profileError) {
        throw new Error(profileError.message);
    }

    return user;
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