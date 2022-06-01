import styles from "./SearchBarToggler.module.scss";
import { BsSearch, BsXLg } from "react-icons/bs";
import { SetStateAction, useEffect, useRef, useState } from "react";
import SearchBar from "../../SearchBar";

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const SearchBarToggler = ({ className, isOpen, setIsOpen }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const open = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "Enter") {
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
  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && <SearchBar close={() => setIsOpen(false)} />}
      <div className={className}>
        <button
          ref={buttonRef}
          className={styles.search_bar_toggler}
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);
          }}
          tabIndex={2}
        >
          {isOpen ? <BsXLg size="25px" /> : <BsSearch size="25px" />}
        </button>
      </div>
    </>
  );
};

export default SearchBarToggler;
