import BannerGoogleAds from "./Banner";
import MultiplexGoogleAds from "./Multiplex";

interface Props {
  type: "banner" | "multiplex";
}

const GoogleAds = ({ type }: Props) => {
  return type === "banner" ? <BannerGoogleAds /> : <MultiplexGoogleAds />;
};

export default GoogleAds;
