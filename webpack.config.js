'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.tsx',

  output: {
    filename: 'index_bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ]
};