import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Building2, Calendar, Clock3, Mail, MapPin, User } from "lucide-react";

import { getBookingById } from "../../services/bookingServices";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const data = await getBookingById(id);

      setEvent(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!event) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <div className="h-12 w-96 rounded-2xl bg-white" />
          <div className="mt-3 h-5 w-48 rounded-2xl bg-white" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <EventCardSkeleton />
          </div>
          <div>
            <EventCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-blue-950">
          {event.event_title}
        </h1>

        <p className="text-gray-500 mt-2">Event Details</p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* EVENT CARD */}
        <div className="bg-white rounded-3xl shadow p-6 h-auto">
          <h2 className="font-bold text-2xl text-blue-950 mb-6">
            Event Information
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-950" />

              <div>
                <p className="text-gray-400 text-sm">Event Type</p>

                <h3 className="font-semibold capitalize">
                  {event.booking_type}
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-sm">Status</p>

              <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl">
                {event.status}
              </span>
            </div>
          </div>
        </div>

        {/* LOCATION CARD */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="font-bold text-2xl text-blue-950 mb-6">Location</h2>

          <div className="space-y-5">
            <div className="flex gap-3">
              <MapPin className="text-blue-950" />

              <div>
                <p className="text-gray-400 text-sm">Room</p>

                <h3 className="font-semibold">{event.rooms.name}</h3>
              </div>
            </div>

            <div className="flex gap-3">
              <Building2 className="text-blue-950" />

              <div>
                <p className="text-gray-400 text-sm">Building</p>

                <h3 className="font-semibold">{event.rooms.building}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* SCHEDULE CARD */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="font-bold text-2xl text-blue-950 mb-6">Schedule</h2>

          <div className="space-y-5">
            <div className="flex gap-3">
              <Calendar className="text-blue-950" />

              <div>
                <p className="text-gray-400 text-sm">Date</p>

                <h3 className="font-semibold">{event.booking_date}</h3>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock3 className="text-blue-950" />

              <div>
                <p className="text-gray-400 text-sm">Time</p>

                <h3 className="font-semibold">
                  {event.start_time} - {event.end_time}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* ORGANIZER CARD */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="font-bold text-2xl text-blue-950 mb-6">Organizer</h2>

          <div className="space-y-5">
            <div className="flex gap-3">
              <User className="text-blue-950" />

              <div>
                <p className="text-gray-400 text-sm">Name</p>

                <h3 className="font-semibold">{event.profiles.full_name}</h3>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail className="text-blue-950" />

              <div>
                <p className="text-gray-400 text-sm">Email</p>

                <h3 className="font-semibold">{event.profiles.email}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
