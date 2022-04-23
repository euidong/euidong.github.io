import styles from "./RowCard.module.scss";
import RowCard from ".";
import { PostMetadata } from "../../../types/posts";
import { formatTitle } from "../../../lib/utils";

interface Props {
  subject: string;
  posts: PostMetadata[];
}

const RowCardList = ({ subject, posts }: Props) => {
  return (
    <div className={styles.row_card__list__background}>
      <h1 className={styles.row_card__list__title}>{formatTitle(subject)}</h1>
      <ul className={styles.row_card__list__wrapper}>
        {posts.map((post: any, idx: number) => (
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
