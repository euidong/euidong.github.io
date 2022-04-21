export type Post = {
  content: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  tags?: string[];
  excerpt?: string;
  thumbnailSrc?: string;
};

export type PostMetadata = Omit<Post, "content">;
