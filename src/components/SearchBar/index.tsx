import { BsSearch } from "react-icons/bs";
import "./SearchBar.scss";

const SearchBar = () => {
  return (
    <div className="search_bar__background">
      <form className="search_bar__wrapper">
        <BsSearch size="2rem" className="search_bar__icon" />
        <input type="text" className="search_bar__input" placeholder="Search" />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default SearchBar;
