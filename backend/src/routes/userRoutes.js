import express from "express";
import { getAllUsers, signUpUser, logInUser, getUserByID, updateUser, deleteUser } from "../controllers/usersControllers.js";

const router = express.Router(); 

router.get("/", getAllUsers); // For testing purpose only
router.get ("/:id", getUserByID)
router.put ("/:id", updateUser);
router.delete ("/:id", deleteUser);

router.post ("/signup", signUpUser);
router.post ("/login", logInUser); 

export default router;