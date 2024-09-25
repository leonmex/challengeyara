// app/layout.tsx
import './styles/globals.css'; // Import global CSS
import Navbar from './components/Navbar'; // Navbar component
import Footer from './components/Footer'; // Footer component
import ClientLayout from './ClientLayout'; // Import client-side logic component

export const metadata = {
    title: 'Next.js 14.2 App',
    description: 'A basic Next.js 14.2 app using TypeScript.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Navbar />
        <ClientLayout> {/* Wrap the client layout component */}
            <main>{children}</main>
        </ClientLayout>
        <Footer />
        </body>
        </html>
    );
}
