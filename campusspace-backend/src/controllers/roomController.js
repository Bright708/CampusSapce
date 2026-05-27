import {
    createRoomService,
    deleteRoomService,
    getAllRoomsService,
    updateRoomService,
} from "../services/roomService.js";
export const createRoom = async(req, res) => {
    try {
        const room = await createRoomService(req.body);

        res.status(201).json({
            success: true,
            message: "Room created successfully",
            room,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllRooms = async(req, res) => {
    try {
        const rooms = await getAllRoomsService();

        res.status(200).json({
            success: true,
            rooms,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateRoom = async(req, res) => {
    try {
        const room = await updateRoomService(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Room updated successfully",
            room,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteRoom = async(req, res) => {
    try {
        await deleteRoomService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Room deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET SINGLE ROOM

export const getRoomById = async(req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from("rooms")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            room: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};