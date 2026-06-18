import axios from "axios";
import useAuthStore from "../store/authstore";

const API_URL = "http://localhost:3000/api/rooms";

// GET ALL ROOMS
export const getRooms = async() => {
    const response = await axios.get(API_URL);

    return response.data.rooms;
};

//CREATE ROOM
export const createRoom = async(roomData) => {
    const authState = useAuthStore.getState();

    const token = authState.session ? authState.session.access_token : null;

    const response = await axios.post(API_URL, roomData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
export const updateRoom = async(roomId, roomData) => {
    const authState = useAuthStore.getState();
    const token = authState.session ? authState.session.access_token : null;

    const response = await axios.put(`${API_URL}/${roomId}`, roomData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
export const deleteRoom = async(roomId) => {
    const authState = useAuthStore.getState();

    const token = authState.session ? authState.session.access_token : null;

    const response = await axios.delete(`${API_URL}/${roomId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};