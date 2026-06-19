import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBookings } from "../../services/bookingServices";
import { getProfiles } from "../../services/profileServices";
import { getRooms } from "../../services/roomServices";

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersData = await getProfiles();
        const roomsData = await getRooms();
        const bookingsData = await getAllBookings();

        setProfiles(usersData);
        setRooms(roomsData);
        setBookings(bookingsData.bookings);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <h1 className="text-xl font-semibold">Loading Dashboard...</h1>
      </div>
    );
  }

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "approved",
  ).length;

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const filteredBookings = bookings.filter((booking) =>
    booking.rooms?.name?.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-950">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of the CampusSpace platform.
        </p>
      </div>
      <input
        type="text"
        placeholder="Search room..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-xl p-3 w-full md:w-80"
      />

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Total Users</p>

          <h2 className="text-4xl font-bold text-blue-950">
            {profiles.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Total Rooms</p>

          <h2 className="text-4xl font-bold text-blue-950">{rooms.length}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Pending Bookings</p>

          <h2 className="text-4xl font-bold text-yellow-500">
            {pendingBookings}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Approved Bookings</p>

          <h2 className="text-4xl font-bold text-green-600">
            {approvedBookings}
          </h2>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-blue-950 mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to={"/admin/rooms"}
            className="bg-blue-950 text-white rounded-xl p-4 text-center"
          >
            Manage Rooms
          </Link>

          <Link
            to="/admin/bookings"
            className="bg-blue-950 text-white rounded-xl p-4 text-center"
          >
            Manage Bookings
          </Link>

          <Link
            to="/admin/users"
            className="bg-blue-950 text-white rounded-xl p-4 text-center"
          >
            Manage Users
          </Link>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-950">Recent Bookings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-950 text-white">
                <th className="p-4 text-left">Room</th>

                <th className="p-4 text-left">Date</th>

                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="p-4">
                    {booking.rooms?.name || "Unknown Room"}
                  </td>

                  <td className="p-4">{booking.booking_date}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          booking.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
