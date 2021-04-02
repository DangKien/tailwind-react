// Dependencies
const path = require("path");

const PATHS = {
  src: path.join(__dirname, "./src"),
  build: path.join(__dirname, "./build"),
  html: path.join(__dirname, "./src/templates/pages"),
};

const webpackConfig = {
  mode: process.env.NODE_ENV ? "production" : "development",
  entry: {
    index: `${PATHS.src}/scripts/index.js`,
  },
  output: {
    path: PATHS.build,
    filename: "[name].js",
  },
  plugins: [],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          minSize: 0,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
      {
        test: /\.twig$/,
        loader: "twig-loader",
      },
    ],
  },
};

if (process.env.NODE_ENV === "production") {
  webpackConfig.devtool = "source-map";
}
if (process.env.NODE_ENV === "development") {
}

module.exports = webpackConfig;
