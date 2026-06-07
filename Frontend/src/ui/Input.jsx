export function Input({ className = '', ...props }) {
    return (
        <input
            className={`w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm ${className}`}
            {...props}
        />
    );
}
