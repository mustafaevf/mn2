import { useRef } from 'react';

const CoefficientScroller = ({ coefficients, guessedSteps }: { coefficients: number[]; guessedSteps: number[] }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 100;
            scrollRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button onClick={() => scroll('left')} className="p-2 bg-primary text-white rounded">
                ←
            </button>

            <div ref={scrollRef} className="flex gap-2 w-[400px] overflow-hidden scrollbar-hide scroll-smooth">
                {coefficients.map((coefficient, index) => (
                    <div
                        key={index}
                        className={`px-4 py-2 text-secondary rounded border border-border text-sm
                            ${guessedSteps.includes(index) ? "bg-success" : "bg-secondary"}`}
                    >
                        x{coefficient.toFixed(2)}
                    </div>
                ))}
            </div>

            <button onClick={() => scroll('right')} className="p-2 bg-primary text-white rounded">
                →
            </button>
        </div>
    );
};

export default CoefficientScroller;
