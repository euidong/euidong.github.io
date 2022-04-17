const fs = require("fs");

const staticPath = "./src/static";

const dates = [];

fs.readdir(`${staticPath}/posts`, async (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    const stats = fs.statSync(`${staticPath}/posts/${file}`);
    console.log(stats.mtime);
    dates.push({ [file]: stats.mtime });
  });

  fs.writeFileSync(`${staticPath}/dates.json`, JSON.stringify(dates));
});
