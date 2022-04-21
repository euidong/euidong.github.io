import { useEffect, useState } from "react";
import SideBar from "../../Sidebar";
import styles from "./SideBarToggler.module.scss";
// import Toggle from "./Toggle";

interface Props {
  className?: string;
}

const SideBarToggler = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
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
  const onChange = () => setIsOpen((isOpen) => !isOpen);

  return (
    <>
      <div className={className}>
        <input
          checked={isOpen}
          onChange={onChange}
          type="checkbox"
          className={styles.openSidebarMenu}
          id="openSidebarMenu"
        />
        <label
          className={styles.sidebarIconToggle}
          htmlFor="openSidebarMenu"
          tabIndex={1}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.click();
            }
          }}
        >
          <div
            className={`${styles.spinner} ${styles.diagonal} ${styles["part-1"]}`}
          />
          <div className={`${styles.spinner} ${styles.horizontal}`} />
          <div
            className={`${styles.spinner} ${styles.diagonal} ${styles["part-2"]}`}
          />
        </label>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default SideBarToggler;
