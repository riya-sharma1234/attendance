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


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
seedAdmins()


app.use("/api/user", userroutes)
app.use("/api/leaves", leaveRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/document", documentRoutes)


app.use(error);
export default app;
