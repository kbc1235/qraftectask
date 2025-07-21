export interface DateRangeValue {
  startDate: string;
  endDate: string;
}

export interface DateRangeProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  error?: string;
  placeholder?: {
    start: string;
    end: string;
  };
  format?: string;
}
