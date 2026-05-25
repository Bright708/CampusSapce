import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Bookings from "../pages/dashboard/Bookings";
import Events from "../pages/dashboard/Events";
import RoomDetails from "../pages/dashboard/RoomDetails";
import Rooms from "../pages/dashboard/Rooms";
import Settings from "../pages/dashboard/Settings";
import Home from "../pages/Home";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

/* 
import ManageBookings from "../pages/admin/ManageBookings";
import ManageRooms from "../pages/admin/ManageRooms";
import ManageUsers from "../pages/admin/ManageUsers"; */

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="rooms" element={<Rooms />} />

          <Route path="rooms/:id" element={<RoomDetails />} />

          <Route path="bookings" element={<Bookings />} />

          <Route path="events" element={<Events />} />

          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          {/* <Route path="rooms" element={<ManageRooms />} />

          <Route path="bookings" element={<ManageBookings />} />

          <Route path="users" element={<ManageUsers />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
