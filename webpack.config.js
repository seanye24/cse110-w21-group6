const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const config = {
    entry: ['./src/scripts/index.js'],
    mode: argv.mode || 'production',
    target: 'web',
    output: {
      filename: 'main.js',
      path: path.join(__dirname, 'dist'),
      assetModuleFilename: 'assets/[hash][ext][query]',
    },
    module: {
      rules: [
        {
          test: /(?<!\.component)\.css$/i,
          include: [path.join(__dirname, 'src')],
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['postcss-preset-env'],
                },
              },
            },
          ],
        },
        {
          test: /\.component\.css$/i,
          include: [path.join(__dirname, 'src')],
          use: [
            'to-string-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['postcss-preset-env'],
                },
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg|mp3)$/i,
          include: [path.join(__dirname, 'src')],
          type: 'asset/resource',
        },
        {
          test: /\.js$/i,
          include: [path.join(__dirname, 'src')],
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ESLintPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: 'src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'src/assets',
            to: 'assets',
          },
        ],
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: ['...', new CssMinimizerPlugin()],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
    },
    devtool: 'inline-source-map',
  };
  return config;
};
