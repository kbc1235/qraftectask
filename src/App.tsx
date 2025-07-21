import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  FormSelect,
  FormInput,
  DateRange,
  AnnouncementList,
  type SelectOption,
} from "./components/common";
import { useFilterStore } from "./stores/filterStore";
import { useIsDesktop } from "./features/hooks/useMediaQuery";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function FormBox({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-[12px] py-[4px] px-[12px] ${className}`}
    >
      {label && (
        <p className="min-w-[42px] text-[15px] font-[600] text-[#5B6266]">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

function AppContent() {
  const isPc = useIsDesktop();
  const {
    exchange,
    keyword,
    dateRange,
    setExchange,
    setKeyword,
    setDateRange,
  } = useFilterStore();
  const [localKeyword, setLocalKeyword] = useState(keyword);

  const exchangeOptions: SelectOption[] = [
    { value: "all", label: "전체" },
    { value: "shenzhen", label: "심천" },
    { value: "hongkong", label: "홍콩" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(localKeyword);
    }, 500);

    return () => clearTimeout(timer);
  }, [localKeyword, setKeyword]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="max-w-[772px] w-full h-[48px] flex bg-[#fff] py-[4px] rounded-[3px]">
        <FormBox label="거래소">
          <FormSelect
            options={exchangeOptions}
            value={exchange}
            onChange={(value) =>
              setExchange(value as "all" | "hongkong" | "shenzhen")
            }
            placeholder="거래소 선택"
            className="w-[100px] max-h-[32px]"
            required
          />
        </FormBox>
        <FormBox label="키워드" className="ml-[26px]">
          <FormInput
            id="keyword"
            value={localKeyword}
            onChange={setLocalKeyword}
            placeholder="키워드를 입력하세요"
            className="w-[200px] max-h-[32px]"
          />
        </FormBox>
        <FormBox className="ml-auto">
          <DateRange value={dateRange} onChange={setDateRange} />
        </FormBox>
      </div>

      <div
        className={`max-w-[772px] w-full bg-[#fff] py-[10px] px-[10px] rounded-[3px] mt-[10px] overflow-y-auto scroll-custom ${
          isPc ? "h-[calc(100vh-58px)]" : "h-[100vh]"
        }`}
      >
        <AnnouncementList />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
