const colorClasses = {
    active:  'bg-green-50 text-green-700 border border-green-200',
    inactive: 'bg-red-50 text-red-700 border border-red-200',
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    info:    'bg-blue-50 text-blue-700 border border-blue-200',
    default: 'bg-slate-100 text-slate-600 border border-slate-200',
};

export function Badge({ children, color = 'default', className = '' }) {
    return (
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold inline-block ${colorClasses[color]} ${className}`}>
            {children}
        </span>
    );
}
