import express from "express";
import { getDocuments, uploadDocument,} from "../controllers/documentController.js";
import storage from "../config/cloudinary.js"; 
import { isAuthenticated } from "../middlewares.js/auth.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage });

// Upload document
router.post("/upload", isAuthenticated, upload.single("file"), uploadDocument);

router.get("/get", isAuthenticated, getDocuments)



export default router;
