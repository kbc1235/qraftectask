export type ExchangeType = "hongkong" | "shenzhen";

export interface Category {
  value: string;
  kor: string;
  org: string;
}

export interface AnnouncementDetails {
  secName: string[];
  secCode: string[];
  categoryId: string | string[];
  fileLink?: string;
}

export interface AnalysisDetails {
  topicKor: string;
  summarizeTinyKor: string;
  summarizeLongKor: string;
}

export interface Announcement {
  id: string;
  dataDate: string;
  korName: string | null;
  details: AnnouncementDetails;
  analysisDetails: AnalysisDetails;
}

export interface AnnouncementResponse {
  data: {
    getDisclosure: Announcement[];
  };
}

export interface AnnouncementRequestParams {
  exchange?: ExchangeType | "all";
  category?: string;
  keyword?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  announcements: Announcement[];
  totalCount: number;
  hasNextPage: boolean;
  nextCursor?: string;
}

export interface FilterOptions {
  exchange: ExchangeType | "all";
  category: string;
  keyword: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}
