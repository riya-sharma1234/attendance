import express from "express";
import { createAnnouncement, getAnnouncements, deleteAnnouncement , updateAnnouncement} from "../controllers/announcementController.js";
import { isAuthenticated , adminOnly} from "../middlewares.js/auth.js";

const router = express.Router();

// Only admin can create / delete
router.post("/create", isAuthenticated, adminOnly, createAnnouncement);
router.get("/get", isAuthenticated, getAnnouncements);
router.put("/update/:id", isAuthenticated, adminOnly, updateAnnouncement);
router.delete("/delete/:id", isAuthenticated, adminOnly, deleteAnnouncement);

export default router;
