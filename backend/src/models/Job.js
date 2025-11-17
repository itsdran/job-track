import moose from 'mongoose';

const jobSchema = new moose.Schema({
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    application_platform: {
        type: String,
        enum: ['LinkedIn', 'Indeed', 'Jobslin', 'BossJob', 'Company Website', 'Referral', 'Other'],
    },
    date_applied: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    setup: {
        type: String
    },
    description: {
        type: String,
    },
    salary: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['Applied', 'First Interview', 'For Final Interview', 'Rejected', 'Hired'],
        default: 'Applied'
    }
});

const Job = moose.model('Job', jobSchema);

export default Job;