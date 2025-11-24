import { useState, useEffect, useContext } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, PhilippinePeso, FileText, Code, ExternalLink, Linkedin, Calendar, Edit, Trash2, Download, Laptop } from 'lucide-react';

import { AuthContext } from './AuthContext';
import { formatDateInput, formatSalary } from '../lib/utils.js';

import api from '../lib/axios';

import RateLimitedUI from '../components/RateLimited';

import toast from 'react-hot-toast';

const ProfilePage = () => {

    const { user, logout, isAuthenticated } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [isRateLimited, setIsRateLimited] = useState(false);

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        location_preference: '',
        setup_preference: '',
        job_applying_for: '',
        salary_expectation: '',
        profile_summary: '',
        skills: [],
        portfolio_link: '',
        linkedin_link: '',
        resume: null,
        profile: '/avatars/pfp.png',
        createdAt: ''
    });

    useEffect(() => {

        if (isAuthenticated === false) {
            toast.error("Log in first!");
            logout();
            return () => clearTimeout(timer);
        }

        const fetchUserData = async () => {
            try {
                const res = await api.get(`/users/${user.username}`);
                setUserData(res.data);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    setIsRateLimited(true);
                    toast.error('You have made too many requests. Please try again later.');
                } else {
                    toast.error('Error fetching jobs:', error);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleUpdate = () => {

    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        
        console.log('Account sucessfully deleted');
        }
    };

    const handleViewResume = () => {
        if (userData?.resume_cv) {
        window.open(userData.resume_cv, '_blank');
        }
    };

    if (loading) {
        return (<div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>);
    }

    if (!userData) {
        return (<div className="flex justify-center items-center min-h-screen"><p className="text-lg">User data not found</p></div>);
    }

    return (
        
        <div className="min-h-screen bg-base-200 py-8 px-4">
        {isRateLimited && <RateLimitedUI />}

        <div className="container mx-auto max-w-5xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">My Profile</h1>
                <div className="flex gap-2">
                    {userData.resume_cv && (<button onClick={handleViewResume} className="btn btn-info btn-sm gap-2"><Download size={16} />View Resume</button>)}
                    <button onClick={handleUpdate} className="btn btn-warning btn-sm gap-2"><Edit size={16} />Update</button>
                    <button onClick={handleDelete} className="btn btn-error btn-sm gap-2"><Trash2 size={16} />Delete</button>
                </div>
            </div>

            <div className="card bg-base-100 shadow-2xl">
            <div className="card-body p-8">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="flex-shrink-0">
                        <div className="avatar">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            {userData.profile ? (<img src={userData.profile} alt={`${userData.first_name} ${userData.last_name}`} />) : (<div className="bg-primary text-primary-content flex items-center justify-center text-4xl font-bold">{userData.first_name[0]}{userData.last_name[0]}</div>)}
                        </div>
                        </div>
                    </div>

                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{userData.first_name} {userData.last_name}</h2>
                    <p className="text-xl text-primary font-semibold mb-4">@{userData.username}</p>
                    <div className="flex flex-wrap gap-3 mb-4">
                    <div className="badge badge-outline badge-lg gap-2"><Mail size={14} />{userData.email}</div>
                    {userData.phone_number && (<div className="badge badge-outline badge-lg gap-2"><Phone size={14} />{userData.phone_number}</div>)}
                    <div className="badge badge-outline badge-lg gap-2"><Calendar size={14} />Joined {formatDateInput(userData.createdAt)}</div>
                    </div>
                    {userData.portfolio_link && (<a href={userData.portfolio_link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost gap-2 mr-2"><ExternalLink size={16} />Portfolio</a>)}
                    {userData.linkedin_url && (<a href={userData.linkedin_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost gap-2"><Linkedin size={16} />LinkedIn</a>)}
                </div>
                </div>

                <div className="divider"></div>

                {userData.profile_summary && (
                <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-2"><User size={24} className="text-primary" />Professional Summary</h3>
                    <p className="text-lg text-base-content/80 leading-relaxed">{userData.profile_summary}</p>
                </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="card bg-base-200">
                    <div className="card-body">
                    <h3 className="card-title text-xl flex items-center gap-2"><Briefcase size={20} className="text-primary" />Job Preferences</h3>
                    <div className="space-y-2">
                        <div><span className="font-semibold">Position:</span> {userData.job_applying_for || 'Not specified'}</div>
                        <div className="flex items-center gap-2"><MapPin size={16} /><span>{userData.location_preference || 'Not specified'}</span></div>
                        {userData.setup_preference && (<div className="flex items-center gap-2"><Laptop size={16} /><span className="badge badge-primary">{userData.setup_preference}</span></div>)}
                        {userData.salary_expectation && (<div className="flex items-center gap-2"><PhilippinePeso size={16} /><span className="font-semibold">{formatSalary(userData.salary_expectation)}/month</span></div>)}
                    </div>
                    </div>
                </div>

                {userData.skills && userData.skills.length > 0 && (
                    <div className="card bg-base-200">
                    <div className="card-body">
                        <h3 className="card-title text-xl flex items-center gap-2"><Code size={20} className="text-primary" />Skills</h3>
                        <div className="flex flex-wrap gap-2">
                        {userData.skills.map((skill, index) => (<span key={index} className="badge badge-lg badge-accent">{skill}</span>))}
                        </div>
                    </div>
                    </div>
                )}
                </div>

                {userData.resume_cv && (
                <div className="alert alert-info">
                    <FileText size={24} />
                    <div className="flex-1">
                    <h3 className="font-bold">Resume on File</h3>
                    <div className="text-xs">Your resume is stored and ready to be viewed or downloaded</div>
                    </div>
                    <button onClick={handleViewResume} className="btn btn-sm btn-primary">View</button>
                </div>
                )}
            </div>
            </div>

            <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
                <h3 className="card-title text-2xl mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <User size={20} className="text-primary" />
                    <div><div className="text-sm text-base-content/60">Username</div><div className="font-semibold">{userData.username}</div></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <Mail size={20} className="text-primary" />
                    <div><div className="text-sm text-base-content/60">Email</div><div className="font-semibold">{userData.email}</div></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <Calendar size={20} className="text-primary" />
                    <div><div className="text-sm text-base-content/60">Member Since</div><div className="font-semibold">{formatDateInput(userData.createdAt)}</div></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${userData.isActive ? 'bg-success' : 'bg-error'}`}></div>
                    <div><div className="text-sm text-base-content/60">Account Status</div><div className="font-semibold">{userData.isActive ? 'Active' : 'Inactive'}</div></div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default ProfilePage;