import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://slimshotai.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://slimshotai.vercel.app/privacy',
      lastModified: new Date('2026-10-30'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://slimshotai.vercel.app/terms',
      lastModified: new Date('2026-10-30'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
