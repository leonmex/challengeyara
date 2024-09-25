import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/app/styles/globals.css";  // Optional: custom global styles

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
