"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EXAMPLES } from "@/lib/examples";
import type { Dict, Lang } from "@/lib/i18n";
import {
  LAYOUTS,
  THEMES,
  applyPalette,
  fixSvgSize,
  getTheme,
  mermaidConfig,
  type Layout,
  type PreviewTheme,
} from "@/lib/themes";
import { copyPng, copyText, downloadBlob, serializeSvg, svgToPngBlob } from "@/lib/export";

const STORAGE_CODE = "mermaid-next:code";
const STORAGE_THEME = "mermaid-next:theme";
const STORAGE_LAYOUT = "mermaid-next:layout";
const DEFAULT_THEME = "klein";

type MermaidAPI = typeof import("mermaid").default;

let mermaidPromise: Promise<MermaidAPI> | null = null;
function loadMermaid() {
  mermaidPromise ??= import("mermaid").then((m) => m.default);
  return mermaidPromise;
}

// mermaid.render 不支持并发，所有渲染排队执行
let queue: Promise<unknown> = Promise.resolve();
let renderSeq = 0;

function renderSvgString(code: string, theme: PreviewTheme, layout: Layout, htmlLabels: boolean) {
  const task = queue.then(async () => {
    const mermaid = await loadMermaid();
    mermaid.initialize({ ...mermaidConfig(theme, layout, htmlLabels), suppressErrorRendering: true });
    const { svg } = await mermaid.render(`mmd-${++renderSeq}`, code);
    return svg;
  });
  queue = task.catch(() => undefined);
  return task;
}

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 隐私模式等情况下忽略
  }
}

/** 渲染一份用于导出的 SVG（纯 SVG 文本标签，不含 foreignObject） */
async function renderForExport(code: string, theme: PreviewTheme, layout: Layout) {
  const svgText = await renderSvgString(code, theme, layout, false);
  const holder = document.createElement("div");
  holder.innerHTML = svgText;
  const svg = holder.querySelector("svg") as SVGSVGElement;
  applyPalette(svg, theme.palette);
  return svg;
}

export default function MermaidEditor({ lang, t }: { lang: Lang; t: Dict["ui"] }) {
  const editorHost = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);

  // 本组件只在客户端渲染（见 ClientEditor），可以直接在初始化时读取 localStorage
  const [code, setCode] = useState(() => readStorage(STORAGE_CODE) ?? EXAMPLES[0].code[lang]);
  const [savedCode, setSavedCode] = useState(code);
  const [exampleId, setExampleId] = useState(
    () => EXAMPLES.find((ex) => Object.values(ex.code).includes(code))?.id ?? "",
  );
  const [themeId, setThemeId] = useState(() => {
    const saved = readStorage(STORAGE_THEME);
    return saved && THEMES.some((th) => th.id === saved) ? saved : DEFAULT_THEME;
  });
  const [layout, setLayout] = useState<Layout>(() => {
    const saved = readStorage(STORAGE_LAYOUT);
    return LAYOUTS.find((l) => l === saved) ?? "dagre";
  });
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [leftPct, setLeftPct] = useState(42);
  const [toast, setToast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const theme = getTheme(themeId);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((cur) => (cur === msg ? null : cur)), 2000);
  }, []);

  const initialCode = useRef(code);

  useEffect(() => {
    const view = new EditorView({
      doc: initialCode.current,
      parent: editorHost.current!,
      extensions: [
        basicSetup,
        EditorView.lineWrapping,
        EditorView.updateListener.of((u) => {
          if (u.docChanged) setCode(u.state.doc.toString());
        }),
        EditorView.theme({
          "&": { height: "100%", fontSize: "14px", backgroundColor: "var(--color-cream)", color: "var(--color-ink)" },
          ".cm-scroller": { fontFamily: "var(--font-mono), ui-monospace, Menlo, monospace", lineHeight: "1.6" },
          ".cm-content": { fontVariantLigatures: "none" },
          ".cm-gutters": { backgroundColor: "var(--color-paper)", color: "var(--color-mute)", border: "none" },
          ".cm-activeLine": { backgroundColor: "rgba(0, 47, 167, 0.05)" },
          ".cm-activeLineGutter": { backgroundColor: "rgba(0, 47, 167, 0.08)", color: "var(--color-ikb)" },
          ".cm-cursor": { borderLeftColor: "var(--color-ikb)" },
          "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
            backgroundColor: "rgba(0, 47, 167, 0.15) !important",
          },
          "&.cm-focused": { outline: "none" },
        }),
      ],
    });
    viewRef.current = view;
    return () => view.destroy();
  }, []);

  // 自动保存
  useEffect(() => {
    const timer = window.setTimeout(() => {
      writeStorage(STORAGE_CODE, code);
      setSavedCode(code);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [code]);

  useEffect(() => writeStorage(STORAGE_THEME, themeId), [themeId]);
  useEffect(() => writeStorage(STORAGE_LAYOUT, layout), [layout]);

  // 实时渲染（防抖）
  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      if (!code.trim()) {
        if (previewRef.current) previewRef.current.innerHTML = "";
        setError(null);
        return;
      }
      try {
        const svgText = await renderSvgString(code, theme, layout, true);
        if (cancelled || !previewRef.current) return;
        previewRef.current.innerHTML = svgText;
        const svg = previewRef.current.querySelector("svg");
        if (svg) {
          fixSvgSize(svg);
          applyPalette(svg, theme.palette);
        }
        setError(null);
      } catch (e) {
        // 保留上一次成功的渲染结果，只显示错误
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    }, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [code, theme, layout]);

  const loadExample = (id: string) => {
    const ex = EXAMPLES.find((e) => e.id === id);
    const view = viewRef.current;
    if (!ex || !view) return;
    setExampleId(id);
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: ex.code[lang] } });
  };

  const withExport = async (fn: () => Promise<void>) => {
    if (!code.trim() || busy) return;
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      notify(t.failed + (e instanceof Error ? e.message : String(e)));
    } finally {
      setBusy(false);
    }
  };

  const exportSvg = () =>
    withExport(async () => {
      const svg = await renderForExport(code, theme, layout);
      const text = serializeSvg(svg, theme.background);
      downloadBlob(new Blob([text], { type: "image/svg+xml" }), "mermaid-diagram.svg");
    });

  const exportPng = () =>
    withExport(async () => {
      const svg = await renderForExport(code, theme, layout);
      downloadBlob(await svgToPngBlob(svg, theme.background, 2), "mermaid-diagram.png");
    });

  const copySvg = () =>
    withExport(async () => {
      const svg = await renderForExport(code, theme, layout);
      await copyText(serializeSvg(svg, theme.background));
      notify(t.copiedSvg);
    });

  const copyImage = () =>
    withExport(async () => {
      await copyPng(renderForExport(code, theme, layout).then((svg) => svgToPngBlob(svg, theme.background, 2)));
      notify(t.copiedPng);
    });

  const copyCode = () =>
    withExport(async () => {
      await copyText(code);
      notify(t.copiedCode);
    });

  // 拖动分隔条调整左右宽度
  const startDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    const rect = splitRef.current!.getBoundingClientRect();
    const move = (ev: PointerEvent) => {
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setLeftPct(Math.min(75, Math.max(20, pct)));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    setZoom((z) => Math.min(4, Math.max(0.2, z * (e.deltaY < 0 ? 1.1 : 0.9))));
  };

  const label = "flex items-center gap-2 font-heading text-xs text-mute lowercase";
  const select =
    "rounded-md border border-sand bg-cream px-2 py-1.5 font-heading text-sm text-ink focus:border-ikb focus:outline-none";
  const btn =
    "rounded-md border border-sand bg-cream px-3 py-1.5 font-heading text-sm text-ink transition-colors hover:border-ikb hover:text-ikb disabled:opacity-50";
  const panelHead =
    "flex h-8 items-center justify-between border-b border-paper bg-cream px-4 font-heading text-xs text-mute lowercase";

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-4 border-b border-paper bg-cream px-4 py-2 md:px-6">
        <label className={label}>
          {t.examples}
          <select className={select} value={exampleId} onChange={(e) => loadExample(e.target.value)}>
            <option value="" disabled>
              {t.examplePlaceholder}
            </option>
            {EXAMPLES.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name[lang]}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          {t.theme}
          <select className={select} value={themeId} onChange={(e) => setThemeId(e.target.value)}>
            {THEMES.map((th) => (
              <option key={th.id} value={th.id}>
                {th.name[lang]}
              </option>
            ))}
          </select>
        </label>
        <label className={label} title={t.layoutHint}>
          {t.layout}
          <select className={select} value={layout} onChange={(e) => setLayout(e.target.value as Layout)}>
            <option value="dagre">{t.layoutDagre}</option>
            <option value="elk">{t.layoutElk}</option>
          </select>
        </label>
        <div className="flex flex-wrap items-center gap-2 md:ml-auto">
          <button className={btn} onClick={copyCode} disabled={busy}>
            {t.copyCode}
          </button>
          <button className={btn} onClick={copySvg} disabled={busy}>
            {t.copySvg}
          </button>
          <button className={btn} onClick={copyImage} disabled={busy}>
            {t.copyPng}
          </button>
          <button className={btn} onClick={exportSvg} disabled={busy}>
            {t.exportSvg}
          </button>
          <button
            className="rounded-md bg-ikb px-4 py-1.5 font-heading text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-50"
            onClick={exportPng}
            disabled={busy}
          >
            {t.exportPng}
          </button>
        </div>
      </div>

      <div ref={splitRef} className="flex min-h-0 flex-1 flex-col md:flex-row">
        <section
          aria-label={t.editorLabel}
          className="flex min-h-[40vh] flex-col md:min-h-0 md:flex-none md:basis-[var(--left)]"
          style={{ "--left": `${leftPct}%` } as React.CSSProperties}
        >
          <div className={panelHead}>
            <span>{t.editor}</span>
            <span>{savedCode === code ? t.saved : t.saving}</span>
          </div>
          <div ref={editorHost} className="min-h-0 flex-1 overflow-hidden bg-cream" />
        </section>

        <div
          role="separator"
          aria-orientation="vertical"
          onPointerDown={startDrag}
          className="hidden w-1 cursor-col-resize bg-paper transition-colors hover:bg-ikb md:block"
        />

        <section aria-label={t.previewLabel} className="relative flex min-h-[50vh] min-w-0 flex-1 flex-col md:min-h-0">
          <div className={panelHead}>
            <span>
              {t.preview}
              <span className="ml-3 hidden text-mute/80 sm:inline">{t.zoomHint}</span>
            </span>
            <span className="flex items-center gap-1">
              <button
                className="px-2 hover:text-ikb"
                aria-label="zoom out"
                onClick={() => setZoom((z) => Math.max(0.2, z / 1.2))}
              >
                −
              </button>
              <button className="w-12 hover:text-ikb" onClick={() => setZoom(1)}>
                {Math.round(zoom * 100)}%
              </button>
              <button
                className="px-2 hover:text-ikb"
                aria-label="zoom in"
                onClick={() => setZoom((z) => Math.min(4, z * 1.2))}
              >
                +
              </button>
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-8" style={{ background: theme.background }} onWheel={onWheel}>
            <div
              ref={previewRef}
              className="mermaid-preview mx-auto w-fit origin-top"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
          {error && (
            <pre className="absolute inset-x-4 bottom-4 max-h-40 overflow-auto rounded-md border-l-4 border-terracotta bg-paper p-4 font-mono text-xs whitespace-pre-wrap text-ink">
              {error}
            </pre>
          )}
          {toast && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 rounded-md bg-ink px-4 py-2 font-heading text-sm text-cream">
              {toast}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
