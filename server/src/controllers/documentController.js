import Document from "../models/document.models.js";

export const uploadDocument = async (req, res) => {
  try {
    const { title, visibility, allowedUsers } = req.body;
    const fileUrl = req.file?.path; // multer-storage-cloudinary gives secure URL
    const userId = req.user._id;

    if (!fileUrl) {
      return res.status(400).json({ success: false, message: "File is required" });
    }

    let docVisibility = "private";
    let docAllowedUsers = [userId];

    if (req.user.role === "admin") {
      // Admin can control visibility
      if (visibility === "public") {
        docVisibility = "public";
        docAllowedUsers = []; // visible to all
      } else if (visibility === "selected" && allowedUsers?.length) {
        docVisibility = "selected";
        docAllowedUsers = allowedUsers; // only selected users
      } else {
        docVisibility = "private";
        docAllowedUsers = [userId]; // admin-only doc
      }
    } else {
      // Normal user → only admin + self can see
      docVisibility = "private";
      docAllowedUsers = [userId]; 
    }

    const newDoc = new Document({
      title,
      fileUrl,
      uploadedBy: userId,
      visibility: docVisibility,
      allowedUsers: docAllowedUsers
    });

    await newDoc.save();

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document: newDoc
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getDocuments = async (req, res) => {
  try {
    let docs;

    if (req.user.role === "admin") {
      // Admin sees everything
      docs = await Document.find()
        .populate("uploadedBy", "name email role")
        .populate("allowedUsers", "name email");
    } else {
      // Employee → filter
      docs = await Document.find({
        $or: [
          { uploadedBy: req.user._id }, // their own docs
          { visibility: "public" }, // admin public docs
          { 
            visibility: "selected", 
            allowedUsers: req.user._id // if they are in allowed list
          }
        ]
      })
      .populate("uploadedBy", "name email role")
      .populate("allowedUsers", "name email");
    }

    res.status(200).json({
      success: true,
      documents: docs
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
