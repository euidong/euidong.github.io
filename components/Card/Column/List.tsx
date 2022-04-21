import ColumnCard from ".";
import { PostMetadata } from "../../../types/posts";
import styles from "./ColumnCard.module.scss";

interface Props {
  title: string;
  posts: PostMetadata[];
}

const ColumnCardList = ({ title, posts }: Props) => {
  return (
    <div className={styles.column_card__list__background}>
      <h2 className={styles.column_card__list__title}>{title}</h2>
      <div className={styles.column_card__list__wrapper}>
        {posts.map((post, idx) => (
          <ColumnCard
            key={idx}
            thumbnailSrc={post.thumbnailSrc}
            tags={post.tags}
            title={post.title}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default ColumnCardList;
