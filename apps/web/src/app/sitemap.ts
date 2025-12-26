import type { MetadataRoute } from "next";
import { NEXT_PUBLIC_BASE_URL } from "../../config";
import { apps } from "@/features/show-apps/config/apps";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = NEXT_PUBLIC_BASE_URL;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/repositories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const appRoutes: MetadataRoute.Sitemap = apps.map((app) => ({
    url: `${baseUrl}/apps/${app.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...appRoutes];
}
