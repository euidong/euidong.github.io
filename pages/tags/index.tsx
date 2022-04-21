import { getAllTags } from "../../lib/api";
import Link from "next/link";
import styles from "./TagList.module.scss";

interface Props {
  tags: string[];
}
const TagList = ({ tags }: Props) => {
  return (
    <div className={styles.tag_list__wrapper}>
      <div className={styles.tag_list__card}>
        {tags?.map((tag) => (
          <Link key={tag} href={`/tag/${tag}`}>
            <a> # {tag} </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagList;

export const getStaticProps = async () => {
  const tags = getAllTags();
  return {
    props: {
      tags: Object.keys(tags),
    },
  };
};
