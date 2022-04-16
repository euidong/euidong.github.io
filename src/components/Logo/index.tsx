import { Link } from "react-router-dom";
import LogoBlack from "../../static/images/logo-black.png";
import LogoWhite from "../../static/images/logo-white.png";
import "./Logo.scss";

interface Props {
  color?: "black" | "white";
}

const Logo = ({ color }: Props) => {
  return (
    <Link to="/" className="logo">
      <img
        className="logo__image"
        src={color === "black" ? LogoBlack : LogoWhite}
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;
