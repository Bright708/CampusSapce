import { useEffect, useState } from "react";

import RoomCard from "../../components/dashboard/RoomsCard";

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
        console.log(response);

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
    return <h1>Loading rooms...</h1>;
  }

  return (
    <div className="flex w-full flex-col gap-8">
      {/* HEADER */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-950">Available Spaces</h1>

          <p className="mt-2 text-gray-600">
            Find and book the perfect environment for your next session
          </p>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* BUILDING */}
          <select
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            className="h-12 rounded-2xl border border-gray-200 bg-white px-4 outline-none"
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
            className="h-12 rounded-2xl border border-gray-200 bg-white px-4 outline-none"
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
            className="h-12 rounded-2xl border border-gray-200 bg-white px-4 outline-none"
          >
            <option>All Types</option>

            <option>Lecture Hall</option>

            <option>Lab</option>

            <option>Meeting Room</option>

            <option>Auditorium</option>
          </select>
        </div>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
