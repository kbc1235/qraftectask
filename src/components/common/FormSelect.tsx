import { useState, useRef, useEffect } from "react";
import { type FormSelectProps } from "./FormSelect.types";

export { type SelectOption } from "./FormSelect.types";

export function FormSelect({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  className = "",
  disabled = false,
  label,
  error,
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!value && options.length > 0 && !options[0].disabled) {
      onChange(options[0].value);
    }
  }, [value, options, onChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      return () => {
        document.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className} `} ref={selectRef}>
      {label && (
        <label className="text-sm font-medium text-main-text mb-2">
          {label}
        </label>
      )}

      <div
        onClick={handleToggle}
        className={`
          w-full 
          h-[32px]
          bg-white 
          p-[8px]
          border border-[#9DA6AD] 
          rounded-[4px]
          text-sm
          cursor-pointer
          flex items-center justify-between
          transition-all duration-200
          ${
            disabled
              ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200"
              : "hover:border-point-blue"
          }
          ${
            isOpen && !disabled
              ? "border-point-blue ring-2 ring-point-blue/10"
              : ""
          }
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : ""
          }
        `}
      >
        <span
          className={
            selectedOption
              ? "text-[12px] text-[#5B6266]"
              : "text-[12px] text-[#9DA6AD]"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <div
          className={`text-dark-navy transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.93496 6L0.41453 1.38009e-07L7.45539 8.95112e-07L3.93496 6Z"
              fill="#2F3B43"
            />
          </svg>
        </div>
      </div>
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#9DA6AD] rounded-[4px] shadow-lg max-h-60 overflow-y-auto bg-[#ffffff]">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => !option.disabled && handleSelect(option.value)}
              className={`
                px-[8px] py-[8px] 
                text-[12px] font-medium
                cursor-pointer
                transition-colors duration-150
                ${
                  option.disabled
                    ? "text-[12px] text-[#9DA6AD] cursor-not-allowed bg-gray-50"
                    : "text-[12px] text-[#5B6266] hover:bg-pastel-blue"
                }
                ${
                  option.value === value
                    ? "bg-point-blue text-white hover:bg-point-blue"
                    : ""
                }
                first:rounded-t-[4px] 
                last:rounded-b-[4px]
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
