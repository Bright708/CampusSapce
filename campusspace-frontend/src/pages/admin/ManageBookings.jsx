import { useEffect, useState } from "react";
import BookingReviewModal from "../../components/admin/BookingReviewModal";
import { BookingCardSkeleton } from "../../components/skeletons";
import {
  getAllBookings,
  updateBookingStatus,
} from "../../services/bookingServices";
const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showReviewModal, setShowReviewModal] = useState(false);

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
  const total = bookings.length;

  const pending = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const approved = bookings.filter(
    (booking) => booking.status === "approved",
  ).length;

  const rejected = bookings.filter(
    (booking) => booking.status === "rejected",
  ).length;
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
      <div className="flex flex-col gap-6">
        <div>
          <div className="h-10 w-72 rounded-2xl bg-white" />
          <div className="mt-3 h-5 w-96 rounded-2xl bg-white" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow">
              <div className="h-5 w-28 rounded-2xl bg-gray-100" />
              <div className="mt-4 h-10 w-16 rounded-2xl bg-gray-100" />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="h-12 w-full md:w-96 rounded-xl bg-white" />
          <div className="h-12 w-full md:w-48 rounded-xl bg-white" />
        </div>

        <div className="grid gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <BookingCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleApprove = async (notes) => {
    try {
      await updateBookingStatus(selectedBooking.id, "approved", notes);

      fetchBookings();

      setShowReviewModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async (notes) => {
    try {
      await updateBookingStatus(selectedBooking.id, "rejected", notes);

      fetchBookings();

      setShowReviewModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.rooms?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-blue-950">Manage Bookings</h1>
        <div className="grid grid-cols-1 text-3xl font-bold sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-xl font-normal">Total</p>
            <h2>{total}</h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-xl font-normal">Pending</p>
            <h2 className="text-yellow-500">{pending}</h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-xl font-normal">Approved</p>
            <h2 className="text-green-600"> {approved}</h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-xl font-normal">Rejected</p>
            <h2 className="text-red-500">{rejected}</h2>
          </div>
        </div>

        <p className="text-gray-500 mt-1">Review and manage room bookings</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl p-3 w-full md:w-80"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl p-3"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Empty State */}

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow">
          <h2 className="text-xl font-medium">No bookings found</h2>
        </div>
      ) : (
        <div className="grid gap-5">
          {filteredBookings.map((booking) => (
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
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowReviewModal(true);
                    }}
                    className="bg-blue-950 text-white px-4 py-2 rounded-xl"
                  >
                    Review
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {showReviewModal && (
        <BookingReviewModal
          booking={selectedBooking}
          onClose={() => setShowReviewModal(false)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default ManageBookings;
