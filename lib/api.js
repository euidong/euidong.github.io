const fs = require("fs");
const { join } = require("path");
const matter = require("gray-matter");
const { formatDate, formatImage } = require("./utils");

const postsDirectory = join(process.cwd(), "_posts");
const draftsDirectory = join(process.cwd(), "_drafts");

const getPostSlugs = () => {
  return fs.readdirSync(postsDirectory);
};

const getPostBySlug = (slug) => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const { data, content } = matter.read(fullPath);
  const post = {
    content,
    slug: "",
    date: "",
    title: "",
    category: "",
    tags: [],
    ...data,
    thumbnailSrc: formatImage(data.thumbnailSrc),
  };
  return post;
};

const getAllPosts = () => {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  return posts;
};

const getAllCategories = () => {
  const posts = getAllPosts();
  const categories = {};
  posts.forEach((post) => {
    if (categories.hasOwnProperty(post.category)) {
      categories[post.category].push(post);
    } else {
      categories[post.category] = [post];
    }
  });
  return categories;
};

const getPostsByCategory = (subject) => {
  const categories = getAllCategories();
  return categories[subject];
};

const getAllTags = () => {
  const posts = getAllPosts();
  const tags = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (tags.hasOwnProperty(tag)) {
        tags[tag].push(post);
      } else {
        tags[tag] = [post];
      }
    });
  });
  return tags;
};

const getPostsByTag = (subject) => {
  const tags = getAllTags();
  return tags[subject];
};

// only for draft
const getDraftSlugs = () => {
  return fs.readdirSync(draftsDirectory);
};

const getDraftBySlug = (slug) => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(draftsDirectory, `${realSlug}.md`);
  const { data, content } = matter.read(fullPath);
  const draft = {
    content,
    slug: "",
    title: "",
    category: "",
    tags: [],
    date: "",
    ...data,
    thumbnailSrc: formatImage(data.thumbnailSrc),
  };
  return draft;
};

const getAllDrafts = () => {
  const slugs = getDraftSlugs();
  const drafts = slugs.map((slug) => getDraftBySlug(slug));
  return drafts;
};

module.exports = {
  getPostSlugs,
  getPostBySlug,
  getAllPosts,
  getAllCategories,
  getPostsByCategory,
  getAllTags,
  getPostsByTag,

  getDraftSlugs,
  getDraftBySlug,
  getAllDrafts,
};
