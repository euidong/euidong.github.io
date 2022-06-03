/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: require("./package.json").homepage,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/tags*", "/categories*", "/drafts/*"],
};
