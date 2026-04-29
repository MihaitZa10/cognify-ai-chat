'use client';
import { useEffect } from 'react';

export function ServiceWorkerRegister() {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) {
            return;
        }
        console.log('registering service worker');
        navigator.serviceWorker.register('/sw.js').catch((err) => console.error('SW registration failed', err));
    }, []);
    return null;
}
