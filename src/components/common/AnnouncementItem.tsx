import { type Announcement } from "../../types/announcement";
import {
  formatToKST,
  formatToCST,
  getCategoryName,
  getTopics,
} from "../../utils";
import { useAllCategories } from "../../features/hooks/useAnnouncements";
import { useIsDesktop } from "../../features/hooks/useMediaQuery";

export function AnnouncementItem({
  announcement,
}: {
  announcement: Announcement;
}) {
  const isPc = useIsDesktop();
  return isPc ? (
    <DefaultContent announcement={announcement} />
  ) : (
    <MobileContent announcement={announcement} />
  );
}

const DefaultContent = ({ announcement }: { announcement: Announcement }) => {
  const boxStyle = {
    timeText:
      "flex gap-[10px] text-muted-text text-[11px] font-[600] justify-between ",
  };

  const { data: categories } = useAllCategories();

  const kstDate = formatToKST(announcement.dataDate);
  const cstDate = formatToCST(announcement.dataDate);

  const secCode = announcement.details.secCode[0] || "";
  const secName = announcement.details.secName[0] || "";
  const korName = announcement.korName || "";

  const topics = getTopics(announcement.analysisDetails.topicKor);
  const categoryName = getCategoryName(
    announcement.details.categoryId,
    categories
  );

  return (
    <div className="border border-light-border rounded-[8px] py-[12px] px-[20px]">
      <div className="flex justify-between items-center py-[12px] px-[20px]">
        <div className="flex flex-col gap-[20px]">
          <div className="max-w-[174px] w-full">
            <p className={boxStyle.timeText}>
              <span>공시일</span>
              <span>{kstDate}</span>
            </p>
            <p className={`${boxStyle.timeText} mt-[10px]`}>
              <span>현지시간</span>
              <span>{cstDate}</span>
            </p>
          </div>
          <div>
            <p className="text-muted-text text-[13px] font-[600]">{secCode}</p>
            <p className="text-muted-text text-[13px] font-[400]">
              {korName && secName
                ? `${korName} (${secName})`
                : korName || secName}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px] w-full max-w-[396px]">
          <ul className="label flex gap-[12px]">
            {topics.map((topic, index) => (
              <li
                key={index}
                className="flex py-[7px] px-[16px] rounded-[4px] border border-dark-border bg-white text-dark-border text-[13px] font-[600]"
              >
                {topic}
              </li>
            ))}
          </ul>
          <p className="p-[6px] rounded-[40px] bg-light-blue text-accent-blue text-[12px] font-[600] text-center ">
            {categoryName}
          </p>
        </div>
      </div>
      <div className="mt-[10px] py-[10px] px-[20px]">
        <p className="text-muted-text text-[18px] font-[400] ">
          {announcement.analysisDetails.summarizeTinyKor}
        </p>
        <p className="text-muted-text text-[18px] font-[400]  mt-[10px]">
          {announcement.analysisDetails.summarizeLongKor}
        </p>
      </div>
    </div>
  );
};

const MobileContent = ({ announcement }: { announcement: Announcement }) => {
  const { data: categories } = useAllCategories();
  const categoryName = getCategoryName(
    announcement.details.categoryId,
    categories
  );

  const kstDate = formatToKST(announcement.dataDate);

  return (
    <div className="p-[12px] border-t border-light-border first:border-t-0">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="flex items-center bg-tag-background rounded-full px-[8px] py-[4px] text-white text-[13px] font-[500]">
          {categoryName}
        </span>
        <div className="flex flex-wrap gap-[12px] ml-[24px]">
          {getTopics(announcement.analysisDetails.topicKor).map(
            (topic, index) => (
              <span
                key={index}
                className="text-topic-text text-[12px] font-[700]"
              >
                #{topic}
              </span>
            )
          )}
        </div>
      </div>
      <div className="mt-[8px]">
        <p className="text-muted-text font-[400] text-[14px] leading-[1.9]">
          {announcement.analysisDetails.summarizeTinyKor}
        </p>
        <p className="mt-[6px] text-light-text font-[500] text-[12px] leading-[1.5]">
          {kstDate}
        </p>
      </div>
    </div>
  );
};
