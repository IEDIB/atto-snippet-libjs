

var compiledCache = {};

function copyToClipboard(text) {
  // must use a temporary form element for the selection and copy
  var target = document.getElementById("snpclipboard");
  if(!target) {
    target = document.createElement("textarea");
    target.style.position = "absolute";
    target.style.left = "-9999px";
    target.style.top = "0";
    target.id = 'snpclipboard';
    document.body.appendChild(target);
  }
  target.textContent = text;
  // select the content 
  var currentFocus = document.activeElement;
  var sx = window.scrollX;
  var sy = window.scrollY;
  target.focus();
  target.setSelectionRange(0, target.value.length);
  // copy the selection
  var succeed;
  try {
        succeed = document.execCommand("copy");
  } catch(e) {
      succeed = false;
  } 
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
    currentFocus.focus();
  }
  window.scrollTo(sx, sy);
  return succeed;
}
// Register helpers to Handlebars 
Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        accum += block.fn(this);
    }
    return accum;
});
Handlebars.registerHelper('ifCond', function(a, condition, b, opts) {
    var bool;
    if (condition == "==" || condition == "eq"){
        bool = (a==b);
    } else if (condition == "<" || condition == "lt"){
        bool = (a<b);
    } else if (condition == ">" || condition == "gt"){
        bool = (a>b);
    } else if (condition == "<=" || condition == "leq"){
        bool = (a<=b);
    } else if (condition == ">=" || condition == "geq"){
        bool = (a>=b);
    } else {
        bool = (a!=b);
    }
    if (bool) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
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

function compilaSnippet(snippetKey) { 
    var template = compiledCache[snippetKey];
    if(!template) { 
        var snippet = mapSnippets[snippetKey];
        var body = snippet["body"];
        // TODO hi ha un problema amb inner references {{../foo}}
        body = body.replace(/\{\{..\//g, "{{");     
        template = Handlebars.compile(body);
        compiledCache[snippetKey] = template;
    }
    return template;
}
function paramId(snippetKey, paramKey) {
    var key = snippetKey + '_' + paramKey.replace("$","")
    return key.replace(/ /g, '')
}
function updateSnippetParameters(snippetKey) {
    var snip = mapSnippets[snippetKey]; 
    var values = JSON.parse(JSON.stringify(snip['defaults']));
    var plist = snip['misc']['parameters'];
    for(var i=0, len=plist.length; i < len; i++) {
        var param = plist[i];
        var pname = param.name;
        //find the control
        var cid = paramId(snippetKey, pname);
        var $control = $('#' + cid); 
        if($control.length) {
            if(param.type=='checkbox') {
                values[pname] = $control.prop('checked')?1:0;
            } else {
                values[pname] = $control.val();
            }
        } else {
            console.error("Cannot retrieve value from control " +cid);
        }
    }  
    I18n.resources = snip['misc']['I18n'] || {};
    I18n.locale = values['$lang'] || 'ca';
    return values;
}
function compileSnippet(snippetKey, values) {
    var template = compiledCache[snippetKey];
    if(!template) {
        template = compilaSnippet(snippetKey);
        if(!template) {
            console.error("Cannot compile ", snippetKey);
            return;
        }
    } 
    values['$id'] = "c"+Math.random().toString(32).substring(2);
    if (values['clau'] && values['clau']=='$RND') {
        values['clau'] = "c"+Math.random().toString(32).substring(2); 
    }  
    return template(values);
}
$(function(){
    $(".btn.btn-sm.btn-secondary").click(function(evt){
        var self = $(this);
        var key = self.data("key");  
        if(copyToClipboard(mapSnippets[key]['html']||"")){
            // Show tooltip - copied!
            console.log("Contents copied to clipboard!");
            self.tooltip({
                title: "Copiat al portaretalls!"
            });
            
        } else {
            console.error("Cannot copy to clipboard");
            self.tooltip({
                title: "No s'ha pogut copiar :-("
            });
        }
        self.tooltip('enable');
        self.tooltip('show');
        window.setTimeout(function(){
            self.tooltip('hide');
            self.tooltip('disable');
        }, 1500);
        
    });
    $(".btn.btn-primary[data-key]").click(function(evt){
        // Aquí es necessari tornar a cercar els components antics i eliminar-los
        if(window.IB && window.IB.sd) {
            // TODO: millorar que es faci un unbound selectiu únicament al mòdul afectat
            var modules = Object.values(window.IB.sd);
            for(var i=0, len=modules.length; i<len; i++) {
                modules[i].unbind && modules[i].unbind();
            }
        }

        var key = $(this).data("key");  
        var parameters = updateSnippetParameters(key);
        var html = compileSnippet(key, parameters);
        $("#tab-"+key+"-0").html(html); 
        var codeblock =$("#tab-"+key+"-12").get(0);
        html = html_beautify(html);
        //desa el nou codi
        mapSnippets[key]['html'] = html;
        var newcode = hljs.highlight('html', html); 
        codeblock.innerHTML = newcode.value;

        // Aquí es necessari tornar a cercar els components dinàmics perquè siguin tractats
        if(window.IB && window.IB.sd) { 
            var modules = Object.values(window.IB.sd);
            for(var i=0, len=modules.length; i<len; i++) {
                modules[i].bind && modules[i].bind();
            }
        }

    });
});