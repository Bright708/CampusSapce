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
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";

      case "occupied":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

      case "upcoming":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";

      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:shadow-lg
          dark:border-slate-700
          dark:bg-slate-800
        "
      >
        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src={room.image_url || JQBimg}
            alt={room.name}
            className="
              h-52
              w-full
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-4 p-5">
          {/* STATUS */}
          <div
            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getAvailabilityStyle(
              room.availability,
            )}`}
          >
            {room.availability === "available" && "Available Now"}

            {room.availability === "occupied" &&
              `Occupied until ${room.activeBooking?.end_time}`}

            {room.availability === "upcoming" &&
              `Next booking ${room.upcomingBooking?.start_time}`}
          </div>

          {/* TITLE */}
          <div>
            <h1 className="text-xl font-bold text-blue-950 dark:text-white">
              {room.name}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <LocationOnIcon fontSize="small" />
              <span>{room.building}</span>
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <GroupsIcon fontSize="small" />
              <span>{room.capacity} People</span>
            </div>

            <span
              className="
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-950
                dark:bg-slate-700
                dark:text-slate-200
              "
            >
              {room.type}
            </span>
          </div>

          {/* EQUIPMENT */}
          <div className="flex flex-wrap gap-2">
            {room.equipment?.map((item, index) => (
              <span
                key={index}
                className="
                  rounded-full
                  bg-slate-100
                  px-3
                  py-1
                  text-xs
                  text-slate-600
                  dark:bg-slate-700
                  dark:text-slate-300
                "
              >
                {item}
              </span>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="
              mt-2
              h-11
              rounded-xl
              bg-blue-950
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-blue-900
              dark:bg-blue-600
              dark:hover:bg-blue-500
            "
          >
            Book Room
          </button>
        </div>
      </motion.div>

      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        room={room}
      />
    </>
  );
};

export default RoomsCard;