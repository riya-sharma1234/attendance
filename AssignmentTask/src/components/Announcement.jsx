import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAnnouncement,
  clearAnnouncementError,
  clearAnnouncementMessage,
} from "../redux/announcementSlice";
import { toast } from "react-toastify";

const Announcement = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const {  error, successMessage } = useSelector(
    (state) => state.announcement
  );

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

  const handleAddAnnouncement = () => {
    if (!title || !message) return toast.error("Fill title & message");
    dispatch(createAnnouncement({ title, message }));
    setTitle("");
    setMessage("");
  };


  return (
    <div className="flex justify-center p-8 bg-[#0d1321] ">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Add Announcement
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Announcement Title"
          className="w-full border border-blue-500 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your announcement here..."
          className="w-full border border-blue-500 p-2 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows={4}
        />
        <div className="flex justify-center">
          <button
            onClick={handleAddAnnouncement}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
          >
            Add Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
