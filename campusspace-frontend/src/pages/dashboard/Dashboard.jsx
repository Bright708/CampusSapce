import { motion } from "framer-motion";

import ActivityFeed from "../../components/dashboardhome/ActivityFeed";
import LiveEvents from "../../components/dashboardhome/LiveEvents";
import UpcomingBookings from "../../components/dashboardhome/UpcomingBookings";

const Dashboard = () => {
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
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">Total Bookings</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">24</h1>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">Available Rooms</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">18</h1>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">Active Events</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">7</h1>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">Pending Requests</h2>

          <h1 className="mt-3 text-4xl font-bold text-blue-950">5</h1>
        </div>
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
