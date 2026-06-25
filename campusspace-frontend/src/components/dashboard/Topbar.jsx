import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { Bell, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getNotifications,
  markAsRead,
} from "../../services/notificationServices";

import useAuthStore from "../../store/authstore";
import useThemeStore from "../../store/themeStore";

const Topbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const profile = useAuthStore((state) => state.profile);

  useEffect(() => {
    fetchNotifications();
  }, [open]);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
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

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  return (
    <div className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 lg:px-6">
      {/* TOP SECTION */}{" "}
      <section className="flex items-center justify-between gap-4">
        {/* SEARCH */}{" "}
        <div className="hidden md:flex h-11 w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 dark:border-slate-700 dark:bg-slate-800">
          {" "}
          <SearchIcon className="text-slate-400" />
          <input
            type="search"
            placeholder="Search rooms, bookings..."
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
          />
        </div>
        {/* ACTIONS */}
        <div className="ml-auto flex items-center gap-3">
          {/* NOTIFICATIONS */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition-all hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <Bell size={20} className="text-slate-700 dark:text-slate-300" />
            </button>

            {unreadCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {unreadCount}
              </span>
            )}

            {open && (
              <div className="absolute -right-20 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-slate-100 p-4 dark:border-slate-700">
                  <h3 className="font-semibold text-blue-950 dark:text-white">
                    Notifications
                  </h3>
                </div>

                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-slate-500">No notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="border-b border-slate-100 p-4 last:border-none dark:border-slate-700"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {notification.message}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {new Date(
                              notification.created_at,
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        {!notification.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="rounded-lg bg-blue-950 px-3 py-1 text-xs text-white"
                          >
                            Read
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>

          {/* PROFILE */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="profile"
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <AccountCircleIcon className="text-slate-600 dark:text-slate-300" />
              )}
            </Link>
          </motion.div>

          {/* DARK MODE */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
          >
            {darkMode ? (
              <Sun size={18} className="text-amber-500" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>
        </div>
      </section>
      {/* GREETING */}
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-blue-950 dark:text-white">
          Welcome back, {profile?.full_name || "Student"}
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here's what's happening on campus today.
        </p>
      </div>
    </div>
  );
};

export default Topbar;
