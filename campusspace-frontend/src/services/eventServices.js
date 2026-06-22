import axios from "axios";
const api =
    import.meta.env.VITE_API_URL;
const API_URL = `${api}/api/events`;

export const getEvents = async() => {
    const response = await axios.get(API_URL);

    return response.data.events;
};