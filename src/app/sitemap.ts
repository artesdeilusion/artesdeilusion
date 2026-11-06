import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { SITE } from "@/lib/site";

const ROUTES = ["", "/about", "/investments", "/investors"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of ROUTES) {
      entries.push({
        url: `${SITE.url}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority:
          route === ""
            ? 1
            : route === "/investments" || route === "/about"
              ? 0.9
              : 0.7,
      });
    }
  }

  return entries;
}
