(function(){
    // LOOK_AND_FEEL pot ésser default, github o xcode
    var COMPONENT_NAME = 'programacio';
    var LOOK_AND_FEEL = 'xcode';
    // OLD - VALUES
    //"https://iedib.net/assets/js/highlight.min.js" 
    //"https://iedib.net/assets/js/highlightjs-line-numbers.min.js" 
    // "https://iedib.net/assets/css/"+LOOK_AND_FEEL+".min.css"
    //createScript("https://iedib.net/assets/js/highlightjs-line-numbers.min.js", "highlightjs-line-numbers.min.js", cb2);
    var CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/'+LOOK_AND_FEEL+'.min.css';
    var JS1_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js';
    var JS2_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js';

    var createLinkSheet = function(href, id) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        if(id) {
            link.id = id;
        }
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    var createScript = function(src, id, cb) {
        var scriptElem = document.createElement('script'); 
        scriptElem.src = src;
        scriptElem.async = false;
        if(id) {
            scriptElem.id = id;
        }
        if(cb) {
            scriptElem.onload = function() {
                cb();
            };
        }
        document.getElementsByTagName('head')[0].appendChild(scriptElem);
       
    };
    
    var _loadHighlight = function() {
        var cb2 = function() {
            _doHighlight();
        }
        var cb1 = function() { 
           createScript(JS2_URL, "highlight-numbering.min", cb2);
        };
        //
        createScript(JS1_URL, "highlight.min", cb1)
    };

    var _doHighlight = function() {
        //hljs.initHighlightingOnLoad();
        if(window.hljs && !hljs.highlightElement) {
            console.error("ERROR> S'ha detectat una versió antiga de hljs a la pàgina que impedeix que es carregui la nova. Eliminau l'script manualment.");
            return;
        }
        //hljs.initLineNumbersOnLoad && hljs.initLineNumbersOnLoad();
        /*window.document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: true,
            cancelable: true
        }));*/
        var allPreCode = document.querySelectorAll('pre code');
        for(var j=0, lenj=allPreCode.length; j<lenj; j++) {
            var el = allPreCode[j];
            el.style.padding = 'initial';
            if(hljs && !el.classList.contains("nohighlight")) {
                hljs.highlightElement(el);
                if(hljs.lineNumbersBlock && !el.classList.contains("nohljsln")){
                     hljs.lineNumbersBlock(el, {singleLine: true});
                }
            }
        }
    };

    if(!document.querySelector("#hljs_styles")) {
        createLinkSheet(CSS_URL, "hljs_styles");
    } 
    //Check if the page contains hljs
    var alias = {author: "Josep Mulet", version: "1.0", inst: {}};
    window.IB.sd[COMPONENT_NAME] = alias;
  
    var bind = function() {
        if(window.hljs) {
            _doHighlight();
        } else {
            _loadHighlight();
        }  
    }; 
    alias.bind = bind;
    alias.unbind = function() { 
        alias.inst = {};
     };
        
    bind();  
})();