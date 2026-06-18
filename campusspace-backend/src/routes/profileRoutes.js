import express from "express";

const router = express.Router();

import { getProfiles, updateProfile } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

router.get("/", authMiddleware, roleMiddleware("admin"), getProfiles);
router.patch("/", authMiddleware, updateProfile);

export default router;
