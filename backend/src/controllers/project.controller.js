import { createProject, getAllProjects } from "../services/project.service.js";


export const createProjectController = async (req, res) => {
            const { projectName } = req.body;

            const newProject = await createProject(projectName);

            return res.status(201).json({
                        status: "success",
                        data: newProject
            })
}


export const getAllProjectsController = async (req, res) => {


            try {
                        const page = parseInt(req.query.page) || 1
                        const limit = parseInt(req.query.limit) || 9
                        const projects = await getAllProjects(page, limit);
                        if (!projects) {
                                    return res.status(404).json({ success: false, message: "Project not found" })
                        }


                        return res.status(200).json({ success: true, projects })

            } catch (error) {
                        return res.status(500).json({ success: false, message: "Internal server error" })
            }
}