import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
  addMemberToClub
} from "../controllers/clubController.js";

const router = express.Router();

/* =====================================================
   🔒 ADMIN ROUTES
===================================================== */

// Create club
router.post(
  "/",
  protect,
  authorizeRoles("Admin"),
  createClub
);

// Get all clubs
router.get("/", protect, getAllClubs);

// Get club by ID
router.get(
  "/:id",
  protect,
  getClubById
);

// Update club
router.put(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  updateClub
);

// Delete club
router.delete(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  deleteClub
);

// Add member to club
router.post(
  "/members/add",
  protect,
  addMemberToClub
);

export default router;
