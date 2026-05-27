import express from "express";
import {
    cancelBooking,
    createBookingService,
    getAllBookingsService,
    getUserBookings,
    updateBookingStatusService
} from "../controllers/bookingController.js";

const router = express.Router();

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

router.post("/", authMiddleware, createBookingService);

router.patch(
    "/:id/status",
    authMiddleware,
    roleMiddleware("admin"),
    updateBookingStatusService,
);
router.put("/cancel/:id", cancelBooking);

router.get("/user/:userId", getUserBookings);
router.get("/", getAllBookingsService);

export default router;