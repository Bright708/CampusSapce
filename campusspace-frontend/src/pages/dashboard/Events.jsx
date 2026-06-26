import { useEffect, useState } from "react";

import EventCard from "../../components/events/EventCard";
import { EventCardSkeleton } from "../../components/skeletons";

import { getEvents } from "../../services/eventServices";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();

        setEvents(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  const now = new Date();

  const liveEvents = events.filter((event) => {
    const end = new Date(`${event.booking_date}T${event.end_time}`);

    return end > now;
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        {/* HEADER */}
        <div>
          <div className="h-10 w-64 rounded-xl bg-white dark:bg-slate-800" />
          <div className="mt-3 h-4 w-96 rounded-xl bg-white dark:bg-slate-800" />
        </div>

        {/* SKELETON GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-blue-950 dark:text-white">
          Campus Events
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Discover approved events taking place across campus.
        </p>
      </div>

      {/* CONTENT */}
      {events.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-12
            text-center
            shadow-sm
            dark:border-slate-700
            dark:bg-slate-800
          "
        >
          <h2 className="text-2xl font-semibold text-blue-950 dark:text-white">
            No Upcoming Events
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Approved campus events will appear here once they're available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {liveEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
