import express from "express";
import { createEvent, getEvents } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("Coordinator"), createEvent);
router.get("/", protect, getEvents);

export default router;