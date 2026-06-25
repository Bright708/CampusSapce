import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { motion, AnimatePresence } from "framer-motion";

import useAuthStore from "../../store/authstore";
import { getUserBookings } from "../../services/bookingServices";

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
            ? "#10b981"
            : booking.status === "pending"
              ? "#f59e0b"
              : booking.status === "cancelled"
                ? "#ef4444"
                : "#64748b",

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

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return `
          bg-emerald-100
          text-emerald-700
          dark:bg-emerald-900/30
          dark:text-emerald-400
        `;

      case "pending":
        return `
          bg-amber-100
          text-amber-700
          dark:bg-amber-900/30
          dark:text-amber-400
        `;

      case "cancelled":
        return `
          bg-red-100
          text-red-700
          dark:bg-red-900/30
          dark:text-red-400
        `;

      default:
        return `
          bg-slate-100
          text-slate-700
          dark:bg-slate-700
          dark:text-slate-300
        `;
    }
  };

  return (
    <>
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-950 dark:text-white">
          My Calendar
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Track all your bookings and events in one place.
        </p>
      </div>

      {/* CALENDAR CARD */}
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          dark:border-slate-700
          dark:bg-slate-800
        "
      >
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
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
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              p-4
            "
          >
            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              className="
                w-full
                max-w-xl
                rounded-3xl
                bg-white
                p-8
                shadow-2xl
                dark:bg-slate-800 dark:text-white
              "
            >
              {/* HEADER */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-blue-950 dark:text-white">
                    {selectedEvent.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Booking Details
                  </p>
                </div>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="
                    h-10
                    w-10
                    rounded-xl
                    bg-slate-100
                    text-xl
                    dark:bg-slate-700
                    dark:text-white
                  "
                >
                  ×
                </button>
              </div>

              {/* CONTENT */}
              <div className="mt-8 grid gap-5">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Booking Type
                  </p>

                  <h3 className="font-semibold text-blue-950 dark:text-white">
                    {selectedEvent.extendedProps.type}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Room
                  </p>

                  <h3 className="font-semibold text-blue-950 dark:text-white">
                    {selectedEvent.extendedProps.room}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Building
                  </p>

                  <h3 className="font-semibold text-blue-950 dark:text-white">
                    {selectedEvent.extendedProps.building}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Date
                  </p>

                  <h3 className="font-semibold text-blue-950 dark:text-white">
                    {selectedEvent.extendedProps.date}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Time
                  </p>

                  <h3 className="font-semibold text-blue-950 dark:text-white">
                    {selectedEvent.extendedProps.start_time} -{" "}
                    {selectedEvent.extendedProps.end_time}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Status
                  </p>

                  <span
                    className={`
                      inline-flex
                      rounded-full
                      px-3
                      py-1
                      text-sm
                      font-semibold
                      ${getStatusStyle(
                        selectedEvent.extendedProps.status,
                      )}
                    `}
                  >
                    {selectedEvent.extendedProps.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* FOOTER */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="
                  mt-8
                  h-12
                  w-full
                  rounded-xl
                  bg-blue-950
                  font-semibold
                  text-white
                  transition-all
                  hover:opacity-90
                  dark:bg-blue-600
                "
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Calendar;