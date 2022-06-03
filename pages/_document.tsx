import Document, { Head, Html, Main, NextScript } from "next/document";

const MyDoucment = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href={`${process.env.PUBLIC_URL}/favicon.png`} />
        <link
          rel="apple-touch-icon"
          href={`${process.env.PUBLIC_URL}/logo192.png`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDoucment;
