
// import React, { useEffect, useState } from "react";
// import { FaTrash, FaUpload } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDocuments,
//   uploadDocument,
//   deleteDocument,
//   clearDocumentError,
//   clearDocumentMessage,
// } from "../redux/documentSlice";
// import { getEmployees } from "../redux/employeeSlice"; // import employee thunk

// const Document = () => {
//   const dispatch = useDispatch();

//   // Redux state
//   const { documents, loading, error, successMessage } = useSelector(
//     (state) => state.documents || {}
//   );
//   const { user: currentUser } = useSelector((state) => state.auth || {});
//   const { employees } = useSelector((state) => state.employees || { employees: [] });

//   // Local state
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [visibility, setVisibility] = useState("private");

//   // Fetch documents and employees on mount
//   useEffect(() => {
//     dispatch(fetchDocuments());

//     if (currentUser?.role === "admin") {
//       dispatch(getEmployees()); // fetch employees from redux
//     }
//   }, [dispatch, currentUser]);

//   const handleUserSelect = (e) => {
//     const value = Array.from(e.target.selectedOptions, (option) => option.value);
//     setSelectedUsers(value);
//   };

//   const handleUpload = () => {
//     if (!file) return;

//     const form = new FormData();
//     form.append("file", file);
//     form.append("title", title || file.name);

//     if (currentUser?.role === "admin") {
//       form.append("visibility", visibility);
//       if (visibility === "selected") {
//         form.append("allowedUsers", JSON.stringify(selectedUsers));
//       }
//     }

//     dispatch(uploadDocument(form));
//     setFile(null);
//     setTitle("");
//     setSelectedUsers([]);
//     setVisibility("private");
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this document?")) {
//       dispatch(deleteDocument(id));
//     }
//   };

//   // Clear messages after 3 seconds
//   useEffect(() => {
//     if (error || successMessage) {
//       const timer = setTimeout(() => {
//         dispatch(clearDocumentError());
//         dispatch(clearDocumentMessage());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, successMessage, dispatch]);

//   return (
//     <div className="bg-[#0d1321] min-h-screen p-6 flex justify-center">
//       <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg">
//         <h1 className="text-center text-gray-900 font-bold text-2xl mb-4">
//           Upload & View Documents
//         </h1>

//         {error && <p className="text-red-500 text-center mb-2">{error}</p>}
//         {successMessage && <p className="text-green-500 text-center mb-2">{successMessage}</p>}

//         <div className="space-y-4 mb-6">
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Document title (optional)"
//             className="w-full border border-blue-600 rounded p-2 focus:outline-none"
//           />

//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full border border-blue-600 rounded p-2"
//           />

//           {currentUser?.role === "admin" && (
//             <>
//               <select
//                 value={visibility}
//                 onChange={(e) => setVisibility(e.target.value)}
//                 className="w-full border border-blue-600 rounded p-2"
//               >
//                 <option value="private">(only admin)</option>
//                 <option value="public">(all users)</option>
//                 <option value="selected">Selected Users</option>
//               </select>

//               {/* {visibility === "selected" && (
//                 <select
//                   multiple
//                   value={selectedUsers}
//                   onChange={handleUserSelect}
//                   className="w-full border border-blue-600 rounded p-2"
//                   size={Math.min(5, employees.length)}
//                 >
//                   {employees.map((u) => (
//                     <option key={u._id} value={u._id}>
//                       {u.name} ({u.email})
//                     </option>
//                   ))}
//                 </select>
//               )} */}

//               {visibility === "selected" && employees?.length > 0 && (
//                 <select
//                   multiple
//                   value={selectedUsers}
//                   onChange={handleUserSelect}
//                   className="w-full border border-blue-600 rounded p-2"
//                   size={Math.min(5, employees.length)}
//                 >
//                   {employees.map((u) => (
//                     <option key={u._id} value={String(u._id)}>
//                       {u.name} ({u.email})
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </>
//           )}

//           <button
//             onClick={handleUpload}
//             disabled={!file || loading}
//             className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded cursor-pointer disabled:opacity-50"
//           >
//             <FaUpload className="mr-2" />
//             {loading ? "Uploading..." : "Upload Document"}
//           </button>
//         </div>

//         <h2 className="text-center text-gray-900 font-bold text-xl mb-2">Documents List</h2>
//         <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
//           {documents?.length === 0 && (
//             <p className="text-center text-gray-500">No documents uploaded yet.</p>
//           )}
//           {documents?.map((doc) => (
//             <div
//               key={doc._id}
//               className="flex justify-between items-center bg-gray-50 p-3 rounded border border-blue-600"
//             >
//               <a
//                 href={doc.fileUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-900 hover:underline break-all"
//               >
//                 {doc.title || doc.fileUrl.split("/").pop()}
//               </a>
//               <button
//                 onClick={() => handleDelete(doc._id)}
//                 className="flex items-center bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Document;


// import React, { useEffect, useState } from "react";
// import { FaTrash, FaUpload } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDocuments,
//   uploadDocument,
//   deleteDocument,
//   clearDocumentError,
//   clearDocumentMessage,
// } from "../redux/documentSlice";
// import { getEmployees } from "../redux/employeeSlice";

// const Document = () => {
//   const dispatch = useDispatch();

//   // Redux state
//   const { documents, loading, error, successMessage } = useSelector(
//     (state) => state.documents || {}
//   );
//   const { user: currentUser } = useSelector((state) => state.auth || {});
//   const { employees } = useSelector((state) => state.employees || { employees: [] });

//   // Local state
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [visibility, setVisibility] = useState("private");

//   // Fetch docs + employees
//   useEffect(() => {
//     dispatch(fetchDocuments());
//     if (currentUser?.role === "admin") {
//       dispatch(getEmployees());
//     }
//   }, [dispatch, currentUser]);

//   // Multi-select handler
//   const handleUserSelect = (e) => {
//     const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
//     setSelectedUsers(values); // array of string IDs
//   };

//   // Upload handler
//   const handleUpload = () => {
//     if (!file) return;
//     const form = new FormData();
//     form.append("file", file);
//     form.append("title", title || file.name);

//     if (currentUser?.role === "admin") {
//       form.append("visibility", visibility);
//       if (visibility === "selected") {
//         // append each id individually => bodyParser converts to array
//         selectedUsers.forEach((id) => form.append("allowedUsers[]", id));
//       }
//     }

//     dispatch(uploadDocument(form));
//     setFile(null);
//     setTitle("");
//     setSelectedUsers([]);
//     setVisibility("private");
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this document?")) {
//       dispatch(deleteDocument(id));
//     }
//   };

//   // Clear toast messages
//   useEffect(() => {
//     if (error || successMessage) {
//       const timer = setTimeout(() => {
//         dispatch(clearDocumentError());
//         dispatch(clearDocumentMessage());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, successMessage, dispatch]);

//   return (
//     <div className="bg-[#0d1321] h-[500] p-6 flex justify-center">
//       <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg">
//         <h1 className="text-center text-gray-900 font-bold text-2xl mb-2">
//           Upload & View Documents
//         </h1>

//         {error && <p className="text-red-500 text-center mb-2">{error}</p>}
//         {successMessage && <p className="text-green-500 text-center mb-2">{successMessage}</p>}

//         <div className="space-y-2 mb-3">
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Document title (optional)"
//             className="w-full border border-blue-600 rounded p-2 focus:outline-none"
//           />

//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full border border-blue-600 rounded p-2"
//           />

//           {currentUser?.role === "admin" && (
//             <>
//               <select
//                 value={visibility}
//                 onChange={(e) => setVisibility(e.target.value)}
//                 className="w-full border border-blue-600 rounded p-2"
//               >
//                 <option value="private">Private (admin only)</option>
//                 <option value="public">Public (all users)</option>
//                 <option value="selected">Selected Users</option>
//               </select>

//               {visibility === "selected" && employees?.length > 0 && (
//                 <select
//                   multiple
//                   value={selectedUsers}
//                   onChange={handleUserSelect}
//                   className="w-full border border-blue-600 rounded p-2"
//                   size={Math.min(5, employees.length)}
//                 >
//                   {employees.map((u) => (
//                     <option key={u._id} value={String(u._id)}>
//                       {u.name} ({u.email})
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </>
//           )}

//           <button
//             onClick={handleUpload}
//             disabled={!file || loading}
//             className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded cursor-pointer disabled:opacity-50"
//           >
//             <FaUpload className="mr-2" />
//             {loading ? "Uploading..." : "Upload Document"}
//           </button>
//         </div>

//         <h2 className="text-center text-gray-900 font-bold text-xl mb-2">Documents List</h2>
//         <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
//           {documents?.length === 0 && (
//             <p className="text-center text-gray-500">No documents uploaded yet.</p>
//           )}
//           {documents?.map((doc) => (
//             <div
//               key={doc._id}
//               className="flex justify-between items-center bg-gray-50 p-3 rounded border border-blue-600"
//             >
//               <a
//                 href={doc.fileUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-900 hover:underline break-all"
//               >
//                 {doc.title || doc.fileUrl.split("/").pop()}
//               </a>

//               <div className="flex gap-2 items-center justify-center">

//                 <button
//                   onClick={() => window.open(doc.fileUrl,  "noopener,noreferrer")}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
//                 >
//                   View
//                 </button>


//                 <a
//                   href={doc.fileUrl.replace("/upload/", "/upload/fl_attachment/")}
//                   className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                 >
//                   Download
//                 </a>

//               </div>

//               <button
//                 onClick={() => handleDelete(doc._id)}
//                 className="flex items-center bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Document;

import React, { useEffect, useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDocuments,
  uploadDocument,
  deleteDocument,
  clearDocumentError,
  clearDocumentMessage,
} from "../redux/documentSlice";
import { getEmployees } from "../redux/employeeSlice";

const Document = () => {
  const dispatch = useDispatch();

  // Redux state
  const { documents, loading, error, successMessage } = useSelector(
    (state) => state.documents || {}
  );
  const { user: currentUser } = useSelector((state) => state.auth || {});
  const { employees } = useSelector((state) => state.employees || { employees: [] });

  // Local state
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [visibility, setVisibility] = useState("private");

  // Fetch docs + employees
  useEffect(() => {
    dispatch(fetchDocuments());
    if (currentUser?.role === "admin") {
      dispatch(getEmployees());
    }
  }, [dispatch, currentUser]);

  // Multi-select handler
  const handleUserSelect = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setSelectedUsers(values);
  };

  // Upload handler
  const handleUpload = () => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    form.append("title", title || file.name);

    if (currentUser?.role === "admin") {
      form.append("visibility", visibility);
      if (visibility === "selected") {
        selectedUsers.forEach((id) => form.append("allowedUsers[]", id));
      }
    }

    dispatch(uploadDocument(form));

    // Reset form
    setFile(null);
    setTitle("");
    setSelectedUsers([]);
    setVisibility("private");
  };

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Delete this document?")) {
      dispatch(deleteDocument(id));
    }
  };

  // Clear toast messages after 3s
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearDocumentError());
        dispatch(clearDocumentMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);
 
  return (
    <div className="bg-[#0d1321]  p-6 flex justify-center">
      <div className="bg-white w-full max-w-3xl p-6 rounded-2xl shadow-lg">
        <h1 className="text-center text-gray-900 font-bold text-2xl mb-4">
          Upload & View Documents
        </h1>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-2">{successMessage}</p>}

        {/* Upload Form */}
        <div className="space-y-3 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document title (optional)"
            className="w-full border border-blue-600 rounded p-2 focus:outline-none"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-blue-600 rounded p-2"
          />

          {currentUser?.role === "admin" && (
            <>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full border border-blue-600 rounded p-2"
              >
                <option value="private">Private (admin only)</option>
                <option value="public">Public (all users)</option>
                <option value="selected">Selected Users</option>
              </select>

              {visibility === "selected" && employees?.length > 0 && (
                <select
                  multiple
                  value={selectedUsers}
                  onChange={handleUserSelect}
                  className="w-full border border-blue-600 rounded p-2"
                  size={Math.min(5, employees.length)}
                >
                  {employees.map((u) => (
                    <option key={u._id} value={String(u._id)}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              )}
            </>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded cursor-pointer disabled:opacity-50"
          >
            <FaUpload className="mr-2" />
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </div>

        {/* Documents List */}
        <h2 className="text-center text-gray-900 font-bold text-xl mb-2">Documents List</h2>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 flex flex-col gap-3 scrollbar-hide">
          {documents?.length === 0 ? (
            <p className="text-center text-gray-500">No documents uploaded yet.</p>
          ) : (
            documents.map((doc) => (
              <div
                key={doc._id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded border border-blue-600 "
              >
                <span className="text-gray-900 break-all">{doc.title || doc.fileUrl.split("/").pop()}</span>

                <div className="flex gap-2 items-center">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </a>

                  <a
                    href={doc.fileUrl.replace("/upload/", "/upload/fl_attachment/")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    download
                  >
                    Download
                  </a>
                </div>

                <button
                  onClick={() => handleDelete(doc._id)}
                  className="flex items-center bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Document;



