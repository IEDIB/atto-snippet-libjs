const path = require('path');
const fs = require('fs');
 
 
const isDev = process.argv.indexOf('--mode=development')>0;
console.log(isDev?"Webpack DEVELOPMENT mode": "Webpack PRODUCTION mode")

// Build all entry points
const entries = {}
fs.readdirSync("./ts", {withFileTypes: true}).filter(dirent => dirent.isDirectory()==true).forEach( dirent => {
  const modName = dirent.name;
  entries[modName] = "./ts/"+modName+"/"+modName+".ts";
});

module.exports = {
  entry: entries,
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
    filename: isDev?'[name].js':'[name].min.js',
    path: path.resolve(__dirname, './dist'+(isDev?'-dev':'')),
  },
  target: ["web", "es5"], 
  optimization: {
    minimize: !isDev, 
  },
};