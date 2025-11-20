import moose from 'mongoose';

const userSchema = new moose.Schema(
    {
        first_name: {
        type: String,
        required: true,
        trim: true,

        },
        last_name: {
        type: String,
        required: true,
        trim: true,
        },

        username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        },

        password: {
        type: String,
        required: true,
        minlength: 6,
        },

        email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        },

        phone_number: {
        type: String,
        default: ""
        },

        job_applying_for: {
        type: String,
        default: "",
        trim: true
        },

        location_preference: {
        type: String,
        default: "",
        trim: true
        },

        setup_preference: {
            type: String,
            enum: ['Remote', 'On-site', 'Hybrid']
        },

        salary_expectation: {
        type: Number,
        default: null
        },        
        
        profile_summary: {
        type: String,
        maxlength: 500,
        default: ""
        },

        skills: {
        type: [String],
        default: []
        },

        portfolio_link: {
        type: String,
        default: ""
        },

        linkedin_url: {
        type: String,
        default: ""
        },

        resume_cv: {
        type: String, 
        default: "", 
        },

        isActive: {
        type: Boolean,
        default: true
        }
    },

    { timestamps: true }
    );

const User = moose.model('User', userSchema);

export default User;
