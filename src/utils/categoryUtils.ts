import { type Category, type ExchangeType } from "../types/announcement";

export const getCategoryName = (
  categoryId: string | string[],
  categories?: Record<ExchangeType, Category[]>
): string => {
  if (!categories)
    return Array.isArray(categoryId) ? categoryId[0] || "" : categoryId;

  const targetCategoryId = Array.isArray(categoryId)
    ? categoryId[0]
    : categoryId;
  if (!targetCategoryId) return "";

  for (const exchangeCategories of Object.values(categories)) {
    const category = exchangeCategories.find(
      (cat) => cat.value === targetCategoryId
    );
    if (category) return category.kor;
  }
  return targetCategoryId;
};

export const getTopics = (topicKor: string, maxCount: number = 3): string[] => {
  return topicKor
    .split(",")
    .map((topic) => topic.trim())
    .slice(0, maxCount);
};
