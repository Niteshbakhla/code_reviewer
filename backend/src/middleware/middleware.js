import jwt from "jsonwebtoken"
import config from "../config/config.js";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
            try {
                        const token = req.cookies?.token;

                        if (!token) {
                                    return res.status(401).json({ success: false, message: "Unauthorized" })
                        }

                        const decoded = jwt.verify(token, config.JWT_SECRET);
                        req.user = await User.findById(decoded.id);
                        next();
            } catch (error) {
                        return res.status(401).json({ message: "Not authorized , token failed" })
            }
}