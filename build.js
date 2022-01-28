const fs = require("fs")
const path = require("path")
var UglifyJS = require("uglify-js"); 
const yaml = require('js-yaml');

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
 
function removeComments(code) {
    return code.replace(/\/\*(.|\n)*?\*\//gmi, function($0,$1) {
        return "";
    });
}

// Uglify all files
let all = "";
let allcss = "";
// empaqueta per categories
const categories = {
    "general": {code:[], css:[]}
};

fs.readdirSync(src).forEach( (file) => { 
    if(path.extname(file)!=".js") {
        return
    }  
    // look for category in presets
    const presetFile = path.join("presets", "dynamic_"+file.replace(".js",".yaml"));
    let currentCat = "general";
    if(fs.existsSync(presetFile)) {
        const txt = fs.readFileSync(presetFile, "utf-8");
        try {
            let parsed = yaml.load(txt);
            if(parsed.misc.category) {
                currentCat = parsed.misc.category.toLowerCase().trim();
            }
        } catch(ex){
            console.error(ex);
        }
    }
    let catObj = categories[currentCat];
    if(!catObj) {
        catObj = {code:[], css:[]};
        categories[currentCat] = catObj;
    }

    // Search for library includes
    const code1 = fs.readFileSync(path.join(src, file), "utf-8")
    const regex = /\/\*@include:(.*)\*\//gmi;
    const needLibs = []
    let m;
    
    while ((m = regex.exec(code1)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        needLibs.push(m[1].trim());
    }

    const result = UglifyJS.minify(path.join(src, file), options)

    if(result.error) {
        console.error(result.error)
        process.exit(1)
    } else if(result.warnings) {
        console.log(result.warnings)
    }
    let code = result.code;

    // Add libraries if needed
    if(needLibs.length) {
        allLibs = "";
        needLibs.forEach( (libName) => {
            allLibs += removeComments(fs.readFileSync(libName, "utf-8")) + "\n"
        });
        code = allLibs + "\n" + code;
    }
    all += code + "\n"
    
    catObj.code.push(code);
    if(fs.existsSync(path.join(src, file.replace(".js",".css")))) {

        let local_css = removeComments(fs.readFileSync(path.join(src, file.replace(".js",".css")), "utf8"));
        local_css = local_css.replace(/'/g,'"').replace(/\\/g,"\\\\").replace(/\n/g,' ').replace(/\t/g,' ').replace(/  /g, ' ').replace(/5 Free/g,'5 Pro');
        catObj.css.push(local_css);
        allcss += " "+local_css;

         // add css
         code = ` 
         !function(){if(document.getElementById("sd_css_${file}")){return;}; var l = '${local_css}'; var s = document.createElement('style'); s.type = 'text/css'; s.innerHTML = l; s.id="sd_css_${file}"; document.getElementsByTagName('head')[0].appendChild(s);}();
         `
         + code 
    }

    code = "window.IB = window.IB || {}; window.IB.sd = window.IB.sd || {}; "+ code

    let target = path.join(dst, file.replace(".js", ".min.js"));
    fs.writeFileSync(target, code, {encoding:'utf8'});
    console.log("> written " + target);
     

});


if(allcss.length) {
    // add css
    all = `
    window.IB = window.IB || {}; window.IB.sd = window.IB.sd || {}; 
    !function(){if(document.getElementById("sd_css_all")){return;}; var l = '${allcss}'; var s = document.createElement('style'); s.type = 'text/css'; s.innerHTML = l; s.id="sd_css_all"; document.getElementsByTagName('head')[0].appendChild(s);}();
    `
    + all
}

// Monolithic file with everything
target = path.join(dst, "all.min.js");
fs.writeFileSync(target, all, {encoding:'utf8'});
console.log("> written " + target);

 
// Monolithic file only with css
if(allcss.length) {
    // add css
    all = `
    !function(){if(document.getElementById("sd_css_all")){return;}; var l = '${allcss}'; var s = document.createElement('style'); s.type = 'text/css'; s.innerHTML = l; s.id="sd_css_all"; document.getElementsByTagName('head')[0].appendChild(s);}();
    ` 
    target = path.join(dst, "allcss.min.js");
    fs.writeFileSync(target, all, {encoding:'utf8'});
    console.log("> written " + target);
}

// Bundles by categories
Object.keys(categories).forEach( (catname) => {
    var listCode = categories[catname].code;
    var listCss= categories[catname].css;
    
    let code = "window.IB = window.IB || {}; window.IB.sd = window.IB.sd || {};";
    if(listCss.length) {
        code += `
        !function(){if(document.getElementById("sd_css_${catname}")){return;}; var l = '${listCss.join(" ")}'; var s = document.createElement('style'); s.type = 'text/css'; s.innerHTML = l; s.id="sd_css_${catname}"; document.getElementsByTagName('head')[0].appendChild(s);}();
        `;
    }
    code += listCode.join(" \n")
    let target = path.join(dst, catname+"_cat.min.js");
    fs.writeFileSync(target, code, {encoding:'utf8'});
    console.log("> written " + target);
});
