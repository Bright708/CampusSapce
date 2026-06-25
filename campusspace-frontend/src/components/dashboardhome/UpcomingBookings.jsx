import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getUserBookings } from "../../services/bookingServices";
import useAuthStore from "../../store/authstore";
import BookingCardSkeleton from "../skeletons/BookingCardSkeleton";

const UpcomingBookings = () => {
  const user = useAuthStore((state) => state.user);

  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings(user.id);

      const now = new Date();

      const upcoming = data.bookings
        .filter((booking) => {
          if (booking.status === "cancelled" || booking.status === "rejected") {
            return false;
          }

          const start = new Date(
            `${booking.booking_date}T${booking.start_time}`,
          );

          return start > now;
        })
        .sort(
          (a, b) =>
            new Date(`${a.booking_date}T${a.start_time}`) -
            new Date(`${b.booking_date}T${b.start_time}`),
        )
        .slice(0, 6);

      setUpcomingBookings(upcoming);
    } catch (error) {
      console.log(error);
      setUpcomingBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700";

      case "pending":
        return "bg-amber-100 text-amber-700";

      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-sky-100 text-sky-700";
    }
  };

  const getCardAccent = (status) => {
    switch (status) {
      case "approved":
        return "border-l-4 border-l-emerald-500";

      case "pending":
        return "border-l-4 border-l-amber-500";

      default:
        return "border-l-4 border-l-sky-500";
    }
  };

  return (
    <section className="flex w-full flex-col gap-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-blue-950 dark:text-white">
            Upcoming Bookings
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your next reservations and events
          </p>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      ) : upcomingBookings.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-lg font-bold text-blue-950 dark:text-white">
            No Upcoming Bookings
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Your future room reservations will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {upcomingBookings.map((booking) => (
            <motion.div
              key={booking.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`rounded-3xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-slate-800 ${getCardAccent(
                booking.status,
              )}`}
            >
              {/* TOP */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {booking.booking_type === "event"
                      ? "Campus Event"
                      : "Room Reservation"}
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-blue-950 dark:text-white">
                    {booking.rooms?.name}
                  </h2>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    booking.status,
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="rounded-xl bg-sky-100 p-2">
                    <AccessTimeIcon sx={{ fontSize: 18 }} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {booking.booking_date}
                    </p>

                    <p className="text-xs text-slate-500">
                      {booking.start_time} - {booking.end_time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="rounded-xl bg-emerald-100 p-2">
                    <LocationOnIcon sx={{ fontSize: 18 }} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {booking.rooms?.building}
                    </p>

                    <p className="text-xs text-slate-500">Building Location</p>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Link
                  to={`events/${booking.id}`}
                  className="group flex items-center justify-between rounded-2xl bg-blue-950 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-900"
                >
                  View Details
                  <ArrowRightAltIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingBookings;
