import { Head, Html, Main, NextScript } from "next/document";

const MyDoucment = () => {
  return (
    <Html>
      <Head>
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
