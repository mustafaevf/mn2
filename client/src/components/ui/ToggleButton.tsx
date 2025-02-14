import React from 'react';

type Props = {
    title: string;
    toggle: () => void;
    status: boolean;
};

const ToggleButton = ({ title, toggle, status }: Props) => {
    
    return (
        <button
            onClick={toggle}
            className="bg-secondary border border-border text-primary text-sm px-4 py rounded-sm h-11 hover:bg-hover transition-colors flex items-center"
        >
            {title}
            <div
                className={`icon w-2 bg-icon ml-3 mt-1 ${status === true ? `rotate-180` : `rotate-0`}`}
                style={{ maskImage: 'url(/down.svg)' }}
            ></div>
        </button>
    );
};
export default ToggleButton;
