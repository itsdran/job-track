import express from "express";
import {  getAllUsers,  signUpUser, logInUser, getUserByID, getUserByUN, updateUser, deleteUser } from "../controllers/usersControllers.js";

import { getAllJobsFromUser } from "../controllers/jobsControllers.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", logInUser);

router.get("/", getAllUsers); // testing purpose only
router.get("/:username", getUserByUN);
router.get("/:id", getUserByID);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/:username/jobs", getAllJobsFromUser);

export default router;
