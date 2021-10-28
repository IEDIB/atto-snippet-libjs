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
let all = "";
let allcss = "";

fs.readdirSync(src).forEach( (file) => {
    console.log(path.extname(file))
    if(path.extname(file)!=".js") {
        return
    }  
    const result = UglifyJS.minify(path.join(src, file), options)

    if(result.error) {
        console.error(result.error)
        process.exit(1)
    } else if(result.warnings) {
        console.log(result.warnings)
    }
    all += result.code + "\n"
    let code = result.code;
    if(fs.existsSync(path.join(src, file.replace(".js",".css")))) {

        let local_css = fs.readFileSync(path.join(src, file.replace(".js",".css")), "utf8");
        local_css = local_css.replace(/'/g,'"').replace(/\\/g,"\\\\").replace(/\n/g,' ').replace(/\t/g,' ').replace(/  /g, ' ').replace(/5 Free/g,'5 Pro');
        allcss += " "+local_css;

         // add css
         code = `
         !function(){var l = '${local_css}'; var s = document.createElement('style'); s.type = 'text/css'; s.innerHTML = l; document.getElementsByTagName('head')[0].appendChild(s);}();
         `
         + code 
    }



    let target = path.join(dst, file.replace(".js", ".min.js"));
    fs.writeFileSync(target, result.code, {encoding:'utf8'});
    console.log("> written " + target);
     

});


if(allcss.length) {
    // add css
    all = `
    !function(){var l = '${allcss}'; var s = document.createElement('style'); s.type = 'text/css'; s.innerHTML = l; document.getElementsByTagName('head')[0].appendChild(s);}();
    `
    + all
}

target = path.join(dst, "all.min.js");
fs.writeFileSync(target, all, {encoding:'utf8'});
console.log("> written " + target);

 