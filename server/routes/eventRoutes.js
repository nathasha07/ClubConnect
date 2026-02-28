import express from "express";
import { createEvent, getEvents, getPendingEvents, approveEvent, rejectEvent } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Coordinator creates event (defaults to Pending approval status)
router.post("/", protect, authorizeRoles("Coordinator"), createEvent);

// Get pending events (for admin approval)
router.get("/pending", protect, authorizeRoles("Admin"), getPendingEvents);

// Get all events (approved only for students, all for admin if ?all=true)
router.get("/", protect, getEvents);

// Admin approves event
router.put("/:id/approve", protect, authorizeRoles("Admin"), approveEvent);

// Admin rejects event
router.put("/:id/reject", protect, authorizeRoles("Admin"), rejectEvent);

export default router;