const path = require('path');
const fs = require('fs');
const uglifycss = require('uglifycss');
const TerserPlugin = require("terser-webpack-plugin"); 
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); 
 
const isDev = process.argv.indexOf('--mode=none')>0; //should be development
console.log(isDev?"Webpack DEVELOPMENT mode": "Webpack PRODUCTION mode")

// Build all entry points
const entries = {}
const allCssFiles = []
fs.readdirSync("./ts", {withFileTypes: true})
  .filter(dirent => dirent.isDirectory()==true && !dirent.name.startsWith("_"))
    .forEach( dirent => {
  const modName = dirent.name;
  if(modName.startsWith("_") && isDev) {
    //Do not include in production build
    return;
  }
  entries[modName] = "./ts/"+modName+"/"+modName+".ts";
  const cssFile = path.resolve("./ts/"+modName+"/"+modName+".css");
  if(fs.existsSync(cssFile)) {
    allCssFiles.push(cssFile);
  }

  // Minify every single css files found while walking the directories
  fs.readdirSync("./ts/"+modName, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory()==false &&  dirent.name.indexOf(".min.css") < 0 && dirent.name.endsWith(".css")).forEach( dirent2 => {
    const miniCss = uglifycss.processFiles(["./ts/"+modName+"/"+dirent2.name]);
    const targetCss = path.resolve("./ts/"+modName+"/"+ dirent2.name.replace(".css",".min.css"));
    fs.writeFileSync(targetCss, miniCss, {encoding: "utf8"});
  });

  // Minify the entire css bundle
  const miniCss = uglifycss.processFiles(allCssFiles);
  const targetCss = path.resolve("./dist", "all.css");
  fs.writeFileSync(targetCss, miniCss, {encoding: "utf8"});


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
        use:["style-loader", "css-loader"],
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
    usedExports: true,
    minimizer: [ 
      new TerserPlugin({
      terserOptions: {
          format: {
              comments: false,
          },
          compress:{ pure_funcs: ['console.info', 'console.debug', 'console.log'] }
      },
      extractComments: false,
    }),
    new CssMinimizerPlugin({
      minify: CssMinimizerPlugin.cssnanoMinify
    })],
  }
};