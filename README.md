# Mermaid 在线编辑器

基于 Next.js 16 + Mermaid 12 的在线渲染工具，通过 [OpenNext](https://opennext.js.org/cloudflare) 部署到 Cloudflare Workers。

- 左侧编辑（CodeMirror），右侧实时渲染（300ms 防抖，出错时保留上次结果）
- 中英双语：`/` 为中文，`/en` 为英文，两个都是静态预渲染页面，带 hreflang 互相指向；文案在 `src/lib/i18n.ts`，示例在 `src/lib/examples.ts`
- 10 个主题（默认 Klein 品牌主题），其中 6 个“多色”主题会给每个节点自动使用不同背景色；代码里用 `style` / `classDef` 写的颜色会保留
- 两种排版引擎：标准（dagre）和 ELK（mermaid 12 已内置，处理复杂子图更紧凑），工具栏切换；代码里写了 `config: layout` 时以代码为准
- 视觉：International Klein Blue + 奶油底，Poppins / Lora / JetBrains Mono，品牌色定义在 `src/app/globals.css` 的 `@theme`
- 导出 PNG（2x）/ SVG，复制 PNG 图片、SVG 代码、Mermaid 代码到剪贴板
- 代码和主题自动保存在浏览器 localStorage

## 开发

```bash
npm install
npm run dev        # 本地开发 http://localhost:3000
npm run preview    # 构建并在本地 Workers 运行时里预览 http://localhost:8787
npm run deploy     # 构建并部署到 Cloudflare（首次需 npx wrangler login）
```

Worker 名称在 `wrangler.jsonc` 的 `name` 中修改（`services[0].service` 要同步改成同一个名字）。

## SEO 上线清单

1. 复制 `.env.example` 为 `.env.production`，填入正式域名 `NEXT_PUBLIC_SITE_URL`（canonical、sitemap、robots 都会用到，构建时生效）。
   sitemap 已包含 `/` 和 `/en` 两个地址及其语言互指。
2. 在 `wrangler.jsonc` 里取消 `routes` 的注释，绑定自定义域名。
3. Google Search Console：选择“HTML 标记”验证方式，把 `content` 的值填到 `GOOGLE_SITE_VERIFICATION`，重新部署后点验证；然后提交 `https://你的域名/sitemap.xml`。
4. 社交分享图：放一张 1200×630 的 `public/og.png`，并取消 `src/app/layout.tsx` 里 `openGraph.images` 的注释。
5. 如需统计，可以接入 Google Analytics（`@next/third-parties/google`）。

已经配置好的：title / description / keywords、Open Graph / Twitter Card、canonical、robots.txt、sitemap.xml、Web App Manifest、JSON-LD 结构化数据（WebApplication + FAQPage），以及服务端预渲染、可被抓取的介绍和 FAQ 文字。
