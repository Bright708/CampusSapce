import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Building2, Calendar, Clock3, Mail, MapPin, User } from "lucide-react";
import { EventCardSkeleton } from "../../components/skeletons";
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
          <div className="h-12 w-96 rounded-2xl bg-white dark:bg-slate-900" />
          <div className="mt-3 h-5 w-48 rounded-2xl bg-white dark:bg-slate-900" />
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
        <h1 className="text-4xl font-bold text-blue-950 dark:text-slate-100">
          {event.event_title}
        </h1>

        <p className="text-gray-500 mt-2 dark:text-slate-400">Event Details</p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* EVENT CARD */}
        <div className="bg-white rounded-3xl shadow p-6 h-auto dark:bg-slate-900">
          <h2 className="font-bold text-2xl text-blue-950 mb-6 dark:text-slate-100">
            Event Information
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-950 dark:text-slate-100" />

              <div>
                <p className="text-gray-400 text-sm dark:text-slate-400">
                  Event Type
                </p>

                <h3 className="font-semibold capitalize dark:text-slate-100">
                  {event.booking_type}
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-sm dark:text-slate-400">
                Status
              </p>

              <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl">
                {event.status}
              </span>
            </div>
          </div>
        </div>

        {/* LOCATION CARD */}
        <div className="bg-white rounded-3xl shadow p-6 dark:bg-slate-900">
          <h2 className="font-bold text-2xl text-blue-950 mb-6 dark:text-slate-100">
            Location
          </h2>

          <div className="space-y-5">
            <div className="flex gap-3">
              <MapPin className="text-blue-950 dark:text-slate-100" />

              <div>
                <p className="text-gray-400 text-sm dark:text-slate-400">
                  Room
                </p>

                <h3 className="font-semibold dark:text-slate-100">
                  {event.rooms.name}
                </h3>
              </div>
            </div>

            <div className="flex gap-3">
              <Building2 className="text-blue-950 dark:text-slate-100" />

              <div>
                <p className="text-gray-400 text-sm dark:text-slate-400">
                  Building
                </p>

                <h3 className="font-semibold dark:text-slate-100">
                  {event.rooms.building}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* SCHEDULE CARD */}
        <div className="bg-white rounded-3xl shadow p-6 dark:bg-slate-900">
          <h2 className="font-bold text-2xl text-blue-950 mb-6 dark:text-slate-100">
            Schedule
          </h2>

          <div className="space-y-5">
            <div className="flex gap-3">
              <Calendar className="text-blue-950 dark:text-slate-100" />

              <div>
                <p className="text-gray-400 text-sm dark:text-slate-400">
                  Date
                </p>

                <h3 className="font-semibold dark:text-slate-100">
                  {event.booking_date}
                </h3>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock3 className="text-blue-950 dark:text-slate-100" />

              <div>
                <p className="text-gray-400 text-sm dark:text-slate-400">
                  Time
                </p>

                <h3 className="font-semibold dark:text-slate-100">
                  {event.start_time} - {event.end_time}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* ORGANIZER CARD */}
        <div className="bg-white rounded-3xl shadow p-6 dark:bg-slate-900">
          <h2 className="font-bold text-2xl text-blue-950 mb-6 dark:text-slate-100">
            Organizer
          </h2>

          <div className="space-y-5">
            <div className="flex gap-3">
              <User className="text-blue-950 dark:text-slate-100" />

              <div>
                <p className="text-gray-400 text-sm dark:text-slate-400">
                  Name
                </p>

                <h3 className="font-semibold dark:text-slate-100">
                  {event.profiles.full_name}
                </h3>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail className="text-blue-950 dark:text-slate-100" />

              <div>
                <p className="text-gray-400 text-sm dark:text-slate-400">
                  Email
                </p>

                <h3 className="font-semibold dark:text-slate-100">
                  {event.profiles.email}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
