import React from "react";

interface CardProps {
    title: string;
    price: number;
    image: string;
};

const Card = ({title, price, image}: CardProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full" src={`http://localhost:8080/uploads/${image}`} alt={title} />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
        </div>
            {price && (
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
                        ${price}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Card;    