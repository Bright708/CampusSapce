import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserBookings } from "../../services/bookingServices";
import useAuthStore from "../../store/authstore";

import { motion } from "framer-motion";

const LiveEvents = () => {
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);

  const [liveEvents, setLiveEvents] = useState([]);
  useEffect(() => {
    fetchEvents();

    const interval = setInterval(fetchEvents, 60000);

    return () => clearInterval(interval);
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
    } finally {
      setLoading(false);
    }
  };
  const getStatusStyle = () => {
    return "bg-green-100 text-green-700";
  };

  return (
    <section className="flex w-full flex-col gap-4">
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
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-blue-950">No Live Events</h2>

            <p className="mt-1 text-sm text-slate-500">
              Active campus events will appear here automatically.
            </p>
          </div>
        ) : (
          liveEvents.map((event, index) => (
            <motion.div
              key={event.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md"
            >
              {/* HEADER */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-blue-950">
                    {event.event_title}
                  </h2>

                  <p className="text-xs text-slate-500">Live Campus Event</p>
                </div>

                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  LIVE
                </span>
              </div>

              {/* DETAILS */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <AccessTimeIcon sx={{ fontSize: 18 }} />

                  <span>
                    {event.start_time} - {event.end_time}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <LocationOnIcon sx={{ fontSize: 18 }} />

                  <span>{event.rooms?.building}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <GroupsIcon sx={{ fontSize: 18 }} />

                  <span>{event.rooms?.name}</span>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Ends at {event.end_time}
                </span>

                <Link
                  to={`events/${event.id}`}
                  className="text-sm font-semibold text-blue-950 hover:underline"
                >
                  View →
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default LiveEvents;
