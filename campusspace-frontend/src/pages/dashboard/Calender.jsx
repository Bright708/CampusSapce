import { useEffect, useState } from "react";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import { getUserBookings } from "../../services/bookingServices";
import useAuthStore from "../../store/authstore";

const Calendar = () => {
  const user = useAuthStore((state) => state.user);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getUserBookings(user.id);

      const formattedEvents = response.bookings.map((booking) => ({
        id: booking.id,

        title:
          booking.booking_type === "event"
            ? booking.event_title
            : booking.rooms?.name,

        start: `${booking.booking_date}T${booking.start_time}`,

        end: `${booking.booking_date}T${booking.end_time}`,

        backgroundColor:
          booking.status === "approved"
            ? "#16a34a"
            : booking.status === "pending"
              ? "#eab308"
              : booking.status === "cancelled"
                ? "bg-red-500"
                : "#6b7280",

        borderColor: "transparent",

        extendedProps: {
          room: booking.rooms?.name,
          building: booking.rooms?.building,
          status: booking.status,
          type: booking.booking_type,
          date: booking.booking_date,
          start_time: booking.start_time,
          end_time: booking.end_time,
        },
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="rounded-3xl bg-white p-6 shadow">
        <h1 className="mb-8 text-3xl font-bold text-blue-950">My Calendar</h1>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="80vh"
          events={events}
          selectable={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventClick={(info) => setSelectedEvent(info.event)}
        />
      </div>

      {/* EVENT MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-blue-950">
                {selectedEvent.title}
              </h1>

              <button
                onClick={() => setSelectedEvent(null)}
                className="text-2xl text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Booking Type</p>

                <h2 className="font-semibold text-blue-950">
                  {selectedEvent.extendedProps.type}
                </h2>
              </div>

              <div>
                <p className="text-sm text-gray-500">Room</p>

                <h2 className="font-semibold text-blue-950">
                  {selectedEvent.extendedProps.room}
                </h2>
              </div>

              <div>
                <p className="text-sm text-gray-500">Building</p>

                <h2 className="font-semibold text-blue-950">
                  {selectedEvent.extendedProps.building}
                </h2>
              </div>

              <div>
                <p className="text-sm text-gray-500">Date</p>

                <h2 className="font-semibold text-blue-950">
                  {selectedEvent.extendedProps.date}
                </h2>
              </div>

              <div>
                <p className="text-sm text-gray-500">Time</p>

                <h2 className="font-semibold text-blue-950">
                  {selectedEvent.extendedProps.start_time} -{" "}
                  {selectedEvent.extendedProps.end_time}
                </h2>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>

                <span
                  className={`rounded-full ${selectedEvent.extendedProps.status === "cancelled" ? "bg-red-500/50" : "bg-green-500/50"} px-4 py-2 text-sm font-semibold text-black`}
                >
                  {selectedEvent.extendedProps.status.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-8 h-12 w-full rounded-2xl bg-blue-950 font-semibold text-white transition-all duration-300 hover:opacity-80"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
