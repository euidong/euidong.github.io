module.exports = {
  siteMetadata: {
    title: `blog`,
    name: `euidong`,
    siteUrl: `https://euidong.github.io`,
    description: `This is euidong's blog`,

    // important to set the main text that appears in the hero
    hero: {
      heading: `Just Do`,
      maxWidth: 652,
    },
    social: [
      {
        name: `github`,
        url: `https://github.com/euidong`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        authorsPage: true,
      },
    },
  ],
  pathPrefix: "/",
};
