import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import { NavLink, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import useAuthStore from "../../store/authstore";

const Sidebar = () => {
  const navigate = useNavigate();

  const { signOut } = useAuthStore();

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
      initial={{
        x: -80,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="hidden h-screen w-72 flex-col justify-between border-r border-gray-200 bg-white p-6 lg:flex"
    >
      {/* TOP SECTION */}
      <div className="flex flex-col gap-10">
        {/* LOGO */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-blue-950">CampusSpace</h1>

          <p className="text-sm font-medium text-gray-500">University Portal</p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-3">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-4 py-3 text-[1rem] font-medium transition-all duration-300
                 
                 ${
                   isActive
                     ? "bg-blue-950 text-white shadow-lg"
                     : "text-gray-700 hover:bg-blue-50 hover:text-blue-950"
                 }`
              }
            >
              {link.icon}

              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 rounded-2xl px-4 py-3 text-left text-[1rem] font-medium text-red-500 transition-all duration-300 hover:bg-red-50"
      >
        <LogoutIcon />

        <span>Logout</span>
      </button>
    </motion.aside>
  );
};

export default Sidebar;
