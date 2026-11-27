import type { MetadataRoute } from "next";
import items from "../data/items.json";
import { SITE_URL } from "../lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/contact`, lastModified: new Date() },
  ];

  const itemPages: MetadataRoute.Sitemap = (items as { slug: string }[]).map(
    (item) => ({
      url: `${SITE_URL}/can-i-bring/${item.slug}`,
      lastModified: new Date(),
    })
  );

  return [...staticPages, ...itemPages];
}
