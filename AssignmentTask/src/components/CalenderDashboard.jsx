import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function CalenderDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('https://calendarific.com/api/v2/holidays?api_key=Fa05gmcEcjCpnOrqvwSwT2lFi9MgwYNZ&country=IN&year=2025')
      .then((res) => res.json())
      .then((data) => {
        if (!data.response || !data.response.holidays) {
          console.error("Invalid response:", data);
          return;
        }
        const formatted = data.response.holidays.map((holiday) => ({
          title: holiday.name,
          date: holiday.date.iso,
        }));
        setEvents(formatted);
      })
      .catch((err) => {
        console.error("Error fetching holidays:", err);
      });
  }, []);

  return (
    <div className="w-full bg-white p-2 mt-4 rounded">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="90%"
        events={events}
      />
    </div>
  );
}
