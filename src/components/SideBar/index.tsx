import { Link } from "react-router-dom";
import "./SideBar.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories?: { name: string; post_cnt: number }[];
}

const SideBar = ({ isOpen, setIsOpen, categories }: Props) => {
  return (
    <nav className={`side_bar__wrapper${isOpen ? "--open" : "--close"}`}>
      <Link
        onClick={() => setIsOpen(false)}
        className="side_bar__li"
        to="/"
        tabIndex={-1}
      >
        Home
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        className="side_bar__li"
        to="/tag"
        tabIndex={-1}
      >
        Tags
      </Link>
      {categories?.map((category) => (
        <Link
          onClick={() => setIsOpen(false)}
          className="side_bar__li"
          to={`/category/${category}`}
          tabIndex={-1}
        >
          {category.name} ({category.post_cnt})
        </Link>
      ))}
    </nav>
  );
};

export default SideBar;
