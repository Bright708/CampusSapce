import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getNotifications,
  markAsRead,
} from "../../services/notificationServices";

import { Bell } from "lucide-react";
import useAuthStore from "../../store/authstore";
const Topbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [notifications]);
  useEffect(() => {
    fetchNotifications();
  }, [open]);

  const fetchNotifications = async () => {
    const data = await getNotifications();

    setNotifications(data);
  };
  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
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
            <div className="relative">
              <button onClick={() => setOpen(!open)}>
                <Bell size={24} />
              </button>

              {notifications.filter((n) => !n.is_read).length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {notifications.filter((n) => !n.is_read).length}
                </span>
              )}
              {open && (
                <div className="absolute -right-12 mt-2 w-80 bg-white shadow-xl rounded-xl border z-50">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-gray-500">No notifications</p>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-center justify-between p-4 border-b"
                      >
                        <div>
                          <p className="text-sm">{notification.message}</p>
                        </div>

                        {!notification.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="bg-blue-950 text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Read
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-blue-50"
          >
            <Link to={"profile"}>
              <AccountCircleIcon className="text-gray-600" />
            </Link>
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
