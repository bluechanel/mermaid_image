// 站点地址。上线前把 NEXT_PUBLIC_SITE_URL 设为正式域名（见 .env.example）。
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");

export const AUTHOR = { name: "Wiley Zhang" };
