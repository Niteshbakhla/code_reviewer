import { validationResult } from "express-validator"
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";



export const register = async (req, res, next) => {
            try {
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                                    return res.status(400).json({ errors: errors.array() });
                        }

                        const { email, name, password } = req.body;
                        const user = new User({
                                    email,
                                    name,
                                    password
                        });
                        await user.save();
                        res.status(201).json({ success: true, message: "User registered successfully!" })
            } catch (error) {
                        next(error);
            }
}


export const login = async (req, res, next) => {
            try {
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                                    return res.status(4002).json({ errors: errors.array() });
                        }

                        const { email, password } = req.body;
                        const user = await User.findOne({ email }).select("+password");
                        if (!user) {
                                    return res.status(401).json({ message: "Invalid  email or password" });
                        }

                        const isMatch = await user.comparePassword(password);
                        if (!isMatch) {
                                    return res.status(401).json({ message: "Invalid email or password" });
                        }

                        const token = jwt.sign({ id: user._id }, config.JWT_SECRET);
                        res.status(200).json({ message: "Login successfully!", user: { id: user._id, name: user.name, email: user.email } })

            } catch (error) {

                        next(error)
            }
}

export const logout = (req, res) => {
            res.cookie("token")
            res.status(200).json({ message: "Logout successful" })
}