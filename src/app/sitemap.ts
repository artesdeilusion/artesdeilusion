import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...NAV.map((item) => ({
      url: `${SITE.url}${item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: item.href === "/investments" || item.href === "/about" ? 0.9 : 0.7,
    })),
  ];
}
