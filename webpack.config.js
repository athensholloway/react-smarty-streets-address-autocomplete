const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.tsx',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        include: [
          path.join(__dirname, "src/"),
          path.join(__dirname, "node_modules/smartystreets-javascript-sdk"),
        ],
        exclude: /node_modules\/(?!smartystreets\-javascript\-sdk)/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "spike",
    libraryTarget: "umd" 
  },
  plugins: [
    new HtmlWebPackPlugin({
        template: "./index.html",
        filename: "./index.html"
    })
  ]
};