

// import ADODB from "node-adodb";

// // Use 64-bit cscript
// ADODB.cscript = 'C:\\Windows\\System32\\cscript.exe';

// const dbPath = 'C:\\Program Files (x86)\\essl\\eTimeTrackLite\\eTimeTrackLite1.mdb';
// const connection = ADODB.open(
//   `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${dbPath};Persist Security Info=False;`
// );

// const query = `
// SELECT [EmployeeId], [EmployeeName]
// FROM [Employees]
// ORDER BY [EmployeeName]
// `;

// async function fetchEmployees() {
//     try {
//         const records = await connection.query(query);
//         console.log("Employees:");
//         console.table(records);
//     } catch (err) {
//         console.error("Error fetching employees:", err);
//     }
// }

// fetchEmployees();

import ADODB from "node-adodb";

// Use 64-bit cscript
ADODB.cscript = 'C:\\Windows\\System32\\cscript.exe';

const dbPath = 'C:\\Program Files (x86)\\essl\\eTimeTrackLite\\eTimeTrackLite1.mdb';
const connection = ADODB.open(
  `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${dbPath};Persist Security Info=False;`
);

const query = `
SELECT 
    e.EmployeeId,
    e.EmployeeName,
    a.AttendanceDate,
    a.InTime,
    a.OutTime
FROM 
    Employees e
INNER JOIN 
    AttendanceLogs a
    ON e.EmployeeId = a.EmployeeId
ORDER BY 
    a.AttendanceDate DESC, e.EmployeeName
`;

async function fetchPunchData() {
    try {
        const records = await connection.query(query);
        console.log("Punch Records:");
        console.table(records);
    } catch (err) {
        console.error("Error fetching punch records:", err);
    }
}

fetchPunchData();
