import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import path from "path";

import jobsRoutes from "./routes/jobsRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//Middleware to parse JSON bodies
app.use(express.json()); 
app.use(rateLimiter);

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173'
  }));
}

app.use ((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' `);
  next();
});

app.use("/api/jobs", jobsRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
} 

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});