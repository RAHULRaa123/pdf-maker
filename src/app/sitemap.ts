import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pdf-maker-virid.vercel.app";

  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
    "/tools",
    "/tools/image-to-pdf",
    "/tools/merge-pdf",
    "/tools/decompose",
    "/tools/compress",
    "/tools/resize",
    "/tools/crop",
    "/tools/protect",
    "/tools/watermark",
    "/tools/pdf-to-image",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}