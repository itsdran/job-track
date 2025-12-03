import express from "express";
import { signUpUser, logInUser, forgotPassword, resetPassword } from "../controllers/authControllers.js";
import upload from '../config/multer.js';

const router = express.Router();

router.post("/signup",  upload.single('profile'), signUpUser);
router.post("/login", logInUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
