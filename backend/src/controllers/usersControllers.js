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

export async function signUpUser (req, res) {
    try {
        const { first_name, last_name, username, password, 
            email, phone_number, job_applying_for, 
            location_preference, salary_expectation, profile_summary, 
            skills, portfolio_link, linkedin_url, resume_cv } = req.body;
        const newUser = new User (
            { first_name, last_name, username, password, 
            email, phone_number, job_applying_for, 
            location_preference, salary_expectation, profile_summary, 
            skills, portfolio_link, linkedin_url, resume_cv } );

        await newUser.save();
        res.status(201).json({message: "Account created successfully"});

    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ error: "Internal Server Error" });        
    }
} 

export async function logInUser (req, res) {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({ 
                    $or: [{ email: identifier }, { username: identifier }] 
                });

        if (!user) return res.status(400).json({ message: "User not found" });

        //const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password === user.password;
        if (!isMatch) {
            console.error("Invalid email or password");
            return res.status(401).json({ error: "Invalid email or password" });
        }
        console.log("Successful login!");
        res.status(200).json({ 
            message: "Login successful",
            userId: user._id,
            username: user.username
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });        
    } 
}

export async function updateUser (req, res) {
    try {
        const { position, company, application_platform, date_applied, 
            location, setup, description, salary, status } = req.body;
        
        const updateUser = await User.findByIdAndUpdate(req.params.id, 
            { position, company, application_platform, date_applied, 
            location, setup, description, salary, status },
            { new: true }
        );

        if (!updateUser) return res.status(404).json({ error: "User not found" });

        res.status(201).json({message: `Changes applied to account`});

    } catch (error) {
        console.error("Error updating user information:", error);
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