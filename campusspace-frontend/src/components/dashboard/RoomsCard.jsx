import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";
import { useState } from "react";
import JQBimg from "../../../public/JQBimg.jpg";
import BookingModal from "./BookingModal";
const RoomsCard = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getAvailabilityStyle = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700";

      case "occupied":
        return "bg-red-100 text-red-700";

      case "upcoming":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
      className="overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      {/* ROOM IMAGE */}
      <img
        src={room.image_url || { JQBimg }}
        alt={room.name}
        className="h-56 w-full object-cover"
      />

      {/* CONTENT */}
      <div className="flex flex-col gap-4 p-5">
        {/* ROOM NAME */}
        <div className="flex flex-col gap-1">
          <div
            className={`w-fit rounded-full px-4 py-1 text-sm font-semibold ${getAvailabilityStyle(room.availability)}`}
          >
            {room.availability === "available" && " Available Now"}

            {room.availability === "occupied" &&
              ` Occupied until on ${room.activeBooking?.booking_date} at ${room.activeBooking?.end_time}`}

            {room.availability === "upcoming" &&
              ` Next booking starts on ${room.upcomingBooking?.booking_date} at ${room.upcomingBooking?.start_time}`}
          </div>
          <h1 className="text-2xl font-bold text-blue-950">{room.name}</h1>

          <div className="flex items-center gap-2 text-gray-500">
            <LocationOnIcon fontSize="small" />

            <p>{room.building}</p>
          </div>
        </div>

        {/* ROOM DETAILS */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <GroupsIcon fontSize="small" />

            <p>{room.capacity} People</p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-950">
            {room.type}
          </span>
        </div>

        {/* EQUIPMENT */}
        <div className="flex flex-wrap gap-2">
          {room.equipment?.map((item, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
            >
              {item}
            </span>
          ))}
        </div>

        {/* BUTTON */}
        <button
          className="mt-2 h-12 rounded-2xl bg-blue-950 font-semibold text-white transition-all duration-300 hover:opacity-80"
          onClick={() => setIsOpen(true)}
        >
          Book Now
        </button>
      </div>
      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        room={room}
      />
    </motion.div>
  );
};

export default RoomsCard;
