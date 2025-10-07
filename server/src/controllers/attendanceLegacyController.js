import AttendanceLegacy from "../models/AttendanceLegacy.js";

//  Today’s attendance
export const todayAttendance = async (req, res) => {
  try {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    const records = await AttendanceLegacy.find({
      attendanceDate: { $gte: start, $lte: end }
    }).sort({ employeeName: 1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Monthly attendance
export const monthlyAttendance = async (req, res) => {
  try {
    const { month, year } = req.params; // /monthly/:month/:year
    const start = new Date(year, month - 1, 1); // month is 0-indexed
    const end = new Date(year, month, 0, 23, 59, 59, 999); // last day of month

    const records = await AttendanceLegacy.find({
      attendanceDate: { $gte: start, $lte: end }
    }).sort({ attendanceDate: 1, employeeName: 1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Attendance by date range
export const attendanceByRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body; // send JSON {startDate, endDate}
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const records = await AttendanceLegacy.find({
      attendanceDate: { $gte: start, $lte: end }
    }).sort({ attendanceDate: 1, employeeName: 1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
