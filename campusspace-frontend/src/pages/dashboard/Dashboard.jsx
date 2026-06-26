import { motion } from "framer-motion";
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

  const now = new Date();

  const activeEvents = bookings.filter((booking) => {
    if (booking.booking_type !== "event" || booking.status !== "approved") {
      return false;
    }

    const start = new Date(`${booking.booking_date}T${booking.start_time}`);

    const end = new Date(`${booking.booking_date}T${booking.end_time}`);

    return now >= start && now <= end;
  });

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
      className="flex
w-full
flex-col
gap-5
md:gap-6
transition-colors
duration-300"
    >
      {/* QUICK STATS */}
      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl bg-gradient-to-br from-blue-950 to-blue-700 p-5 text-white shadow-lg"
        >
          <p className="text-sm text-blue-100">Total Bookings</p>

          <h1 className="mt-2 text-3xl font-bold">{bookings.length}</h1>

          <p className="mt-3 text-xs text-blue-200">
            Room & Event Reservations
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-500 p-5 text-white shadow-lg"
        >
          <p className="text-sm text-emerald-100">Available Rooms</p>

          <h1 className="mt-2 text-3xl font-bold">{rooms.length}</h1>

          <p className="mt-3 text-xs text-emerald-100">Ready for booking</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white shadow-lg"
        >
          <p className="text-sm text-amber-100">Active Events</p>

          <h1 className="mt-2 text-3xl font-bold">{activeEvents.length}</h1>

          <p className="mt-3 text-xs text-amber-100">Happening on campus</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl bg-gradient-to-br from-rose-500 to-red-500 p-5 text-white shadow-lg"
        >
          <p className="text-sm text-rose-100">Pending Requests</p>

          <h1 className="mt-2 text-3xl font-bold">{pendingBookings.length}</h1>

          <p className="mt-3 text-xs text-rose-100">Awaiting approval</p>
        </motion.div>
      </section>
      <section
        className="
  rounded-3xl
  bg-gradient-to-r
  from-slate-50
  to-blue-50
  dark:from-slate-800
  dark:to-slate-900
  border
  border-slate-200
  dark:border-slate-700
  p-6
  shadow-sm
"
      >
        <h1 className="text-3xl font-bold text-blue-950 dark:text-white">
          Welcome back,{" "}
          {user?.user_metadata?.full_name?.split(" ")[0] || "Student"}
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Track bookings, manage events, and stay updated with everything
          happening across campus.
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-3">
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
