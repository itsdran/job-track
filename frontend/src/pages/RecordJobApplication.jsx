import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router";
import { toast } from 'react-hot-toast';
import { Briefcase, Building2, MapPin, FileText, Calendar, Laptop } from 'lucide-react';

import { platforms } from '../constants/platforms';
import { setups } from '../constants/setups';
import { statuses } from '../constants/statuses';

import api from '../lib/axios';

const RecordJobApplication = () => {

    useEffect(() => {
        document.title = 'Record New Application';
    }, []);

    const { username } = useParams();
    const [userID, setUserID] = useState();
    const navigate = useNavigate();   
    const [formData, setFormData] = useState({
        position: '',
        company: '',
        application_platform: '',
        date_applied: new Date().toISOString().split('T')[0],
        location: '',
        setup: '',
        description: '',
        salary: '',
        status: 'Applied',
        applied_by: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    // Get User info from username
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/${username}`);
                setUserID(res.data._id);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.position || !formData.company || !formData.location || !formData.application_platform) {
            toast.error('Please fill in all required fields');
            console.log ('Not all required fields filled');
            return;
        }

        setLoading(true);

        try {
            const submitData = {
                ...formData,
                applied_by: userID,
                salary: formData.salary ? formData.salary : 0
            };

            await api.post('/jobs', submitData);
            toast.success('Job application added successfully!');
            navigate(`/users/${username}/jobs`);

            // Reset form
            setFormData({
                position: '',
                company: '',
                application_platform: '',
                date_applied: new Date().toISOString().split('T')[0],
                location: '',
                setup: '',
                description: '',
                salary: '',
                status: 'Applied',
                applied_by: ''
            });

        } catch (error) {
            toast.error('Error recording job application');
            console.error('Error:', error);

        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
            setFormData({
                position: '',
                company: '',
                application_platform: '',
                date_applied: new Date().toISOString().split('T')[0],
                location: '',
                setup: '',
                description: '',
                salary: '',
                status: 'Applied'
            });
        }
        navigate(`/users/${username}/jobs`);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Add New Job Application</h1>
                <p className="text-base-content/70">Track your job hunting journey</p>
            </div>

            {/* Form Card */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div onSubmit={handleSubmit}>
                        {/* Row 1: Position & Company */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        <Briefcase className="inline mr-2" size={18} />
                                        Position <span className="text-error">*</span>
                                    </span>
                                </label>
                                <input type="text" name="position" placeholder="e.g., Data Analyst" className="input input-bordered"
                                    value={formData.position} onChange={handleChange} required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        <Building2 className="inline mr-2" size={18} />
                                        Company <span className="text-error">*</span>
                                    </span>
                                </label>
                                <input type="text" name="company" placeholder="e.g., Tech Corp" className="input input-bordered"
                                    value={formData.company} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Row 2: Location & Setup */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        <MapPin className="inline mr-2" size={18} />
                                        Location <span className="text-error">*</span>
                                    </span>
                                </label>
                                <input type="text" name="location" placeholder="e.g., Manila, Philippines" className="input input-bordered"
                                    value={formData.location} onChange={handleChange} required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        <Laptop className="inline mr-2" size={18} />
                                        Work Setup
                                    </span>
                                </label>
                                <select name="setup" className="select select-bordered" value={formData.setup} onChange={handleChange}>
                                    <option value="">Select setup...</option>
                                    {setups.map(setup => (
                                        <option key={setup} value={setup}>{setup}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Row 3: Platform & Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Application Platform
                                    </span>
                                </label>
                                <select required name="application_platform" className="select select-bordered"
                                    value={formData.application_platform} onChange={handleChange} >
                                    <option value="">Select platform...</option>
                                    {platforms.map(platform => (
                                        <option key={platform} value={platform}>{platform}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        <Calendar className="inline mr-2" size={18} />
                                        Date Applied
                                    </span>
                                </label>
                                <input type="date" name="date_applied" className="input input-bordered"
                                    value={formData.date_applied} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Row 4: Salary & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Salary (PHP)
                                    </span>
                                </label>
                                <input type="number" name="salary" placeholder="e.g., 25000" className="input input-bordered"
                                    value={formData.salary} onChange={handleChange} min="0" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Status
                                    </span>
                                </label>
                                <select name="status" className="select select-bordered"
                                    value={formData.status} onChange={handleChange} >
                                    {statuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Row 5: Description */}
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text font-semibold">
                                <FileText className="inline mr-2" size={18} />
                                Job Description
                                </span>
                            </label>
                            <textarea name="description" placeholder="Add any notes or job description details..." className="textarea textarea-bordered h-32"
                                value={formData.description} onChange={handleChange} ></textarea>
                        </div>

                        {/* Action Buttons */}
                        <div className="card-actions justify-end gap-2">
                            <button type="button" className="btn btn-ghost" onClick={handleCancel} disabled={loading}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                                {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Adding...
                                </>
                                ) : (
                                <>
                                    <Briefcase size={18} />
                                    Add Application
                                </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordJobApplication;