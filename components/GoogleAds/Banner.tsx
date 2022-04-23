import Script from "next/script";

const BannerGoogleAds = () => {
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-7452732177557701"
        data-ad-slot="1964032750"
      />
      <Script
        id="google-ads"
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </>
  );
};

export default BannerGoogleAds;
