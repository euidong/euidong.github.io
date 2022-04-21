/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: require("./package.json").homepage,
  generateRobotsTxt: true, // (optional)
  // ...other options
};
