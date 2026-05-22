import express from "express";

import {
    createBooking,
    getAllBookings,
    updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

router.post("/", authMiddleware, createBooking);

router.patch(
    "/:id/status",
    authMiddleware,
    roleMiddleware("admin"),
    updateBookingStatus,
);
router.get("/", getAllBookings);

export default router;