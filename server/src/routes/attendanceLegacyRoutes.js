import express from "express";
import { todayAttendance, monthlyAttendance, attendanceByRange } from "../controllers/attendanceLegacyController.js";

const router = express.Router();

// Today’s attendance
router.get("/today", todayAttendance);

// Monthly attendance: /monthly/:month/:year
router.get("/monthly/:month/:year", monthlyAttendance);

// Attendance by date range
router.post("/range", attendanceByRange);

export default router;
