import useAuthStore from "../../store/authstore";

const AdminTopbar = () => {
  const profile = useAuthStore((state) => state.profile);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h1 className="text-3xl font-bold text-blue-950">Admin Dashboard</h1>

      <p className="text-gray-500 mt-2">Welcome back {profile?.full_name}</p>
    </div>
  );
};

export default AdminTopbar;
