import { type ChangeEvent } from "react";
import { type FormInputProps } from "./FormInput.types";

export function FormInput({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  disabled = false,
  required = false,
  maxLength,
  error,
  id,
}: FormInputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        id={id}
        className={`
          w-full 
          h-[32px]
          px-[8px] py-[8px] 
          border border-[#9DA6AD] 
          rounded-[4px] 
          text-[12px] text-[#5B6266]
          placeholder-gray-400
          focus:outline-none 
          focus:border-point-blue 
          focus:ring-2 
          focus:ring-point-blue/10
          hover:border-point-blue
          disabled:bg-gray-50 
          disabled:text-gray-400 
          disabled:cursor-not-allowed
          disabled:border-gray-200
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : ""
          }
        `}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
