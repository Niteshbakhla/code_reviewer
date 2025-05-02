import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/user.model.js";

export const isSocketAuthenticated = async (socket, next) => {

            try {
                        const cookieString = socket.handshake.headers.cookie || "";
                        const token = cookieString.split("; ").find(row => row.startsWith("token=")).split("=")[1];

                        if (!token) {
                                    return next(new Error("Unauthorized, No Token Found"));
                        }

                        const decoded = jwt.verify(token, config.JWT_SECRET);
                        const user = await User.findById(decoded.id);

                        if (!user) {
                                    return next(new Error("Unauthorized User not Found"));
                        }

                        socket.user = user;
                        next();
            } catch (error) {
                        console.error("Socket auth error:", error.message)
                        return next(new Error("Not authorized, Token failed"))
            }
}