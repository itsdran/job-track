import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { User as UserIcon, Mail, Lock, Laptop, MapPin, Briefcase, Code, ExternalLink, Linkedin, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { setups } from '../constants/setups';
import axios from '../lib/axios';

const SignupPage = () => {

    useEffect(() => {
        document.title = 'Sign Up';
    }, []);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        location_preference: '',
        job_applying_for: '',
        salary_expectation: '',
        profile_summary: '',
        skills: '',
        portfolio_link: '',
        linkedin_link: '',
        profile: '',
        resume: ''
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.first_name || !formData.last_name || !formData.username || 
            !formData.email || !formData.password || !formData.confirm_password) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (formData.password !== formData.confirm_password) {
            toast.error('Passwords do not match');
            return;
        }

        const strongPasswordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
        if (!strongPasswordRegex.test(formData.password)) {
            toast.error('Password must be at least 12 characters and include uppercase, lowercase, number, and symbol.');
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post("auth/signup", formData);
            if (res.data.exists) 
                toast.error("Email or Username is already taken");
            else
                toast.success('Account created successfully! You can now log in.');
                navigate('/login');
        } catch (error) {
            toast.error('Error creating account. Please try again.');
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-2">Sign Up</h1>
                    <p className="text-base-content/70 text-lg">Create an account to track your job applications</p>
                </div>

                {/* Signup Card */}
                <div className="card bg-base-100 shadow-2xl">
                    <div className="card-body p-8">
                        <div>
                        {/* Personal Information Section */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <UserIcon size={24} />
                            Personal Information
                            </h2>
                            <div className="divider mt-0"></div>
                        </div>

                            {/* Row 1: First Name & Last Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            First Name <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input type="text" name="first_name" placeholder="Juan" className="input input-bordered"
                                        value={formData.first_name} onChange={handleChange} required />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Last Name <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input type="text" name="last_name" placeholder="Dela Cruz" className="input input-bordered"
                                        value={formData.last_name} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Row 2: Username & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            <UserIcon className="inline mr-1" size={16} /> Username <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input type="text" name="username" placeholder="juandelacruz" className="input input-bordered"
                                        value={formData.username} onChange={handleChange} required/>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            <Mail className="inline mr-1" size={16} /> Email Address <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input type="email" name="email" placeholder="juan@example.com" className="input input-bordered"
                                        value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Row 3: Password & Confirm Password */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            <Lock className="inline mr-1" size={16} /> Password <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" className="input input-bordered w-full pr-12"
                                            value={formData.password} onChange={handleChange} required />
                                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? '🙈' : '👁️'}
                                        </button>
                                    </div>
                                    <label className="label">
                                        <span className="label-text-alt">Must at least be 12 characters containing upper and lower case letters, numbers, and a symbol</span>
                                    </label>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                        Confirm Password <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input type={showConfirmPassword ? "text" : "password"} name="confirm_password" placeholder="••••••••" className="input input-bordered w-full pr-12"
                                            value={formData.confirm_password} onChange={handleChange} required />
                                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle" 
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} >
                                            {showConfirmPassword ? '🙈' : '👁️'}
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {/* Job Preferences Section */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Briefcase size={24} /> Job Preferences
                                </h2>
                                <div className="divider mt-0"></div>
                            </div>

                            {/* Row 5: Salary Expectation & Work Set Up Preference */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            <Briefcase className="inline mr-1" size={16} /> Job Applying For
                                        </span>
                                    </label>
                                    <input type="text" name="job_applying_for" placeholder="e.g., Frontend Developer" className="input input-bordered" 
                                        value={formData.job_applying_for} onChange={handleChange} />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            <MapPin className="inline mr-1" size={16} /> Location Preference
                                        </span>
                                    </label>
                                    <input type="text" name="location_preference" placeholder="e.g., Manila City" className="input input-bordered" 
                                        value={formData.location_preference} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Row 4: Job & Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                        <Briefcase className="inline mr-1" size={16} /> Salary Expectations (PHP)
                                        </span>
                                    </label>
                                    <input type="number" name="salary_expectation" placeholder="e.g., 25000" className="input input-bordered"
                                        value={formData.salary_expectation} onChange={handleChange} min="0" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                    <span className="label-text font-semibold">
                                        <Laptop className="inline mr-2" size={18} /> Work Setup
                                    </span>
                                    </label>
                                    <select name="setup" className="select select-bordered" onChange={handleChange} >
                                        <option value="">Select setup...</option>
                                            {setups.map(setup => (
                                                <option key={setup} value={setup}>{setup}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            {/* Profile Summary */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Profile Summary
                                    </span>
                                </label>
                                <textarea name="profile_summary" 
                                    placeholder="Brief summary about yourself and your career goals..." 
                                    className="textarea textarea-bordered h-24" 
                                    value={formData.profile_summary} onChange={handleChange}></textarea>
                            </div>

                            {/* Skills */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        <Code className="inline mr-1" size={16} /> Skills
                                    </span>
                                </label>
                                <input type="text" name="skills" placeholder="e.g., React, JavaScript, Node.js, Python" className="input input-bordered" value={formData.skills} onChange={handleChange}/>
                                <label className="label">
                                    <span className="label-text-alt">Separate skills with commas</span>
                                </label>
                            </div>

                            {/* Row 6: Portfolio & LinkedIn */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            <ExternalLink className="inline mr-1" size={16} />Portfolio Link
                                        </span>
                                    </label>
                                    <input type="url" name="portfolio_link" placeholder="https://yourportfolio.com" className="input input-bordered" value={formData.portfolio_link} onChange={handleChange}/>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            <Linkedin className="inline mr-1" size={16} /> LinkedIn Profile
                                        </span>
                                    </label>
                                    <input type="url" name="linkedin_link" placeholder="https://linkedin.com/in/yourprofile" className="input input-bordered" value={formData.linkedin_link} onChange={handleChange}/>
                                </div>
                            </div>

                            {/* Resume Upload */}
                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        <Upload className="inline mr-1" size={16} />Upload Resume/CV</span>
                                </label>
                                <input type="file" className="file-input file-input-bordered w-full" accept=".pdf,.doc,.docx" name="resume" onChange={handleChange} />
                                <label className="label">
                                    <span className="label-text-alt">Accepted formats: PDF, DOC, DOCX</span>
                                </label>
                            </div>

                            {/* Profile Upload */}
                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        <Upload className="inline mr-1" size={16} />Upload Profile Picture</span>
                                </label>
                                <input type="file" className="file-input file-input-bordered w-full" accept=".jpg,.jpeg,.png" name="profile" onChange={handleChange} />
                                <label className="label">
                                    <span className="label-text-alt">Accepted formats: JPG, JPEG, PNG</span>
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="card-actions justify-end gap-2 mt-8">
                                <button type="button" className="btn btn-ghost" onClick={() => window.history.back()} disabled={loading}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary btn-wide" onClick={handleSubmit} disabled={loading}>
                                    {loading ? (
                                        <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Creating Account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </div>

                            {/* Login Link */}
                            <div className="text-center mt-6">
                                <p className="text-base-content/70">
                                Already have an account?{' '}
                                <a href="/login" className="link link-primary font-semibold">Log in</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;