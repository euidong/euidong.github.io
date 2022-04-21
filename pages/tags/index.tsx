import { getAllTags } from "../../lib/api";
import Link from "next/link";
import styles from "./TagList.module.scss";
import Head from "next/head";

interface Props {
  tags: string[];
}
const TagList = ({ tags }: Props) => {
  return (
    <>
      <Head>
        <title>Tag List | JustLog</title>
        <meta property="og:title" content="JustLog" />
        <meta property="og:description" content="Just Tech Blog" />
        <meta property="og:url" content={process.env.PUBLIC_URL} />
        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/logo192.png`}
        />
      </Head>
      <div className={styles.tag_list__wrapper}>
        <div className={styles.tag_list__card}>
          {tags?.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <a> # {tag} </a>
            </Link>
          ))}
        </div>
      </div>
    </>
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
