import { Building2, Camera, Mail, User } from "lucide-react";
import { useState } from "react";
import ProfileSkeleton from "../../components/skeletons/ProfileSkeleton";
import { updateProfile, uploadAvatar } from "../../services/profileServices";
import useAuthStore from "../../store/authstore";
const Profile = () => {
  const profile = useAuthStore((state) => state.profile);

  if (!profile) {
    return <ProfileSkeleton />;
  }

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    department: profile?.department || "",
    avatar_url: profile?.avatar_url || "",
  });
  const [uploading, setUploading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProfile = await updateProfile(formData);

      useAuthStore.setState({
        profile: updatedProfile,
      });

      alert("Profile updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleAvatarUpload = async (e) => {
    try {
      setUploading(true);

      const file = e.target.files[0];

      if (!file) return;

      const publicUrl = await uploadAvatar(file, profile.id);

      const updatedProfile = await updateProfile({
        avatar_url: publicUrl,
      });

      setFormData((prev) => ({
        ...prev,
        avatar_url: publicUrl,
      }));
    } catch (error) {
      console.log(error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-blue-950">My Profile</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow p-8 flex flex-col items-center">
          <div className="relative">
            <img
              src={
                formData.avatar_url ||
                `https://ui-avatars.com/api/?name=${profile?.full_name}`
              }
              alt=""
              className="h-36 w-36 rounded-full object-cover"
            />

            <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-950 p-3 text-white">
              <Camera size={18} />

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>

          <h2 className="mt-6 text-2xl font-bold text-blue-950">
            {profile?.full_name}
          </h2>

          <p className="text-gray-500">{profile?.role}</p>
        </div>

        {/* DETAILS CARD */}
        <div className="bg-white rounded-3xl shadow p-8 lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <div>
              <label className="font-semibold text-blue-950">Full Name</label>

              <div className="flex items-center gap-3 border rounded-2xl p-4 mt-2">
                <User size={20} />

                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="font-semibold text-blue-950">Email</label>

              <div className="flex items-center gap-3 border rounded-2xl p-4 mt-2">
                <Mail size={20} />

                <input
                  disabled
                  value={profile?.email}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* DEPARTMENT */}
            <div>
              <label className="font-semibold text-blue-950">Department</label>

              <div className="flex items-center gap-3 border rounded-2xl p-4 mt-2">
                <Building2 size={20} />

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full outline-none"
                />
              </div>
            </div>

            <button
              disabled={uploading}
              className="bg-blue-950 text-white px-8 py-4 rounded-2xl hover:opacity-80 cursor-pointer"
            >
              {uploading ? "Uploading..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
