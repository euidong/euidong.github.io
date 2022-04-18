const fs = require("fs");

const staticPath = "./src/static";

const dates = {};
const categories = {};
const tags = {};
const recentPosts = [];

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

    recentPosts.push(fileInfo);
  });

  fs.writeFileSync(`${staticPath}/generated/date.json`, JSON.stringify(dates));
  fs.writeFileSync(
    `${staticPath}/generated/category.json`,
    JSON.stringify(categories)
  );
  fs.writeFileSync(`${staticPath}/generated/tag.json`, JSON.stringify(tags));
  recentPosts.sort((a, b) => a.date > b.date);
  fs.writeFileSync(
    `${staticPath}/generated/recent.json`,
    JSON.stringify(recentPosts.slice(0, 6))
  );
});
