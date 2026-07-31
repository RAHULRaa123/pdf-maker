import { MetadataRoute } from "next";

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
    {
      url: "https://pdf-maker-virid.vercel.app/contact",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/privacy",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/terms",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/tools",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/tools/merge-pdf",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/tools/image-to-pdf",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/tools/compress",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/tools/watermark",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/tools/protect",
      lastModified: new Date(),
    },
    {
      url: "https://pdf-maker-virid.vercel.app/tools/split-pdf",
      lastModified: new Date(),
    },
  ];
}
