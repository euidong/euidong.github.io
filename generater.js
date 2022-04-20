const fs = require("fs");

const staticPath = "./src/static";

const dates = {};
const categories = {};
const tags = {};
const posts = [];

fs.readdir(`${staticPath}/posts`, async (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    // * get dates
    const lastModifedDate = fs.statSync(
      `${staticPath}/posts/${file}/${file}.md`
    ).mtime;

    dates[`${file}`] = lastModifedDate;

    // * get tags, category
    const metadata = require(`${staticPath}/posts/${file}/${file}.json`);
    const fileInfo = {
      title: file,
      date: lastModifedDate,
      tags: metadata.tags,
      thumbnailSrc: metadata.thumbnailSrc,
    };

    if (categories.hasOwnProperty(metadata.category)) {
      categories[metadata.category].push(fileInfo);
    } else {
      categories[metadata.category] = [fileInfo];
    }

    metadata.tags.forEach((tag) => {
      if (!tags.hasOwnProperty(tag)) {
        tags[tag] = [fileInfo];
      } else if (
        tags[tag].findIndex((val) => val.title === fileInfo.title) === -1
      ) {
        tags[tag].push(fileInfo);
      }
    });

    posts.push(fileInfo);
  });

  fs.writeFileSync(`${staticPath}/generated/date.json`, JSON.stringify(dates));
  fs.writeFileSync(
    `${staticPath}/generated/category.json`,
    JSON.stringify(categories)
  );
  fs.writeFileSync(`${staticPath}/generated/tag.json`, JSON.stringify(tags));
  posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    else if (a.data < b.date) return 1;
    else return 0;
  });
  fs.writeFileSync(`${staticPath}/generated/post.json`, JSON.stringify(posts));

  const sitemap = [];
  sitemap.push('<?xml version="1.0" encoding="UTF-8"?>');
  sitemap.push(
    '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  );

  const host = "euidong.github.io";
  posts.forEach((post) => {
    // open
    sitemap.push(`  <url>`);
    // location
    sitemap.push(`    <loc>${host}/post/${post.title}</loc>`);
    // lasted modified
    sitemap.push(`    <lastmod>${post.date}</lastmod>`);
    // change frequency
    sitemap.push(`    <changefreq>weekly</changefreq>`);
    // sitemap priority
    sitemap.push(`    <priority>0.5</priority>`);
    // close
    sitemap.push(`  </url>`);
  });
  sitemap.push("</urlset>");

  fs.writeFileSync(`./public/sitemap.xml`, sitemap.join("\n"));
});
