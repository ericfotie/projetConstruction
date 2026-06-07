export function Textarea({ className = '', ...props }) {
    return (
        <textarea
            className={`w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm resize-none ${className}`}
            {...props}
        />
    );
}
