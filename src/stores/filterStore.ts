import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type FilterOptions, type ExchangeType } from "../types/announcement";
import { getDefaultDateRange } from "../utils/dateUtils";

interface FilterState extends FilterOptions {
  setExchange: (exchange: ExchangeType | "all") => void;
  setCategory: (category: string) => void;
  setKeyword: (keyword: string) => void;
  setDateRange: (dateRange: { startDate: string; endDate: string }) => void;

  recentKeywords: string[];
  addRecentKeyword: (keyword: string) => void;

  searchHistory: FilterOptions[];
  addToSearchHistory: () => void;
}

const defaultDateRange = getDefaultDateRange();

const initialState: FilterOptions = {
  exchange: "all",
  category: "",
  keyword: "",
  dateRange: defaultDateRange,
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setExchange: (exchange) => set({ exchange }),
      setCategory: (category) => set({ category }),
      setKeyword: (keyword) => set({ keyword }),
      setDateRange: (dateRange) => set({ dateRange }),

      recentKeywords: [],
      addRecentKeyword: (keyword) => {
        if (!keyword.trim()) return;

        const { recentKeywords } = get();
        const filtered = recentKeywords.filter((k) => k !== keyword);
        const updated = [keyword, ...filtered].slice(0, 10);

        set({ recentKeywords: updated });
      },

      searchHistory: [],
      addToSearchHistory: () => {
        const { exchange, category, keyword, dateRange, searchHistory } = get();

        if (!keyword.trim() && category === "" && exchange === "all") {
          return;
        }

        const newSearch: FilterOptions = {
          exchange,
          category,
          keyword,
          dateRange,
        };

        const filtered = searchHistory.filter(
          (history) =>
            !(
              history.exchange === newSearch.exchange &&
              history.category === newSearch.category &&
              history.keyword === newSearch.keyword &&
              history.dateRange.startDate === newSearch.dateRange.startDate &&
              history.dateRange.endDate === newSearch.dateRange.endDate
            )
        );

        const updated = [newSearch, ...filtered].slice(0, 20);
        set({ searchHistory: updated });
      },
    }),
    {
      name: "announcement-filter-store",
      partialize: (state) => ({
        recentKeywords: state.recentKeywords,
        searchHistory: state.searchHistory,
      }),
    }
  )
);
