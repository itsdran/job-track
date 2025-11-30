import express from "express";
import upload from '../config/multer.js';

import {    getAllUsers, getUserByID, getUserByUN, 
            updateUser, updateProfilePicture, deleteProfilePicture, deleteUser } from "../controllers/usersControllers.js";

import { getAllJobsFromUserID } from "../controllers/jobsControllers.js";

const router = express.Router();

router.get("/", getAllUsers); // testing purpose only
router.get("/:username", getUserByUN);
router.get("/:id", getUserByID);
router.put("/id/:id", updateUser);

router.put("/:id/profile-picture", upload.single('profile'), updateProfilePicture);
router.delete("/:id/profile-picture", deleteProfilePicture);
router.delete("/:id", deleteUser);

router.get("/:username/jobs", getAllJobsFromUserID);

export default router;
