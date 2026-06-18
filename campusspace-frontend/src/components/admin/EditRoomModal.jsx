import { useState } from "react";
import { updateRoom } from "../../services/roomServices";
const EditRoomModal = ({ room, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: room.name,
    building: room.building,
    floor: room.floor,
    capacity: room.capacity,
    type: room.type,
    image_url: room.image_url,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateRoom(room.id, formData);

      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-blue-950 mb-6">Edit Room</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="building"
            value={formData.building}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-xl py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-950 text-white rounded-xl py-3"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;
