
import express from "express";
import { isAuthenticated, adminOnly } from "../middlewares.js/auth.js";
import {
  PunchIn,
  punchOut,
  getTodayAttendance,
  getAttendanceByDateRange,
  getMonthlyReport
} from "../controllers/attendanceController.js";

const router = express.Router();

// ------------------- Employee Routes -------------------
// Punch-in
router.post("/punch-in", isAuthenticated, PunchIn);

// Punch-out
router.post("/punch-out", isAuthenticated, punchOut);

// Get today's attendance
router.get("/today", isAuthenticated, getTodayAttendance);

// Get attendance by date range (startDate & endDate as query params)
router.get("/range", isAuthenticated, getAttendanceByDateRange);

// Generate monthly report (query params: userId, month, year)
router.get("/report", isAuthenticated, adminOnly, getMonthlyReport);

export default router;
