import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pdf-maker-virid.vercel.app";

  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
    "/tools",
    "/tools/compress",
    "/tools/crop",
    "/tools/decompose",
    "/tools/image-to-pdf",
    "/tools/merge-pdf",
    "/tools/pdf-to-image",
    "/tools/protect",
    "/tools/resize",
    "/tools/watermark",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
