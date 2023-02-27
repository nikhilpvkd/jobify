import express from "express";
import {
    deleteUser,
    login,
    register,
    updateUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth/auth.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUser").patch(authenticateUser, deleteUser);

export default router;
