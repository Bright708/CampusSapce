import supabase from "../config/supabase.js";

export const createNotificationService = async (userId, message) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert([
      {
        user_id: userId,
        message,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const getUserNotificationsService = async (userId) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
};

export const markNotificationReadService = async (id) => {
  const { data, error } = await supabase
    .from("notifications")
    .update({
      is_read: true,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};
