import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: 'Reformei - Reformas de Alto Padrão',
    short_name: 'Reformei',
    description: 'Especialistas em reformas de alto padrão para casas e apartamentos. Transforme seu espaço com qualidade e sofisticação.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#23CF65',
    background_color: '#ffffff',
    categories: ['business', 'lifestyle'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    prefer_related_applications: false,
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
