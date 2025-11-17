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
