import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import useAuthStore from "../../store/authstore";

const MobileSidebar = ({ isOpen, setIsOpen }) => {
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />

          {/* SIDEBAR */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.25 }}
            className="
              fixed left-0 top-0 z-50 flex h-screen w-72 flex-col justify-between
              border-r border-slate-200 bg-white p-6 shadow-2xl
              dark:border-slate-800 dark:bg-slate-900
              lg:hidden
            "
          >
            {/* TOP SECTION */}
            <div className="flex flex-col gap-8">
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-blue-950 dark:text-white">
                    CampusSpace
                  </h1>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    University Portal
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="
                    flex h-10 w-10 items-center justify-center rounded-xl
                    bg-slate-100 transition-all duration-300
                    hover:bg-slate-200
                    dark:bg-slate-800 dark:hover:bg-slate-700
                  "
                >
                  <CloseIcon className="text-slate-700 dark:text-slate-300" />
                </button>
              </div>

              {/* NAVIGATION */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `
                      flex items-center gap-4 rounded-2xl px-4 py-3
                      text-sm font-medium transition-all duration-300

                      ${
                        isActive
                          ? "bg-blue-950 text-white shadow-md"
                          : `
                            text-slate-700
                            hover:bg-blue-50
                            hover:text-blue-950

                            dark:text-slate-300
                            dark:hover:bg-slate-800
                            dark:hover:text-white
                          `
                      }
                    `
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
              className="
                flex items-center gap-4 rounded-2xl px-4 py-3
                text-sm font-medium text-red-500
                transition-all duration-300
                hover:bg-red-50

                dark:hover:bg-red-500/10
              "
            >
              <LogoutIcon />

              <span>Logout</span>
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;