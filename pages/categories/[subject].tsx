import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Post } from "../../types/posts";
import { getAllCategories, getPostsByCategory } from "../../lib/api";
import RowCardList from "../../components/Card/Row/List";

interface Props {
  posts: Post[];
  params: {
    subject: string;
  };
}

const Category = ({ posts, params }: Props) => {
  const router = useRouter();
  if (!router.isFallback && posts.length === 0) {
    return <ErrorPage statusCode={404} />;
  }
  return <RowCardList subject={params.subject} posts={posts} />;
};

export default Category;

export const getStaticProps = async ({
  params,
}: {
  params: { [key: string]: string };
}) => {
  const posts = getPostsByCategory(params.subject);
  return {
    props: {
      posts,
      params,
    },
  };
};

export const getStaticPaths = async () => {
  const categories = getAllCategories();
  return {
    paths: Object.keys(categories).map((subject) => {
      return {
        params: {
          subject,
        },
      };
    }),
    fallback: false,
  };
};
