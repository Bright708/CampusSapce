import { useEffect, useState } from "react";
import CreateRoomModal from "../../components/admin/CreateRoomModal";
import { getRooms } from "../../services/roomServices";

const ManageRooms = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchRooms = async () => {
    try {
      const response = await getRooms();
      console.log("ROOM RESPONSE:", response);
      console.log("ROOMS STATE:", rooms);
      setRooms(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    console.log("ROOMS STATE:", rooms);
  }, [rooms]);

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return <h1>Loading rooms...</h1>;
  }

  return (
    <div className="flex flex-col gap-5 w-full ">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border rounded-xl p-3"
        />
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-950 text-white px-5 py-3 rounded-xl"
        >
          Create Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            <img
              src={room.image_url}
              alt={room.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h2 className="text-xl font-bold text-blue-950">{room.name}</h2>

                <p className="text-gray-500">{room.building}</p>

                <p className="text-sm text-gray-400">{room.floor}</p>
              </div>

              <div className="flex justify-between">
                <span>Capacity: {room.capacity}</span>

                <span>{room.type}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {room.equipment?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-950 px-2 py-1 rounded-lg text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div>
                {room.is_under_maintenance ? (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Under Maintenance
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Available
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl">
                  Edit
                </button>

                <button className="bg-red-600 text-white px-4 py-2 rounded-xl">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showCreateModal && (
        <CreateRoomModal
          onClose={() => setShowCreateModal(false)}
          refreshRooms={fetchRooms}
        />
      )}
    </div>
  );
};

export default ManageRooms;
