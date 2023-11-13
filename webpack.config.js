const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const GAME_NAME = path.basename(path.resolve());
const IS_DEV = process.env.NODE_ENV === 'development';
const PORT = 8080;
// const HOST = 'localhost';

module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  // entry: path.join(__dirname, 'index.js'),
  entry: {
    // vendor: ['pixi.js', 'pixi-spine'],
    main: path.join(__dirname, 'src', 'index.ts'),
  },
  output: {
    filename: '[name].js',
    path: IS_DEV ? path.resolve(__dirname, `./build`) : path.resolve(__dirname, `../builds/${GAME_NAME}`),
  },
  devServer: {
    allowedHosts: 'all',
    compress: true,
    port: PORT,
    // host: HOST,
    hot: true,
    https: false,
  },

  devtool: 'source-map',
  // optimization: {
  //   usedExports: true
  // },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        // test: /\.(scss|css)$/,
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader',
        //   {
        //     loader: 'sass-loader',
        //     options: {
        //       sourceMap: true,
        //     },
        //   },
        // ],
      },
      // {
      //   test: /(\.jsx|\.js)$/,
      //   loader: 'babel-loader',
      //   exclude: /(node_modules)/,
      // },
      { test: /\.(glsl|vs|fs|vert|frag)$/, loader: 'raw-loader' },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /(\.jsx|\.js)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // }
    ],
  },
  // resolve: {
  //   extensions: ['.tsx', '.ts', '.js']
  // },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets',
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: './index.css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: !IS_DEV,
    // minimizer: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       sourceMap: false,
    //       compress: {
    //         sequences: true,
    //         dead_code: true,
    //         conditionals: true,
    //         booleans: true,
    //         unused: true,
    //         if_return: true,
    //         join_vars: true,
    //         drop_console: true,
    //       },
    //       mangle: {},
    //       output: {
    //         comments: false,
    //       },
    //     },
    //   }),
    // ],
    // minimizer: [
    //   new TerserPlugin({
    //     extractComments: false,
    //     terserOptions: {
    //       compress: {
    //         drop_console: !IS_DEV,
    //       },
    //     },
    //   }),
    // ],
  },
};
