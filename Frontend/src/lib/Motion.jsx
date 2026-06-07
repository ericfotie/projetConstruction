import { useInView } from './useInView';
import { variants, durations } from './animations';

export function Motion({
    children,
    variant = 'fadeInUp',
    duration = 'slow',
    delay = 0,
    className = '',
    as: Tag = 'div',
}) {
    const [ref, inView] = useInView();
    const { hidden, visible } = variants[variant];
    const speed = durations[duration];

    return (
        <Tag
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all ${speed} ease-out ${inView ? visible : hidden} ${className}`}
        >
            {children}
        </Tag>
    );
}
