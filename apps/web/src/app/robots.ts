import type { MetadataRoute } from "next";
import { NEXT_PUBLIC_BASE_URL } from "../../config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
