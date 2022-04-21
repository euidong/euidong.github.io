import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPosts, getAllTags, getPostBySlug } from "../../lib/api";
import Head from "next/head";
import MarkDown from "../../components/MarkDown";
import styles from "./Post.module.scss";
import { DEFAULT_THUMBNAIL_SOURCE } from "../../lib/constants";
import { Post, PostMetadata } from "../../types/posts";
import ColumnCardList from "../../components/Card/Column/List";
import Script from "next/script";

interface Props {
  post: Post;
  relatedPosts: PostMetadata[];
}

const Post = ({ post, relatedPosts }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head>
        <title>{post.title} | JustLog</title>
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/posts/${post.slug}`}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={"Just Tech Posting"} />
        <meta
          property="og:image"
          content={post.thumbnailSrc || DEFAULT_THUMBNAIL_SOURCE}
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7452732177557701"
        crossOrigin="anonymous"
      />
      <div className={styles.post__wrapper}>
        <h1 className={styles.post__title}>{post.title}</h1>
        <p className={styles.post__date}>{post.date}</p>
        <MarkDown content={post.content} />
        {relatedPosts.length > 0 && (
          <ColumnCardList title="Related Posts" posts={relatedPosts} />
        )}
      </div>
    </>
  );
};

export default Post;

export const getStaticProps = async ({
  params,
}: {
  params: { [key: string]: string };
}) => {
  const post = getPostBySlug(params.slug);
  const tags = getAllTags();
  const relatedPosts = post.tags?.length ? tags[post.tags[0]] : [];
  return {
    props: {
      post,
      relatedPosts: relatedPosts.filter((rp: any) => rp.title !== post.title),
    },
  };
};

export const getStaticPaths = async () => {
  const posts = getAllPosts();
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
