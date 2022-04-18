import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo = () => {
  return <Link to="/" className="logo" tabIndex={1}></Link>;
};

export default Logo;
