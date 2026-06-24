import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
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
    if (message.includes("approved"))
      return <CheckCircleIcon className="text-green-600" />;

    if (message.includes("Event"))
      return <EventAvailableIcon className="text-blue-600" />;

    return <NotificationsActiveIcon className="text-yellow-600" />;
  };

  const getBackground = (message) => {
    if (message.includes("approved")) return "bg-green-100";

    if (message.includes("Event")) return "bg-blue-100";

    return "bg-yellow-100";
  };

  return (
    <section className="flex w-full flex-col gap-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-950">Activity Feed</h1>
      </div>

      {/* ACTIVITY LIST */}
      <div className="flex flex-col gap-4">
        {activities.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm">
            <p className="font-medium text-slate-600">No recent activity</p>

            <p className="mt-1 text-sm text-slate-400">
              Notifications and booking updates will appear here.
            </p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md"
            >
              {/* ICON */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getBackground(
                  activity.message,
                )}`}
              >
                {getIcon(activity.message)}
              </div>

              {/* CONTENT */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-semibold text-blue-950">
                    {activity.message.includes("approved")
                      ? "Booking Approved"
                      : activity.message.includes("Event")
                        ? "Event Update"
                        : "Notification"}
                  </h2>

                  <span className="shrink-0 text-xs text-slate-400">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default ActivityFeed;
