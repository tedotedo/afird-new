import type { MetadataRoute } from 'next';

const baseUrl = 'https://practical-arfid.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/arfid',
    '/supplements',
    '/nutrition-support',
    '/resources',
    '/notes',
    '/about',
    '/privacy',
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path || '/'}`,
    lastModified: new Date(),
  }));
}
