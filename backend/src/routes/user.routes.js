import { Router } from "express";
import { isLogin, login, logout, register } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route('/logout').get(isAuthenticated, logout);
router.route("/me").get(isAuthenticated, isLogin);


export default router;