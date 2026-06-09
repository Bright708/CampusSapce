import axios from "axios";

const API_URL = "http://localhost:3000/api/rooms";

// GET ALL ROOMS
export const getRooms = async () => {
  const response = await axios.get(API_URL);

  return response.data.rooms;
};

//CREATE ROOM
export const createRoom = async (roomData) => {
  const response = await axios.post(API_URL, roomData);
  return response.data.room;
};
