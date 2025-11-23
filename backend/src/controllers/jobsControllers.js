import Job from '../models/Job.js';
import User from '../models/User.js'

export async function getAllJobsFromUserID(req, res) {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user)  return res.status(404).json({ message: "User not found" });

        const jobs = await Job.find({ applied_by: user._id }).populate("applied_by").sort({ date_applied: -1 });

        return res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching job applications:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getAllJobs(_, res) {
    try {
        const jobs = await Job.find().populate("applied_by").sort({ date_applied: -1 });

        return res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching job applications:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function addJob (req, res) {
    try {
        const user = await User.findOne({ username: req.params.username });

        const { position, company, application_platform, date_applied, 
            location, setup, description, salary, status, applied_by } = req.body;
        const newJob = new Job (
            { position, company, application_platform, date_applied, 
            location, setup, description, salary, status, applied_by } );

        await newJob.save();
        return res.status(201).json({message: "New job application recorded successfully"});

    } catch (error) {
        console.error("Error recording a new job applications:", error);
        res.status(500).json({ error: "Internal Server Error" });        
    }
} 

export async function getJobByID (req, res) {
    try {
        const job = await Job.findById(req.params.id);
        
        if (!job) return res.status(404).json({ error: "Job application not found" });
        res.status(200).json(job);

    } catch (error) {
        console.error("Error fetching job application by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });        
    }
}

export async function updateJob (req, res) {
    try {
        const { position, company, application_platform, date_applied, 
            location, setup, description, salary, status } = req.body;
        
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, 
            { position, company, application_platform, date_applied, 
            location, setup, description, salary, status },
            { new: true }
        );

        if (!updatedJob) return res.status(404).json({ error: "Job application not found" });

        res.status(201).json({message: `Changes applied to job application`});

    } catch (error) {
        console.error("Error updating job application:", error);
        res.status(500).json({ error: "Internal Server Error" });        
    }
} 

export async function deleteJob(req, res) {

    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);

        if (!deletedJob) return res.status(404).json({ error: "Job application not found" });
    } catch (error) {
        console.error("Error deleting job application:", error);
        res.status(500).json({ error: "Internal Server Error" });        
    }

    res.status(201).json({message: `Job application deleted`});
}