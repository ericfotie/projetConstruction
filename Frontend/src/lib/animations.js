export const variants = {
    fadeInUp:   { hidden: 'opacity-0 translate-y-10', visible: 'opacity-100 translate-y-0' },
    fadeIn:     { hidden: 'opacity-0',                visible: 'opacity-100' },
    slideLeft:  { hidden: 'opacity-0 -translate-x-10', visible: 'opacity-100 translate-x-0' },
    slideRight: { hidden: 'opacity-0 translate-x-10',  visible: 'opacity-100 translate-x-0' },
    scaleIn:    { hidden: 'opacity-0 scale-90',        visible: 'opacity-100 scale-100' },
};

export const durations = {
    fast:   'duration-300',
    normal: 'duration-500',
    slow:   'duration-700',
    xslow:  'duration-1000',
};
