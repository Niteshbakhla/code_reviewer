import { app } from "./src/app.js";
import config from "./src/config/config.js";
import http from "http"
import connectDB from "./src/db/db.js";
import { Server } from "socket.io"
import Message from "./src/models/message.model.js";
import Project from "./src/models/project.model.js";
import { getReview } from "./src/services/ai.service.js";
import { isSocketAuthenticated } from "./src/middleware/socketMiddleware.js";
connectDB();

const PORT = config.PORT;

const server = http.createServer(app);

const io = new Server(server, {
            cors: {
                        origin: "http://localhost:5173",
                        methods: ["GET", "POST"],
                        credentials: true
            }
});

io.use(isSocketAuthenticated)

io.on("connection", (socket) => {
            console.log("A user connected!", socket.id);
            const { project } = socket.handshake.query;
            socket.join(project);

            socket.on("chat-message", async (message) => {
                        io.to(project).emit("user-message", { user: socket.user.name, text: message, unique: socket.id });
                        await Message.create({
                                    project,
                                    text: message,
                                    sender: socket.user._id
                        });

                        // socket.broadcast.to(project)
            })

            socket.on("get-id", () => {
                        socket.emit("get-id", socket.user._id)
            })
            socket.on("get-code-change", async () => {
                        const projectData = await Project.findById(project).select("code")
                        socket.emit("get-code-changes", projectData.code)
            })

            socket.on("code-change", async (data) => {
                        socket.broadcast.to(project).emit("code-changes", data);
                        await Project.findOneAndUpdate({ _id: project }, { code: data }, { new: true })
                        // await Project.findOneAndUpdate({ _id: project }, { $push: { code: data } }, { new: true })
            })

            socket.on("get-review", async (code) => {
                        console.log("get_review", code)
                        const review = await getReview(code);
                        socket.emit("get-review", review);
            })



            socket.on("chat-history", async () => {
                        const message = await Message.find().populate("sender");
                        socket.emit("chat-history", message)
            })
            socket.on("disconnect", () => {
                        console.log("Client disconnected!");
            });

});


server.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
})