import { useState, useEffect } from 'react';
import { OctagonMinus, Briefcase } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { JobCard } from '../components/JobCard';

const ViewApplications = () => {
    const [jobs, setJobs] = useState([]);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
    const fetchJobs = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/jobs");
            setJobs(res.data);
            console.log("Jobs Set in useEffect:", res.data);
            setIsRateLimited(false);
            setLoading(false);
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
    }
    fetchJobs();

}, []);

const statuses = ['All', 'Applied', 'First Interview', 'For Final Interview', 'Rejected', 'Hired'];

const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'All' || job.status === filter;
    const matchesSearch = 
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
});

if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
}

return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
        <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dran's Job Tracker</h1>
            <p className="text-base-content/70">Job Hunting so tuff you have to track 'em! :P</p>
        </div>

      {/* Stats */}
        <div className="stats stats-vertical lg:stats-horizontal shadow mb-6 w-full">
            <div className="stat">
                <div className="stat-title">Total Applications</div>
                <div className="stat-value text-primary">{jobs.length}</div>
            </div>
            <div className="stat">
                <div className="stat-title">In Progress</div>
                <div className="stat-value text-secondary">
                    {jobs.filter(j => j.status === 'First Interview' || j.status === 'For Final Interview').length}
                </div>
            </div>

            <div className="stat">
                <div className="stat-title">Hired</div>
                <div className="stat-value text-success">
                    {jobs.filter(j => j.status === 'Hired').length}
                </div>
            </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input type="text" placeholder="Search by position, company, or location..." className="input input-bordered flex-1" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
            <div className="flex gap-2 flex-wrap">
                {statuses.map(status => (
                    <button
                    key={status}
                    className={`btn btn-sm ${filter === status ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setFilter(status)}
                    >
                    {status}
                    </button>
                ))}
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table table-lg">
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredJobs.length === 0 ? (
                <tr>
                    <td colSpan="6" className="text-center py-8">
                        <div className="flex flex-col items-center gap-2">
                            <Briefcase size={48} className="opacity-30" />
                            <p className="text-lg">No applications found</p>
                        </div>
                    </td>
                </tr>
                ) : (
                    filteredJobs.map(job => (
                        <JobCard 
                            key={job.id} 
                            job={job}
                        />
                ))
                )}

                {isRateLimited && (
                    <tr>
                        <td colSpan="6" className="text-center py-8">
                            <div className="flex flex-col items-center gap-2">
                                <OctagonMinus size={48} className="opacity-30" />
                                <p className="text-lg">You've made too many requests in a short period. Please wait a moment.</p>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default ViewApplications;