export interface FormInputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  label?: string;
  error?: string;
}
