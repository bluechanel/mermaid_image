import type { Lang } from "./i18n";

// 预览主题：底层 Mermaid 主题 + 主题变量 + 可选的“多色节点”调色板。
// palette 不为空时，渲染后会按顺序给每个节点（框）填充不同颜色。

export type PaletteColor = { fill: string; stroke: string; text: string };

export type PreviewTheme = {
  id: string;
  name: Record<Lang, string>;
  mermaidTheme: "default" | "dark" | "forest" | "neutral" | "base";
  themeVariables?: Record<string, string>;
  palette?: PaletteColor[];
  background: string;
};

const FONT =
  '"Trebuchet MS", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif';

export const THEMES: PreviewTheme[] = [
  {
    id: "klein",
    name: { zh: "Klein", en: "Klein" },
    mermaidTheme: "base",
    background: "#f5f1e8",
    themeVariables: {
      background: "#f5f1e8",
      primaryColor: "#e8e2d5",
      primaryTextColor: "#1a1a1a",
      primaryBorderColor: "#002FA7",
      secondaryColor: "#e8e2d5",
      tertiaryColor: "#e8e2d5",
      lineColor: "#1a1a1a",
      textColor: "#1a1a1a",
      edgeLabelBackground: "#f5f1e8",
      clusterBkg: "#e8e2d5",
      clusterBorder: "#d4b896",
      noteBkgColor: "#d4b896",
      noteTextColor: "#1a1a1a",
      noteBorderColor: "#8a8578",
      actorLineColor: "#8a8578",
      signalColor: "#1a1a1a",
      signalTextColor: "#1a1a1a",
      pie1: "#002FA7",
      pie2: "#c5603a",
      pie3: "#8a8578",
      pie4: "#1a1a1a",
      pie5: "#d4b896",
      pieOpacity: "1",
      pieStrokeColor: "#f5f1e8",
      pieTitleTextColor: "#1a1a1a",
      pieSectionTextColor: "#f5f1e8",
      cScale0: "#002FA7",
      cScale1: "#c5603a",
      cScale2: "#d4b896",
      cScale3: "#8a8578",
      cScaleLabel0: "#f5f1e8",
      cScaleLabel1: "#f5f1e8",
      cScaleLabel2: "#1a1a1a",
      cScaleLabel3: "#f5f1e8",
      taskBkgColor: "#002FA7",
      taskTextColor: "#f5f1e8",
      activeTaskBkgColor: "#c5603a",
      sectionBkgColor: "#e8e2d5",
      altSectionBkgColor: "#f5f1e8",
      gridColor: "#e8e2d5",
    },
    palette: [
      { fill: "#002FA7", stroke: "#002FA7", text: "#f5f1e8" },
      { fill: "#e8e2d5", stroke: "#002FA7", text: "#1a1a1a" },
      { fill: "#c5603a", stroke: "#c5603a", text: "#f5f1e8" },
      { fill: "#d4b896", stroke: "#8a8578", text: "#1a1a1a" },
    ],
  },
  { id: "default", name: { zh: "默认", en: "Default" }, mermaidTheme: "default", background: "#ffffff" },
  { id: "neutral", name: { zh: "中性灰", en: "Neutral" }, mermaidTheme: "neutral", background: "#ffffff" },
  { id: "forest", name: { zh: "森林", en: "Forest" }, mermaidTheme: "forest", background: "#ffffff" },
  { id: "dark", name: { zh: "暗黑", en: "Dark" }, mermaidTheme: "dark", background: "#1e1e2e" },
  {
    id: "rainbow",
    name: { zh: "彩虹多色", en: "Rainbow" },
    mermaidTheme: "base",
    background: "#ffffff",
    themeVariables: { lineColor: "#64748b", primaryTextColor: "#1f2937" },
    palette: [
      { fill: "#fde2e4", stroke: "#e11d48", text: "#881337" },
      { fill: "#ffedd5", stroke: "#ea580c", text: "#7c2d12" },
      { fill: "#fef9c3", stroke: "#ca8a04", text: "#713f12" },
      { fill: "#dcfce7", stroke: "#16a34a", text: "#14532d" },
      { fill: "#dbeafe", stroke: "#2563eb", text: "#1e3a8a" },
      { fill: "#ede9fe", stroke: "#7c3aed", text: "#4c1d95" },
    ],
  },
  {
    id: "pastel",
    name: { zh: "马卡龙", en: "Pastel" },
    mermaidTheme: "base",
    background: "#fffdf8",
    themeVariables: { lineColor: "#a8a29e", primaryTextColor: "#44403c" },
    palette: [
      { fill: "#ffd6e0", stroke: "#f4a3b8", text: "#5b3440" },
      { fill: "#c9f2e3", stroke: "#86d4b7", text: "#2f4f45" },
      { fill: "#d8e2ff", stroke: "#a3b6f0", text: "#33405e" },
      { fill: "#fff1c1", stroke: "#e9cf7a", text: "#5c4a1a" },
      { fill: "#e9d8ff", stroke: "#bfa0ef", text: "#46325e" },
    ],
  },
  {
    id: "ocean",
    name: { zh: "海洋", en: "Ocean" },
    mermaidTheme: "base",
    background: "#f8fbff",
    themeVariables: {
      primaryColor: "#e0f2fe",
      primaryBorderColor: "#0284c7",
      primaryTextColor: "#0c4a6e",
      lineColor: "#0369a1",
      secondaryColor: "#ccfbf1",
      tertiaryColor: "#f0f9ff",
    },
    palette: [
      { fill: "#e0f2fe", stroke: "#0284c7", text: "#0c4a6e" },
      { fill: "#ccfbf1", stroke: "#0d9488", text: "#134e4a" },
      { fill: "#e0e7ff", stroke: "#4f46e5", text: "#312e81" },
      { fill: "#cffafe", stroke: "#0891b2", text: "#164e63" },
    ],
  },
  {
    id: "sunset",
    name: { zh: "日落", en: "Sunset" },
    mermaidTheme: "base",
    background: "#fffaf5",
    themeVariables: { lineColor: "#9a3412", primaryTextColor: "#431407" },
    palette: [
      { fill: "#fed7aa", stroke: "#ea580c", text: "#431407" },
      { fill: "#fecdd3", stroke: "#e11d48", text: "#4c0519" },
      { fill: "#fde68a", stroke: "#d97706", text: "#451a03" },
      { fill: "#f5d0fe", stroke: "#c026d3", text: "#4a044e" },
    ],
  },
  {
    id: "neon",
    name: { zh: "霓虹暗色", en: "Neon" },
    mermaidTheme: "base",
    background: "#0f172a",
    themeVariables: {
      darkMode: "true",
      background: "#0f172a",
      lineColor: "#94a3b8",
      primaryTextColor: "#f8fafc",
      textColor: "#e2e8f0",
      mainBkg: "#1e293b",
      clusterBkg: "#1e293b",
      clusterBorder: "#475569",
      edgeLabelBackground: "#1e293b",
      actorLineColor: "#94a3b8",
      signalColor: "#e2e8f0",
      signalTextColor: "#e2e8f0",
      noteBkgColor: "#334155",
      noteTextColor: "#f8fafc",
      labelTextColor: "#f8fafc",
    },
    palette: [
      { fill: "#312e81", stroke: "#818cf8", text: "#eef2ff" },
      { fill: "#134e4a", stroke: "#2dd4bf", text: "#f0fdfa" },
      { fill: "#701a75", stroke: "#e879f9", text: "#fdf4ff" },
      { fill: "#7c2d12", stroke: "#fb923c", text: "#fff7ed" },
      { fill: "#14532d", stroke: "#4ade80", text: "#f0fdf4" },
    ],
  },
];

export function getTheme(id: string): PreviewTheme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

/** 排版引擎：dagre 是 Mermaid 默认；ELK 处理嵌套子图、跨子图连线更紧凑。代码里写了 layout 时以代码为准 */
export const LAYOUTS = ["dagre", "elk"] as const;
export type Layout = (typeof LAYOUTS)[number];

export function mermaidConfig(theme: PreviewTheme, layout: Layout, htmlLabels = true) {
  return {
    startOnLoad: false,
    layout,
    securityLevel: "strict" as const,
    theme: theme.mermaidTheme,
    themeVariables: { fontFamily: FONT, ...theme.themeVariables },
    fontFamily: FONT,
    htmlLabels,
  };
}

// 节点形状：flowchart/class/state/er 等新版渲染器把节点放在 g.node 里，时序图用 rect.actor。
const SHAPE_SELECTOR = [
  "g.node > rect",
  "g.node > polygon",
  "g.node > circle",
  "g.node > ellipse",
  "g.node > path",
  "g.node > g > rect",
  "g.node > g > path",
  "g.node > .label-container",
  "rect.actor",
].join(",");

/**
 * 按调色板循环给节点上色。用户在代码里用 style / classDef 指定过颜色的节点保持不变。
 */
export function applyPalette(svg: SVGSVGElement, palette?: PaletteColor[]) {
  if (!palette?.length) return;
  // 同一个节点的多个形状归为一组；时序图里同名参与者（上下两个框）也归为一组
  const groups = new Map<Element | string, Element[]>();
  svg.querySelectorAll(SHAPE_SELECTOR).forEach((shape) => {
    const actorName = shape.matches("rect.actor") ? shape.getAttribute("name") : null;
    const key = actorName ? `actor:${actorName}` : (shape.closest("g.node") ?? shape);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(shape);
  });

  let i = 0;
  groups.forEach((shapes) => {
    const custom = shapes.some((s) => /fill\s*:/.test(s.getAttribute("style") ?? ""));
    if (custom) return;
    const c = palette[i++ % palette.length];
    shapes.forEach((s) => {
      if (s.getAttribute("fill") !== "none") {
        (s as SVGElement).style.setProperty("fill", c.fill, "important");
        (s as SVGElement).style.setProperty("stroke", c.stroke, "important");
      }
      const scope = s.closest("g.node") ?? s.parentElement;
      scope?.querySelectorAll("text, tspan").forEach((t) => {
        (t as SVGElement).style.setProperty("fill", c.text, "important");
      });
      scope?.querySelectorAll("foreignObject *").forEach((el) => {
        (el as HTMLElement).style.setProperty("color", c.text, "important");
      });
    });
  });
}

/** Mermaid 默认输出 width="100%"，预览时改成按 viewBox 的真实尺寸显示，缩放由外层控制 */
export function fixSvgSize(svg: SVGSVGElement) {
  const vb = svg.viewBox?.baseVal;
  if (!vb?.width || !vb?.height) return;
  svg.setAttribute("width", String(Math.ceil(vb.width)));
  svg.setAttribute("height", String(Math.ceil(vb.height)));
  svg.style.removeProperty("max-width");
}
