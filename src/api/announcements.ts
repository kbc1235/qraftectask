import {
  type Category,
  type Announcement,
  type AnnouncementRequestParams,
  type SearchResult,
  type ExchangeType,
} from "../types/announcement";

import hongkongCategories from "../data/hongkong_categories.json";
import hongkongAnnouncements from "../data/hongkong_announcements.json";
import shenzhenCategories from "../data/shenzhen_categories.json";
import shenzhenAnnouncements from "../data/shenzhen_announcements.json";

const HK_DATA = hongkongAnnouncements as {
  data: { getDisclosure: Announcement[] };
};
const SZ_DATA = shenzhenAnnouncements as {
  data: { getDisclosure: Announcement[] };
};

export const getCategories = async (
  exchange: ExchangeType
): Promise<Category[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  switch (exchange) {
    case "hongkong":
      return hongkongCategories as Category[];
    case "shenzhen":
      return shenzhenCategories as Category[];
    default:
      return [];
  }
};

export const getAllCategories = async (): Promise<
  Record<ExchangeType, Category[]>
> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    hongkong: hongkongCategories as Category[],
    shenzhen: shenzhenCategories as Category[],
  };
};

export const getAnnouncements = async (
  params: AnnouncementRequestParams = {}
): Promise<SearchResult> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const {
    exchange = "all",
    category = "",
    keyword = "",
    startDate = "",
    endDate = "",
    page = 1,
    limit = 20,
  } = params;

  let allAnnouncements: Announcement[] = [];

  if (exchange === "all") {
    allAnnouncements = [
      ...HK_DATA.data.getDisclosure,
      ...SZ_DATA.data.getDisclosure,
    ];
  } else if (exchange === "hongkong") {
    allAnnouncements = HK_DATA.data.getDisclosure;
  } else if (exchange === "shenzhen") {
    allAnnouncements = SZ_DATA.data.getDisclosure;
  }

  const filteredAnnouncements = allAnnouncements.filter((announcement) => {
    if (category && announcement.details.categoryId !== category) {
      return false;
    }

    if (keyword) {
      const searchTargets = [
        announcement.korName,
        announcement.analysisDetails.topicKor,
        announcement.analysisDetails.summarizeTinyKor,
        announcement.analysisDetails.summarizeLongKor,
        ...announcement.details.secName,
        ...announcement.details.secCode,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchTargets.includes(keyword.toLowerCase())) {
        return false;
      }
    }

    if (startDate || endDate) {
      const announcementDate = new Date(announcement.dataDate);

      if (startDate && announcementDate < new Date(startDate)) {
        return false;
      }

      if (endDate && announcementDate > new Date(endDate + "T23:59:59Z")) {
        return false;
      }
    }

    return true;
  });

  filteredAnnouncements.sort(
    (a, b) => new Date(b.dataDate).getTime() - new Date(a.dataDate).getTime()
  );

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAnnouncements = filteredAnnouncements.slice(
    startIndex,
    endIndex
  );
  const hasNextPage = endIndex < filteredAnnouncements.length;

  return {
    announcements: paginatedAnnouncements,
    totalCount: filteredAnnouncements.length,
    hasNextPage,
    nextCursor: hasNextPage ? String(page + 1) : undefined,
  };
};

export const getAnnouncementById = async (
  id: string
): Promise<Announcement | null> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const allAnnouncements = [
    ...HK_DATA.data.getDisclosure,
    ...SZ_DATA.data.getDisclosure,
  ];

  return (
    allAnnouncements.find((announcement) => announcement.id === id) || null
  );
};

export const getPopularKeywords = async (): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    "배당금",
    "주주총회",
    "재무제표",
    "증자",
    "합병",
    "ESG",
    "지배구조",
    "공시",
  ];
};

export const getAnnouncementStats = async (): Promise<{
  totalCount: number;
  todayCount: number;
  exchangeStats: Record<ExchangeType, number>;
}> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const today = new Date().toISOString().split("T")[0];
  const allAnnouncements = [
    ...HK_DATA.data.getDisclosure,
    ...SZ_DATA.data.getDisclosure,
  ];
  const todayAnnouncements = allAnnouncements.filter((announcement) =>
    announcement.dataDate.startsWith(today)
  );

  return {
    totalCount: allAnnouncements.length,
    todayCount: todayAnnouncements.length,
    exchangeStats: {
      hongkong: HK_DATA.data.getDisclosure.length,
      shenzhen: SZ_DATA.data.getDisclosure.length,
    },
  };
};
