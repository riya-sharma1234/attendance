import Attendance from "../models/attendance.models.js";

const ALLOWED_LAT = 23.867516;
const ALLOWED_LON = 86.159526;
// const ALLOWED_LAT = 28.438106;
// const ALLOWED_LON =  77.104046;
// 28.438143431589843, 77.1041318999999
const ALLOWED_RADIUS = 100; // meters

// Haversine formula to calculate distance
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Punch-in
export const PunchIn = async (req, res) => {
  try {
    const { userId, lat, lon } = req.body;

    if (getDistance(lat, lon, ALLOWED_LAT, ALLOWED_LON) > ALLOWED_RADIUS)
      return res.status(400).json({ message: "You are outside the allowed area." });

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    let attendance = await Attendance.findOne({
      userId,
      date: { $gte: todayStart, $lte: todayEnd }
    });

    if (attendance?.punchIn)
      return res.json({ message: "Already punched in today", attendance });

    if (!attendance) attendance = new Attendance({ userId, date: todayStart });

    attendance.punchIn = new Date();
    attendance.punchInLocation = { lat, lon };
    await attendance.save();

    res.json({ message: "Punch-in successful", attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Punch-out
export const punchOut = async (req, res) => {
  try {
    const { userId, lat, lon } = req.body;

    if (getDistance(lat, lon, ALLOWED_LAT, ALLOWED_LON) > ALLOWED_RADIUS)
      return res.status(400).json({ message: "You are outside the allowed area." });

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const attendance = await Attendance.findOne({
      userId,
      date: { $gte: todayStart, $lte: todayEnd }
    });

    if (!attendance?.punchIn)
      return res.status(400).json({ message: "You haven't punched in yet." });

    if (attendance.punchOut)
      return res.status(400).json({ message: "Already punched out today." });

    attendance.punchOut = new Date();
    attendance.punchOutLocation = { lat, lon };
    await attendance.save();

    res.json({ message: "Punch-out successful", attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// / ---------------------- Get Today's Attendance ----------------------
export const getTodayAttendance = async (req, res) => {
  try {
    const { userId } = req.query;
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const attendance = await Attendance.findOne({
      userId,
      date: { $gte: todayStart, $lte: todayEnd }
    });

    res.json({ attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------------------- Get Attendance by Date Range ----------------------
export const getAttendanceByDateRange = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;

    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ message: "userId, startDate and endDate are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const attendance = await Attendance.find({
      userId,
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    res.json({ attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getMonthlyReport = async (req, res) => {
  try {
    const { userId, month, year } = req.query;
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    const attendance = await Attendance.find({
      userId,
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    // Optional: calculate total hours per day
    const report = attendance.map(a => ({
      date: a.date,
      punchIn: a.punchIn,
      punchOut: a.punchOut,
      hoursWorked: a.punchIn && a.punchOut ? ((a.punchOut - a.punchIn)/1000/60/60).toFixed(2) : 0
    }));

    res.json({ report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};