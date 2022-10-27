import { useEffect, useRef, useState } from "react";
import { BsFillPersonLinesFill, BsGithub } from "react-icons/bs";
import { ImFire } from "react-icons/im";
import Logo from "../Logo";
import SearchBarToggler from "../Toggler/SearchBar";
import SideBarToggler from "../Toggler/SideBar";
import styles from "./Layout.module.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const [openHeader, setOpenHeader] = useState(false);
  useEffect(() => {
    let prev = window.scrollY;
    const onScroll = () => {
      const now = window.scrollY;
      if (prev > now) {
        setOpenHeader(true);
      } else {
        setOpenHeader(false);
      }
      prev = now;
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  return (
    <div className={`${styles.wrapper} root`}>
      <header
        className={styles.header}
        style={{
          position:
            isSearchBarOpen || isSidebarOpen
              ? "sticky"
              : openHeader
                ? "sticky"
                : "static",
        }}
      >
        <SideBarToggler
          className={styles.header__toggle}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <Logo />
        <SearchBarToggler
          className={styles.header__toggle}
          isOpen={isSearchBarOpen}
          setIsOpen={setIsSearchBarOpen}
        />
      </header>
      <section>{children}</section>
      <footer className={styles.footer}>
        <div className={styles.footer__copyright}>
          <span>Copyright © euidong</span>
          <br />
          <span>
            모든 컨텐츠에 대한 저작권은 작성자에게 존재합니다. <br />
            불법 복제를 통한 상업적 사용을 절대적으로 금지합니다. <br />
            단, 비상업적 이용의 경우 출처 및 링크를 적용한다면 자유롭게 사용가능
            합니다.
          </span>
          <span>
            Also I use photos by{" "}
            <a
              href="https://unsplash.com/@lorenzoherrera?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              tabIndex={-1}
            >
              Lorenzo Herrera
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com/s/photos/tech?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              tabIndex={-1}
            >
              Unsplash
            </a>
          </span>
        </div>
        <div className={styles.footer__contents}>
          <a
            className={styles.footer__contents__link}
            href="https://github.com/euidong"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub size={60} />
            <span>github</span>
          </a>
          <a
            className={styles.footer__contents__link}
            href="https://euidong.github.io/portfolio"
            target="_blank"
            rel="noreferrer"
          >
            <BsFillPersonLinesFill size={60} />
            <span>portfolio</span>
          </a>
          <a
            className={styles.footer__contents__link}
            href="https://chrome.google.com/webstore/detail/bonfire/nkooidijgbppkojdgkoafcoppnohdfka?hl=ko"
            target="_blank"
            rel="noreferrer"
          >
            <ImFire size={60} />
            <span>chat</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
