import Script from "next/script";
import { useEffect } from "react";
import BannerGoogleAds from "./Banner";
import MultiplexGoogleAds from "./Multiplex";

interface Props {
  type: "banner" | "multiplex";
}

const loadAds = () => {
  try {
    if (typeof window !== "undefined") {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  } catch (error: any) {
    console.log("adsense error", error.message);
  }
};

const GoogleAds = ({ type }: Props) => {
  useEffect(() => {
    loadAds();
  });
  return (
    <>{type === "banner" ? <BannerGoogleAds /> : <MultiplexGoogleAds />}</>
  );
};

export default GoogleAds;
