export function getAllJobs(req, res) {
    res.send("Endpoint to get all job applications");
} export function addJob(req, res) {
    res.status(201).json({message: `Added new job application with ID: ${req.params.id}`});
} export function updateJob(req, res) {
    res.status(201).json({message: `Update job applied with ID: ${req.params.id}`});
} export function deleteJob(req, res) {
    res.status(201).json({message: `Deleted job application with ID: ${req.params.id}`});
}