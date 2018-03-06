const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// https://github.com/webpack/webpack/issues/1754
require("babel-core/register")({
  presets: ["env", "react"]
});
require.extensions[".scss"] = () => {
  return;
};
require.extensions[".css"] = () => {
  return;
};

const prodPlugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  })
];

const defaultPlugins = [new ExtractTextPlugin("dist/style.css")];

const plugins =
  process.env.NODE_ENV === "production"
    ? defaultPlugins.concat(prodPlugins)
    : defaultPlugins;

module.exports = {
  context: __dirname,
  entry: "./client/index.js",
  output: {
    path: __dirname,
    filename: "dist/bundle.js"
  },
  plugins,
  resolve: {
    alias: {
      apiCaller: "client/util/apiCaller"
    },
    extensions: [".scss", ".js", ".jsx", "*"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["react", "env"]
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  devtool: "source-map"
};
