import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink, useNavigate } from "react-router-dom";
import LOGO from "..//../assets/LOGO.jpeg";

import { motion } from "framer-motion";

import useAuthStore from "../../store/authstore";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const { signOut } = useAuthStore();

  const navLinks = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin",
    },

    {
      name: "Rooms",
      icon: <MeetingRoomIcon />,
      path: "/admin/rooms",
    },

    {
      name: "Bookings",
      icon: <BookIcon />,
      path: "/admin/bookings",
    },

    {
      name: "Users",
      icon: <PersonIcon />,
      path: "/admin/users",
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
          <h1 className="text-3xl flex gap-x-2 font-bold text-blue-950">
            <img src={LOGO} alt="" className="w-10 h-10" />
            CampusSpace
          </h1>

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

export default AdminSidebar;
