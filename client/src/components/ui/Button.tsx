import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
}

const Button = ({
    label,
    onClick,
    variant = 'secondary',
}: ButtonProps) => {
    const baseStyles =
        'btn-blue h-11 shrink-0 gap-2.5 lg:gap-3 rounded pl-3.5 lg:pl-4.5 pr-3 lg:pr-3.5 text-tiny font-bold  uppercase lg:h-12.5';

    const variantStyles = {
        primary: 'btn-blue text-white hover:bg-blue-600 focus:ring-blue-500',
        secondary: 'bg-muted text-white hover:bg-gray-600 focus:ring-gray-500',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]}`}
        >
            {label}
        </button>
    );
};

export default Button;
