import { useState } from "react";
import { createRoom } from "../../services/roomServices";

const CreateRoomModal = ({ onClose, refreshRooms }) => {
  const [equipmentInput, setEquipmentInput] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    building: "",
    floor: "",
    capacity: "",
    type: "",
    image_url: "",
    is_under_maintenance: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const roomData = {
        ...formData,
        capacity: Number(formData.capacity),
        equipment: equipmentInput.split(",").map((item) => item.trim()),
      };

      await createRoom(roomData);

      refreshRooms();

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-950 mb-6">Create Room</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Room Name"
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            name="building"
            placeholder="Building"
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            name="floor"
            placeholder="Floor"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <select
            name="type"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option value="">Select Type</option>

            <option>Lecture Hall</option>

            <option>Lab</option>

            <option>Meeting Room</option>

            <option>Auditorium</option>
          </select>

          <input
            name="image_url"
            placeholder="Image URL"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Equipment separated by commas"
            value={equipmentInput}
            onChange={(e) => setEquipmentInput(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              name="is_under_maintenance"
              onChange={handleChange}
            />
            Under Maintenance
          </label>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-950 text-white px-5 py-2 rounded-xl"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
