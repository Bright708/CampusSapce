import express from "express";
import {
    createRoom,
    deleteRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
} from "../controllers/roomController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllRooms);

router.post("/", authMiddleware, roleMiddleware("admin"), createRoom);

router.put("/:id", authMiddleware, roleMiddleware("admin"), updateRoom);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteRoom);
router.get("/:id", getRoomById);

export default router;