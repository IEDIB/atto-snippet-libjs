const fs = require("fs")
const path = require("path")
var UglifyJS = require("uglify-js"); 

var options = {
    mangle: true
};

console.log("******************************************")
console.log("** Compile and minify dynamic snippets  **") 
console.log("******************************************")
console.log(" ")

const src = "./src/" 
const dst = "./build/" 
console.log(`> src=${src}`)
console.log(`> dst=${dst}`)
console.log(" ")
 

// Uglify all files
fs.readdirSync(src).forEach( (file) => {
    if(!path.extname(file)=="js") {
        return
    } 
    const result = UglifyJS.minify(path.join(src, file), options)

    if(result.error) {
        console.error(result.error)
        process.exit(1)
    } else if(result.warnings) {
        console.log(result.warnings)
    }


    const target = path.join(dst, file.replace(".js", ".min.js"));
    fs.writeFileSync(target, result.code, {encoding:'utf8'});
    console.log("> written " + target);
     
})
 