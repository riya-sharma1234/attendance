import express from "express";
import { getDocuments, uploadDocument, deleteDocument, download} from "../controllers/documentController.js";
import upload from "../config/cloudinary.js"; 
import { isAuthenticated, adminOnly } from "../middlewares.js/auth.js";
// import multer from "multer";

const router = express.Router();

// const upload = multer({ storage });

// Upload document
router.post("/upload", isAuthenticated, upload.single("file"), uploadDocument);

router.get("/get", isAuthenticated, getDocuments)

router.delete("/delete/:id", isAuthenticated, adminOnly, deleteDocument);
router.get("/:id/download", isAuthenticated, download )


export default router;
