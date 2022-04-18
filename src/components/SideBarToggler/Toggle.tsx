import { useRef } from "react";
import "./Toggle.scss";

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}

const Toggle = ({ onChange, checked }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={inputRef}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="openSidebarMenu"
        id="openSidebarMenu"
      />
      <label
        className="sidebarIconToggle"
        htmlFor="openSidebarMenu"
        tabIndex={1}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.click();
          }
        }}
      >
        <div className="spinner diagonal part-1" />
        <div className="spinner horizontal" />
        <div className="spinner diagonal part-2" />
      </label>
    </>
  );
};

export default Toggle;
