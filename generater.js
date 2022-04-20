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

  // * siteamp for Search Engine Bot
  gen_sitemap(posts);
  // * rss for Other Automate System
  gen_rss_feed(posts);
});

const gen_sitemap = (posts) => {
  const sitemap = [];
  sitemap.push('<?xml version="1.0" encoding="UTF-8"?>');
  sitemap.push(
    '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  );

  const host = "https://euidong.github.io";
  posts.forEach((post) => {
    // open
    sitemap.push(`  <url>`);
    // location
    sitemap.push(`    <loc>${host}/post/${post.title}</loc>`);
    // lasted modified
    sitemap.push(`    <lastmod>${post.date.toISOString()}</lastmod>`);
    // change frequency
    sitemap.push(`    <changefreq>weekly</changefreq>`);
    // sitemap priority
    sitemap.push(`    <priority>0.5</priority>`);
    // close
    sitemap.push(`  </url>`);
  });
  sitemap.push("</urlset>");

  fs.writeFileSync(`./public/sitemap.xml`, sitemap.join("\n"));
};

const gen_rss_feed = (posts) => {
  const host = "https://euidong.github.io";
  const rss = [];
  rss.push('<?xml version="1.0" encoding="UTF-8"?>');
  rss.push('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
  rss.push("  <channel>");
  rss.push(`    <title>JustLog</title>`);
  rss.push(`    <description>Tech Blog</description>`);
  rss.push(`    <link>${host}</link>`);
  rss.push(
    `    <atom:link href="${host}" rel="self" type="application/rss+xml" />`
  );
  rss.push(`    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`);

  posts.forEach((post) => {
    // open
    rss.push(`    <item>`);
    // location
    rss.push(`      <title>${post.title}</title>`);
    rss.push(`      <link>${host}/post/${post.title}</link>`);
    rss.push(
      `      <guid isPermaLink="true">${host}/post/${post.title}</guid>`
    );
    // lasted modified
    rss.push(`      <dc:creator>euidong</dc:creator>`);
    rss.push(`      <pubDate>${post.date.toUTCString()}</pubDate>`);
    // change frequency

    rss.push(`      <description>${post.tags.join(" ")}</description>`);
    // close
    rss.push(`    </item>`);
  });

  rss.push("  </channel>");
  rss.push("</rss>");

  fs.writeFileSync(`./public/feed.xml`, rss.join("\n"));
};
