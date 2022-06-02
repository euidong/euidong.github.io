import styles from "./RowCard.module.scss";
import RowCard from ".";
import { PostMetadata } from "../../../types/posts";
import { formatTitle } from "../../../lib/utils";
import { useMemo, useState } from "react";

interface Props {
  subject: string;
  posts: PostMetadata[];
}

const sorting: {
  render: string;
  target: "title" | "date";
  direction: "asc" | "desc";
}[] = [
  { render: "최신순", target: "date", direction: "desc" },
  { render: "AtoZ", target: "title", direction: "asc" },
  { render: "ZtoA", target: "title", direction: "desc" },
];

const RowCardList = ({ subject, posts }: Props) => {
  const [sort, setSort] = useState(sorting[0]);
  const sortedPost = useMemo(() => {
    return posts.sort((a, b) => {
      if (a[sort.target] > b[sort.target]) {
        return sort.direction === "asc" ? 1 : -1;
      } else if (a[sort.target] < b[sort.target]) {
        return sort.direction === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });
  }, [posts, sort]);
  return (
    <div className={styles.row_card__list__background}>
      <h1 className={styles.row_card__list__title}>{formatTitle(subject)}</h1>
      <label className={styles.row_card__list__select__wrapper}>
        <select
          className={styles.row_card__list__select}
          onChange={(e) => {
            setSort(sorting[e.currentTarget.selectedIndex]);
          }}
        >
          {sorting.map((e, idx) => (
            <option className={styles.row_card__list__select__option} key={idx}>
              {e.render}
            </option>
          ))}
        </select>
      </label>

      <ul className={styles.row_card__list__wrapper}>
        {sortedPost.map((post: any, idx: number) => (
          <RowCard
            key={idx}
            title={post.title}
            slug={post.slug}
            time={post.date}
            tags={post.tags}
            thumbnailSrc={post.thumbnailSrc}
          />
        ))}
      </ul>
    </div>
  );
};

export default RowCardList;
