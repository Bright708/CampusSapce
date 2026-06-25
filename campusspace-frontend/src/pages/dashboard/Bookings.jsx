import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import useAuthStore from "../../store/authstore";

import {
  cancelBooking,
  getUserBookings,
} from "../../services/bookingServices";

import { BookingCardSkeleton } from "../../components/skeletons";

const Bookings = () => {
  const user = useAuthStore((state) => state.user);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getUserBookings(user.id);

      setBookings(response.bookings || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return `
          bg-emerald-100
          text-emerald-700
          dark:bg-emerald-900/30
          dark:text-emerald-400
        `;

      case "pending":
        return `
          bg-amber-100
          text-amber-700
          dark:bg-amber-900/30
          dark:text-amber-400
        `;

      case "cancelled":
        return `
          bg-red-100
          text-red-700
          dark:bg-red-900/30
          dark:text-red-400
        `;

      case "rejected":
        return `
          bg-slate-200
          text-slate-700
          dark:bg-slate-700
          dark:text-slate-300
        `;

      default:
        return `
          bg-slate-100
          text-slate-700
          dark:bg-slate-700
          dark:text-slate-300
        `;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <div className="h-10 w-64 rounded-xl bg-white dark:bg-slate-800" />
          <div className="mt-3 h-4 w-80 rounded-xl bg-white dark:bg-slate-800" />
        </div>

        <div className="grid gap-5">
          {[...Array(6)].map((_, index) => (
            <BookingCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-blue-950 dark:text-white">
          My Bookings
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          View, manage and track all your reservations.
        </p>
      </div>

      {/* BOOKINGS */}
      <div className="grid gap-5">
        {bookings.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-10
              text-center
              shadow-sm
              dark:border-slate-700
              dark:bg-slate-800
            "
          >
            <h2 className="text-2xl font-semibold text-blue-950 dark:text-white">
              No bookings yet
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Start reserving rooms to see them here.
            </p>
          </div>
        ) : (
          bookings.map((booking) => (
            <motion.div
              key={booking.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="
                flex
                flex-col
                gap-5
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:shadow-lg
                dark:border-slate-700
                dark:bg-slate-800
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              {/* LEFT */}
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="text-xl font-bold text-blue-950 dark:text-white">
                    {booking.rooms?.name}
                  </h2>

                  <p className="text-slate-500 dark:text-slate-400">
                    {booking.rooms?.building}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <span>{booking.booking_date}</span>

                  <span>
                    {booking.start_time} - {booking.end_time}
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-start gap-3 lg:items-end">
                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    ${getStatusColor(booking.status)}
                  `}
                >
                  {booking.status}
                </span>

                {booking.status !== "cancelled" &&
                  booking.status !== "rejected" && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="
                        rounded-xl
                        bg-red-500
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:bg-red-600
                      "
                    >
                      Cancel Booking
                    </button>
                  )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;