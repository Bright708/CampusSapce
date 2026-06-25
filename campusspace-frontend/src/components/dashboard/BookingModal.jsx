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
  const [bookingType, setBookingType] = useState("");

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
        user_id: user.id,
        room_id: room.id,
        booking_date: bookingDate,
        start_time: startTime,
        end_time: endTime,
        event_title: eventTitle,
        booking_type: bookingType,
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
  const bookingTitles = {
    meeting: "Meeting",
    lecture: "Lecture",
    study: "Study Session",
    event: "",
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
        dark:bg-slate-900
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
            <h1 className="text-3xl font-bold text-blue-950 dark:text-slate-300">
              Book Room
            </h1>

            <p className="mt-1 text-gray-500 dark:text-slate-400">
              {room.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-400 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleBooking} className="flex flex-col gap-6">
          {/* DATE */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-950 dark:text-slate-300">
              Booking Date
            </label>

            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:border-blue-950 dark:border-slate-700 dark:text-slate-300"
            />
          </div>
          <select
            name="booking_type"
            value={bookingType}
            onChange={(e) => {
              const value = e.target.value;

              setBookingType(value);
              setEventTitle(bookingTitles[value]);
            }}
            className="h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:border-blue-950 dark:border-slate-700 dark:text-slate-300"
          >
            <option value="meeting">Meeting</option>
            <option value="lecture">Lecture</option>
            <option value="study">Study Session</option>
            <option value="event">Event</option>
          </select>
          {bookingType === "event" && (
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="h-12 rounded-xl border px-4 dark:border-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
              required
            />
          )}

          {/* TIMES */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* START */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-950 dark:text-slate-300">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:border-blue-950 dark:border-slate-700 dark:text-slate-300"
              />
            </div>

            {/* END */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-950 dark:text-slate-300">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:border-blue-950 dark:border-slate-700 dark:text-slate-300"
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
              className="h-14 flex-1 rounded-2xl border border-gray-300 font-semibold dark:border-slate-700 dark:text-slate-300
              transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-14 flex-1 rounded-2xl bg-blue-950 font-semibold text-white transition-all duration-300 hover:opacity-80 dark:text-slate-300  dark:bg-blue-600
              dark:hover:bg-blue-500"
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
