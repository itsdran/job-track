export function getStatusColor (status) {
    const colors = {
        'Applied': 'badge-info',
        'First Interview': 'badge-warning',
        'For Final Interview': 'badge-secondary',
        'Rejected': 'badge-error',
        'Hired': 'badge-success'
    };
    return colors[status] || 'badge-ghost';
};

export function formatSalary (salary) {
    if (!salary) return 'Not specified';
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(salary);
};

export function formatDate (date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};