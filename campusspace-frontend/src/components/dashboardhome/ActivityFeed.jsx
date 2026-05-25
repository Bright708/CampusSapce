import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { motion } from "framer-motion";

const ActivityFeed = () => {
  const activities = [
    {
      title: "Room Booking Confirmed",
      description: "Your booking for Software Lab 2 has been approved.",
      time: "5 mins ago",
      icon: <CheckCircleIcon className="text-green-600" />,
      bg: "bg-green-100",
    },

    {
      title: "New Campus Event",
      description: "AI & Innovation Summit starts today at 4:00 PM.",
      time: "20 mins ago",
      icon: <EventAvailableIcon className="text-blue-600" />,
      bg: "bg-blue-100",
    },

    {
      title: "Room Availability Update",
      description: "Great Hall is now available for booking.",
      time: "1 hour ago",
      icon: <MeetingRoomIcon className="text-violet-600" />,
      bg: "bg-violet-100",
    },

    {
      title: "Booking Reminder",
      description: "Your upcoming booking begins in 30 minutes.",
      time: "2 hours ago",
      icon: <NotificationsActiveIcon className="text-yellow-600" />,
      bg: "bg-yellow-100",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-950">Activity Feed</h1>

        <button className="text-sm font-semibold text-blue-950 transition-all duration-300 hover:underline">
          View All
        </button>
      </div>

      {/* ACTIVITY LIST */}
      <div className="flex flex-col gap-4">
        {activities.map((activity, index) => (
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
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${activity.bg}`}
            >
              {activity.icon}
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-blue-950">
                  {activity.title}
                </h2>

                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                {activity.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ActivityFeed;
