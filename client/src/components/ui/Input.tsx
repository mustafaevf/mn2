interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type?: string;
    iconType?: 'rub';
}

const Input = ({
    label,
    value,
    onChange, 
    type = 'text',
    placeholder,
    iconType
}: InputProps) => {
    return (
        <div className="flex flex-col relative">
            {iconType === "rub" && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                    <path
                        fillRule="evenodd"
                        d="M300.999 0H150.982c-17.107 0-30.976 13.87-30.976 30.977v209.047h-29.03C73.87 240.024 60 253.894 60 271.001s13.87 30.976 30.977 30.976h29.029v58.061h-29.03C73.87 360.038 60 373.907 60 391.014s13.87 30.977 30.977 30.977h29.029v59.032c0 17.108 13.869 30.977 30.976 30.977s30.977-13.869 30.977-30.977v-59.032h119.04c17.107 0 30.977-13.87 30.977-30.977s-13.87-30.976-30.977-30.976h-119.04v-58.061h119.04c83.259 0 150.99-67.731 150.99-150.989C451.987 65.664 382.481 0 300.999 0zm0 240.024h-119.04V61.953h119.04c48.805 0 89.037 39.364 89.037 89.037-.002 49.092-39.944 89.034-89.037 89.034z"
                    ></path>
                </svg>
            )}

            <input
                value={value}
                type={type}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`py-3 h-13 rounded-sm bg-ui text-base text-secondary border border-[transparent] focus:outline-none focus:border border-border 
                    ${iconType === "rub" ? "pl-10 pr-4" : "px-4"}`}
            />
        </div>
    );
};

export default Input;
