import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maggotfreekit.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/order", "/terms", "/privacy", "/return-policy"],
      disallow: ["/track"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
