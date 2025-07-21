import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatToKST = (date: Date | string | null): string => {
  if (!date) return "";
  return dayjs(date).utc().tz("Asia/Seoul").format("YYYY.MM.DD HH:mm");
};

export const formatToCST = (date: Date | string | null): string => {
  if (!date) return "";
  return dayjs(date).utc().tz("Asia/Shanghai").format("YYYY.MM.DD HH:mm");
};

export const getDefaultDateRange = () => {
  const today = dayjs();
  const oneYearAgo = today.subtract(1, "year");

  return {
    startDate: oneYearAgo.format("YYYY-MM-DD"),
    endDate: today.format("YYYY-MM-DD"),
  };
};
