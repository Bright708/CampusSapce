import { useState } from "react";

import { Outlet } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";

import MobileSidebar from "../components/dashboard/MobileSidebar";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MOBILE SIDEBAR */}
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* MAIN CONTENT */}
      <main className="flex flex-1 flex-col">
        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 lg:hidden">
          <h1 className="text-2xl  font-bold text-blue-950">CampusSpace</h1>

          <button
            onClick={() => setIsOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-blue-50"
          >
            <MenuIcon className="text-blue-950" />
          </button>
        </div>

        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
