// import sql from "mssql/msnodesqlv8.js";

// const config = {
//   connectionString:
//     "Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-EI4OBJI\\SQLEXPRESS;Database=testdb;Trusted_Connection=Yes;"
// };

// async function testConnection() {
//   try {
//     const pool = await sql.connect(config);
//     const result = await pool.request().query("SELECT TOP 10 * FROM Employees");
//     console.log(result.recordset);
//   } catch (err) {
//     console.error("❌ SQL Connection Error:", err);
//   }
// }

// testConnection();
