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
    <section className="flex w-full flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-950">Activity Feed</h1>
      </div>

      {/* ACTIVITY LIST */}
      <div className="flex flex-col gap-4">
        {activities.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            No recent activity.
          </div>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={index}
              whileHover={{
                x: 5,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex items-start gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {/* ICON */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${getBackground(activity.message)}`}
              >
                {getIcon(activity.message)}
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-bold text-blue-950">
                    {activity.message.includes("approved")
                      ? "Booking Approved"
                      : "Notification"}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-gray-600">
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
