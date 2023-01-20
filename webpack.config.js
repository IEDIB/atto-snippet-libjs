const path = require('path');
const fs = require('fs');
const uglifycss = require('uglifycss');
const TerserPlugin = require("terser-webpack-plugin");
 
 
const isDev = process.argv.indexOf('--mode=none')>0; //should be development
console.log(isDev?"Webpack DEVELOPMENT mode": "Webpack PRODUCTION mode")

// Build all entry points
const entries = {}
const allCssFiles = []
fs.readdirSync("./ts", {withFileTypes: true}).filter(dirent => dirent.isDirectory()==true).forEach( dirent => {
  const modName = dirent.name;
  entries[modName] = "./ts/"+modName+"/"+modName+".ts";
  const cssFile = path.resolve("./ts/"+modName+"/"+modName+".css");
  if(fs.existsSync(cssFile)) {
    allCssFiles.push(cssFile);
  }
});

// Bundle all css minified
if(allCssFiles.length) {
  const miniCss = uglifycss.processFiles(allCssFiles);
  const targetCss = path.resolve("./dist", "all.css");
  fs.writeFileSync(targetCss, miniCss, {encoding: "utf8"});
}


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
    minimizer: [new TerserPlugin({
      terserOptions: {
          format: {
              comments: false,
          },
          compress:{ pure_funcs: ['console.info', 'console.debug', 'console.log'] }
      },
      extractComments: false,
    })],
  },
};