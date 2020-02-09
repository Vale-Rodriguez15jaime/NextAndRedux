const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

const nextConfig = {
  exportPathMap: function() {
    return {
      "/": { page: "/" }
    };
  }
};

module.exports = withPlugins([withSass, withCSS, withImages], nextConfig);
