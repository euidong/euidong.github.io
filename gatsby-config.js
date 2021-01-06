module.exports = {
  siteMetadata: {
    title: `JustLog`,
    name: `euidong`,
    siteUrl: `https://euidong.github.io`,
    description: `This is euidong's blog`,
    // important to set the main text that appears in the hero
    hero: {
      heading: ``,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Gatsby manifest",
        short_name: "manifest",
        start_url: "/",
        background_color: "#f7f0eb",
        theme_color: "#a2466c",
        display: "standalone",
        icon: "src/image/icon/favicon.png",
      },
    },
  ],
  pathPrefix: "/",
};
