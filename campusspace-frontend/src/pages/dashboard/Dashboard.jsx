import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import ActivityFeed from "../../components/dashboardhome/ActivityFeed";
import LiveEvents from "../../components/dashboardhome/LiveEvents";
import UpcomingBookings from "../../components/dashboardhome/UpcomingBookings";
import { getUserBookings } from "../../services/bookingServices";
import { getNotifications } from "../../services/notificationServices";
import { getRooms } from "../../services/roomServices";
import useAuthStore from "../../store/authstore";
const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const activeEvents = bookings.filter(
    (booking) =>
      booking.booking_type === "event" && booking.status === "approved",
  );

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  );

  const unreadNotifications = notifications.filter(
    (notification) => !notification.is_read,
  );

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const bookingsData = await getUserBookings(user.id);

      const roomsData = await getRooms();
      const notificationsData = await getNotifications();

      setBookings(bookingsData.bookings || []);
      setRooms(roomsData);
      setNotifications(notificationsData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="flex w-full flex-col gap-5 md:gap-6"
    >
      {/* QUICK STATS */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl border border-slate-100 bg-blue-50 p-5 md:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-blue-700">
              Total Bookings
            </h2>

            <CalendarDays size={20} className="text-slate-400" />
          </div>

          <h1 className="mt-3 text-3xl font-bold text-blue-950">
            {bookings.length}
          </h1>

          <p className="mt-1 text-xs text-slate-400">Your bookings</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl bg-emerald-50 p-5 md:p-6 shadow-sm"
        >
          <h2 className="text-emerald-700">Available Rooms</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">
            {rooms.length}
          </h1>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl bg-amber-50 p-5 md:p-6 shadow-sm"
        >
          <h2 className="text-amber-700">Active Events</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">
            {activeEvents.length}
          </h1>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl bg-red-50 p-5 md:p-6 shadow-sm"
        >
          <h2 className="text-red-700">Pending Requests</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">
            {pendingBookings.length}
          </h1>
        </motion.div>
      </section>
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-950">
          Welcome back, {user?.user_metadata?.full_name || "Student"}
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your bookings, events, and room reservations from one place.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <UpcomingBookings />
        </div>

        <div>
          <ActivityFeed />
        </div>
      </div>

      <LiveEvents />
    </motion.div>
  );
};

export default Dashboard;
