import { useState } from "react";

import Modal from "react-modal";

import { motion } from "framer-motion";

import useAuthStore from "../../store/authstore";

import { createBooking } from "../../services/bookingServices";

Modal.setAppElement("#root");

const BookingModal = ({ isOpen, onClose, room }) => {
  const user = useAuthStore((state) => state.user);

  const [bookingDate, setBookingDate] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // SUBMIT BOOKING

  const handleBooking = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // BASIC VALIDATION
    if (!bookingDate || !startTime || !endTime) {
      return setError("Please fill all fields");
    }

    if (startTime >= endTime) {
      return setError("End time must be after start time");
    }

    try {
      setLoading(true);

      const bookingData = {
        room_id: room.id,
        booking_date: bookingDate,
        start_time: startTime,
        end_time: endTime,
        event_title: eventTitle,
      };

      const response = await createBooking(bookingData);

      if (response.success) {
        setSuccess("Booking created successfully!");

        // RESET
        setBookingDate("");
        setStartTime("");
        setEndTime("");
        setEventTitle("");

        // CLOSE AFTER DELAY
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="
        mx-auto mt-20
        w-[95%]
        max-w-2xl
        rounded-3xl
        bg-white
        p-8
        outline-none
      "
      overlayClassName="
        fixed inset-0
        bg-black/40
        backdrop-blur-sm
        z-50
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
      >
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-950">Book Room</h1>

            <p className="mt-1 text-gray-500">{room.name}</p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-400 transition-all duration-300 hover:text-red-500"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleBooking} className="flex flex-col gap-6">
          {/* DATE */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-950">Booking Date</label>

            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:border-blue-950"
            />
          </div>
          <input
            type="text"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="h-12 rounded-xl border px-4"
          />

          {/* TIMES */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* START */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-950">Start Time</label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:border-blue-950"
              />
            </div>

            {/* END */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-950">End Time</label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:border-blue-950"
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="rounded-2xl bg-red-100 p-4 text-red-600">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="rounded-2xl bg-green-100 p-4 text-green-600">
              {success}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="h-14 flex-1 rounded-2xl border border-gray-300 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-14 flex-1 rounded-2xl bg-blue-950 font-semibold text-white transition-all duration-300 hover:opacity-80"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
};

export default BookingModal;
