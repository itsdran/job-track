import express from "express";
import { getAllJobs, addJob, updateJob, deleteJob } from "../controllers/jobsControllers.js";

const router = express.Router(); 

router.get ("/", getAllJobs);
router.post ("/:id", addJob);
router.put ("/:id", updateJob);
router.delete ("/:id", deleteJob);

export default router;