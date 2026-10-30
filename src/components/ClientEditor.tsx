"use client";

import dynamic from "next/dynamic";
import type { Dict, Lang } from "@/lib/i18n";

// 编辑器依赖 localStorage 和 DOM，只在浏览器端渲染
const MermaidEditor = dynamic(() => import("./MermaidEditor"), {
  ssr: false,
  loading: () => <div className="h-full bg-cream" />,
});

export default function ClientEditor({ lang, t }: { lang: Lang; t: Dict["ui"] }) {
  return <MermaidEditor lang={lang} t={t} />;
}
