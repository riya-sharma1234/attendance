import Announcement from "../models/announcement.models.js";

// Create new announcement (Admin only)
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      createdBy: req.user._id
    });

    res.json({
      success: true,
      message: "Announcement created successfully",
      announcement
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.json({ success: true, announcements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params; // announcement id from route
    const { title, message, } = req.body;

    // find announcement by id
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found"
      });
    }

    // update fields
    if (title) announcement.title = title;
    if (message) announcement.message = message;
    // if (audience) announcement.audience = audience;

    await announcement.save();

    res.json({
      success: true,
      message: "Announcement updated successfully",
      announcement
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete announcement (Admin only)
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }

    res.json({ success: true, message: "Announcement deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
