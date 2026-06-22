import axios from "axios";
import { supabase } from "../lib/supabase";
import useAuthStore from "../store/authstore";
const api =
    import.meta.env.VITE_API_URL;
const API_URL = `${api}/api/profiles`;

export const getProfiles = async() => {
    const authState = useAuthStore.getState();
    const token = authState.session ? authState.session.access_token : null;

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.profiles;
};
export const updateUserRole = async(id, role) => {
    const response = await axios.patch(`${API_URL}/${id}/role`, { role });

    return response.data;
};
export const uploadAvatar = async(file, userId) => {
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
export const updateProfile = async(profileData) => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const response = await axios.patch(API_URL, profileData, {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    return response.data.profile;
};