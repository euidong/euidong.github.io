import Head from "next/head";
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
    <>
      <Head>
        <title>JustLog</title>
        <link rel="canonical" href={process.env.PUBLIC_URL} />
        <meta property="og:title" content="JustLog" />
        <meta property="og:description" content="Just Tech Blog" />
        <meta property="og:url" content={process.env.PUBLIC_URL} />
        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/logo192.png`}
        />
      </Head>
      <div className={styles.home__wrapper}>
        <ColumnCardList posts={recentPosts} title="Recent Post" />
        {Object.keys(categorizedPosts).map((category) => {
          return (
            <ColumnCardList
              title={category}
              posts={categorizedPosts[category].sort((a, b) =>
                a.title > b.title ? 1 : a.title === b.title ? 0 : -1
              )}
              key={category}
            />
          );
        })}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const recentPosts = getAllPosts().sort((a, b) => {
    if (a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
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
