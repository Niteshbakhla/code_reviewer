import Project from "../models/project.model.js"



export const createProject = async (projectName) => {
            const project = await Project.create({ name: projectName });
            return project;
}


export const getAllProjects = async (page, limit) => {

            try {
                        
                        const skip = (page - 1) * limit
                        const projects = await Project.find()
                                    .skip(skip)
                                    .limit(limit)
                                    .lean()

                        const totalProjects = await Project.countDocuments();
                        const totalPages = Math.ceil(totalProjects / limit)
                        return { projects, pagination: { currentPage: page, totalPages, totalProjects, limit } };
            } catch (error) {
                        res.status(500).json({
                                    success: false,
                                    message: "Error fetching projects",
                                    error: error.message
                        })

            }
}