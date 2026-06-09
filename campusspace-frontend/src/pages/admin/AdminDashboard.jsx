// pages/admin/AdminDashboard.jsx

const AdminDashboard = () => {
  console.log("AdminDashboard rendered");
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-gray-500">Total Rooms</h2>

        <p className="text-4xl font-bold text-blue-950">0</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-gray-500">Total Bookings</h2>

        <p className="text-4xl font-bold text-blue-950">0</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-gray-500">Pending Requests</h2>

        <p className="text-4xl font-bold text-orange-500">0</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
