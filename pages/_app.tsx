import "../styles/globals.scss";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import Layout from "../components/Layout";
import Script from "next/script";
import Head from "next/head";
import { DEFAULT_DESCRIPTION } from "../lib/constants";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:type" content="blog" />
        <meta property="og:site_name" content="JustLog" />
        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/logo192.png`}
        />
      </Head>
      <Script
        async
        src={"https://www.googletagmanager.com/gtag/js?id=G-RHJVZCZ2GL"}
      />
      <Script
        id="gtag-init"
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
        id="Adsense-id"
        data-ad-client="ca-pub-7452732177557701"
        async={true}
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
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
