import { useEffect, useRef, useCallback, useMemo } from "react";
import { useFilterStore } from "../../stores/filterStore";
import { useInfiniteAnnouncements } from "../../features/hooks/useAnnouncements";
import { AnnouncementItem } from "./AnnouncementItem";
import { useIsDesktop } from "../../features/hooks/useMediaQuery";

export function AnnouncementList() {
  const { keyword } = useFilterStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isPc = useIsDesktop();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteAnnouncements();

  const allAnnouncements = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.announcements);
  }, [data]);

  const filteredAnnouncements = useMemo(() => {
    if (!keyword.trim()) return allAnnouncements;

    const searchKeyword = keyword.toLowerCase().trim();

    return allAnnouncements.filter((announcement) => {
      const korName = (announcement.korName || "").toLowerCase();
      const secName = announcement.details.secName.join(" ").toLowerCase();
      const topicKor = announcement.analysisDetails.topicKor.toLowerCase();
      const summarizeTiny =
        announcement.analysisDetails.summarizeTinyKor.toLowerCase();
      const summarizeLong =
        announcement.analysisDetails.summarizeLongKor.toLowerCase();

      return (
        korName.includes(searchKeyword) ||
        secName.includes(searchKeyword) ||
        topicKor.includes(searchKeyword) ||
        summarizeTiny.includes(searchKeyword) ||
        summarizeLong.includes(searchKeyword)
      );
    });
  }, [allAnnouncements, keyword]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current?.parentElement;
    if (!container || !hasNextPage || isFetchingNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (scrollPercentage >= 0.9) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (filteredAnnouncements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="text-lg font-medium mb-2">
          {keyword.trim() ? "검색 결과가 없습니다" : "공시 데이터가 없습니다"}
        </div>
        <div className="text-sm">
          {keyword.trim()
            ? "다른 키워드로 검색해보세요"
            : "필터 조건을 변경해보세요"}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-4">
      <div className={`flex flex-col ${isPc ? "gap-[10px]" : "gap-[0]"}`}>
        {filteredAnnouncements.map((announcement, index) => (
          <AnnouncementItem
            key={`${announcement.id}-${index}`}
            announcement={announcement}
          />
        ))}
      </div>
    </div>
  );
}
