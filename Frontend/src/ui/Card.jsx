export function Card({ children, className = '', ...props }) {
    return (
        <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm ${className}`} {...props}>
            {children}
        </div>
    );
}
