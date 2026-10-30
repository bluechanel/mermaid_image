// SVG / PNG 导出与复制。PNG 使用不含 foreignObject 的 SVG 绘制，避免 canvas 被“污染”而无法导出。

export function serializeSvg(svg: SVGSVGElement, background?: string): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  const { width, height } = svgSize(svg);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  clone.setAttribute("width", String(width));
  clone.setAttribute("height", String(height));
  clone.style.removeProperty("max-width");
  if (background) clone.style.backgroundColor = background;
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(clone);
}

export function svgSize(svg: SVGSVGElement) {
  const vb = svg.viewBox?.baseVal;
  if (vb && vb.width && vb.height) return { width: Math.ceil(vb.width), height: Math.ceil(vb.height) };
  const box = svg.getBoundingClientRect();
  return { width: Math.ceil(box.width) || 800, height: Math.ceil(box.height) || 600 };
}

export async function svgToPngBlob(
  svg: SVGSVGElement,
  background: string,
  scale = 2,
): Promise<Blob> {
  const { width, height } = svgSize(svg);
  const source = serializeSvg(svg);
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

  const img = new Image();
  img.decoding = "async";
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("SVG 图片加载失败"));
    img.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext("2d")!;
  if (background !== "transparent") {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG 生成失败"))), "image/png"),
  );
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}

// Safari 要求在用户手势内同步调用 clipboard.write，所以这里传入 Promise<Blob>。
export async function copyPng(blob: Promise<Blob>) {
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}
