const webpack = require('webpack')
const path = require('path')
const _externals = require('externals-dependencies')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  entry: {
    app: './app.js'
  },
  mode: "production",//生产环境
  output: {
    path: path.resolve(__dirname, 'build'),//输出路径
    filename: '[name].js'//输出后的文件名
  },

  resolve: {
    extensions: [".js"]
  },
  externals: _externals(),
  context: __dirname,
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    path: true
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'package.json'), to: path.join(__dirname, 'build') },
        { from: path.join(__dirname, 'package-lock.json'), to: path.join(__dirname, 'build') },
        { from: path.join(__dirname, 'ecosystem.config.js'), to: path.join(__dirname, 'build') },
        { from: path.join(__dirname, 'src/public'), to: path.join(__dirname, 'build/public') },
      ],
    }),
  ],

}
