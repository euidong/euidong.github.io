import { BsSearch } from "react-icons/bs";
import "./SearchBar.scss";
import categoryJson from "../../static/generated/category.json";
import tagJson from "../../static/generated/tag.json";
import postJson from "../../static/generated/post.json";
import { useState } from "react";

const categories = Object.keys(categoryJson);
const tags = Object.keys(tagJson);
const posts = postJson.map((post) => post.title);

const SearchBar = () => {
  const [bestFit, setBestFit] = useState<{
    category: string | null;
    tag: string | null;
    post: string | null;
  }>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryFilter = categories.filter((category) => {
      return category.includes(e.currentTarget.value);
    });
    const tagFilter = tags.filter((tag) => {
      return tag.includes(e.currentTarget.value);
    });
    const postFilter = posts.filter((post) => {
      return post.includes(e.currentTarget.value);
    });
    setBestFit({
      category: categoryFilter.length > 0 ? categoryFilter[0] : null,
      tag: tagFilter.length > 0 ? tagFilter[0] : null,
      post: postFilter.length > 0 ? postFilter[0] : null,
    });
  };
  return (
    <div className="search_bar__background">
      <form className="search_bar__wrapper">
        <BsSearch size="2rem" className="search_bar__icon" />
        <input
          type="text"
          className="search_bar__input"
          placeholder="Search"
          onChange={onChange}
        />
        <input type="submit" hidden />
      </form>
      {bestFit?.category && <div>{bestFit.category}</div>}
      {bestFit?.tag && <div>{bestFit.tag}</div>}
      {bestFit?.post && <div>{bestFit.post}</div>}
    </div>
  );
};

export default SearchBar;
