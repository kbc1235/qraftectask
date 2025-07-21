import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAnnouncements,
  getCategories,
  getAllCategories,
  getAnnouncementById,
  getPopularKeywords,
  getAnnouncementStats,
} from "../../api/announcements";
import { useFilterStore } from "../../stores/filterStore";
import { useAnnouncementStore } from "../../stores/announcementStore";
import {
  type AnnouncementRequestParams,
  type ExchangeType,
  type SearchResult,
} from "../../types/announcement";

export const useInfiniteAnnouncements = () => {
  const filters = useFilterStore();

  const params: AnnouncementRequestParams = {
    exchange: filters.exchange,
    category: filters.category,
    keyword: filters.keyword,
    startDate: filters.dateRange.startDate,
    endDate: filters.dateRange.endDate,
    limit: 20,
  };

  return useInfiniteQuery({
    queryKey: ["announcements", params],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const page = pageParam || 1;
      return await getAnnouncements({ ...params, page });
    },
    getNextPageParam: (lastPage: SearchResult, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAnnouncements = (params: AnnouncementRequestParams) => {
  return useInfiniteQuery({
    queryKey: ["announcements", params],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      getAnnouncements({ ...params, page: pageParam }),
    getNextPageParam: (lastPage: SearchResult) =>
      lastPage.hasNextPage
        ? parseInt(lastPage.nextCursor || "1") + 1
        : undefined,
    initialPageParam: 1,
  });
};

export const useCategories = (exchange: ExchangeType) => {
  return useQuery({
    queryKey: ["categories", exchange],
    queryFn: () => getCategories(exchange),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const useAllCategories = () => {
  const { setCategories } = useAnnouncementStore();

  return useQuery({
    queryKey: ["categories", "all"],
    queryFn: async () => {
      const categories = await getAllCategories();
      setCategories(categories);
      return categories;
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const useAnnouncementDetail = (id: string) => {
  const { setSelectedAnnouncement } = useAnnouncementStore();

  return useQuery({
    queryKey: ["announcement", id],
    queryFn: async () => {
      const announcement = await getAnnouncementById(id);
      if (announcement) {
        setSelectedAnnouncement(announcement);
      }
      return announcement;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const usePopularKeywords = () => {
  const { setPopularKeywords } = useAnnouncementStore();

  return useQuery({
    queryKey: ["popularKeywords"],
    queryFn: async () => {
      const keywords = await getPopularKeywords();
      setPopularKeywords(keywords);
      return keywords;
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });
};

export const useAnnouncementStats = () => {
  const { setStats } = useAnnouncementStore();

  return useQuery({
    queryKey: ["announcementStats"],
    queryFn: async () => {
      const stats = await getAnnouncementStats();
      setStats(stats);
      return stats;
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useSearchAnnouncements = () => {
  const queryClient = useQueryClient();
  const { addRecentKeyword, addToSearchHistory } = useFilterStore();

  return useMutation({
    mutationFn: (params: AnnouncementRequestParams) => getAnnouncements(params),
    onSuccess: (data, variables) => {
      if (variables.keyword) {
        addRecentKeyword(variables.keyword);
      }

      addToSearchHistory();
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (error) => {
      console.error("검색 중 오류:", error);
    },
  });
};

export const useAutoSearch = () => {
  const filters = useFilterStore();
  const searchMutation = useSearchAnnouncements();

  const triggerSearch = () => {
    const params: AnnouncementRequestParams = {
      exchange: filters.exchange,
      category: filters.category,
      keyword: filters.keyword,
      startDate: filters.dateRange.startDate,
      endDate: filters.dateRange.endDate,
      page: 1,
      limit: 20,
    };

    searchMutation.mutate(params);
  };

  return {
    triggerSearch,
    isSearching: searchMutation.isPending,
    searchError: searchMutation.error,
  };
};
