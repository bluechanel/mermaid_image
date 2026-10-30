import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// 页面全部是构建时预渲染的静态内容，直接从 Workers Static Assets 读取缓存，无需 R2/KV。
// 以后加了需要 ISR/revalidate 的页面，再换成 r2IncrementalCache。
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
