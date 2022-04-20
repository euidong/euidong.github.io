import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";

interface Props {
  post: any;
  morePosts: any;
  preview: any;
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <article>
      <Head>
        <title>{post.title} | JustLog</title>
        {/* <meta property="og:image" content={post.ogImage.url} /> */}
      </Head>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};

export default Post;

export const getStaticProps = async ({
  params,
}: {
  params: { [key: string]: string };
}) => {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content);
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const posts = getAllPosts();
  console.log(posts);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
