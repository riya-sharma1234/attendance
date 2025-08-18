import express from "express";
import {
  applyLeave,
  getMonthlyLeaveStatus,
  updateLeaveStatus,
  getPendingLeaves,
  getLeavesByStatus,
} from "../controllers/LeaveController.js";
import { isAuthenticated , adminOnly} from "../middlewares.js/auth.js";


const router = express.Router();

// Employee routes
router.post("/apply", isAuthenticated, applyLeave);
router.get("/monthly-status", isAuthenticated, getMonthlyLeaveStatus);
router.post("/leave-status", isAuthenticated, getLeavesByStatus)

// Admin routes
router.get("/pending", isAuthenticated, adminOnly, getPendingLeaves);
router.post("/update-status", isAuthenticated, adminOnly, updateLeaveStatus);

export default router;
