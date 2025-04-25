import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
            project: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Project",
                        required: [true, "Project is required"]
            },
            text: {
                        type: String,
                        required: [true, "Message text is required"]
            }
}, { timestamps: true });



const Message =  mongoose.model("Message", messageSchema);
export default Message;