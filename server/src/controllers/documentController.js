import Document from "../models/document.models.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary"; // if using Cloudinary
import fetch from "node-fetch";


// export const uploadDocument = async (req, res) => {
//   try {
//     const { title, visibility, allowedUsers } = req.body;
//     const fileUrl = req.file?.path; // multer-storage-cloudinary gives secure URL
//     const userId = req.user._id;

//     if (!fileUrl) {
//       return res.status(400).json({ success: false, message: "File is required" });
//     }

//     let docVisibility = "private";
//     let docAllowedUsers = [userId];

//     if (req.user.role === "admin") {
//       // Admin can control visibility
//       if (visibility === "public") {
//         docVisibility = "public";
//         docAllowedUsers = []; // visible to all
//       } else if (visibility === "selected" && allowedUsers?.length) {
//         docVisibility = "selected";
//         docAllowedUsers = allowedUsers; // only selected users
//       } else {
//         docVisibility = "private";
//         docAllowedUsers = [userId]; // admin-only doc
//       }
//     } else {
//       // Normal user → only admin + self can see
//       docVisibility = "private";
//       docAllowedUsers = [userId]; 
//     }

//     const newDoc = new Document({
//       title,
//       fileUrl,
//       uploadedBy: userId,
//       visibility: docVisibility,
//       allowedUsers: docAllowedUsers
//     });

//     await newDoc.save();

//     res.status(201).json({
//       success: true,
//       message: "Document uploaded successfully",
//       document: newDoc
//     });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


export const uploadDocument = async (req, res) => {
  try {
    const { title, visibility } = req.body;
    const fileUrl = req.file?.path;           // multer-storage-cloudinary returns URL
    const userId = req.user._id;

    if (!fileUrl) {
      return res.status(400).json({ success: false, message: "File is required" });
    }

    // allowedUsers from body (express turns repeated fields into an array)
    let allowedUsers = req.body.allowedUsers || [];

    // If somebody sent only one value, normalise
    if (typeof allowedUsers === "string") allowedUsers = [allowedUsers];

    // --- Visibility & Allowed Users ---
    let docVisibility = "private";
    let docAllowedUsers = [userId];

    if (req.user.role === "admin") {
      if (visibility === "public") {
        docVisibility = "public";
        docAllowedUsers = [];                     // visible to everyone
      } else if (visibility === "selected" && allowedUsers.length) {
        docVisibility = "selected";
        docAllowedUsers = allowedUsers;           // already array of ids
      } else {
        docVisibility = "private";
        docAllowedUsers = [userId];
      }
    } else {
      // normal user → keep private to uploader (and optionally push admin ids)
      docVisibility = "private";
      docAllowedUsers = [userId];
    }

    const newDoc = new Document({
      title,
      public_id: req.file.filename,
      // fileUrl,
      fileUrl: req.file.path,
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
    console.error(err);
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
          { visibility: "public" }, // admin public docs  // user can see only document which document is public
          {
            visibility: "selected",
            allowedUsers: req.user._id // if they are in allowed list
          }
        ]
      })
        .populate("uploadedBy", "name email role")
        .populate("allowedUsers", "name email");
    }

    const formattedDocs = docs.map(doc => ({
      _id: doc._id,
      title: doc.title,
      // fileUrl: doc.fileUrl,                       // already secure
      // downloadUrl: doc.fileUrl + "?attachment=true" // triggers download
      fileUrl: doc.fileUrl,                       // view
      downloadUrl: `${doc.fileUrl}?attachment=true` // download
    }));

    res.status(200).json({
      success: true,
      documents: docs,
      formattedDocs
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id?.toString();
    const userRole = req.user.role;

    // 1) validate id
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid document ID" });
    }

    // 2) fetch the document
    const doc = await Document.findById(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Document not found" });
    }

    // 3) authorization
    if (userRole !== "admin" && doc.uploadedBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this document" });
    }

    // // 4) if the file is stored externally (Cloudinary example), delete it first
    // if (doc.filePublicId) {
    //   try {
    //     await cloudinary.uploader.destroy(doc.filePublicId); // will return result
    //   } catch (cloudErr) {
    //     // handle cloud error (either abort or log & continue)
    //     console.error("Cloud delete error:", cloudErr);
    //     // Option: abort and send error. Or continue and attempt DB delete.
    //     // return res.status(500).json({ success: false, message: "Failed to delete external file" });
    //   }
    // }

    const url = cloudinary.url(doc.public_id, {
      resource_type: "raw",
      flags: "attachment",
    });

    // 5) delete DB doc
    await doc.deleteOne();

    // 6) respond
    res.status(200).json({ success: true, message: "Document deleted successfully", url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// server/routes/document.js
// export const download =  async (req, res) => {
//   const doc = await Document.findById(req.params.id);
//   if (!doc) return res.status(404).send("Not found");

//   // optional: check user has permission to see it
//   const response = await fetch(doc.fileUrl);
//   const buffer = Buffer.from(await response.arrayBuffer());

//   res.setHeader("Content-Disposition", `attachment; filename="${doc.title || "file"}"`);
//   res.setHeader("Content-Type", response.headers.get("content-type"));
//   res.send(buffer);
// };

export const download = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).send("Not found");

    // ---- optional: permission check ----
    // if (/* user not allowed */) return res.status(403).send("Forbidden");

    const response = await fetch(doc.fileUrl);
    if (!response.ok) {
      return res.status(502).send("Could not fetch file from storage");
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(doc.title || "file")}"`
    );
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Download error");
  }
};


