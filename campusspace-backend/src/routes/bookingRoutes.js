import express from "express";

import {
    cancelBooking,
    createBooking,
    getAllBookings,
    getUserBookings,
    updateBookingStatus,
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);

router.get("/", authMiddleware, getAllBookings);

router.get("/user/:userId", authMiddleware, getUserBookings);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateBookingStatus,
);

router.put("/cancel/:id", authMiddleware, cancelBooking);

export default router;
