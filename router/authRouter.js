import express from "express";
import rateLimiter from "express-rate-limit";

import {
    deleteUser,
    login,
    register,
    updateUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth/auth.js";

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message:
        "Too many requests from this IP, please try again after 15 minutes",
});

const router = express.Router();
router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUser").patch(authenticateUser, deleteUser);

export default router;
