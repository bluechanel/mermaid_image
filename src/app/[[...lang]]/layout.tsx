import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Lora, Poppins } from "next/font/google";
import { DICTS, langPath, resolveLang, type Lang } from "@/lib/i18n";
import { AUTHOR, SITE_URL } from "@/lib/site";
import "../globals.css";

const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "500", "600"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"], style: ["normal", "italic"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

// 只生成 / 和 /en，其余路径一律 404
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: [] }, { lang: ["en"] }];
}

export async function generateMetadata({ params }: LayoutProps<"/[[...lang]]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const d = DICTS[lang];
  const other: Lang = lang === "zh" ? "en" : "zh";
  // 分享图：public/og.png（中文）、public/og-en.png（英文），1200x630
  const ogImage = { url: lang === "zh" ? "/og.png" : "/og-en.png", width: 1200, height: 630, alt: d.siteName };
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.title, template: `%s | ${d.siteName}` },
    description: d.description,
    keywords: d.keywords,
    applicationName: d.siteName,
    authors: [AUTHOR],
    creator: AUTHOR.name,
    publisher: AUTHOR.name,
    formatDetection: { telephone: false, email: false, address: false },
    alternates: {
      canonical: langPath(lang),
      languages: { "zh-CN": langPath("zh"), en: langPath("en"), "x-default": langPath("zh") },
    },
    openGraph: {
      type: "website",
      url: langPath(lang),
      siteName: d.siteName,
      title: d.title,
      description: d.description,
      locale: d.ogLocale,
      alternateLocale: DICTS[other].ogLocale,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: d.title, description: d.description, images: [ogImage] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    // Google Search Console 验证码：申请后填入环境变量 GOOGLE_SITE_VERIFICATION
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    category: "technology",
  };
}

export const viewport: Viewport = {
  themeColor: "#002FA7",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[[...lang]]">) {
  const lang = await resolveLang(params);
  return (
    <html
      lang={DICTS[lang].htmlLang}
      className={`${poppins.variable} ${lora.variable} ${mono.variable} antialiased`}
    >
      <body className="bg-cream text-ink">{children}</body>
    </html>
  );
}
