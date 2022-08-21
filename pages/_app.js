import Script from "next/script";
import { ThemeProvider } from "next-themes";

import { Navbar, Footer } from "../components";
import "../styles/globals.css";

import { DivvyProvider } from "../context/DivvyContext";

function MyApp({ Component, pageProps }) {
  return (
    <DivvyProvider>
      <ThemeProvider attribute='class'>
        <div className='dark:bg-nft-dark bg-white min-h-screen '>
          <Navbar />
          <div className='pt-65'>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </DivvyProvider>
  );
}

export default MyApp;
