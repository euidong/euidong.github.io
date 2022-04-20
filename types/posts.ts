type Post = {
  slug: string;
  title: string;
  date: string;
  thumbnailSrc?: string;
  excerpt?: string;
  content: string;
  category: string;
  tags: string[];
};

export default Post;
