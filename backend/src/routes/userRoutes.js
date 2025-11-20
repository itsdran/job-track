import express from "express";
import { getAllUsers, createUser, getUserByID, updateUser, deleteUser } from "../controllers/usersController.js";

const router = express.Router(); 

router.get("/", getAllUsers); // For testing purpose only
router.get ("/:id", getUserByID)
router.post ("/signup", createUser);
router.put ("/:id", updateUser);
router.delete ("/:id", deleteUser);

export default router;