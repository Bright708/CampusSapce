import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { motion } from "framer-motion";

const LiveEvents = () => {
  const liveEvents = [
    {
      title: "AI & Innovation Summit",
      location: "Great Hall",
      time: "Happening Now",
      attendees: "320 Attendees",
      status: "Live",
    },

    {
      title: "Software Engineering Meetup",
      location: "Computer Science Dept.",
      time: "Starts in 30 mins",
      attendees: "120 Attendees",
      status: "Upcoming",
    },

    {
      title: "Business Networking Session",
      location: "Legon Hall Auditorium",
      time: "Today • 6:00 PM",
      attendees: "210 Attendees",
      status: "Open",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Live":
        return "bg-red-100 text-red-600";

      case "Upcoming":
        return "bg-yellow-100 text-yellow-700";

      case "Open":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="flex w-full flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-950">Live Events</h1>

        <button className="text-sm font-semibold text-blue-950 transition-all duration-300 hover:underline">
          Explore Events
        </button>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {liveEvents.map((event, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -5,
            }}
            transition={{
              duration: 0.2,
            }}
            className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            {/* STATUS */}
            <div
              className={`w-fit rounded-full px-4 py-1 text-sm font-semibold ${getStatusStyle(
                event.status,
              )}`}
            >
              {event.status}
            </div>

            {/* EVENT INFO */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-blue-950">{event.title}</h2>

              {/* TIME */}
              <div className="flex items-center gap-2 text-gray-500">
                <AccessTimeIcon fontSize="small" />

                <p className="text-sm">{event.time}</p>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-2 text-gray-500">
                <LocationOnIcon fontSize="small" />

                <p className="text-sm">{event.location}</p>
              </div>

              {/* ATTENDEES */}
              <div className="flex items-center gap-2 text-gray-500">
                <GroupsIcon fontSize="small" />

                <p className="text-sm">{event.attendees}</p>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <button className="mt-2 h-12 rounded-2xl bg-blue-950 text-sm font-semibold text-white transition-all duration-300 hover:opacity-80">
              View Event
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LiveEvents;
