import MarkDown from "../../components/MarkDown";
import { getAllDrafts, getDraftBySlug } from "../../lib/api";
import { Post } from "../../types/posts";

interface Props {
  draft: Post;
}

const Draft = ({ draft }: Props) => {
  return <MarkDown content={draft.content} />;
};

export default Draft;

export const getStaticProps = async ({
  params,
}: {
  params: { [key: string]: string };
}) => {
  const draft = getDraftBySlug(params.slug);
  return {
    props: {
      draft,
    },
  };
};

export const getStaticPaths = async () => {
  const drafts = getAllDrafts();
  return {
    paths: drafts.map((draft) => {
      return {
        params: {
          slug: draft.slug,
        },
      };
    }),
    fallback: false,
  };
};
