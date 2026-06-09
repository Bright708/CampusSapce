import { useEffect, useState } from "react";
import {
  getAllBookings,
  updateBookingStatus,
} from "../../services/bookingServices";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();

      setBookings(response.bookings || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "cancelled":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <h2 className="text-lg font-medium">Loading bookings...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-blue-950">Manage Bookings</h1>

        <p className="text-gray-500 mt-1">Review and manage room bookings</p>
      </div>

      {/* Empty State */}

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow">
          <h2 className="text-xl font-medium">No bookings found</h2>
        </div>
      ) : (
        <div className="grid gap-5">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow p-5 flex flex-col gap-4"
            >
              {/* Top Row */}

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-blue-950">
                    {booking.rooms?.name}
                  </h2>

                  <p className="text-gray-500">{booking.rooms?.building}</p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusColor(
                    booking.status,
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Booking Details */}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Student</p>

                  <p className="font-medium">{booking.profiles?.full_name}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Date</p>

                  <p className="font-medium">{booking.booking_date}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Start Time</p>

                  <p className="font-medium">{booking.start_time}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">End Time</p>

                  <p className="font-medium">{booking.end_time}</p>
                </div>
              </div>

              {/* Actions */}

              {booking.status === "pending" && (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleStatusUpdate(booking.id, "approved")}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(booking.id, "rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
