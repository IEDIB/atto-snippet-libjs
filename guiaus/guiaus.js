const DEBUG = false

const fs = require("fs")
const TEMPLATE_SECCIO_SNIPPET = fs.readFileSync("./templates/seccio-snippet.ejs", "utf-8")
const yaml = require('js-yaml');
const path = require("path")
const directory = "../presets"
const Handlebars = require("handlebars")
const { Exception } = require("handlebars")
const escape = require("escape-html")
const beautify = require("js-beautify").html
const ejs = require('ejs')

// Register helpers to Handlebars
// Add helpers to Handlebars
Handlebars.registerHelper('times', function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        accum += block.fn(this);
    }
    return accum;
});
Handlebars.registerHelper('ifCond', function (a, condition, b, opts) {
    var bool;
    if (condition == "==" || condition == "eq") {
        bool = (a == b);
    } else if (condition == "<" || condition == "lt") {
        bool = (a < b);
    } else if (condition == ">" || condition == "gt") {
        bool = (a > b);
    } else if (condition == "<=" || condition == "leq") {
        bool = (a <= b);
    } else if (condition == ">=" || condition == "geq") {
        bool = (a >= b);
    } else {
        bool = (a != b);
    }

    if (bool) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});


Handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

var I18n = {
    locale: "ca",
    resources: {}
}; 


Handlebars.registerHelper('I18n', function (arg, opts) {
    var locale = opts.locale || I18n.locale;
    var translations = I18n.resources[arg] || {};
    return translations[locale] || arg;
});

// Convert images to inline base64
function embedImages(str) {
    const img_regex = /<img\s+.*src="(.*)"\s+.*\/>/gm;
    str = str.replace(img_regex, function ($0, $1) {
       //load image
       const bitmap = fs.readFileSync("./html/"+$1)
       const base64 = new Buffer.from(bitmap).toString('base64');
       return $0.replace($1, 'data:image/png;base64, '+base64)
    });
    return str;
}

function capitalize(s) {
    const s2 = s.toLowerCase()
    return s2[0].toUpperCase() + s2.substring(1)
}

function searchSnippet(mapCategories, snippetKey) {
    let snippetFound = null;
    let i = 0;
    let len = Object.keys(mapCategories).length
    while (snippetFound == null && i < len) {
        const kname = Object.keys(mapCategories)[i];
        const lfound = mapCategories[kname].filter(e => e["key"] == snippetKey)
        if (lfound.length == 1) {
            snippetFound = lfound[0]
        } else if (lfound.length > 1) {
            throw new Exception("Two snippets with the same key!");
        }
        i++;
    }

    return snippetFound;
}

function readSnippets() {
    const categories = {}
    const dirStruct = fs.readdirSync(directory);
    let maxDate = new Date(2018, 8, 1);

    dirStruct.forEach((f) => {
        let parsed;
        // Llegeix directament en yaml
        if (f.endsWith(".yaml")) {
 
            const json = fs.readFileSync(path.join(directory, f), "utf-8");
            try {
                parsed = yaml.load(json);
                // Ara parsejam els defaults i els paràmetres com objectes
                //parsed['defaults'] = JSON.parse(parsed['defaults'])
                //parsed['misc'] = JSON.parse(parsed['misc'])

                // Do not show or include snippets which are hidden
                if(parsed['misc']['hidden']) {
                    console.log(">>> Skipping ", parsed['name'] + '. It\'s hidden!');
                    return;
                }
                // an alias
                parsed['category'] = parsed['misc']['category'] || "altres"
                // TODO:  Ho afegeixo a mà perquè no ho permet fer desde JSON
                /*
                if(parsed.key=='video-gdrive') {
                    parsed.defaults['_codi_iframe'] = {
                        value: '<iframe src="https://drive.google.com/file/d/1qlHPB60Kln1Wu_HyCDb3-sQOSsstjWCV/preview" width="640" height="480" allowfullscreen></iframe>',
                        default: '<iframe src="https://drive.google.com/file/d/1qlHPB60Kln1Wu_HyCDb3-sQOSsstjWCV/preview" width="640" height="480" allowfullscreen></iframe>',
                        opts: [],
                        type: 'textarea'
                    };
                }
                */ 
                // parsejam si és possible la data a partir de version sinó li posam la data de creació de l'IEDIB
                var version = parsed['version'];
                if(version) {
                    var vps = version.split(".")
                    if(vps.length == 3) {
                        try {
                            var any = parseInt(vps[0])
                            if(any >= 2018) {
                                var mes = parseInt(vps[1])-1
                                var dia = parseInt(vps[2])
                                parsed['date'] = new Date(any, mes, dia)
                                if(parsed['date'] > maxDate) {
                                    maxDate = parsed['date']
                                }
                            }
                        } catch(ex) {
                            parsed['date'] = new Date(2018, 8, 1)
                        }
                    } else {
                        parsed['date'] = new Date(2018, 8, 1)
                    }

                    if(version=='0.0.0'){
                        parsed['future'] = true;
                    }
                }
            } catch (Ex) {
                console.error("Invalid Yaml for file " + f + ":: " + Ex)
                throw (Ex)
            }
        } else {
            return
        }
        const name = parsed['name']
        if (!parsed['category']) {
            const parts = name.split("|")
            parsed['name'] = parts[0].trim()
            if (parts.length > 1) {
                parsed['category'] = parts[1].trim()
            } else {
                parsed['category'] = 'Altres'
            }
        }
        if (parsed['name'].indexOf("|")) {
            const parts = name.split("|")
            parsed['name'] = parts[0].trim()
        }
        let container = categories[parsed['category']]
        if (!container) {
            container = []
            categories[parsed['category']] = container
        }

        container.push(parsed)
       
    });

    // ordena dins cada contenidor 
    Object.keys(categories).forEach((catName) => {
        const container = categories[catName]
        categories[catName] = container.sort((a, b) => ('' + a['name']).localeCompare(b['name']))
        //elimina els snippets amb nom que contingui (old)
        categories[catName] = categories[catName].filter(e => e['name'].indexOf('(old)') < 0)
        categories[catName] = categories[catName].filter(e => e['name'].indexOf('-old') < 0)

        // afegeix un parent a cada objecte
        categories[catName].forEach(e => e.parent = categories[catName])
        categories[catName].parent = categories
    })

    // afegeix meta informació del fitxer snippet-meta.yml
    const snippetMeta = yaml.load(fs.readFileSync('./snippet-meta.yml', 'utf8')); 
    Object.keys(snippetMeta).forEach((snippetKey) => {
        const snippetFound = searchSnippet(categories, snippetKey);
        if (snippetFound) {
            snippetFound["pro"] = (snippetMeta[snippetKey]["pro"] || []).map(e => embedImages(e))
            snippetFound["con"] = (snippetMeta[snippetKey]["con"] || []).map(e => embedImages(e))
            snippetFound["hint"] = (snippetMeta[snippetKey]["hint"] || []).map(e => embedImages(e))
        } else {
            throw new Exception("No existeix l'snippet amb key " + snippetKey)
        }
    })
    // marca amb l'etiqueta nou, els snippets amb versió (la darrera)
    if(maxDate.getDate() != new Date(2018,8,1).getDate()) {
        Object.keys(categories).forEach((catName) => {
            const container = categories[catName]
            container.forEach((snpt)=>{
                if(snpt['date'] && snpt['date'].getDate() == maxDate.getDate()) {
                    snpt['nou'] = true;
                    console.log("S'ha marcat com NOU: " + snpt.name);
                }
            });
            
        });
    }

    // ordena alfabèticament tot
    const sortedCategoriesNames = Object.keys(categories).sort()

    return sortedCategoriesNames.map((name) => {
        return { name: capitalize(name), snippets: categories[name] }
    })

}

/*  New version becomes JSON
function parseDefaults(defaultValues) {
    const parts = defaultValues.split(",")
    const mapa = {}
    parts.forEach((p) => {
        if (p.indexOf("=") < 0) {
            return
        }
        let defaultValue = "";
        let type = "text";
        let opts = null;

        const kv = p.split("=")
        const kname = kv[0]
        let kvalue = kv[1]
        if (kvalue.indexOf("|")<0) {       
            //Escalar 
            opts = null
            type = "text"
            defaultValue = kvalue.trim()

        } else {

            if (kvalue == '1|0' || kvalue == '0|1') {
                // check if it belongs to a checkbox
                type = "checkbox"
                defaultValue = kvalue.split("|")[0].trim()
            } else {
                // vector
                const vec = []
                const kvalues = kvalue.split("|")
                kvalues.forEach((kvalue, indx) => {
                    if (kvalue.indexOf(":") > 0) {
                        // has a label/value
                        let selParts = kvalue.split(":")
                        vec.push({ v: selParts[0].trim(), l: selParts[1].trim() })
                        type = 'select'
                        if (indx == 0) {
                            defaultValue = selParts[0].trim()
                        }
                    } else {
                        //only has a value
                        vec.push({ v: kvalue.trim(), l: kvalue.trim() })
                        type = 'select'
                        if (indx == 0) {
                            defaultValue = kvalue.trim()
                        }
                    }
                });
                opts = vec

            }
        }  
        if (kname.trim().startsWith('_')) {
            type = "textarea"
            opts = null
        }
        mapa[kname.trim()] = { value: defaultValue, default: defaultValue, opts: opts, type: type }
    })
    return mapa
}

function parseParameterFullnames(names) {
    const parts = names.split(",")
    const mapa = {}
    parts.forEach((p) => {
        if (p.indexOf("=") < 0) {
            return
        }
        const kv = p.split("=")
        const kname = kv[0]
        let kvalue = kv[1]
        mapa[kname.trim()] = kvalue.trim()
    })
    return mapa
}
*/

function compilaSnippet(body, valors) {
    //valors['$lang'] = 'ca'
    valors['$id'] = "r" + Math.random().toString(32).substring(2)
    if (valors['clau'] && valors['clau'] == '$RND') {
        valors['clau'] = "c" + Math.random().toString(32).substring(2)
    }
    // TODO hi ha un problema amb {{../foo}}
    body = body.replace(/\{\{..\//g, "{{")
    const template = Handlebars.compile(body)
    return template(valors)
}

function parseTip(text, snippet) {
    // search for #..snippet-key...# 
    // add link only for the same category
    if (!text.trim().endsWith(".")) {
        text = text.trim() + "."
    }
    const snippetHyperReg = /#((?:.|\n)+?)#/gi;
    text = text.replace(snippetHyperReg, function ($0, $1, $2, $3) {
        const lamevaCategoria = snippet.parent;
        const lsf = lamevaCategoria.filter(e => e["key"] == $1.trim())
        if (lsf.length == 1) {
            return '<a href="#section-' + $1 + '">' + lsf[0]["name"] + '</a>'
        } else {
            // TODO: Cerca en altres categories (només ens interessa el nom)
            return $1
        }
        return $1;
    });

    return text
}

function paramId(snippetKey, paramKey) {
    var key = snippetKey + '_' + paramKey.replace("$", "")
    return key.replace(/ /g, '')
}

function createSnippetControls(snippet) {
    let controls = ""
    if(snippet['misc']['parameters'].length == 0) {
        return null
    }
    snippet['misc']['parameters'].forEach((pk) => {
        // find the long name of the parameter 
        const pname = pk['name']
        let title = pk['title']
        if (title && title == "$id") {
            title = "Identificador auto generat"
        } else if (!title && title == "$lang") {
            title = "Idioma"
        }
        let controlid = paramId(snippet['key'], pname)
        let valor = snippet['defaults'][pname]
        let input = ""
        let tipus = pk['type'];

        let ttip = ""
        if(pk['tip']) {
            ttip = ' title="'+pk['tip']+'" '; 
        }

        if (tipus == 'textarea') {
            input = `<textarea class="form-control" id="${controlid}" ${ttip}>${valor}</textarea>`
        } else if (tipus == 'select') {
            let items = "" 
            pk['options'].forEach((opt, indx) => {
                if(typeof(opt)=='string') {
                    items += `<option value="${opt}" ${indx == 0 ? 'selected' : ''}>${opt}</option>`
                } else {
                    items += `<option value="${opt.v}" ${indx == 0 ? 'selected' : ''}>${opt.l}</option>`
                }
            })
            input = `<select class="form-control" id="${controlid}" ${ttip}>${items}</select>`
        } else if (tipus == 'checkbox') {
            let checked = ""
            if(valor === true || valor === '1' || valor === 1) {
                checked = "checked";
            } 
            input = `<input type="checkbox" class="form-check-input" value="${valor}" ${checked} id="${controlid}" ${ttip}>`
        } else if (tipus == 'numeric') {
            let minmax = ""
            if(pk['min']) {
                minmax = 'min='+pk['min']
            }
            if(pk['max']) {
                minmax += ' max='+pk['max']
            }
            input = `<input type="numeric" class="form-control" id="${controlid}" aria-describedby="${pk}" value="${valor}" ${minmax} ${ttip}>`
        } else {
            input = `<input type="text" class="form-control" id="${controlid}" aria-describedby="${pk}" value="${valor}" ${ttip}>`
        }
        if (tipus == 'checkbox') {
            controls += `<div class="form-check" style="margin-bottom:10px;">
            ${input}
            <label class="form-check-label" for="${controlid}">
                ${title}
            </label>
          </div>`
        } else {
            controls += `
            <div class="form-group">
            <label for="${controlid}" title="${pname}">${title}</label>
            ${input}
            </div>`
        }
    })
    return controls;
}

function processScopes(txt) {
    const scopes = (txt || "*").split(',');
    const scope = scopes.map(e => {
        if (e == '*') {
            return 'Tots'
        } else if (e == 'L') {
            return 'Llibre Moodle'
        } else if (e == 'P') {
            return 'Recurs pàgina'
        } else if (e == 'Q') {
            return 'Qüestionari'
        } else if (e == 'T') {
            return 'Tasca'
        } else if (e == 'G') {
            return 'Grid'
        } else if (e == 'F') {
            return 'Fòrums'
        }
    }).join(", ");
    return scope;
}

function creaSeccioSnippet(snippet, allowfullscreen, mapaSrc) {
    const nom = snippet['name']
    const scope = processScopes(snippet['scope'])

    let recomanacio = snippet['stars']
    if (recomanacio == null) {
        recomanacio = "2"
    }
    recomanacio = parseInt(recomanacio)
    if (recomanacio > 3) {
        recomanacio = 3
    } else if (recomanacio < 0) {
        recomanacio = 0
    }

    if(snippet.pro) {
        snippet.pro = snippet.pro.map(e => parseTip(e, snippet) );
    }
    if(snippet.con) {
        snippet.con = snippet.con.map(e => parseTip(e, snippet) );
    }
        
    const params = snippet['defaults']; 
    console.log(snippet)
    I18n.resources = snippet['misc']['I18n'] || {};
    I18n.locale = params.$lang || 'ca';
    let codiSnippetCompilat = compilaSnippet(snippet['body'], params);
    codiSnippetCompilat = beautify(codiSnippetCompilat, { indent_size: 2, space_in_empty_paren: true });
    mapaSrc[snippet['key']] = codiSnippetCompilat;
    let tabid = snippet['key'];
    let accordionid = "acc-" + Math.random().toString(32).substring(2)
    let snippetControls = createSnippetControls(snippet); 
    if(snippetControls==null) {
        snippetControls = "<p><em>No admet paràmetres de configuració.</em></p>" 
    } else {
        snippetControls = ` ${snippetControls}
         <button class="btn btn-primary" data-key="${snippet['key']}"><i class="fas fa-sync-alt" title="Actualita els canvis"></i> Genera</button>`
    }
  
    const seccio = ejs.render(TEMPLATE_SECCIO_SNIPPET, {
        snippet: snippet,
        snippetControls: snippetControls,
        nom: nom,
        ambit: scope,
        recomanacio: recomanacio,
        DEBUG: DEBUG,
        tabid: tabid,
        accordionid: accordionid,
        codiSnippetCompilat: codiSnippetCompilat,
        codiSnippetCompilatEscaped: escape(codiSnippetCompilat),
        allowfullscreen: allowfullscreen
    });

    return seccio
}
 

function creaPaginaCategoria(categoria, index) {
    const nom = categoria['name']
    const listSnippets = categoria['snippets']
    let jssection = ""  
    let mapOfSrc = {}
 
    // Serialitza la llista d'snippets com un objecte per inserir en la pàgina
    const mapSnippets = {};
    const seccionsSnippets = []
    listSnippets.forEach((snippet) => {
        seccionsSnippets.push(creaSeccioSnippet(snippet, false, mapOfSrc))
        // TODO: Check for filters! Dona problemes amb scripts???
        snippet['html'] = mapOfSrc[snippet['key']].replace("<script>", "").replace("</script>","")
        if(snippet.category.toLowerCase()=='filtres') {
            snippet['body'] =  snippet['body'].replace("<script>", "").replace("</script>","")
        }
        mapSnippets[snippet.key] = snippet;
    })

    // inclou l'api dels snippets (inline)
    const snippetApi = fs.readFileSync("./snippet-api.js", "utf-8")
    const mapSnippetsText = JSON.stringify(mapSnippets, (key, value) => {
        if (key == "parent") {
            return "";
        }
        return value;
     });

    jssection = `
        var mapSnippets = ${mapSnippetsText};
        ${snippetApi} 
    `;
    
    const ara = new Date();
    let mm = ara.getMonth()+1;
    if(mm < 10) {
        mm = "0" + mm;
    }
    const revisio = ara.getDate()+"." + mm +"."+ara.getFullYear();
   
    
    const pagina = ejs.render(fs.readFileSync("./templates/pagina-categoria.ejs", "utf-8"), {
        listSnippets: listSnippets,
        DEBUG: DEBUG,
        titolPagina: nom,
        seccionsSnippets: seccionsSnippets,
        jssection: jssection,
        revisio: revisio
    });

    return pagina
}



function creaPaginaPlantilles(lPlantilles) { 
    let jssection = ""  
    let mapOfSrc = {}
 
    // Serialitza la llista d'snippets com un objecte per inserir en la pàgina
    const mapSnippets = {};
    const seccionsSnippets = []
    lPlantilles.forEach((snippet) => {
        seccionsSnippets.push(creaSeccioSnippet(snippet, true, mapOfSrc))
        snippet['html'] = mapOfSrc[snippet['key']] 
        mapSnippets[snippet.key] = snippet;
    })

    // inclou l'api dels snippets (inline)
    const snippetApi = fs.readFileSync("./snippet-api.js", "utf-8")
    const mapSnippetsText = JSON.stringify(mapSnippets, (key, value) => {
        if (key == "parent") {
            return "";
        }
        return value;
     });

    jssection = `
        var mapSnippets = ${mapSnippetsText};
        ${snippetApi} 
    `;

    const ara = new Date();
    let mm = ara.getMonth()+1;
    if(mm < 10) {
        mm += "0" + mm;
    }
    const revisio = ara.getDate() + "." + mm + "." + ara.getFullYear();
    
    const pagina = ejs.render(fs.readFileSync("./templates/pagina-categoria.ejs", "utf-8"), {
        listSnippets: lPlantilles,
        DEBUG: DEBUG,
        titolPagina: "Plantilles predefinides",
        seccionsSnippets: seccionsSnippets,
        jssection: jssection,
        revisio: revisio
    });

    return pagina
}


const listCategories = readSnippets()

// Neteja el directori html de sortida
const files = fs.readdirSync("./html") 
for (const file of files) {
      if(file.endsWith(".html")) {
            fs.unlinkSync(path.join("./html", file));
      }
}


// Crea la pàgina índex de categories 
// Carrega meta informació per a les categories
const categoryMeta = yaml.load(fs.readFileSync("./category-meta.yml", "utf-8")) 

listCategories.forEach((e) => {
    e.listHints = (categoryMeta[e['name'].toLowerCase()] || {}).hint;
    e.randid = "cat-" + Math.random().toString(32).substring(2);
    e.handsup = e.snippets.filter(s => s.stars == 3).length
    e.handsdown = e.snippets.filter(s => s.stars == 0).length
    e.nous = e.snippets.filter(s => s.nou == true).length 
});

const paginaIndex = ejs.render(fs.readFileSync("./templates/pagina-resum.ejs", "utf-8"), 
    {
        listCategories: listCategories,
        titolPagina: "Categories",
        DEBUG: DEBUG
    }
); 
filename = "./html/3 Categories.html"
fs.writeFileSync(filename, paginaIndex, "utf-8")


// Crea les pàgines de cada categoria
let subind = 1
listCategories.forEach((categoria, index) => {
    const pagina = creaPaginaCategoria(categoria, index)
    //Escriu les pàgines a disc
    filename = "./html/3-" + subind + " " + categoria['name'] + "_sub.html"
    fs.writeFileSync(filename, pagina, "utf-8")
    subind++;
})

// Ara llegeix i crea les pàgines de les plantilles predefinides
/*
const plantilles = yaml.load(fs.readFileSync("./plantilles-predefinides.yml", "utf-8"))
plantilles.forEach(p=>{
    p.scope = processScopes(p.scope)
})
const pagina = creaPaginaPlantilles(plantilles)
filename = "./html/4 Plantilles predefinides.html"
fs.writeFileSync(filename, pagina, "utf-8")
*/
