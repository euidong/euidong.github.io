import { Link } from "react-router-dom";
import "./SideBar.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories?: { name: string; post_cnt: number }[];
}

const SideBar = ({ isOpen, setIsOpen, categories }: Props) => {
  const close = () => {
    setIsOpen(false);
  };
  return (
    <nav className={`side_bar__wrapper${isOpen ? "--open" : "--close"}`}>
      <Link onClick={close} className="side_bar__li" to="/">
        Home
      </Link>
      <Link onClick={close} className="side_bar__li" to="/tag">
        Tags
      </Link>
      {categories?.map((category) => (
        <Link
          onClick={close}
          className="side_bar__li"
          to={`/category/${category.name}`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
};

export default SideBar;
