import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import AppRoutes from "./routes/AppRoutes";

import { supabase } from "./lib/supabase";

import useAuthStore from "./store/authStore";

// Initial auth check
useAuthStore.getState().checkAuth();

// Listen for auth changes
supabase.auth.onAuthStateChange(async (event, session) => {
  if (session) {
    await useAuthStore.getState().checkAuth();
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);
