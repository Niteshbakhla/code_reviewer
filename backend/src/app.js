import express from "express"
import projectRoutes from "../src/routes/project.routes.js"
import cors from "cors";
export const app = express();




app.use(express.json());
app.use(cors());
app.use("/projects", projectRoutes);



