import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { NAV_HREFS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${SITE.url}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [code, `${SITE.url}/${code}`]),
        ),
      },
    });

    for (const item of NAV_HREFS) {
      entries.push({
        url: `${SITE.url}/${locale}${item.href}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority:
          item.href === "/investments" || item.href === "/about" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((code) => [
              code,
              `${SITE.url}/${code}${item.href}`,
            ]),
          ),
        },
      });
    }
  }

  return entries;
}
