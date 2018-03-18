const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
  filename: 'css/bundle.css'
});
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  mode: 'development',
  entry: {
    client: [
      'webpack-dev-server/client?http://localhost:8080',
      //'webpack/hot/dev-server',
      path.resolve(__dirname, './../client/src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, './../client/public'),
    filename: 'js/bundle.js',
    publicPath: './'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['es2015', { loose: true }], 'react', 'stage-2'],
        },
      },
      {
        test: /\.(s)?css$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }]
  },
  plugins: [
    extractSass,
    new webpack.HotModuleReplacementPlugin(),
    /*new CleanWebpackPlugin(['public/*']),*/
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      xhtml: true
    })
  ]
}
