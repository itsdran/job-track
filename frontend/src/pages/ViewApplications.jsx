import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { OctagonMinus, Briefcase, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { JobCard } from '../components/JobCard';
import { Header } from '../components/Header';
import RateLimitedUI from '../components/RateLimited'

import api from '../lib/axios';
import { statuses } from "../constants/statuses.js"

const ViewApplications = () => {
    const [jobs, setJobs] = useState([]);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const { username } = useParams();

    useEffect(() => {
        const fetchJobs = async () => {
            try {                
                document.title = `Applications`;
                const res = await api.get(`/users/${username}/jobs`);
                setJobs(res.data);
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
        <>
            <Header />
            {isRateLimited ? (
                <RateLimitedUI />
            ): (
                <div className="container mx-auto p-6 max-w-7xl">

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 shadow mb-6 w-full">
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

                    <div className="mb-4 text-right">
                        <Link to={`/users/${username}/jobs/record`} className="btn btn-success btn-sm text-white">
                            <Plus size={24} />
                            Add New Job Application
                        </Link>
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
                            {filteredJobs.length === 0 && !isRateLimited ? (
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
                                        key={job._id} 
                                        job={job}
                                        jobs={jobs}
                                        username={username}
                                        setJobs={setJobs}
                                    />
                            ))
                            )}
                        </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewApplications;