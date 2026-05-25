import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

import { motion } from "framer-motion";

import useAuthStore from "../../store/authStore";

const Topbar = () => {
  const user = useAuthStore((state) => state.user);

  const profile = useAuthStore((state) => state.profile);

  return (
    <div className="flex w-full flex-col gap-8 border-b border-gray-200 bg-white px-6 py-6">
      {/* TOP SECTION */}
      <section className="flex items-center justify-between gap-4">
        {/* SEARCH BAR */}
        <div className="flex h-14 w-full max-w-xl items-center gap-3 rounded-2xl bg-gray-100 px-4">
          <SearchIcon className="text-gray-400" />

          <input
            type="search"
            placeholder="Search rooms, bookings..."
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-blue-50"
          >
            <NotificationsIcon className="text-gray-600" />
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-blue-50"
          >
            <AccountCircleIcon className="text-gray-600" />
          </motion.div>
        </div>
      </section>

      {/* GREETING */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-blue-950">
          Welcome back, {profile?.full_name || "Student"}
        </h1>

        <p className="text-gray-500">
          Here's what's happening on campus today.
        </p>
      </div>
    </div>
  );
};

export default Topbar;
