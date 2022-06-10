import { Head, Html, Main, NextScript } from "next/document";
import { DEFAULT_DESCRIPTION } from "../lib/constants";

const MyDoucment = () => {
  return (
    <Html>
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
        <link rel="icon" href={`${process.env.PUBLIC_URL}/favicon.png`} />
        <link
          rel="apple-touch-icon"
          href={`${process.env.PUBLIC_URL}/logo192.png`}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7452732177557701"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDoucment;
