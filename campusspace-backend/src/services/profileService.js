import { supabase } from "../config/supabase.js";

export const getProfilesService = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
};
export const updateProfileService = async (id, profileData) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const uploadAvatar = async (file, userId) => {
  const fileExt = file.name.split(".").pop();

  const fileName = `${userId}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

  return data.publicUrl;
};
