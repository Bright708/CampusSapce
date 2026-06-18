import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import DashboardLayout from "../layout/DashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageBookings from "../pages/admin/ManageBookings";
import ManageRooms from "../pages/admin/ManageRooms";
import ManageUsers from "../pages/admin/ManageUsers";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Bookings from "../pages/dashboard/Bookings";
import Calender from "../pages/dashboard/Calender";
import Dashboard from "../pages/dashboard/Dashboard";
import EventDetails from "../pages/dashboard/EventDetails";
import Events from "../pages/dashboard/Events";
import Profile from "../pages/dashboard/Profile";
import Rooms from "../pages/dashboard/Rooms";
import Home from "../pages/Home";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

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

          <Route path="events/:id" element={<EventDetails />} />
          <Route path="profile" element={<Profile />} />

          <Route path="bookings" element={<Bookings />} />

          <Route path="events" element={<Events />} />

          <Route path="calendar" element={<Calender />} />
        </Route>

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="rooms" element={<ManageRooms />} />

          <Route path="bookings" element={<ManageBookings />} />

          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
