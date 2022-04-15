import "./SideBarToggler.scss";
import { useEffect, useState } from "react";
import Toggle from "./Toggle";
import SideBar from "../SideBar";

interface Props {
  className?: string;
}

const SideBarToggler = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const open = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "A" || e.key === "a" || e.key === "ㅁ")) {
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
        <Toggle
          checked={isOpen}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        />
        <SideBar isOpen={isOpen} />
      </div>
    </>
  );
};

export default SideBarToggler;
