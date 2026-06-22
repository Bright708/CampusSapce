import axios from "axios";
import { supabase } from "../lib/supabase";

const api =
    import.meta.env.VITE_API_URL;
const API = `${api}/api/notifications`;

export const getNotifications = async() => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const response = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    return response.data.notifications;
};

export const markAsRead = async(id) => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const response = await axios.patch(
        `${API}/${id}/read`, {}, {
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        },
    );

    return response.data;
};