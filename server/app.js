import dotenv from "dotenv"
dotenv.config();
import express from "express";
import error from "./src/middlewares.js/error.middlewares.js";
import cookieParser from "cookie-parser";
import userroutes from "./src/routes/user.routes.js"
import seedAdmins from "./seedAdmin.js";
import leaveRoutes from "./src/routes/leaves.routes.js";
import announcementRoutes from "./src/routes/announcement.routes.js"
import documentRoutes  from './src/routes/document.routes.js'
import attendanceRoutes from "./src/routes/attendance.routes.js"
import cors from "cors";


const app = express();

app.use(cors({
  origin: "http://localhost:5173",   
  credentials: true                  
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
(async () => {
  await seedAdmins();
})();


app.use("/api/user", userroutes)
app.use("/api/leaves", leaveRoutes);
app.use("/api/attendance", attendanceRoutes)
app.use("/api/announcement", announcementRoutes);
app.use("/api/document", documentRoutes);


app.use(error);
export default app;
