import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import roomRoutes from "./src/routes/roomRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "CampusSpace API Running",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
