import User from '../models/User.js';

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

export async function signUpUser (req, res) {
    try {
        const { first_name, last_name, email, username, phone_number, password, job_applying_for, location_preference, 
            setup_preference, salary_expectation, profile_summary, skills, portfolio_link, linkedin_link, 
            resume_cv } = req.body;

        const profilePicUrl = req.file ? `/uploads/${req.file.filename}` : '';

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const isExistingAccount = await User.findOne({ $or: [{ email }, { username }]});

        if (isExistingAccount) {
            return res.json({ exists: !!isExistingAccount });
        }

        const skillsArray = typeof skills === "string"
            ? skills.split(",").map(s => s.trim()).filter(Boolean)
            : skills;
        
        const newUser = new User (
            { first_name, last_name, email, username, phone_number, password: hashedPassword, job_applying_for, location_preference, 
            setup_preference, salary_expectation, profile_summary, skills: skillsArray, portfolio_link, linkedin_link, 
            resume_cv, profile: profilePicUrl } );

        await newUser.save();
        res.status(201).json({message: "Account created successfully", _id : newUser._id });

    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ error: "Internal Server Error"});        
    }
} 

export async function logInUser(req, res) {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

        const token = jwt.sign(
            { id: user._id, username: user.username, first_name: user.first_name },
            process.env.JWT_SECRET || "defaultsecret",
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            userId: user._id,
            username: user.username,
            token,
            user: {
                username: user.username,
                _id: user._id,
                first_name: user.first_name
            }
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function forgotPassword (req, res) { 
    try { 
        const { identifier } = req.body; 

        if (!identifier) 
            return res.status(400).json({ error: "Email or username is required" }); 

        const user = await User.findOne({ 
            $or: [{ email: identifier }, { username: identifier }] 
        }); 
        
        if (!user) return res.status(404).json({ error: "No account found with that email/username" }); 

        // Generate reset token 
        const resetToken = crypto.randomBytes(32).toString("hex"); 

        // Hash token to save in DB 
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex"); 

        user.resetPasswordToken = hashedToken; 
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save(); 

        // Create reset URL (frontend URL)
        const BASE_URL = process.env.BASE_URL;
        const resetUrl = `${BASE_URL}/auth/reset-password/${resetToken}`;

        // Email configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request - JobTrack',
            html: `
                <h2>Password Reset Request</h2>
                <p>Hi ${user.first_name},</p>
                <p>You requested to reset your password. Click the link below to reset it:</p>
                <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>Or copy and paste this URL into your browser:</p>
                <p>${resetUrl}</p>
                <p><strong>This link will expire in 15 minutes.</strong></p>
                <p>If you didn't request this, please ignore this email.</p>
                <hr>
                <p>JobTrack Team</p>
            `
        };
        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            message: "Password reset link sent to your email",
            success: true 
        });

    } catch (error) { 
        console.error("Forgot Password Error:", error); 
        res.status(500).json({ error: "Failed to send reset email. Please try again." }); 
    } 
}

export async function resetPassword (req, res) {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ error: "New password is required" });
        }

        if (newPassword.length < 12) {
            return res.status(400).json({ error: "Password must be at least 12 characters long" });
        }

        // Hash the token from URL to compare with DB
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired reset token" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ 
            message: "Password reset successful. You can now log in with your new password.",
            success: true 
        });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}