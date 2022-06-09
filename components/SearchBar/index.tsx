import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.scss";
import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import categoriesJson from "../../public/exts/categories.json";
import tagsJson from "../../public/exts/tags.json";
import postsJson from "../../public/exts/posts.json";

const categories = categoriesJson.map((category) => category.name);
const tags = tagsJson.map((tag) => tag.name);
const posts = postsJson.map((post) => post.name);

interface Props {
  close: () => void;
}

const SearchBar = ({ close }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [bestFit, setBestFit] = useState<{
    category: string | null;
    tag: string | null;
    post: string | null;
  }>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryFilter = categories.filter((category) => {
      return category
        .toLowerCase()
        .includes(e.currentTarget.value.toLowerCase());
    });
    const tagFilter = tags.filter((tag) => {
      return tag.toLowerCase().includes(e.currentTarget.value.toLowerCase());
    });
    const postFilter = posts.filter((post) => {
      return post.toLowerCase().includes(e.currentTarget.value.toLowerCase());
    });
    setBestFit({
      category: categoryFilter.length > 0 ? categoryFilter[0] : null,
      tag: tagFilter.length > 0 ? tagFilter[0] : null,
      post: postFilter.length > 0 ? postFilter[0] : null,
    });
  };

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.search_bar__background}>
      <form
        className={styles.search_bar__wrapper}
        onSubmit={(e) => e.preventDefault()}
      >
        <BsSearch size="2rem" className={styles.search_bar__icon} />
        <input
          ref={inputRef}
          type="text"
          className={styles.search_bar__input}
          placeholder="Search"
          onChange={onChange}
        />
      </form>
      {bestFit?.post && (
        <Link
          href={`/posts/${
            postsJson.find((post: any) => post.name === bestFit.post)?.slug
          }`}
        >
          <a className={styles.search_bar__result} onClick={close}>
            <span className={styles.search_bar__result__id}>post:</span>
            {bestFit.post}
          </a>
        </Link>
      )}
      {bestFit?.category && (
        <Link href={`/categories/${bestFit.category}`}>
          <a onClick={close} className={styles.search_bar__result}>
            <span className={styles.search_bar__result__id}>category:</span>
            {bestFit.category}
          </a>
        </Link>
      )}
      {bestFit?.tag && (
        <Link href={`/tags/${bestFit.tag}`}>
          <a className={styles.search_bar__result} onClick={close}>
            <span className={styles.search_bar__result__id}>tag:</span>
            {bestFit.tag}
          </a>
        </Link>
      )}
    </div>
  );
};

export default SearchBar;
