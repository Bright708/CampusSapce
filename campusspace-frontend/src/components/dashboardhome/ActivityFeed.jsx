import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { getNotifications } from "../../services/notificationServices";

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await getNotifications();
      setActivities(data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  const getIcon = (message) => {
    if (message.toLowerCase().includes("approved"))
      return <CheckCircleIcon className="text-green-600" />;

    if (message.toLowerCase().includes("event"))
      return <EventAvailableIcon className="text-blue-600" />;

    return <NotificationsActiveIcon className="text-amber-600" />;
  };

  const getBackground = (message) => {
    if (message.toLowerCase().includes("approved")) return "bg-green-100";

    if (message.toLowerCase().includes("event")) return "bg-blue-100";

    return "bg-amber-100";
  };

  const getTitle = (message) => {
    if (message.toLowerCase().includes("approved")) return "Booking Approved";

    if (message.toLowerCase().includes("event")) return "Event Update";

    return "Notification";
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-950 dark:text-white">
          Activity Feed
        </h1>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-slate-800 dark:text-slate-300">
          {activities.length} Updates
        </span>
      </div>

      {/* EMPTY STATE */}
      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-700">
          <NotificationsActiveIcon
            sx={{ fontSize: 40 }}
            className="text-slate-300"
          />

          <h3 className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
            No Recent Activity
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Notifications and updates will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="flex gap-3 rounded-2xl border border-slate-100 p-3 transition-all hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
            >
              {/* ICON */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getBackground(
                  activity.message,
                )}`}
              >
                {getIcon(activity.message)}
              </div>

              {/* CONTENT */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-blue-950 dark:text-white">
                    {getTitle(activity.message)}
                  </h3>

                  <span className="whitespace-nowrap text-xs text-slate-400">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ActivityFeed;
