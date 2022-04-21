import Link from "next/link";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link href="/">
      <a className={styles.logo} tabIndex={1} />
    </Link>
  );
};

export default Logo;
