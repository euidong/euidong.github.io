import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Post } from "../../types/posts";
import { getAllTags, getPostsByTag } from "../../lib/api";
import RowCardList from "../../components/Card/Row/List";

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
  return <RowCardList subject={params.subject} posts={posts} />;
};

export default Tag;

export const getStaticProps = async ({
  params,
}: {
  params: { [key: string]: string };
}) => {
  const posts = getPostsByTag(params.subject);
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
