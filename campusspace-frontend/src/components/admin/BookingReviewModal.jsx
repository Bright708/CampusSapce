import { useState } from "react";

const BookingReviewModal = ({ booking, onClose, onApprove, onReject }) => {
  const [notes, setNotes] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Review Booking</h2>

        <div className="space-y-2 mb-4">
          <p>
            <strong>User:</strong> {booking.profiles?.full_name}
          </p>

          <p>
            <strong>Room:</strong> {booking.rooms?.name}
          </p>

          <p>
            <strong>Type:</strong> {booking.booking_type}
          </p>

          <p>
            <strong>Date:</strong> {booking.booking_date}
          </p>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Admin notes..."
          className="w-full border rounded-xl p-3 h-32"
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onApprove(notes)}
            className="flex-1 bg-green-600 text-white py-3 rounded-xl"
          >
            Approve
          </button>

          <button
            onClick={() => onReject(notes)}
            className="flex-1 bg-red-600 text-white py-3 rounded-xl"
          >
            Reject
          </button>

          <button onClick={onClose} className="flex-1 border py-3 rounded-xl">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingReviewModal;
