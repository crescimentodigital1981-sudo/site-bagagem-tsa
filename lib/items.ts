import itemsData from "@/data/items.json";

export type TsaStatus = "YES" | "LIMITED" | "NO";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TravelItem {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  carryOnStatus: TsaStatus;
  checkedStatus: TsaStatus;
  shortAnswer: string;
  tsaRuleDetail: string;
  packingTip: string;
  amazonKeyword: string;
  relatedSlugs: string[];
  faqs: FaqItem[];
}

export const allItems: TravelItem[] = itemsData as TravelItem[];

export function getItemBySlug(slug: string): TravelItem | undefined {
  return allItems.find((item) => item.slug === slug);
}

export function getItemsByCategory(categorySlug: string): TravelItem[] {
  return allItems.filter((item) => item.categorySlug === categorySlug);
}

export function getAllCategories(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const item of allItems) {
    const existing = map.get(item.categorySlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(item.categorySlug, {
        name: item.category,
        slug: item.categorySlug,
        count: 1,
      });
    }
  }
  return Array.from(map.values());
}

export function getRelatedItems(slugs: string[]): TravelItem[] {
  return slugs
    .map((slug) => getItemBySlug(slug))
    .filter((item): item is TravelItem => Boolean(item));
}
