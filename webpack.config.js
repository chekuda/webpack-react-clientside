const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssEctraPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use:[
          MiniCssEctraPlugin.loader,
          "css-loader"
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssEctraPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}