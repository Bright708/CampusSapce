import axios from "axios";
import { supabase } from "../lib/supabase";

const API = "http://localhost:3000/api/notifications";

export const getNotifications = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  console.log("NOTIFICATIONS API:", response.data);

  return response.data.notifications;
};

export const markAsRead = async (id) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await axios.patch(
    `${API}/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    },
  );

  return response.data;
};
