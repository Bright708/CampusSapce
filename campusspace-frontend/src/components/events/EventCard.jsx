import { Link } from "react-router-dom";
const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={
          event.rooms?.image_url ||
          "https://images.unsplash.com/photo-1511578314322-379afb476865"
        }
        alt={event.event_title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-950">
            {event.event_title}
          </h2>

          <p className="text-gray-600 mt-2">{event.event_description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <span> {event.booking_date}</span>

          <span>
            {event.start_time} - {event.end_time}
          </span>

          <span> {event.rooms?.building}</span>

          <span> {event.rooms?.name}</span>
        </div>

        <div className="border-t pt-4 flex justify-between">
          <section>
            <p className="text-sm text-gray-500">Hosted By</p>

            <p className="font-semibold text-blue-950">
              {event.profiles?.full_name}
            </p>
          </section>
          <Link
            to={`/dashboard/events/${event.id}`}
            className="bg-blue-950 text-white px-4 py-2 rounded-xl"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
