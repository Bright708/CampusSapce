import {
    cancelBookingService,
    createBookingService,
    getAllBookingsService,
    getBookingByIdService,
    getUserBookingsService,
    updateBookingStatusService,
} from "../services/bookingService.js";
import { createNotificationService } from "../services/notificationService.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      user_id: req.user.id,
    };

    const booking = await createBookingService(bookingData);

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL BOOKINGS
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await getAllBookingsService();

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USER BOOKINGS
export const getUserBookings = async (req, res) => {
  try {
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view these bookings",
      });
    }
    const bookings = await getUserBookingsService(req.params.userId);

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE STATUS
export const updateBookingStatus = async (req, res) => {
  try {
    const { status, admin_notes } = req.body;

    const booking = await updateBookingStatusService(
      req.params.id,
      status,
      admin_notes,
    );
    console.log("BOOKING:", booking);

    await createNotificationService(
      booking.user_id,
      `Your booking for ${booking.rooms.name} has been ${status}`,
    );

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log("NOTIFICATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const booking = await cancelBookingService(req.params.id);

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await getBookingByIdService(req.params.id);

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
