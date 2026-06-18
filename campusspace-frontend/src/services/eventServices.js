import axios from "axios";

const API_URL = "http://localhost:3000/api/events";

export const getEvents = async () => {
  const response = await axios.get(API_URL);

  return response.data.events;
};
