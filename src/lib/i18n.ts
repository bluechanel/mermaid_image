import { notFound } from "next/navigation";

export const LANGS = ["zh", "en"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v);
}

/** 路由 [[...lang]] 的参数：[] → zh，["en"] → en，其他 → 404 */
export async function resolveLang(params: Promise<{ lang?: string[] }>): Promise<Lang> {
  const { lang } = await params;
  if (!lang?.length) return "zh";
  if (lang.length === 1 && lang[0] !== "zh" && isLang(lang[0])) return lang[0];
  notFound();
}

/** 中文是默认语言，挂在根路径 /；英文在 /en */
export function langPath(lang: Lang) {
  return lang === "zh" ? "/" : "/en";
}

const zh = {
  htmlLang: "zh-CN",
  ogLocale: "zh_CN",
  siteName: "Mermaid 在线编辑器",
  title: "Mermaid 在线编辑器 | 免费 Mermaid 图表实时渲染，导出 PNG / SVG",
  description:
    "免费的 Mermaid 在线编辑器与预览工具：粘贴 Mermaid 代码即可实时渲染流程图、时序图、类图、状态图、ER 图、甘特图、饼图、思维导图。支持多种配色主题和 ELK 布局，一键把 Mermaid 导出为高清 PNG、SVG 或复制到剪贴板。无需注册，代码只保存在本地浏览器。",
  keywords: [
    "Mermaid",
    "Mermaid 在线编辑器",
    "Mermaid 在线预览",
    "Mermaid 在线渲染",
    "Mermaid 图表",
    "Mermaid 流程图",
    "Mermaid 时序图",
    "Mermaid 甘特图",
    "Mermaid 转 PNG",
    "Mermaid 转 SVG",
    "Mermaid 导出图片",
    "Mermaid 语法",
    "Mermaid.js",
    "Markdown 图表",
    "流程图在线制作",
    "时序图在线",
    "UML 在线画图",
    "ER 图",
    "思维导图",
    "Mermaid live editor",
  ],
  tagline: "粘贴代码，实时渲染，一键导出 PNG / SVG",
  switchLang: "EN",
  switchLangLabel: "Switch to English",
  ui: {
    examples: "示例",
    examplePlaceholder: "选择模板…",
    theme: "主题",
    layout: "布局",
    layoutDagre: "标准",
    layoutElk: "ELK",
    layoutHint: "ELK 更适合复杂子图：子图框更紧凑、走线更整齐。代码里写了 layout 时以代码为准。",
    copyCode: "复制代码",
    copySvg: "复制 SVG",
    copyPng: "复制 PNG",
    exportSvg: "导出 SVG",
    exportPng: "导出 PNG",
    editor: "01 · 代码",
    preview: "02 · 预览",
    zoomHint: "Ctrl/⌘ + 滚轮缩放",
    saved: "已自动保存",
    saving: "保存中…",
    loading: "编辑器加载中…",
    copiedCode: "Mermaid 代码已复制",
    copiedSvg: "SVG 代码已复制",
    copiedPng: "PNG 图片已复制",
    failed: "操作失败：",
    editorLabel: "Mermaid 代码编辑器",
    previewLabel: "渲染预览",
  },
  article: {
    eyebrow: "关于",
    h2: "免费的 Mermaid 在线编辑与渲染工具",
    intro:
      "把 Mermaid 文本代码实时渲染成图表。无需安装任何软件，打开网页、粘贴代码即可看到效果，支持流程图（flowchart）、时序图（sequence diagram）、类图（class diagram）、状态图、ER 图、甘特图、饼图、思维导图等全部 Mermaid 图表类型。",
    howToTitle: "如何使用 Mermaid 在线编辑器",
    howTo: [
      { title: "粘贴或编写 Mermaid 代码", body: "在左侧编辑器粘贴代码，或从“示例”里选一个流程图、时序图等模板开始改。" },
      { title: "选择主题与布局", body: "在“主题”中挑选配色，复杂子图可把“布局”切换为 ELK，右侧实时显示效果。" },
      { title: "导出或复制图表", body: "点击“导出 PNG / SVG”下载图片，或复制 PNG、SVG 到剪贴板，直接粘贴进文档、PPT 或聊天工具。" },
    ],
    diagramsTitle: "支持的 Mermaid 图表类型",
    diagrams: [
      { name: "流程图 Flowchart", body: "用 flowchart / graph 描述流程、判断分支和系统架构，支持子图与多种节点形状。" },
      { name: "时序图 Sequence Diagram", body: "展示参与者之间的消息交互顺序，适合描述接口调用、登录流程等。" },
      { name: "类图 Class Diagram", body: "描述类、属性、方法和继承关系，用于面向对象设计和 UML 建模。" },
      { name: "状态图 State Diagram", body: "表示对象的状态与状态之间的转换，例如订单状态流转。" },
      { name: "ER 图 Entity Relationship", body: "描述数据库表和实体之间的一对多、多对多关系。" },
      { name: "甘特图 Gantt", body: "按时间轴排布任务和里程碑，用于项目计划与排期。" },
      { name: "饼图 Pie Chart", body: "用简单的键值对展示占比数据。" },
      { name: "思维导图 Mindmap", body: "用缩进层级组织想法和知识结构。" },
    ],
    featuresTitle: "主要功能",
    features: [
      { title: "实时预览", body: "左侧编辑、右侧渲染，语法错误即时提示。" },
      { title: "多种主题", body: "多色主题会为每个节点自动使用不同背景色。" },
      { title: "导出与复制", body: "导出高清 PNG、矢量 SVG，或复制到剪贴板。" },
      { title: "自动保存", body: "代码保存在浏览器本地，刷新不丢失。" },
    ],
    faqTitle: "常见问题",
    faq: [
      {
        q: "什么是 Mermaid？",
        a: "Mermaid 是一种用文本描述图表的语言，可以用简单的代码生成流程图、时序图、类图、状态图、甘特图、ER 图、饼图和思维导图等，适合写进 Markdown 文档并进行版本管理。",
      },
      {
        q: "如何把 Mermaid 导出为 PNG 或 SVG 图片？",
        a: "在左侧编辑器粘贴 Mermaid 代码，右侧会实时渲染。点击顶部的“导出 PNG”或“导出 SVG”即可下载图片，PNG 默认按 2 倍分辨率导出，清晰度更高。",
      },
      {
        q: "可以修改图表的颜色和主题吗？",
        a: "可以。工具内置 Klein、默认、中性灰、森林、暗黑、彩虹、马卡龙、海洋、日落、霓虹等主题，多色主题会自动为每个节点使用不同的背景色。代码中用 style 或 classDef 指定的颜色会被保留。",
      },
      {
        q: "子图里出现大片空白怎么办？",
        a: "这是 Mermaid 默认排版引擎 dagre 的已知问题，常见于子图里的节点和外部节点有多条往返连线时。把顶部的“布局”切换为 ELK 即可，也可以在代码开头写 config: layout: elk。",
      },
      {
        q: "我的代码会上传到服务器吗？",
        a: "不会。渲染完全在浏览器本地完成，代码只自动保存在你自己浏览器的本地存储中。",
      },
    ],
    footer: "基于开源项目 Mermaid 构建",
  },
};

export type Dict = typeof zh;

const en: Dict = {
  htmlLang: "en",
  ogLocale: "en_US",
  siteName: "Mermaid Online Editor",
  title: "Mermaid Online Editor | Free Mermaid Live Preview, Export to PNG & SVG",
  description:
    "Free online Mermaid editor and viewer. Paste Mermaid code to render flowcharts, sequence, class, state and ER diagrams, Gantt charts, pie charts and mind maps live. Choose color themes or the ELK layout, then export Mermaid to PNG or SVG. No sign-up; your code stays in your browser.",
  keywords: [
    "Mermaid",
    "Mermaid online editor",
    "Mermaid live editor",
    "Mermaid viewer",
    "Mermaid preview",
    "Mermaid diagram",
    "Mermaid chart",
    "Mermaid flowchart",
    "Mermaid sequence diagram",
    "Mermaid Gantt chart",
    "Mermaid to PNG",
    "Mermaid to SVG",
    "export Mermaid diagram",
    "Mermaid syntax",
    "Mermaid.js",
    "Markdown diagram",
    "flowchart maker",
    "UML diagram online",
    "ER diagram",
    "mind map",
  ],
  tagline: "Paste code, see it live, export PNG / SVG",
  switchLang: "中文",
  switchLangLabel: "切换到中文",
  ui: {
    examples: "Examples",
    examplePlaceholder: "Pick a template…",
    theme: "Theme",
    layout: "Layout",
    layoutDagre: "Standard",
    layoutElk: "ELK",
    layoutHint: "ELK handles complex subgraphs better: tighter boxes and cleaner edges. A layout set in your code takes priority.",
    copyCode: "Copy code",
    copySvg: "Copy SVG",
    copyPng: "Copy PNG",
    exportSvg: "Export SVG",
    exportPng: "Export PNG",
    editor: "01 · code",
    preview: "02 · preview",
    zoomHint: "Ctrl/⌘ + scroll to zoom",
    saved: "Saved",
    saving: "Saving…",
    loading: "Loading editor…",
    copiedCode: "Mermaid code copied",
    copiedSvg: "SVG copied",
    copiedPng: "PNG image copied",
    failed: "Failed: ",
    editorLabel: "Mermaid code editor",
    previewLabel: "Rendered preview",
  },
  article: {
    eyebrow: "about",
    h2: "A free online Mermaid editor and renderer",
    intro:
      "Turn Mermaid text into diagrams as you type. Nothing to install: open the page, paste your code and see the result. Every Mermaid diagram type works, including flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, pie charts and mind maps.",
    howToTitle: "How to use the Mermaid online editor",
    howTo: [
      { title: "Paste or write Mermaid code", body: "Paste code into the editor on the left, or start from a flowchart, sequence diagram or other template under Examples." },
      { title: "Pick a theme and layout", body: "Choose a color theme. For complex subgraphs, switch Layout to ELK. The preview updates as you go." },
      { title: "Export or copy the diagram", body: "Click Export PNG or Export SVG to download, or copy the PNG or SVG straight into docs, slides or chat." },
    ],
    diagramsTitle: "Supported Mermaid diagram types",
    diagrams: [
      { name: "Flowchart", body: "Describe processes, decisions and system architecture with flowchart / graph, including subgraphs and many node shapes." },
      { name: "Sequence diagram", body: "Show the order of messages between participants, such as API calls or a login flow." },
      { name: "Class diagram", body: "Model classes, fields, methods and inheritance for object-oriented design and UML." },
      { name: "State diagram", body: "Show states and the transitions between them, such as an order lifecycle." },
      { name: "ER diagram", body: "Map database entities and their one-to-many and many-to-many relationships." },
      { name: "Gantt chart", body: "Lay out tasks and milestones on a timeline for project planning." },
      { name: "Pie chart", body: "Show proportions from simple label and value pairs." },
      { name: "Mindmap", body: "Organize ideas and knowledge in an indented hierarchy." },
    ],
    featuresTitle: "Features",
    features: [
      { title: "Live preview", body: "Edit on the left, see it render on the right, with instant syntax errors." },
      { title: "Color themes", body: "Multi-color themes give every node its own background." },
      { title: "Export & copy", body: "Download a sharp PNG or a vector SVG, or copy to the clipboard." },
      { title: "Autosave", body: "Your code stays in your browser and survives a reload." },
    ],
    faqTitle: "FAQ",
    faq: [
      {
        q: "What is Mermaid?",
        a: "Mermaid is a text-based diagram language. A few lines of code produce flowcharts, sequence diagrams, class and state diagrams, Gantt charts, ER diagrams, pie charts and mind maps, which makes diagrams easy to keep in Markdown and version control.",
      },
      {
        q: "How do I export a Mermaid diagram to PNG or SVG?",
        a: "Paste your Mermaid code into the editor and the preview updates live. Click Export PNG or Export SVG to download. PNG exports at 2x resolution for crisp results.",
      },
      {
        q: "Can I change the colors and theme?",
        a: "Yes. Pick from Klein, Default, Neutral, Forest, Dark, Rainbow, Pastel, Ocean, Sunset and Neon. Multi-color themes give each node a different background, and colors you set with style or classDef are kept.",
      },
      {
        q: "Why is there a big empty area inside a subgraph?",
        a: "That comes from dagre, Mermaid's default layout engine, usually when nodes in a subgraph have several edges to and from nodes outside it. Switch Layout to ELK at the top, or add config: layout: elk to the start of your code.",
      },
      {
        q: "Is my code uploaded to a server?",
        a: "No. Rendering happens entirely in your browser, and your code is only saved to your own browser's local storage.",
      },
    ],
    footer: "Built on the open-source Mermaid project",
  },
};

export const DICTS: Record<Lang, Dict> = { zh, en };
