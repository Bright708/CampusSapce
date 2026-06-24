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
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "Coming Soon":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "rejected":
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <section className="flex w-full flex-col gap-4 ">
      {/* HEADING */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-950">Upcoming Bookings</h1>
      </div>

      {/* BOOKINGS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i}>
              <BookingCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(upcomingBookings || []).map((booking, index) => (
            <motion.div
              key={booking.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* HEADER */}
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-blue-950">
                    {booking.rooms?.name}
                  </h2>

                  <p className="text-xs text-slate-500">
                    {booking.booking_type === "event"
                      ? "Campus Event"
                      : "Room Reservation"}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    booking.status,
                  )}`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </div>

              {/* DATE/TIME */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <AccessTimeIcon sx={{ fontSize: 18 }} />

                  <p className="text-sm">{booking.booking_date}</p>
                </div>

                <div className="pl-7 text-sm font-medium text-blue-950">
                  {booking.start_time} - {booking.end_time}
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <LocationOnIcon sx={{ fontSize: 18 }} />

                  <p className="text-sm">{booking.rooms?.building}</p>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-4 border-t border-slate-100 pt-3">
                <Link
                  to={`events/${booking.id}`}
                  className="text-sm font-semibold text-blue-950 transition-all hover:underline"
                >
                  View Details <ArrowRightAltIcon />
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
