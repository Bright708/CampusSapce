import { useEffect, useState } from "react";

import RoomCard from "../../components/dashboard/RoomsCard";
import { RoomCardSkeleton } from "../../components/skeletons";
import { getRooms } from "../../services/roomServices";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [building, setBuilding] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRooms();

        setRooms(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // FILTERING
  const filteredRooms = rooms.filter((room) => {
    const matchesBuilding =
      building === "" ||
      building === "All Buildings" ||
      room.building === building;

    const matchesType =
      type === "" || type === "All Types" || room.type === type;

    let matchesCapacity = true;

    if (capacity === "1-20") {
      matchesCapacity = room.capacity <= 20;
    }

    if (capacity === "21-50") {
      matchesCapacity = room.capacity >= 21 && room.capacity <= 50;
    }

    if (capacity === "51-100") {
      matchesCapacity = room.capacity >= 51 && room.capacity <= 100;
    }

    if (capacity === "100+") {
      matchesCapacity = room.capacity > 100;
    }

    return matchesBuilding && matchesType && matchesCapacity;
  });

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-8">
        {/* HEADER */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="h-10 w-64 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="mt-3 h-4 w-80 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
          </div>
        </div>

        {/* ROOMS */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8">
      {/* PAGE HEADER */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1 className="text-3xl font-bold text-blue-950 dark:text-white">
          Available Spaces
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Browse available lecture halls, meeting rooms, laboratories, and
          auditoriums across campus.
        </p>
      </div>

      {/* FILTERS */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* BUILDING */}
          <select
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            className="
              h-12 rounded-xl border border-slate-200
              bg-white px-4 text-sm
              dark:bg-slate-900
              dark:border-slate-700
              dark:text-white
              outline-none
            "
          >
            <option>All Buildings</option>
            <option>Computer Science Department</option>
            <option>Great Hall</option>
            <option>Legon Hall</option>
            <option>Mensah Sarbah Hall</option>
          </select>

          {/* CAPACITY */}
          <select
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="
              h-12 rounded-xl border border-slate-200
              bg-white px-4 text-sm
              dark:bg-slate-900
              dark:border-slate-700
              dark:text-white
              outline-none
            "
          >
            <option>Any Capacity</option>
            <option value="1-20">1 - 20</option>
            <option value="21-50">21 - 50</option>
            <option value="51-100">51 - 100</option>
            <option value="100+">100+</option>
          </select>

          {/* TYPE */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="
              h-12 rounded-xl border border-slate-200
              bg-white px-4 text-sm
              dark:bg-slate-900
              dark:border-slate-700
              dark:text-white
              outline-none
            "
          >
            <option>All Types</option>
            <option>Lecture Hall</option>
            <option>Lab</option>
            <option>Meeting Room</option>
            <option>Auditorium</option>
          </select>
        </div>

        {/* RESULTS COUNT */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {filteredRooms.length} room
            {filteredRooms.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* ROOMS GRID */}
      {filteredRooms.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-blue-950 dark:text-white">
            No rooms found
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;