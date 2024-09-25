// app/layout.tsx
import './styles/globals.css';
import SessionProviderWrapper from './Components/SessionProviderWrapper'; // Import your client component

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper> {/* Client-side context provider */}
        </body>
        </html>
    );
}
