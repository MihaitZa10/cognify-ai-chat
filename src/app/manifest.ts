import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Cognify AI Chat',
        short_name: 'Cognify',
        description: 'AI chat app for ACS-305',
        start_url: '/chats',
        display: 'standalone',
        background_color: '#111827',
        theme_color: '#111827',
        icons: [{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
    };
}
