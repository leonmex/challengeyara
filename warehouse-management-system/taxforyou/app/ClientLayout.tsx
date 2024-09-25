// app/ClientLayout.tsx
'use client';  // This makes this a Client Component

import { useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Dynamically import Bootstrap JS only on the client side
        if (typeof window !== 'undefined') {
            import('bootstrap/dist/js/bootstrap.bundle.min.js')
                .then(() => {
                    console.log('Bootstrap JS loaded');
                })
                .catch((err) => console.error('Bootstrap JS failed to load', err));
        }
    }, []);

    return <>{children}</>;
}
