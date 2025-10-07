
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAnnouncements,
//   deleteAnnouncement,
//   clearAnnouncementError,
//   clearAnnouncementMessage,
// } from "../redux/announcementSlice";
// import { toast } from "react-toastify";
// import { FaTrash } from "react-icons/fa";

// export const GetAnnouncement = () => {
//   const dispatch = useDispatch();
//   const { announcements, loading, error, successMessage } = useSelector(
//     (state) => state.announcement
//   );

//   // Fetch announcements on mount
//   useEffect(() => {
//     dispatch(fetchAnnouncements());
//   }, [dispatch]);

//   // Toast notifications
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAnnouncementError());
//     }
//     if (successMessage) {
//       toast.success(successMessage);
//       dispatch(clearAnnouncementMessage());
//     }
//   }, [error, successMessage, dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this announcement?")) {
//       dispatch(deleteAnnouncement(id));
//     }
//   };

//   return (
//     <div className="p-2 bg-gray-100 max-h-[300px] overflow-y-auto rounded-lg">
//       <h2 className="text-2xl font-semibold mb-2 text-center">Announcements</h2>

//       <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
//         {(!announcements || announcements.length === 0) && (
//           <p className="text-gray-600 text-center">No announcements yet.</p>
//         )}

//         {announcements?.map((ann) => (
//           <div
//             key={ann._id}
//             className="bg-white p-2 rounded-lg shadow flex justify-between items-start hover:shadow-lg transition"
//           >
//             <div>
//               <h3 className="font-bold text-lg text-gray-800">{ann.title}</h3>
//               <p className="text-gray-700 mt-1">{ann.message}</p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleDelete(ann._id)}
//                 className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
//               >
//                 <FaTrash /> Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnnouncements,
  deleteAnnouncement,
  clearAnnouncementError,
  clearAnnouncementMessage,
} from "../redux/announcementSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { isToday } from "../utils/date";
import { fetchBirthdays } from "../redux/employeeSlice";


export const GetAnnouncement = () => {
  const dispatch = useDispatch();
  const { announcements, error, successMessage } = useSelector(
    (state) => state.announcement
  );
   const { employees } = useSelector((state) => state.employees);

  const [birthdays, setBirthdays] = useState([]);

  // load admin announcements
  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  // toast messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAnnouncementError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearAnnouncementMessage());
    }
  }, [error, successMessage, dispatch]);

  useEffect(() => {
    dispatch(fetchBirthdays());
  }, [dispatch]);


   const birthdaysToday = employees.filter((u) => isToday(u.dob));

  const handleDelete = (id) => {
    if (window.confirm("Delete this announcement?")) {
      dispatch(deleteAnnouncement(id));
    }
  };

  return (
    <div className="p-2 bg-gray-100 max-h-[300px] overflow-y-auto rounded-lg">
      <h2 className="text-2xl font-semibold mb-2 text-center">Announcements</h2>

      <div className="space-y-2 pr-1">
        {/* auto birthdays */}
        {birthdaysToday.map((u) => (
        <div key={u._id} className="bg-yellow-100 p-2 rounded-lg">
          🎂 Today is {u.name}'s birthday!
        </div>
      ))}

        {/* admin announcements */}
        {(!announcements || announcements.length === 0) && birthdays.length === 0 && (
          <p className="text-gray-600 text-center">No announcements today.</p>
        )}

        {announcements?.map((ann) => (
          <div
            key={ann._id}
            className="bg-white p-2 rounded-lg shadow flex justify-between items-start hover:shadow-lg transition"
          >
            <div>
              <h3 className="font-bold text-lg text-gray-800">{ann.title}</h3>
              <p className="text-gray-700 mt-1">{ann.message}</p>
            </div>
            {/* delete only for real announcements */}
            <button
              onClick={() => handleDelete(ann._id)}
              className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

