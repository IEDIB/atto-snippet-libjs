const path = require('path');

module.exports = {
  entry: {
    talea: './ts/talea/talea.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
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