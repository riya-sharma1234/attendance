// import React, { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import { useDispatch, useSelector } from "react-redux";
// import { getLeavesByStatus, } from "../redux/LeaveSlice";
// import { fetchBirthdays } from "../redux/employeeSlice"

// export default function CalenderDashboard({  }) {
//   const [holidayEvents, setHolidayEvents] = useState([]);
//   const dispatch = useDispatch();
//   const { leaves } = useSelector((state) => state.leave);
//    const { employees } = useSelector((state) => state.employees);
//    const [error, setError] = useState("");


// //   const formatDateOnly = (dateStr) => {
// //   return new Date(dateStr).toISOString().split("T")[0]; // YYYY-MM-DD
// // };

//   useEffect(() => {
//     fetch('https://calendarific.com/api/v2/holidays?api_key=Fa05gmcEcjCpnOrqvwSwT2lFi9MgwYNZ&country=IN&year=2025')
//       .then((res) => res.json())
//       .then((data) => {
//         if (!data.response || !data.response.holidays) {
//           console.error("Invalid response:", data);
//           return;
//         }
//         const formatted = data.response.holidays.map((holiday) => ({
//           title: holiday.name,
//           date: holiday.date.iso,
//           color: "rgba(97, 134, 255, 1)",
//         }));
//         setHolidayEvents(formatted);
//       })
//       .catch((err) => {
//         console.error("Error fetching holidays:", err);
//       });
//   }, []);


//   // Fetch approved leaves from Redux
//   useEffect(() => {
//     dispatch(getLeavesByStatus({ status: "approved" }));
//   }, [dispatch]);


//    useEffect(() => {
//     dispatch(fetchBirthdays());
//   }, [dispatch]);

// //   const addOneDay = (dateStr) => {
// //   const d = new Date(dateStr);
// //   d.setDate(d.getDate() + 1);
// //   return d.toISOString();
// // };

// const approvedLeaveEvents = leaves
//   .filter((leave) => leave.fromDate && leave.toDate) 
//   .map((leave) => ({
//     id: leave._id,
//     title: `${leave.employee?.name || "Employee"} - ${leave.leaveType.toUpperCase()} Leave`,
//     start: leave.fromDate,          
//     // end: addOneDay(leave.toDate),  
//     end: leave.toDate,
//     color: "#4caf50",
//   }));


//   const birthdayEvents = employees.map((u) => {
//     const birthday = new Date(u.dob);
//     const thisYear = new Date().getFullYear();
//     const birthdayThisYear = new Date(thisYear, birthday.getMonth(), birthday.getDate());

//      const yyyy = birthdayThisYear.getFullYear();
//   const mm = String(birthdayThisYear.getMonth() + 1).padStart(2, "0");
//   const dd = String(birthdayThisYear.getDate()).padStart(2, "0");


//     return {
//       title: `${u.name}'s Birthday 🎂`,
//       // start: birthdayThisYear.toISOString().split("T")[0],
//        start: `${yyyy}-${mm}-${dd}`,
//       color: "#ff9800",
//       allDay: true,
//     };
//   });

//    const allEvents = [...holidayEvents, ...approvedLeaveEvents, ...birthdayEvents];
//    console.log("Redux Leaves:", leaves);
//   console.log("Calendar Events:", allEvents);

//   return (
//     <div className="w-90% bg-white p-2 mt-4 rounded-lg">
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         height="auto"
//         events={allEvents}
//       />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useDispatch, useSelector } from "react-redux";
import { getLeavesByStatusbyid } from "../redux/LeaveSlice";
import { fetchBirthdays } from "../redux/employeeSlice";

export default function CalenderDashboard({ user }) {
  // const [holidayEvents, setHolidayEvents] = useState([]);
  const dispatch = useDispatch();
  const { leaves } = useSelector((state) => state.leave);
  const { employees } = useSelector((state) => state.employees);

  // Fetch holidays
  const holidayEvents = [
    { title: "Republic Day", start: "2025-01-26", color: "#1976d2" },
    { title: "Holi", start: "2025-03-14", color: "#1976d2" },
    { title: "Id-ul-Fitr", start: "2025-03-31", color: "#1976d2" },
    { title: "Mahavir Jayanti", start: "2025-04-10", color: "#1976d2" },
    { title: "Good Friday", start: "2025-04-18", color: "#1976d2" },
    { title: "Labor Day", start: "2025-05-01", color: "#1976d2" },
    { title: "Buddha Purnima", start: "2025-05-12", color: "#1976d2" },
    { title: "Id-ul-Zuha (Bakrid)", start: "2025-06-07", color: "#1976d2" },
    { title: "Muharram", start: "2025-07-06", color: "#1976d2" },
    { title: "Raksha Bandhan", start: "2025-08-09", color: "#1976d2" },
    { title: "Independence Day", start: "2025-08-15", color: "#1976d2" },
    { title: "Milad-un-Nabi", start: "2025-09-05", color: "#1976d2" },
    { title: "Gandhi Jayanti / Dusshera", start: "2025-10-02", color: "#1976d2" },
    { title: "Diwali", start: "2025-10-20", color: "#1976d2" },
    { title: "Guru Nanak’s Birthday", start: "2025-11-05", color: "#1976d2" },
    { title: "Christmas", start: "2025-12-25", color: "#1976d2" },
    { title: "New Year", start: "2025-01-01", color: "#1976d2" },
    { title: "Republic Day Celebration", date: "2025-01-24", color: "#1976d2" },
    { title: "Friday Event", date: "2025-02-21", color: "#1976d2" },
    { title: "Holi Celebration", date: "2025-03-12", color: "#1976d2" },
    { title: "Friday Event", date: "2025-04-11", color: "#1976d2" },
    { title: "Friday Event", date: "2025-05-16", color: "#1976d2" },
    { title: "Friday Event", date: "2025-06-20", color: "#1976d2" },
    { title: "Friday Event", date: "2025-07-18", color: "#1976d2" },
    { title: "Friday Event", date: "2025-08-15", color: "#1976d2" },
    { title: "Friday Event", date: "2025-09-26", color: "#1976d2" },
    { title: "Diwali Celebration", date: "2025-10-16", color: "#1976d2" },
    { title: "Friday Event", date: "2025-11-14", color: "#1976d2" },
    { title: "Christmas & New Year Celebration", date: "2025-12-24", color: "#1976d2" },
  ];

  // Fetch approved leaves
  useEffect(() => {
    if (user?._id) {
      // Admin clicked employee card → fetch that employee's leaves
      dispatch(getLeavesByStatusbyid({ status: "approved", employeeId: user._id }));
    } else {
      // Otherwise → fetch logged-in admin's leaves
      dispatch(getLeavesByStatusbyid({ status: "approved" }));
    }
  }, [dispatch, user]);

  // Fetch birthdays
  useEffect(() => {
    dispatch(fetchBirthdays());
  }, [dispatch]);

  // Prepare approved leave events
  const approvedLeaveEvents = leaves
    .filter((leave) => leave.fromDate && leave.toDate)
    .map((leave) => ({
      id: leave._id,
      title: `${leave.employee?.name || "Employee"} - ${leave.leaveType?.toUpperCase()} Leave`,
      start: leave.fromDate,
      end: leave.toDate,
      color: "#4caf50",
    }));

  // Prepare birthday events
  const birthdayEvents = employees
    .filter((u) => u.dob)
    .map((u) => {
      const birthday = new Date(u.dob);
      const thisYear = new Date().getFullYear();
      const birthdayThisYear = new Date(thisYear, birthday.getMonth(), birthday.getDate());

      const yyyy = birthdayThisYear.getFullYear();
      const mm = String(birthdayThisYear.getMonth() + 1).padStart(2, "0");
      const dd = String(birthdayThisYear.getDate()).padStart(2, "0");

      return {
        title: `${u.name}'s Birthday 🎂`,
        start: `${yyyy}-${mm}-${dd}`,
        color: "#ff9800",
        allDay: true,
      };
    });

  // Combine all events
  const allEvents = [...holidayEvents, ...approvedLeaveEvents, ...birthdayEvents];

  return (
    <div className="w-90% bg-white p-2 mt-4 rounded-lg">
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" height="auto" events={allEvents} />
    </div>
  );
}
