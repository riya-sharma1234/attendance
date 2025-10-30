// import sql from "mssql";
// import Employee from "../models/Employee.js";

// export const fetchAndSyncData = async (sqlInstance) => {
//   try {
//     const result = await sqlInstance.query`SELECT * FROM Employees`; // replace with your actual table
//     const employees = result.recordset;
//    console.log("Fetched employees from SQL:", employees); 
//     for (const emp of employees) {
//       await Employee.findOneAndUpdate(
//         { EmpID: emp.EmpID },
//         emp,
//         { upsert: true, new: true }
//       );
//     }

//     console.log("Data synced successfully.");
//   } catch (err) {
//     console.error("Data fetch/sync failed", err);
//   }
// };
