import { useState } from "react";
import { Outlet } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";

import MobileSidebar from "../components/dashboard/MobileSidebar";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MOBILE SIDEBAR */}
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* MAIN CONTENT */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* MOBILE HEADER */}
        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:hidden">
          <h1 className="text-xl font-bold text-blue-950 dark:text-white">
            CampusSpace
          </h1>

          <button
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition-all hover:bg-slate-200 dark:bg-slate-800"
          >
            <MenuIcon className="text-blue-950 dark:text-white" />
          </button>
        </div>

        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
