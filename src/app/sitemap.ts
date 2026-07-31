import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://pdf-maker-virid.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },

    // Tools

    {
      url: `${baseUrl}/tools/compress`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/tools/crop`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/tools/decompose`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/tools/image-to-pdf`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/tools/merge-pdf`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/tools/pdf-to-image`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/tools/protect`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/tools/resize`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/tools/watermark`,
      lastModified: new Date(),
    },
  ];
}
