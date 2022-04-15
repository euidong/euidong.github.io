import "./SearchBarToggler.scss";
import { BsSearch, BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";

interface Props {
  className?: string;
}

const SearchBarToggler = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const open = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "S" || e.key === "s" || e.key === "ㄴ")) {
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
      {isOpen && <SearchBar />}
      <div className={className}>
        <button
          className="search_bar_toggler"
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);
          }}
        >
          {isOpen ? <BsXLg size="25px" /> : <BsSearch size="25px" />}
        </button>
      </div>
    </>
  );
};

export default SearchBarToggler;
