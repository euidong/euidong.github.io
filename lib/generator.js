// @ts-ignore
const fs = require("fs");
const { join } = require("path");
const { getAllCategories, getAllPosts, getAllTags } = require("./api");

const filePath = join(process.cwd(), "public/exts");

const categories = getAllCategories();
const posts = getAllPosts();
const tags = getAllTags();

fs.writeFileSync(
  `${filePath}/categories.json`,
  JSON.stringify(
    Object.keys(categories).map((category) => {
      return {
        name: category,
        post_cnt: categories[category].length,
      };
    })
  )
);

fs.writeFileSync(
  `${filePath}/posts.json`,
  JSON.stringify(posts.map((e) => ({ name: e.title, slug: e.slug })))
);

fs.writeFileSync(
  `${filePath}/tags.json`,
  JSON.stringify(
    Object.keys(tags).map((tag) => {
      return {
        name: tag,
        post_cnt: tags[tag].length,
      };
    })
  )
);

console.log("✅ Success");
