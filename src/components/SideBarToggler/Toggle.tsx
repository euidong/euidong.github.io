import "./Toggle.scss";

interface Props {
  onClick: React.MouseEventHandler<HTMLInputElement>;
  checked: boolean;
}

const Toggle = ({ onClick, checked }: Props) => {
  return (
    <>
      <input
        checked={checked}
        onClick={onClick}
        type="checkbox"
        className="openSidebarMenu"
        id="openSidebarMenu"
      />
      <label className="sidebarIconToggle" htmlFor="openSidebarMenu">
        <div className="spinner diagonal part-1" />
        <div className="spinner horizontal" />
        <div className="spinner diagonal part-2" />
      </label>
    </>
  );
};

export default Toggle;
