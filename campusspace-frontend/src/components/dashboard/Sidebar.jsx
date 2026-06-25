import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";

import LOGO from "../../assets/LOGO.jpeg";

import useAuthStore from "../../store/authstore";

const Sidebar = () => {
  const navigate = useNavigate();

  const { signOut, profile } = useAuthStore();

  const navLinks = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      name: "Rooms",
      icon: <MeetingRoomIcon />,
      path: "/dashboard/rooms",
    },
    {
      name: "Bookings",
      icon: <BookIcon />,
      path: "/dashboard/bookings",
    },
    {
      name: "Calendar",
      icon: <CalendarMonthIcon />,
      path: "/dashboard/calendar",
    },
    {
      name: "Events",
      icon: <EventIcon />,
      path: "/dashboard/events",
    },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden h-screen w-64 flex-col justify-between border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-900 lg:flex"
    >
      {/* TOP */}{" "}
      <div>
        {/* LOGO */}{" "}
        <div className="mb-8">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <img
              src={LOGO}
              alt="CampusSpace"
              className="h-10 w-10 rounded-xl object-cover"
            />
            ```
            <div>
              <h1 className="text-xl font-bold text-blue-950 dark:text-white">
                CampusSpace
              </h1>

              <p className="text-xs text-slate-500">University Portal</p>
            </div>
          </div>
        </div>
        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
            ${
              isActive
                ? "bg-blue-950 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-blue-950 dark:text-slate-300 dark:hover:bg-slate-800"
            }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      {/* BOTTOM */}
      <div>
        {/* USER CARD */}
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="avatar"
              className="h-10 w-10 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-white font-bold">
              {profile?.full_name?.charAt(0) || "U"}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-blue-950 dark:text-white">
              {profile?.full_name || "Student"}
            </p>

            <p className="text-xs text-slate-500">Campus Member</p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
