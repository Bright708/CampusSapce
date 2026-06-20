import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
      setUpcomingBookings(
        data.filter((booking) => booking.status !== "cancelled").slice(0, 6),
      );
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
    <section className="flex w-full flex-col gap-6">
      {/* HEADING */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-950">Upcoming Bookings</h1>
      </div>

      {/* BOOKINGS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
              key={index}
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* STATUS */}
              <div
                className={`w-fit rounded-full px-4 py-1 text-sm font-semibold ${getStatusStyle(
                  booking.status,
                )}`}
              >
                {booking.status.toUpperCase()}
              </div>

              {/* ROOM */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-blue-950">
                  {booking.rooms?.name}
                </h2>

                <div className="flex items-center gap-2 text-gray-500">
                  <AccessTimeIcon fontSize="small" />

                  <p className="text-sm">
                    {booking.booking_date} . {booking.start_time} -{" "}
                    {booking.end_time}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <LocationOnIcon fontSize="small" />

                  <p className="text-sm">{booking.rooms?.building}</p>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button className="mt-2 h-12 rounded-2xl bg-blue-950 text-sm font-semibold text-white transition-all duration-300 hover:opacity-80">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingBookings;
