import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";

<Toaster position="top-right" />;

import useAuthStore from "./store/authstore";

useAuthStore.getState().checkAuth();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);
