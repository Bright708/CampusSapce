import { useEffect, useState } from "react";
import EventCard from "../../components/events/EventCard";
import { getEvents } from "../../services/EventServices";

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

  if (loading) {
    return <h1 className="text-2xl font-bold">Loading Events...</h1>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold text-blue-950">Campus Events</h1>

        <p className="text-gray-500 mt-2">
          Discover upcoming approved events happening across campus.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-500">
            No upcoming events
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
