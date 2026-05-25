import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { motion } from "framer-motion";

const UpcomingBookings = () => {
  const upcomingBookings = [
    {
      status: "Confirmed",
      room: "Mensah Sarbah Study Room",
      date: "8th June, 2026",
      start_time: "12:00 PM",
      end_time: "2:00 PM",
      location: "Mensah Sarbah Hall",
    },

    {
      status: "Pending",
      room: "Legon Hall Study Room",
      date: "8th June, 2026",
      start_time: "12:00 PM",
      end_time: "2:00 PM",
      location: "Legon Hall",
    },

    {
      status: "Coming Soon",
      room: "Software Lab 2",
      date: "8th June, 2026",
      start_time: "12:00 PM",
      end_time: "2:00 PM",
      location: "Computer Science Dept.",
    },

    {
      status: "Cancelled",
      room: "Mensah Sarbah Study Room",
      date: "8th June, 2026",
      start_time: "12:00 PM",
      end_time: "2:00 PM",
      location: "Mensah Sarbah Hall",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Coming Soon":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="flex w-full flex-col gap-6">
      {/* HEADING */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-950">Upcoming Bookings</h1>

        <button className="text-sm font-semibold text-blue-950 transition-all duration-300 hover:underline">
          View All
        </button>
      </div>

      {/* BOOKINGS GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {upcomingBookings.map((booking, index) => (
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
                booking.status,
              )}`}
            >
              {booking.status}
            </div>

            {/* ROOM */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-blue-950">
                {booking.room}
              </h2>

              <div className="flex items-center gap-2 text-gray-500">
                <AccessTimeIcon fontSize="small" />

                <p className="text-sm">
                  {booking.date} • {booking.start_time} - {booking.end_time}
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <LocationOnIcon fontSize="small" />

                <p className="text-sm">{booking.location}</p>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <button className="mt-2 h-12 rounded-2xl bg-blue-950 text-sm font-semibold text-white transition-all duration-300 hover:opacity-80">
              View Details
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingBookings;
