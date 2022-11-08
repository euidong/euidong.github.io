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
        <title>{`#${params.subject} | JustLog`}</title>
        <meta name="description" content={`#${params.subject} 관련 Posting`} />
        <meta property="og:description" content={`#${params.subject} 관련 Posting`} />
        <meta property="og:title" content={`#${params.subject} | JustLog`} />
        <link
          rel="canonical"
          href={`${process.env.PUBLIC_URL}/tags/${params.subject}`}
        />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/tags/${params.subject}`}
        />
      </Head>
      <RowCardList subject={params.subject} posts={posts} />
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
