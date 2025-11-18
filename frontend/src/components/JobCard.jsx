import { Link, useNavigate } from "react-router";
import { toast } from 'react-hot-toast';
import { Trash2, ExternalLink, Briefcase, MapPin, Calendar } from 'lucide-react';

import { formatDate, formatSalary, getStatusColor } from "../lib/utils";

import api from '../lib/axios';

export const JobCard = ({ job, jobs, setJobs }) => {

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this application ?")) return;

        try {
            await api.delete(`/jobs/${id}`);
            toast.success('Application deleted successfully');
            setJobs((prev) => prev.filter((job) => job._id !== id)); // get rid of the deleted one
            navigate("/");
        } catch (error) {
            toast.error('Error deleting application:', error);
            console.error('Error deleting application:', error);
        }
    }; 

    return (
        <tr className="hover">
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-12">
                        <Briefcase size={24} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-lg">{job.position}</div>
                        <div className="text-sm opacity-70 flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(job.date_applied)}
                        </div>
                    </div>
                </div>
            </td>

            <td>
                <div className="font-semibold">{job.company}</div>
                <div className="text-sm opacity-70">{job.application_platform}</div>
            </td>
            <td>
                <div className="flex items-center gap-1">
                <MapPin size={16} />
                {job.location}
                </div>
                {job.setup && (
                <div className="badge badge-outline badge-sm mt-1">{job.setup}</div>
                )}
            </td>
            <td>
                <span className={`badge h-full text-center ${getStatusColor(job.status)} badge-lg`}>
                {job.status}
                </span>
            </td>

            <td>
                {job.salary && (
                    <div className="flex items-center gap-1 text-sm">
                        {formatSalary(job.salary)}
                    </div>
                )}
            </td>

            <td>
                <div className="flex gap-2">
                    <Link to={`/jobs/${job._id}`}>
                    <button className="btn btn-primary btn-sm" onClick={() => handleGoTo(job._id)}>
                        <ExternalLink size={16} /> View
                    </button>
                    </Link>
                    <button className="btn btn-error btn-sm" onClick={() => handleDelete(job._id)}>
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};