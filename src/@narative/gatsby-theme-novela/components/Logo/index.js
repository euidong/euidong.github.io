import React from "react";
import { Link } from "gatsby";
import LogoBlack from "../../../../image/icon/logo-black.png";
import LogoWhite from "../../../../image/icon/logo-white.png";

/**
 * Paste in your SVG logo and return it from this component.
 * Make sure you have a height set for your logo.
 * It is recommended to keep the height within 25-35px.
 */
export default function Logo({ fill }) {
  console.log(fill);
  return (
    <Link
      to="/"
      style={{
        fontSize: "40px",
        fontWeight: 700,
        fontFamily: "Merriweather',Georgia,Serif",
      }}
    >
      <img
        src={fill === "#fff" ? LogoWhite : LogoBlack}
        alt="logo"
        style={{ height: "60px" }}
      />
    </Link>
  );
}
