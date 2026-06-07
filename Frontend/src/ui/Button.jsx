const variantClasses = {
    primary: 'bg-blue-900 text-white hover:bg-blue-800 shadow-md',
    secondary: 'text-slate-600 hover:bg-slate-100',
    ghost: 'text-blue-700 hover:bg-blue-50',
    danger: 'text-red-600 hover:bg-red-50',
    warning: 'text-amber-700 hover:bg-amber-50',
    success: 'bg-green-500 text-white hover:bg-green-600 shadow-md',
    dark: 'bg-slate-800 text-white hover:bg-slate-700',
};

const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3',
    full: 'w-full py-4',
};

export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
    return (
        <button
            className={`font-bold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
