import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://pdf-maker-virid.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/about",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/blog",
      lastModified: new Date(),
    },
  ];
}
