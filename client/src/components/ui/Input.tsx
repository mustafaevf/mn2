interface InputProps {
    label: string;
    value: string ;
    onChange: (value: string) => void;
    placeholder: string;
    type?: string;
}

const Input = ({
    label,
    value,
    onChange,   
    placeholder,
}: InputProps) => {
    return (
        <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default Input;
