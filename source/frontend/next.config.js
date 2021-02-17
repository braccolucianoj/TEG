const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const { nextI18NextRewrites } = require('next-i18next/rewrites');


const localeSubpaths = {
  en: "en",
  es: "es",
};

// module.exports = {

module.exports = {
  ...withSass(
    withCss({
      webpack(config) {
        config.module.rules.push({
          test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              publicPath: './',
              outputPath: 'static/',
              name: '[name].[ext]',
            },
          },
        });

        return config;
      },
    })
  ),
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};
