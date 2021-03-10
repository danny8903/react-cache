const { WebpackPluginServe } = require('webpack-plugin-serve');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require('path');
const outputPath = path.resolve('./dev');

module.exports = {
  watch: true,
  entry: ['./examples/index.tsx', 'webpack-plugin-serve/client'],
  output: {
    filename: 'bundle.js',
    path: outputPath,
  },
  // mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: [
          './examples/**/*.{ts,tsx,js,jsx}',
          './src/**/*.{ts,tsx,js,jsx}',
        ],
      },
    }),
    new HtmlwebpackPlugin({
      template: './examples/index.html',
    }),
    new WebpackPluginServe({
      port: process.env.PORT || 3000,
      historyFallback: true,
      static: [outputPath],
      liveReload: true,
      waitForBuild: true,
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         presets: [
      //           '@babel/preset-env',
      //           '@babel/preset-react',
      //           '@babel/preset-typescript',
      //         ],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};
