import type { MetadataRoute } from "next";
import { LANGS, langPath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const languages = {
  "zh-CN": `${SITE_URL}${langPath("zh")}`,
  en: `${SITE_URL}${langPath("en")}`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.map((lang) => ({
    url: `${SITE_URL}${langPath(lang)}`,
    changeFrequency: "weekly",
    priority: lang === "zh" ? 1 : 0.9,
    alternates: { languages },
  }));
}
