import { useEffect, useState } from "react";

import { cancelBooking, getUserBookings } from "../../services/bookingServices";

import useAuthStore from "../../store/authstore";

import { motion } from "framer-motion";

const Bookings = () => {
  const user = useAuthStore((state) => state.user);

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);

  // FETCH BOOKINGS

  const fetchBookings = async () => {
    try {
      const response = await getUserBookings(user.id);

      setBookings(response.bookings);
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

  // CANCEL BOOKING

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  // STATUS COLORS
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-600";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-600";

      case "rejected":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return <h1>Loading bookings...</h1>;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-blue-950">My Bookings</h1>

        <p className="mt-2 text-gray-500">Manage your room reservations</p>
      </div>

      {/* BOOKINGS */}
      <div className="grid grid-cols-1 gap-6">
        {bookings.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-blue-950">
              No bookings yet
            </h1>

            <p className="mt-2 text-gray-500">
              Start reserving rooms to see them here.
            </p>
          </div>
        ) : (
          bookings.map((booking) => (
            <motion.div
              key={booking.id}
              whileHover={{
                y: -3,
              }}
              className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg lg:flex-row lg:items-center lg:justify-between"
            >
              {/* LEFT */}
              <div className="flex flex-col gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-blue-950">
                    {booking.rooms.name}
                  </h1>

                  <p className="text-gray-500">{booking.rooms.building}</p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span> {booking.booking_date}</span>

                  <span>
                    {booking.start_time} - {booking.end_time}
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-start gap-4 lg:items-end">
                {/* STATUS */}
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                    booking.status,
                  )}`}
                >
                  {booking.status}
                </span>

                {/* CANCEL */}
                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition-all duration-300 hover:opacity-80"
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
