import { create } from "zustand";
import {
  type Announcement,
  type Category,
  type ExchangeType,
} from "../types/announcement";

interface AnnouncementState {
  categories: Record<ExchangeType, Category[]>;
  popularKeywords: string[];
  stats: {
    totalCount: number;
    todayCount: number;
    exchangeStats: Record<ExchangeType, number>;
  };
  selectedAnnouncement: Announcement | null;

  setCategories: (categories: Record<ExchangeType, Category[]>) => void;
  setPopularKeywords: (keywords: string[]) => void;
  setStats: (stats: AnnouncementState["stats"]) => void;
  setSelectedAnnouncement: (announcement: Announcement | null) => void;
}

const initialState = {
  categories: {
    hongkong: [],
    shenzhen: [],
  },
  popularKeywords: [],
  stats: {
    totalCount: 0,
    todayCount: 0,
    exchangeStats: {
      hongkong: 0,
      shenzhen: 0,
    },
  },
  selectedAnnouncement: null,
};

export const useAnnouncementStore = create<AnnouncementState>((set) => ({
  ...initialState,

  setCategories: (categories) => set({ categories }),
  setPopularKeywords: (keywords) => set({ popularKeywords: keywords }),
  setStats: (stats) => set({ stats }),
  setSelectedAnnouncement: (announcement) =>
    set({ selectedAnnouncement: announcement }),
}));
