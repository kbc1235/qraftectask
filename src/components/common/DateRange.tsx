import { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { type DateRangeProps } from "./DateRange.types";
import { getDefaultDateRange } from "../../utils/dateUtils";
import "react-datepicker/dist/react-datepicker.css";

export { type DateRangeValue } from "./DateRange.types";

export function DateRange({
  value,
  onChange,
  className = "",
  disabled = false,
  required = false,
  label,
  error,
}: DateRangeProps) {
  const startDateRef = useRef<DatePicker>(null);
  const endDateRef = useRef<DatePicker>(null);

  useEffect(() => {
    if (!value.startDate && !value.endDate) {
      onChange(getDefaultDateRange());
    }
  }, [value.startDate, value.endDate, onChange]);

  const handleStartDateChange = (date: Date | null) => {
    if (!date) return;

    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const startDay = dayjs(formattedDate);
    const endDay = dayjs(value.endDate);

    const newValue = {
      startDate: formattedDate,
      endDate:
        value.endDate && startDay.isAfter(endDay)
          ? formattedDate
          : value.endDate,
    };

    onChange(newValue);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (!date) return;

    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const startDay = dayjs(value.startDate);
    const endDay = dayjs(formattedDate);

    const newValue = {
      startDate:
        value.startDate && endDay.isBefore(startDay)
          ? formattedDate
          : value.startDate,
      endDate: formattedDate,
    };

    onChange(newValue);
  };

  const startDateValue = value.startDate
    ? dayjs(value.startDate).toDate()
    : null;
  const endDateValue = value.endDate ? dayjs(value.endDate).toDate() : null;

  const CustomInput = ({
    id,
    value: inputValue,
    onClick,
    placeholder,
  }: {
    id?: string;
    value?: string;
    onClick?: () => void;
    placeholder?: string;
  }) => (
    <div className="relative">
      <input
        id={id}
        value={inputValue || ""}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
        required={required}
        className={`
          w-[132px]
          h-[32px]
          px-[10px] py-[7px] pr-[40px]
          bg-white
          border border-[#9DA6AD]
          rounded-[4px]
          font-inter text-[14px] font-light text-[#5B6266]
          cursor-pointer
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
      <div className="absolute h-[16px] w-[16px] right-[12px] top-1/2 transform -translate-y-1/2 pointer-events-none text-[#5B6266]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.14417 4.09622V13.2052C2.14417 13.5503 2.28126 13.8813 2.5253 14.1253C2.76934 14.3694 3.10033 14.5065 3.44545 14.5065H12.5544C12.8995 14.5065 13.2305 14.3694 13.4746 14.1253C13.7186 13.8813 13.8557 13.5503 13.8557 13.2052V4.09622C13.8557 3.7511 13.7186 3.42011 13.4746 3.17607C13.2305 2.93203 12.8995 2.79493 12.5544 2.79493H11.2531V1.49365H9.95186V2.79493H6.04801V1.49365H4.74673V2.79493H3.44545C3.10033 2.79493 2.76934 2.93203 2.5253 3.17607C2.28126 3.42011 2.14417 3.7511 2.14417 4.09622ZM12.5544 13.2052H3.44545V5.3975H12.5544V13.2052Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div className={`w-full date-range-container ${className}`}>
      {label && (
        <label className="text-sm font-[500] text-main-text mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex items-center justify-between gap-[10px]">
        <DatePicker
          ref={startDateRef}
          selected={startDateValue}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDateValue}
          endDate={endDateValue}
          maxDate={endDateValue || undefined}
          dateFormat="yyyy-MM-dd"
          disabled={disabled}
          customInput={<CustomInput id="start-date" placeholder="YYYY-MM-DD" />}
          popperClassName="date-picker-popper"
          calendarClassName="date-picker-calendar"
        />

        <div className="text-gray-400 flex-shrink-0">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.9395 11.5605L20.379 18L13.9395 24.4395L16.0605 26.5605L24.621 18L16.0605 9.43949L13.9395 11.5605Z"
              fill="#858585"
            />
          </svg>
        </div>

        <DatePicker
          ref={endDateRef}
          selected={endDateValue}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDateValue}
          endDate={endDateValue}
          minDate={startDateValue || undefined}
          dateFormat="yyyy-MM-dd"
          disabled={disabled}
          customInput={<CustomInput id="end-date" placeholder="YYYY-MM-DD" />}
          popperClassName="date-picker-popper"
          calendarClassName="date-picker-calendar"
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
