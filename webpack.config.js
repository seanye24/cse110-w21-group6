const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const config = {
    entry: './src/scripts/index.js',
    mode: argv.mode || 'production',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'images/[hash][ext][query]',
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: 'src/index.html',
        favicon: './src/assets/favicon.ico',
      }),
      new MiniCssExtractPlugin(),
    ],
    optimization: {
      minimize: true,
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
    },
    devtool: 'inline-source-map',
  };
  return config;
};
