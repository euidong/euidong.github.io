import "../styles/globals.scss";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Just Tech Blog" />
        <link rel="icon" href={`${process.env.PUBLIC_URL}/favicon.png`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          href={`${process.env.PUBLIC_URL}/logo192.png`}
        />
        <meta property="og:type" content="blog" />
        <meta property="og:site_name" content="JustLog" />
      </Head>
      <Script
        strategy="afterInteractive"
        src={"https://www.googletagmanager.com/gtag/js?id=G-RHJVZCZ2GL"}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());        
            gtag('config', 'G-RHJVZCZ2GL');
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7452732177557701"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  // @ts-ignore
  window.gtag &&
    // @ts-ignore
    window.gtag("event", name, {
      event_category:
        label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
}
