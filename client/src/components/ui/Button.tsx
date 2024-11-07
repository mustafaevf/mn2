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
        'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
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
