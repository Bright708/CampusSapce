import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/authstore";

import ActivityFeed from "../../components/dashboardhome/ActivityFeed";
import LiveEvents from "../../components/dashboardhome/LiveEvents";
import UpcomingBookings from "../../components/dashboardhome/UpcomingBookings";
import { getUserBookings } from "../../services/bookingServices";
import { getNotifications } from "../../services/notificationServices";
import { getRooms } from "../../services/roomServices";

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
      className="flex w-full flex-col gap-8"
    >
      {/* QUICK STATS */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-gray-500">Total Bookings</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">
            {bookings.length}
          </h1>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-gray-500">Available Rooms</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">
            {rooms.length}
          </h1>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-gray-500">Active Events</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">
            {activeEvents.length}
          </h1>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-gray-500">Pending Requests</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">
            {pendingBookings.length}
          </h1>
        </motion.div>
      </section>

      {/* UPCOMING BOOKINGS */}
      <UpcomingBookings />

      {/* LIVE EVENTS */}
      <LiveEvents />

      {/* ACTIVITY FEED */}
      <ActivityFeed />
    </motion.div>
  );
};

export default Dashboard;
