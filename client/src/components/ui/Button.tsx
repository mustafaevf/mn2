import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    disabled?: boolean;
}

const Button = ({
    label,
    onClick,
    variant = 'primary',
    disabled = false,
}: ButtonProps) => {
    const baseStyles =
        'h-13 shrink-0 gap-2.5 lg:gap-3 rounded-sm pl-3.5 lg:pl-4.5 pr-3 lg:pr-3.5 text-sm font-medium uppercase lg:h-12.5';

    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        secondary: 'bg-buttonSecondary text-white',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
        outline: 'bg-transparent border-red-500',
    };

    return (
        <button
            onClick={disabled ? undefined : onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
