const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  entry: {
    "record-audio": "./src/record-audio.js",
    "record-video": "./src/record-video.js",
    picture: "./src/picture.js",
    app: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:  [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ["app"],
      minify: {
        collapseWhitespace: true
      },
      hash: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/picture.html",
      filename: "picture.html",
      chunks: ["picture"],
      minify: {
        collapseWhitespace: true
      },
      hash: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/record-audio.html",
      filename: "record-audio.html",
      chunks: ["record-audio"],
      minify: {
        collapseWhitespace: true
      },
      hash: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/record-video.html",
      filename: "record-video.html",
      chunks: ["record-video"],
      minify: {
        collapseWhitespace: true
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}
