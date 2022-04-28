import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Post } from "../../types/posts";
import { getAllTags, getPostsByTag } from "../../lib/api";
import RowCardList from "../../components/Card/Row/List";
import Head from "next/head";

interface Props {
  posts: Post[];
  params: {
    subject: string;
  };
}

const Tag = ({ posts, params }: Props) => {
  const router = useRouter();
  if (!router.isFallback && posts.length === 0) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head>
        <title>{params.subject} | JustLog</title>
        <meta property="og:title" content="JustLog" />
        <meta property="og:description" content="Just Tech Blog" />
        <meta property="og:url" content={process.env.PUBLIC_URL} />
        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/logo192.png`}
        />
      </Head>
      <RowCardList subject={params.subject} posts={posts} />;
    </>
  );
};

export default Tag;

export const getStaticProps = async ({
  params,
}: {
  params: { [key: string]: string };
}) => {
  const posts = getPostsByTag(params.subject).sort((a: Post, b: Post) => {
    if (a.title > b.title) return 1;
    return a.title === b.title ? 0 : -1;
  });
  return {
    props: {
      posts,
      params,
    },
  };
};

export const getStaticPaths = async () => {
  const tags = getAllTags();
  return {
    paths: Object.keys(tags).map((subject) => {
      return {
        params: {
          subject,
        },
      };
    }),
    fallback: false,
  };
};
