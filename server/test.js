// import sql from "mssql/msnodesqlv8.js";

// const config = {
//   server: "localhost\\SQLEXPRESS",   // adjust if different
//   database: "eTimeTrackLite1",        // put your actual DB name
//   options: {
//     trustedConnection: true,
//     enableArithAbort: true,
//   },
//   driver: "msnodesqlv8",
// };

// async function getEmployees() {
//   try {
//     const pool = await sql.connect(config);

//     const result = await pool.request().query("SELECT TOP 10 * FROM dbo.Employees");
//     console.log("Employees:", result.recordset);
//   } catch (err) {
//     console.error("SQL Error:", err);
//   }
// }

// getEmployees();
