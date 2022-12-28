const path = require('path');

module.exports = {
  entry: {
    talea2: './ts/talea2.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, './dist'),
  },
  target: ["web", "es5"], 
  optimization: {
    minimize: true
  },
};