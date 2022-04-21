import ColumnCardList from "../components/Card/Column/List";
import { getAllCategories, getAllPosts } from "../lib/api";
import { Post } from "../types/posts";
import styles from "./Home.module.scss";

interface Props {
  recentPosts: Post[];
  categorizedPosts: { [key: string]: Post[] };
}

const Home = ({ recentPosts, categorizedPosts }: Props) => {
  return (
    <div className={styles.home__wrapper}>
      <ColumnCardList posts={recentPosts} title="Recent Post" />
      {Object.keys(categorizedPosts).map((category) => {
        return (
          <ColumnCardList
            title={category}
            posts={categorizedPosts[category]}
            key={category}
          />
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const recentPosts = getAllPosts().sort((a, b) => {
    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
  });
  const categorizedPosts = getAllCategories();

  return {
    props: {
      recentPosts: recentPosts.slice(0, 6),
      categorizedPosts: categorizedPosts,
    },
  };
};

export default Home;
