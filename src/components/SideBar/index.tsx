import "./SideBar.scss";

interface Props {
  isOpen: boolean;
}

const SideBar = ({ isOpen }: Props) => {
  return (
    <div className={`side_bar__wrapper${isOpen ? "--open" : "--close"}`}>
      hello
    </div>
  );
};

export default SideBar;
