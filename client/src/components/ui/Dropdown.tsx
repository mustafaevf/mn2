import { useState } from "react";

interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const Dropdown = ({ options, selected, onSelect, placeholder = "Выберите" }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-[#2b3654] text-secondary text-sm font-medium px-4 py-2 rounded hover:bg-[#3c4868] transition-colors flex items-center"
      >
        {selected || placeholder}
        <div className="icon w-2 bg-[#bfcbe7] ml-3 mt-1" style={{maskImage: "url(/down.svg)"}}></div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute left-0 top-full mt-2 w-48 bg-[#1f2a46] rounded shadow-lg z-20">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block w-full text-left px-4 py-2 text-secondary hover:bg-[#2b3654] rounded transition-colors"
              >
                {option}
                
              </button>
              
            ))}
            
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
