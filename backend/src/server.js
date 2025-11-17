import express from "express";
import jobsRoutes from "./routes/jobsRoutes.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());

app.use("/api/jobs", jobsRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
});