import Script from "next/script";

const MultiplexGoogleAds = () => {
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-7452732177557701"
        data-ad-slot="3654773972"
      />
      <Script
        id="google-multiplex-ads"
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </>
  );
};

export default MultiplexGoogleAds;
