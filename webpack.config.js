const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true,
    },
  }),
];

const plugins = process.env.NODE_ENV === 'production' ? prodPlugins : [];

module.exports = {
  context: __dirname,
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  plugins,
  resolve: {
    extensions: ['.scss', '.js', '.jsx', '*'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  devtool: 'source-map',
};