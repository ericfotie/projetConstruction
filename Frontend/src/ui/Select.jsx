export function Select({ children, compact = false, className = '', ...props }) {
    const base = compact
        ? 'w-full text-xs font-bold bg-slate-100 p-2 rounded-lg uppercase outline-none'
        : 'w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm';

    return (
        <select className={`${base} ${className}`} {...props}>
            {children}
        </select>
    );
}
