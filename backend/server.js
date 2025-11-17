import express from "express";

const app = express();

app.get ("/api/jobs_applied", (req, res) => {
    res.send("List of jobs applied 111");
});

app.post ("/api/jobs_applied/:id", (req, res) => {
    res.status(201).json({message: `Added new job application with ID: ${req.params.id}`});
});

app.put ("/api/jobs_applied/:id", (req, res) => {
    res.status(201).json({message: `Update job applied with ID: ${req.params.id}`});
});

app.delete ("/api/jobs_applied/:id", (req, res) => {
    res.send(`Deleted job application with ID: ${req.params.id}`);
});

app.listen(5001, () => {
    console.log("Server is running on PORT 5001");
});

export default app;
