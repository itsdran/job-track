import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { toast } from 'react-hot-toast';

import { Briefcase, Building2, Trash2, ArrowLeft, MapPin, FileText, Calendar, Laptop, Pen, PhilippinePeso, Rows4 } from 'lucide-react';
import { platforms } from '../constants/platforms';
import { setups } from '../constants/setups';
import { statuses } from '../constants/statuses';

import api from '../lib/axios';
import { formatDateInput, formatSalary } from '../lib/utils.js';

import RateLimitedUI from '../components/RateLimited';

const JobDetail = () => {

    const { username, job_id } = useParams();

    const [formData, setFormData] = useState({
        applied_by: '',
        position: '',
        company: '',
        application_platform: '',
        date_applied: new Date().toISOString().split('T')[0],
        location: '',
        setup: '',
        description: '',
        salary: 'N/A',
        status: ''
    });

    const [isRateLimited, setIsRateLimited] = useState(false);
    const [saving, setSaving] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/jobs/${job_id}`);
                document.title = `${res.data.position}`;
                setFormData(res.data);
                setIsRateLimited(false);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    setIsRateLimited(true);
                    toast.error('You have made too many requests. Please try again later.');
                } else {
                    toast.error('Error fetching jobs:', error);
                }
            } finally {
                setSaving(false);
            }
        }
        fetchJob();
    }, [job_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.position || !formData.company || !formData.location) {
            toast.error('Please fill in all required fields');
            console.log ('Not all required fields filled');
        return;
        }

        setSaving(true);

        try {
            await api.put(`/jobs/${job_id}`, formData);
            toast.success('Application updated successfully');
        } catch (error) {
            toast.error('Error updated application:', error);
            console.error('Error updated application:', error);
        } finally {
            setSaving(false);
        }

    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
            navigate (`/users/${username}/jobs`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this application?")) return;
        try {
            await api.delete(`/jobs/${id}`);
            toast.success('Application deleted successfully');
            setFormData((prev) => prev.filter((job) => job._id !== id));
            navigate(`/users/${username}/jobs`);
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    }; 

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            {isRateLimited && <RateLimitedUI />}
            <div className="mb-6">
                <Link to={`/users/${username}/jobs`} className="btn btn-ghost">
                    <ArrowLeft size={20} />
                    Back to Applications
                </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Job Details</h1>
                <p className="text-base-content/70">{formData.company} | {formData.position}</p>
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
                                <select name="setup" className="select select-bordered" value={formData.setup} onChange={handleChange} >
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
                                        <Laptop className="inline mr-2" size={18} />
                                        Application Platform
                                    </span>
                                </label>
                                <select name="application_platform" className="select select-bordered"
                                    value={formData.application_platform} onChange={handleChange}>
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
                                    value={formatDateInput(formData.date_applied)} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Row 4: Salary & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        <PhilippinePeso className="inline mr-2" size={18} />
                                        Salary (PHP)
                                    </span>
                                </label>
                                <input type="number" name="salary" placeholder="e.g., 25000" className="input input-bordered"
                                    value={formData.salary} onChange={handleChange}/>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        <Rows4 className="inline mr-2" size={18} />
                                        Status
                                    </span>
                                </label>
                                <select name="status" className="select select-bordered"
                                    value={formData.status} onChange={handleChange}>
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
                                value={formData.description} onChange={handleChange}></textarea>
                        </div>

                        {/* Action Buttons */}
                        <div className="card-actions justify-end gap-2">
                            <button type="button" className="btn btn-ghost" onClick={handleCancel} disabled={saving}>Cancel</button>
                            <button type="button" className="btn btn-error" onClick={() => handleDelete(formData._id)}>
                                <Trash2 size={16} /> Delete
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
                                {saving ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Adding...
                                </>
                                ) : (
                                <>
                                    <Pen size={18} />
                                    Update Application
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

export default JobDetail;