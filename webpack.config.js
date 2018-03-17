const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
  filename: 'bundle.css'
});
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development',
  entry: {
    client: [
      'webpack-dev-server/client?http://localhost:8080',
      //'webpack/hot/dev-server',
      path.resolve(__dirname, 'src/index.jsx')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash].js',
    publicPath: '/'
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
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }]
  },
  plugins: [
    extractSass,
    new webpack.HotModuleReplacementPlugin(),
    /*new CleanWebpackPlugin(['public/*']),*/
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      xhtml: true
    })
  ]
}
