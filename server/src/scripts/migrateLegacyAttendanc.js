// Load environment variables
import dotenv from "dotenv" 
import path from "path";
import ADODB from "node-adodb";
import AttendanceLegacy from "../models/attendanceLegacyModels.js";
import connectDB from "../config/database.config.js";

dotenv.config({ path: path.resolve('../../.env') });

(async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();

    // 2️⃣ MDB file path (Windows only)
    ADODB.cscript = "C:\\Windows\\System32\\cscript.exe";
    const mdbPath = "C:\\Program Files (x86)\\essl\\eTimeTrackLite\\eTimeTrackLite1.mdb";
    const connection = ADODB.open(
      `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${mdbPath};Persist Security Info=False;`
    );

    // 3️⃣ Query MDB
    const query = `
      SELECT 
        e.EmployeeId,
        e.EmployeeName,
        a.AttendanceDate,
        a.InTime,
        a.OutTime
      FROM Employees e
      INNER JOIN AttendanceLogs a
      ON e.EmployeeId = a.EmployeeId
      ORDER BY a.AttendanceDate DESC, e.EmployeeName
    `;

    const records = await connection.query(query);

    // 4️⃣ Transform & insert into MongoDB
    const formatted = records.map(r => ({
      employeeId: r.EmployeeId,
      employeeName: r.EmployeeName,
      attendanceDate: new Date(r.AttendanceDate),
      inTime: r.InTime,
      outTime: r.OutTime,
    }));

    await AttendanceLegacy.insertMany(formatted);
    console.log(`✅ Migration completed! ${records.length} records inserted.`);

    process.exit(0); // end script
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
})();
