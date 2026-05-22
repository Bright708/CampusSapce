import {
    createBookingService,
    getAllBookingsService,
    updateBookingStatusService,
} from "../services/bookingService.js";

export const createBooking = async(req, res) => {
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
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getAllBookings = async(req, res) => {
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

export const updateBookingStatus = async(req, res) => {
    try {
        const { status, admin_notes } = req.body;

        const booking = await updateBookingStatusService(
            req.params.id,
            status,
            admin_notes,
        );

        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};