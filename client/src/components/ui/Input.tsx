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
    type='text',
    placeholder,
}: InputProps) => {
    return (
        <div className="flex flex-col mb-4">
            <input
                value={value}
                type={type}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="px-4 py-4 rounded bg-background text-sm text-secondary focus:outline-none"
            />
        </div>
    );
};

export default Input;
