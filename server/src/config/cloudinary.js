// config/cloudinary.js
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "documents",   // Folder name in Cloudinary
//     allowed_formats: ["jpg", "png", "pdf", "docx"], // Allowed file types
//   },
// });

// export default storage;
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "employees", // folder in Cloudinary
    resource_type: "auto",
  },
});

const upload = multer({ storage });

export default upload;
