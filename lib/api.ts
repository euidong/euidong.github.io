import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import Post from "../types/posts";

const postsDirectory = join(process.cwd(), "_posts");

export const getPostSlugs = () => {
  return fs.readdirSync(postsDirectory);
};

export const getPostBySlug = (slug: string) => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const { data, content } = matter.read(fullPath);
  const post: Post = {
    content,
    slug: "",
    title: "",
    date: "",
    category: "",
    tags: [],
    ...data,
  };
  return post;
};

export const getAllPosts = () => {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  return posts;
};

export const getAllCategories = () => {
  const posts = getAllPosts();
  const categories: { [key: string]: any[] } = {};
  posts.forEach((post) => {
    if (categories.hasOwnProperty(post.category)) {
      categories[post.category].push(post);
    } else {
      categories[post.category] = [post];
    }
  });
  return categories;
};

export const getAllTags = () => {
  const posts = getAllPosts();
  const categories: { [key: string]: any[] } = {};
  posts.forEach((post) => {
    if (categories.hasOwnProperty(post.category)) {
      categories[post.category].push(post);
    } else {
      categories[post.category] = [post];
    }
  });
  return categories;
};
