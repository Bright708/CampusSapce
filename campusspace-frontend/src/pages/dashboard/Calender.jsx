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
            : booking.booking_type,

        start: `${booking.booking_date}T${booking.start_time}`,

        end: `${booking.booking_date}T${booking.end_time}`,
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h1 className="text-3xl font-bold text-blue-950 mb-6">My Calendar</h1>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="80vh"
      />
    </div>
  );
};

export default Calendar;
