const path = require("path");

module.exports = function ({env, paths}) {
  return {
    webpack: {
      alias: {
        environment: path.join(
          __dirname,
          "src",
          "environments",
          process.env.CLIENT_ENV
        )
      },
      configure: (webpackConfig) => {
        webpackConfig.module.rules.push({
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        });
        return webpackConfig;
      }
    }
  };
};
