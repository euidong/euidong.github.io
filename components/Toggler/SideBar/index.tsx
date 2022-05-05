import { SetStateAction, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { CgMenu } from "react-icons/cg";
import SideBar from "../../Sidebar";
import styles from "./SideBarToggler.module.scss";
// import Toggle from "./Toggle";

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const SideBarToggler = ({ className, isOpen, setIsOpen }: Props) => {
  useEffect(() => {
    const open = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "!" || e.key === "1")) {
        setIsOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keypress", open);
    if (isOpen) {
      const close = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };
      window.addEventListener("keyup", close);
      return () => {
        window.removeEventListener("keypress", open);
        window.removeEventListener("keyup", close);
      };
    }
    return () => {
      window.removeEventListener("keypress", open);
    };
  }, [isOpen]);

  return (
    <>
      <div className={className}>
        <button
          tabIndex={1}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className={styles.search_bar_toggler}
        >
          {isOpen ? <BsXLg size="25px" /> : <CgMenu size="35px" />}
        </button>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default SideBarToggler;
