import { useEffect, useState } from "react";
import { TableRowSkeleton } from "../../components/skeletons";
import { getProfiles } from "../../services/profileServices";
const ManageUsers = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getProfiles();
        setProfiles(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);

      setProfiles((prev) =>
        prev.map((profile) =>
          profile.id === id ? { ...profile, role } : profile,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = profiles.filter((profile) =>
    profile.full_name?.toLowerCase().includes(search.toLowerCase()),
  );

  const students = profiles.filter(
    (profile) => profile.role === "student",
  ).length;

  const staff = profiles.filter((profile) => profile.role === "staff").length;

  const admins = profiles.filter((profile) => profile.role === "admin").length;

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div>
          <div className="h-12 w-72 rounded-2xl bg-white" />
          <div className="mt-3 h-5 w-96 rounded-2xl bg-white" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow">
              <div className="h-5 w-40 rounded-2xl bg-gray-100" />
              <div className="mt-4 h-10 w-20 rounded-2xl bg-gray-100" />
            </div>
          ))}
        </div>

        <div className="h-12 w-full md:w-96 rounded-xl bg-white" />

        <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-950 text-white">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <TableRowSkeleton rows={6} />
            </tbody>
          </table>
        </div>

        <div className="md:hidden flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-4">
              <div className="h-6 w-56 rounded-2xl bg-gray-100" />
              <div className="mt-3 h-4 w-full rounded-2xl bg-gray-100" />
              <div className="mt-3 h-4 w-40 rounded-2xl bg-gray-100" />
              <div className="mt-3 h-10 w-full rounded-2xl bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-950">
          Manage Users
        </h1>

        <p className="text-gray-500 mt-2">Manage user roles and permissions.</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Total Users</p>

          <h2 className="text-3xl font-bold">{profiles.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Students</p>

          <h2 className="text-3xl font-bold text-blue-600">{students}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Staff</p>

          <h2 className="text-3xl font-bold text-green-600">{staff}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Admins</p>

          <h2 className="text-3xl font-bold text-purple-600">{admins}</h2>
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((profile) => (
              <tr key={profile.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{profile.full_name}</td>

                <td className="p-4">{profile.email}</td>

                <td className="p-4 capitalize">{profile.role}</td>

                <td className="p-4">
                  <select
                    value={profile.role}
                    onChange={(e) =>
                      handleRoleChange(profile.id, e.target.value)
                    }
                    className="border rounded-lg p-2"
                  >
                    <option value="student">Student</option>

                    <option value="staff">Staff</option>

                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredUsers.map((profile) => (
          <div key={profile.id} className="bg-white rounded-2xl shadow p-4">
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-lg">{profile.full_name}</h2>

              <p className="text-gray-500 break-all">{profile.email}</p>

              <div>
                <span className="font-semibold">Current Role:</span>{" "}
                {profile.role}
              </div>

              <select
                value={profile.role}
                onChange={(e) => handleRoleChange(profile.id, e.target.value)}
                className="border rounded-lg p-2"
              >
                <option value="student">Student</option>

                <option value="staff">Staff</option>

                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
