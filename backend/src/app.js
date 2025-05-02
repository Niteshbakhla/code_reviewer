import express from "express";
import projectRoutes from "../src/routes/project.routes.js";
import userRoutes from "../src/routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser"
export const app = express();



app.use(cookieParser())
app.use(express.json());
app.use(cors({
            origin: "http://localhost:5173",
            credentials: true
}));
app.use("/projects", projectRoutes);
app.use("/api/auth", userRoutes);


app.use((err, req, res, next) => {
            console.log(err.stack)
            const statusCode = err.statusCode || 500;
            const message = err.message || "Something went wrong"
            res.status(statusCode).json({ success: false, message: message });
})
