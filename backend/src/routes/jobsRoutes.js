import express from "express";
import { getAllJobs, addJob, getJobByID, updateJob, deleteJob } from "../controllers/jobsControllers.js";

const router = express.Router(); 

router.get ("/", getAllJobs);
router.get ("/:id", getJobByID)
router.post ("/", addJob);
router.put ("/:id", updateJob);
router.delete ("/:id", deleteJob);

export default router;