import User from '../models/User.js';

// Testing purpose: get all users
export async function getAllUsers (req, res) {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
} 

export async function getUserByID (req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.status(200).json(user);

    } catch (error) {
        console.error("Error fetching user account by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });        
    }
}

export async function getUserByUN(req, res) {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user account by username:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateUser (req, res) {
    try {
        const { first_name, last_name, email, username, phone_number, job_applying_for, location_preference, 
            setup_preference, salary_expectation, profile_summary, skills, portfolio_link, linkedin_link, 
            resume_cv, profile } = req.body;

        // Check for duplicates BUT exclude the current user
        const isDuplicate = await User.findOne({
            _id: { $ne: req.params.id }, // Exclude current user
            $or: [{ email }, { username }]
        });

        if (isDuplicate) {
            return res.status(400).json({ error: "Email or username already exists" });
        }

        // Don't allow username/email changes, so no duplicate check needed
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {   
                first_name, last_name, phone_number, job_applying_for, location_preference, 
                setup_preference, salary_expectation, profile_summary, skills, portfolio_link, linkedin_link, 
                resume_cv, profile 
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Changes applied to account", user: updatedUser });

    } catch (error) {
        console.error("Error updating user information:", error);
        res.status(500).json({ error: "Internal Server Error" });        
    }
}

export async function updateProfilePicture(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const profile = `/uploads/${req.file.filename}`;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { profile },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "Profile picture updated",
            profile  // Return the path, frontend will normalize it
        });
    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteProfilePicture(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { profile: "" },  
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ 
            message: "Profile picture deleted",
            profile: ""  // Return empty string for consistency
        });
    } catch (error) {
        console.error("Error deleting profile picture:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteUser(req, res) {

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) return res.status(404).json({ error: "User not found" });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Internal Server Error" });        
    }

    res.status(201).json({message: `Account deleted`});
}