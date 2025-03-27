import { useState, ReactNode } from "react";

type SelectedType = {
  title: string;
  data: string;
};

interface DropdownProps {
  options: SelectedType[];
  selected: SelectedType | null;
  onSelect: (value: SelectedType) => void;
  placeholder?: string;
  trigger?: ReactNode;
  className?: string;
}

const Dropdown = ({
  options,
  selected,
  onSelect,
  placeholder = "Выберите",
  trigger,
  className = "",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: SelectedType) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger || (
          <button className="border border-border text-primary text-sm px-4 py h-11 rounded-sm hover:bg-hover min-w-10 transition-colors flex items-center">
            {selected?.title || placeholder}
            <div
              className="icon w-2 bg-icon ml-3 mt-1"
              style={{ maskImage: "url(/down.svg)" }}
            ></div> 
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute left-[-100px] top-full mt-2  min-w-[150px] bg-secondary rounded-sm border border-border shadow-lg px-2 py-2 z-[40]">
          {options.map((option) => (
            <button
              key={option.data}
              onClick={() => handleOptionClick(option)}
              className="block w-full text-left px-4 h-11 py-2 text-primary hover:bg-hover rounded-sm transition-colors"
            >
              {option.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
