import express from "express";
import { signUpUser, logInUser, forgotPassword } from "../controllers/authControllers.js";
import upload from '../config/multer.js';

const router = express.Router();

router.post("/signup",  upload.single('profile'), signUpUser);
router.post("/login", logInUser);
router.post("/forgot-password", forgotPassword);

export default router;
