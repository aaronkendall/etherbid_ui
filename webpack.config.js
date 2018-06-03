const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const environment = process.env.NODE_ENV || 'development'

const plugins = {
  development: [],
  production: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};

const isDevelopment = environment === 'development'

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: isDevelopment // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  entry: {
      index: "./src/app/index.js",
      style: "./src/app/styles/main.scss"
  },
  output: {
      path: path.resolve(__dirname, './src/server/public/build'),
      filename: '[name].js'
  },
  module: {
      rules: [
        {
            test: /.js?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /.json?$/,
            use: 'json-loader'
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
  },
  resolve: {
      extensions: ['.js', '.jsx', '.scss'],
      modules: [
          'node_modules',
          path.resolve(__dirname, './node_modules')
      ]
  },
  plugins: [
    ...plugins[environment],
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  watch: isDevelopment,
  mode: environment
};
