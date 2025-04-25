import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
            name: {
                        type: String,
                        required: [true, "Project name is required"]
            },
            code: {
                        type: String,
                        default: "",
            },
            review: {
                        type: String,
                        default: ""
            }
}, { timestamps: true });


const Project = mongoose.model("Project", projectSchema);

export default Project