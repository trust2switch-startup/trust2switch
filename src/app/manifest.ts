import { MetadataRoute } from 'next';
import { content } from '@/config/content';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: content.site.name,
    short_name: 'Trust2Switch',
    description: content.site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/trust2switch_logo.jpg',
        sizes: 'any',
        type: 'image/jpeg',
      },
    ],
    categories: ['education', 'learning'],
  };
}

