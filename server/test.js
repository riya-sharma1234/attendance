

import sql from "mssql";

const config = {
  user: "sa",
  password: "Riya@1212",
  server: "localhost\\SQLEXPRESS",
  database: "etimetracklite1", 
   options: {
    encrypt: false,
    enableArithAbort: true
  }
};


async function getEmployees() {
  try {
    const pool = await sql.connect(config);
    // const result = await pool.request().query("SELECT * FROM dbo.AttendanceLogs");
    // const result = await pool.request().query("SELECT * FROM dbo.Employees"); 
    const result = await pool.request().query("SELECT * FROM dbo.Employees WHERE EmployeeCode = 1");

    console.log("Employees:", result.recordset);
    await pool.close();
  } catch (err) {
    console.error("SQL Error:", err);
  }
}

getEmployees();
