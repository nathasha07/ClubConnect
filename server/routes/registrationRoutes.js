import express from "express";
import {
  registerForEvent,
  approveRegistration,
  rejectRegistration,
  getEventRegistrations,
  markAttendance,
  getAttendanceByEvent,
  getMyRegistrations
} from "../controllers/registrationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =====================================================
   🎓 STUDENT ROUTES
===================================================== */

// Register for event
router.post(
  "/",
  protect,
  authorizeRoles("Student"),
  registerForEvent
);

// View my registrations
router.get(
  "/my",
  protect,
  authorizeRoles("Student"),
  getMyRegistrations
);

/* =====================================================
   👨‍🏫 COORDINATOR ROUTES
===================================================== */

// Approve registration
router.put(
  "/:id/approve",
  protect,
  authorizeRoles("Coordinator"),
  approveRegistration
);

// Reject registration
router.put(
  "/:id/reject",
  protect,
  authorizeRoles("Coordinator"),
  rejectRegistration
);

// Mark attendance
router.put(
  "/:id/attendance",
  protect,
  authorizeRoles("Coordinator"),
  markAttendance
);

// View registrations for an event
router.get(
  "/event/:eventId",
  protect,
  authorizeRoles("Coordinator"),
  getEventRegistrations
);

// View attendance for an event
router.get(
  "/attendance/:eventId",
  protect,
  authorizeRoles("Coordinator"),
  getAttendanceByEvent
);

export default router;