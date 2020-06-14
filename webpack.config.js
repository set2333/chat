const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    bundle: './src/app',
  },
  output: {
    path: path.resolve(__dirname, './src/server/public'),
    filename: '[name]_[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]',
            }
          },
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles_[hash].css'
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template : './src/app/index.html',
    }),
  ],
};
