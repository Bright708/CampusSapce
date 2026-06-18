import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserBookings } from "../../services/bookingServices";
import useAuthStore from "../../store/authstore";

import { motion } from "framer-motion";

const LiveEvents = () => {
  const user = useAuthStore((state) => state.user);

  const [liveEvents, setLiveEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getUserBookings(user.id);

      const now = new Date();

      const live = data.bookings.filter((booking) => {
        if (booking.booking_type !== "event" || booking.status !== "approved")
          return false;

        const startDateTime = new Date(
          `${booking.booking_date}T${booking.start_time}`,
        );

        const endDateTime = new Date(
          `${booking.booking_date}T${booking.end_time}`,
        );

        return now >= startDateTime && now <= endDateTime;
      });

      setLiveEvents(live);
    } catch (error) {
      console.log(error);
    }
  };
  const getStatusStyle = () => {
    return "bg-green-100 text-green-700";
  };

  return (
    <section className="flex w-full flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-950">Live Events</h1>
        <Link to={"events"}>
          <button className="text-sm font-semibold text-blue-950 transition-all duration-300 hover:underline">
            Explore Events
          </button>
        </Link>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {liveEvents.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-blue-950">
              No Upcoming Events
            </h2>

            <p className="mt-2 text-gray-500">
              Event bookings will appear here.
            </p>
          </div>
        ) : (
          liveEvents.map((event, index) => (
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
                Live Event
              </div>

              {/* EVENT INFO */}
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-blue-950">
                  {event.event_title}
                </h2>

                {/* TIME */}
                <div className="flex items-center gap-2 text-gray-500">
                  <AccessTimeIcon fontSize="small" />

                  <>
                    {event.booking_date}
                    <br />
                    {event.start_time} - {event.end_time}
                  </>
                </div>

                {/* LOCATION */}
                <div className="flex items-center gap-2 text-gray-500">
                  <LocationOnIcon fontSize="small" />

                  <p className="text-sm">{event.rooms?.building}</p>
                </div>

                {/* ATTENDEES */}
                <div className="flex items-center gap-2 text-gray-500">
                  <GroupsIcon fontSize="small" />

                  <p className="text-sm">{event.rooms?.name}</p>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <Link to={"events"}>
                <button className="mt-2 h-12 rounded-2xl bg-blue-950 text-sm font-semibold text-white transition-all duration-300 hover:opacity-80">
                  View Event
                </button>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default LiveEvents;
