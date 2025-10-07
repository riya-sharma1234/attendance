import express from "express";
import {
  applyLeave,
  getMonthlyLeaveStatus,
  updateLeaveStatus,
  getPendingLeaves,
  getLeavesByStatus,
  setLeaveLimits,
  getLeaveBalances,
  filterLeaves,
  getLeavesByStatusbyid,
} from "../controllers/LeaveController.js";
import { isAuthenticated , adminOnly} from "../middlewares.js/auth.js";


const router = express.Router();

// Employee routes
router.post("/apply", isAuthenticated, applyLeave);
router.get("/leave-balances", isAuthenticated , getLeaveBalances);
router.get("/monthly-status", isAuthenticated, getMonthlyLeaveStatus);
router.post("/leave-status", isAuthenticated, getLeavesByStatus)
router.get("/status", isAuthenticated, getLeavesByStatusbyid)
// Admin routes
router.get("/pending", isAuthenticated, adminOnly, getPendingLeaves);
router.post("/update-status", isAuthenticated, adminOnly, updateLeaveStatus);
router.put("/set-limits", isAuthenticated, adminOnly, setLeaveLimits);
router.get("/filter", isAuthenticated, filterLeaves);

export default router;
