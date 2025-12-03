import express from "express";
import upload from '../config/multer.js';

import {    getAllUsers, getUserByID, getUserByUN, 
            updateUser, uploadUserFile, deleteUserFile, deleteUser } from "../controllers/usersControllers.js";

import { getAllJobsFromUserID } from "../controllers/jobsControllers.js";

const router = express.Router();

router.get("/", getAllUsers); // testing purpose only
router.get("/:identifier", getUserByUN);
router.get("/:id", getUserByID);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.put("/:id/:type", upload.single("file"), uploadUserFile);
router.delete("/:id/:type", deleteUserFile);

router.get("/:username/jobs", getAllJobsFromUserID);

export default router;
