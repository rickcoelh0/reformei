import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/.env*'],
    },
    sitemap: 'https://reformei.co/sitemap.xml',
  };
}
