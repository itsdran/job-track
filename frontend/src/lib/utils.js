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
    if (!salary) return '0';
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(salary);
};

export function formatDate (date) {
    return new Date(date).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export function formatDateInput (date) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}