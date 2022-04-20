import { BsFillPersonLinesFill, BsGithub } from "react-icons/bs";
import { ImFire } from "react-icons/im";
import Logo from "../components/Logo";
import SearchBarToggler from "../components/SearchBarToggler";
import SideBarToggler from "../components/SideBarToggler";

interface Props {
  children: JSX.Element;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <SideBarToggler className="left_top_float_button" />
      <SearchBarToggler className="right_bottom_float_button" />
      <header className="header">
        <Logo />
      </header>
      <section className="main">{children}</section>
      <footer className="footer">
        <div className="footer__copyright">
          <span>Copyright © euidong</span>
          <br />
          <span>
            모든 컨텐츠에 대한 저작권은 작성자에게 존재합니다. <br />
            불법 복제를 통한 상업적 사용을 절대적으로 금지합니다. <br />
            단, 비상업적 이용의 경우 출처 및 링크를 적용한다면 자유롭게 사용가능
            합니다.
          </span>
        </div>
        <div className="footer__contents">
          <a
            className="footer__contents__link"
            href="https://github.com/euidong"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub size={60} />
            <span>github</span>
          </a>
          <a
            className="footer__contents__link"
            href="https://euidong.github.io/portfolio"
            target="_blank"
            rel="noreferrer"
          >
            <BsFillPersonLinesFill size={60} />
            <span>portfolio</span>
          </a>
          <a
            className="footer__contents__link"
            href="https://chrome.google.com/webstore/detail/bonfire/nkooidijgbppkojdgkoafcoppnohdfka?hl=ko"
            target="_blank"
            rel="noreferrer"
          >
            <ImFire size={60} />
            <span>chat</span>
          </a>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
